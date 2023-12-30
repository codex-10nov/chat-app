import { Router } from "express";
import { body } from "express-validator";
import { login, signup } from "./controller";

const router = Router();

router.post(
    "/login",
    [
        body("username").notEmpty().withMessage("User-Name is required.").isString(),
        body("password").notEmpty().withMessage("Password is required.").isString().isLength({min: 6, max: 12}).withMessage("Password must be 6 to 12 characters only.")
    ],
    login
)

router.post(
    "/signup",
    [
        body("name").notEmpty().withMessage("Name is required."),
        // body("dob").notEmpty().withMessage("Date of Birth is required.").isDate(),
        body("email").notEmpty().withMessage("Email is required."),
        body("phoneNumber").notEmpty().withMessage("Phone Number is required."),
        body("username").notEmpty().withMessage("User Name is required."),
        body("password").notEmpty().withMessage("Password is required."),
    ],
    signup
)

export default router;