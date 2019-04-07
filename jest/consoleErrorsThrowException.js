/* eslint-disable no-console */
console.error = (originalFunction => e => {
  originalFunction.call(console, e);

  throw new Error(e);
})(console.error);
