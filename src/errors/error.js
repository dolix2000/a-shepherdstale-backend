/**
 * Error Class for forwarding errors
 */
class BadSyntaxError extends Error {
    /**
     * @param  {that gets thrown} err
     */
    constructor(err) {
      const error = (!err.message) ? err : err.message; // if error message does not exist return default err from base class
      super(error);
   
      this.name = 'BadSyntaxError';
      this.statusCode = 400;
    }
  }

module.exports = BadSyntaxError;