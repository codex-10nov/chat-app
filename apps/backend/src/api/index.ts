import { Router } from "express";

import users from "./users/index";
import channels from "./channel/index";

import { rbac, authenticate } from "../services/auth";

const router = Router();

router.use(authenticate);

router.use(rbac);

router.use("/users", users);

router.use("/channels", channels);

export default router;

// 18001020123