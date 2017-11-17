const log = require('@superhero/debug').log;
module.exports = (tasks, cb) =>
{
  if(typeof tasks != 'object')
    throw `task list MUST be of type "object", "${typeof tasks}" given`;

  if(typeof cb != 'function')
    throw 'the callback has to be of type: "function"';

  const keys = Object.keys(tasks);

  (function loop(i, args)
  {
    const error = args.shift();

    if(i >= keys.length || error)
      return cb(error, ...args);

    else
      log(`step: ${i+1} of: ${keys.length}`);

    if(typeof tasks[keys[i]] != 'function')
      throw 'all tasks MUST be of type: "function"';

    else
      tasks[keys[i]](...args, (...args) => setImmediate(() => loop(i+1, args)));
  })(0, []);
};
