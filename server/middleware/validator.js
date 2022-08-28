import { matchedData, validationResult } from "express-validator";
import ApplicationError from "../utils/utils.js";
/**
 * @description express-validator schema validator
 *
 * @param {Array} schema
 * @param {Number} status - http statusCode
 *
 * @returns {Array} array of validation results and middleware
 */

export default (schemas, status = 400) => {
  const validationCheck = async (request, _, next) => {
    const errors = validationResult(request);
    request = { ...request, ...matchedData(request) };

    if (!errors.isEmpty()) {
      const mappedErrors = Object.entries(errors.mapped()).reduce((accumulator, [key, value]) => {
        accumulator[key] = value.msg;
        return accumulator;
      }, {});
      const validationErrors = new ApplicationError(status, mappedErrors, mappedErrors);
      console.log(validationErrors);
      return next(validationErrors);
    }

    return next();
  };
  return [...(schemas.length && [schemas]), validationCheck];
};
