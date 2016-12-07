module.exports = (tasks, callback) =>
{
  if(typeof tasks != 'object')
    throw `task list MUST be of type "object", "${typeof tasks}" given`;

  let
  count   = 0,
  errors  = {},
  out     = {},
  length  = Array.isArray(tasks)
          ? tasks.length
          : Object.keys(tasks).length;

  // if no tasks.. nothing todo..
  if(!length)
    return callback(null, out);

  const
  // done..?
  ok = () =>
  {
    if(++count == length)
      callback(Object.keys(errors).length ? errors : null, out);
  },
  // callback.. persist response
  cb = (index) => (error, ...values) =>
  {
    error
    ? errors[index] = error
    : out[index]    = values;

    ok();
  };

  // loop through the tasks
  for(let index in tasks)
    try
    {
      tasks[index](cb(index));
    }
    // catching all exceptions as errors
    catch(error)
    {
      errors[index] = error;
      ok();
    };
}
