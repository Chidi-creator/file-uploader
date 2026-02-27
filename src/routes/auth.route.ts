import AuthHandler from "@handlers/auth.handler";
import express from "express";
const router = express.Router();
const authHandler = new AuthHandler();


// Bind methods properly to maintain 'this' context
router.route("/login").post(authHandler.login);
router.route("/register").post(authHandler.registerUser);

export default router;

