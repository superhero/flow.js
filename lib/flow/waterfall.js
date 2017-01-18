const log = require('@superhero/debug')({debug:true});
module.exports = (tasks, cb) =>
{
  if(!Array.isArray(tasks))
    return log('provided task list MUST be an array');

  if(typeof cb != 'function')
    return log('the callback has to be of type: "function"');

  (function loop(i, args)
  {
    const error = args.shift();

    if(i >= tasks.length || error)
    {
      cb(error, ...args);
    }
    else if(typeof tasks[i] != 'function')
    {
      log(`all tasks MUST be of type: "function", found "${typeof tasks[i]}" in index: "${i}"`);
      setImmediate(() => loop(++i, args));
    }
    else
    {
      tasks[i](...args, (...args) => setImmediate(() => loop(++i, args)));
    }
  })(0, []);
};
