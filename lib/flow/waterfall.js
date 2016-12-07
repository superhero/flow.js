const logger = require('@superhero/debug');
module.exports = (list, options = {}) =>
{
  const debug = logger(options);

  if(!Array.isArray(list))
    return debug('provided task list MUST be an array');

  let args = [];
  (function loop(i)
  {
    if(i >= list.length)
      return;

    if(args[0])
      return list[list.length - 1](args[0]);

    if(typeof list[i] != 'function')
    {
      debug(`task MUST be of type: "function", `
          + `found "${typeof list[i]}" in index: "${i}"`);
      return setImmediate(() => loop(++i));
    }

    list[i](...args, (..._args) =>
    {
      args = _args;
      setImmediate(() => loop(++i));
    });
  })(0);
};
