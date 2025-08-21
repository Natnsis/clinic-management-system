import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//registration
export const register = async (req: Request, res: Response) => {
  const { fName, mName, lName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.patients.create({
      data: { fName, mName, lName, email, password: hashedPassword },
    });
    res.status(201).json({ message: "user registered", userId: user.id });
  } catch (err) {
    res.status(400).json({ message: "email already exists" });
  }
};

//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await prisma.admin.findUnique({
    where: { email },
  });
  if (!admin) {
    const staff = await prisma.staff.findUnique({
      where: { email },
    });
    if (!staff) {
      const patient = await prisma.patients.findUnique({
        where: { email },
      });
      if (!patient)
        return res.status(404).json({ error: "email not registered" });
      const auth = await bcrypt.compare(password, patient.password);
      if (!auth) return res.status(401).json({ erro: "invalid credentials" });
      const accessToke = jwt.sign(
        { userId: patient.id },
        process.env.ACCESS_SECRET!,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { userId: patient.id },
        process.env.ACCESS_SECRET!,
        { expiresIn: "7d" }
      );
    } else {
      const auth = await bcrypt.compare(password, staff.password);
      if (!auth) return res.status(401).json({ error: "invalid credentials" });
      const accessToken = jwt.sign(
        { userId: staff.id },
        process.env.ACCESS_SECRET!,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { userId: staff.id },
        process.env.ACCESS_SECRET!,
        { expiresIn: "7d" }
      );

      res.json({ accessToken, refreshToken });
    }
  } else {
    const auth = await bcrypt.compare(password, admin.password);
    if (!auth) return res.status(401).json({ error: "Invalid credentials" });
    const accessToken = jwt.sign(
      { userId: admin.id },
      process.env.ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: admin.id },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({ accessToken, refreshToken });
  }
};

//refresh
export const refresh = (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      userId: string;
    };
    const accessToken = jwt.sign(
      { userId: payload.userId },
      process.env.ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};
