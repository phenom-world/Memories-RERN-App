import { check } from "express-validator";

export default {
  userSchema: [
    check("email").not().isEmpty().withMessage("email field is required."),
    check("password").not().isEmpty().withMessage("password field is required."),
    check("firstName").not().isEmpty().withMessage("firstName field is required."),
    check("lastName").not().isEmpty().withMessage("lastName field is required."),
  ],
};
