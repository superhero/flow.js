const logger = require('@superhero/debug');
module.exports = (list, options = {}) =>
{
  const debug = logger(options);

  if(!Array.isArray(list))
    return debug('provided task list MUST be an array');

  (function loop(i, args)
  {
    if(i >= list.length)
      return;

    const error = args.shift();

    if(error)
      return list[list.length - 1](error);

    if(typeof list[i] != 'function')
    {
      debug(`task MUST be of type: "function", `
          + `found "${typeof list[i]}" in index: "${i}"`);
      return setImmediate(() => loop(++i));
    }

    // only the last callback have to handle an error
    list[i](...args, (...args) => setImmediate(() => loop(++i, args)));
  })(0, []);
};
