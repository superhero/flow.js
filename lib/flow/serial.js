/*
  serial does what waterfall does, but does not honer the error first callback
  pattern, hence it does not need a callback once completed

  Not sure if we will keep this as it is.. but for now....
*/

const log = require('@superhero/debug').log;
module.exports = (tasks, cb) =>
{
  if(typeof tasks != 'object')
    throw `task list MUST be of type "object", "${typeof tasks}" given`;

  if(cb && typeof cb != 'function')
    throw 'the callback has to be of type: "function" or "undefined"';

  const keys = Object.keys(tasks);

  (function loop(i, args)
  {
    if(i >= keys.length)
      cb && cb(...args);

    else if(typeof tasks[keys[i]] != 'function')
      throw('all tasks MUST be of type: "function"');

    else
      tasks[keys[i]](...args, (...args) => setImmediate(() => loop(i+1, args)));
  })(0, []);
};
