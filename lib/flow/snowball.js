const log = require('@superhero/debug').log;
module.exports = (tasks, cb) =>
{
  if(typeof tasks != 'object')
    throw `task list MUST be of type "object", "${typeof tasks}" given`;

  if(typeof cb != 'function')
    throw 'the callback has to be of type: "function"';

  const
  ball = {},
  keys = Object.keys(tasks);

  (function loop(i, args)
  {
    const error = args.shift();

    if(i-1 >= 0)
      ball[keys[i-1]] = args;

    if(i >= keys.length || error)
      return cb(error, ball);

    else
      log(`step: ${i+1} of: ${keys.length}`);

    if(typeof tasks[keys[i]] != 'function')
      throw 'all tasks MUST be of type: "function"';

    else
      tasks[keys[i]](ball, (...args) => setImmediate(() => loop(i+1, args)));
  })(0, []);
};
