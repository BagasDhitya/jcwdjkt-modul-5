import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { getExternalUser } from "../services/auth.service";

export async function registerController(req: Request, res: Response) {
  try {
    const result = await registerUser(req.body);
    res.status(201).send({
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Register failed",
    });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const result = await loginUser(req.body);
    res.status(201).send({
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Login failed",
    });
  }
}

export async function externalUserController(req: Request, res: Response) {
  try {
    const result = await getExternalUser();
    res.status(201).send({
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Failed get external user",
    });
  }
}
