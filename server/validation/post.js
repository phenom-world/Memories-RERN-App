import { check } from "express-validator";

export default {
  postSchema: [
    check("title").not().isEmpty().withMessage("title is required."),
    check("message").not().isEmpty().withMessage("message is required."),
    check("name").not().isEmpty().withMessage("name is required."),
  ],
};
