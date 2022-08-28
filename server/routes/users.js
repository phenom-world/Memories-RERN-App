import express from "express";

const router = express.Router();

import { signin, signup } from "../controller/user.js";
import validator from "../middleware/validator.js";
import schema from "../validation/user.js";
const { userSchema } = schema;

router.route("/signin").post(signin);
router.route("/signup").post(validator(userSchema), signup);

export default router;
