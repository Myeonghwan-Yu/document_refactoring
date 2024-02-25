import express from "express";
import { prisma } from "../models/index.js";
import { UsersController } from "../controllers/users.controller.js";
import { UsersServices } from "../services/users.service.js";
import { UsersRepositories } from "../repositories/users.repository.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// 3계층의 의존성을 모두 주입합니다.
const usersRepository = new UsersRepositories(prisma);
const usersService = new UsersServices(usersRepository);
const usersController = new UsersController(usersService);

// 회원가입
router.post("/sign-up", usersController.createUser);

// 로그인
router.post("/sign-in", usersController.loginUser);

// 내정보 조회
router.get("/users", authMiddleware, usersController.getUserById);

export default router;