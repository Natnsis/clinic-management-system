import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Utility to generate tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET!, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET!, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};

// REGISTER
export const register = async (req: Request, res: Response) => {
  const { fName, mName, lName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.patients.create({
      data: { fName, mName, lName, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (err) {
    res.status(400).json({ message: "Email already exists" });
  }
};

//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 🔹 Hardcoded admin check
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const accessToken = jwt.sign(
      { role: "admin", email },
      process.env.ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { role: "admin", email },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ accessToken, refreshToken });
  }

  // 🔹 Staff check
  const staff = await prisma.staff.findUnique({ where: { email } });
  if (staff) {
    const auth = await bcrypt.compare(password, staff.password);
    if (!auth) return res.status(401).json({ error: "invalid credentials" });

    const accessToken = jwt.sign(
      { userId: staff.id, role: "staff" },
      process.env.ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: staff.id, role: "staff" },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ accessToken, refreshToken });
  }

  // 🔹 Patient check
  const patient = await prisma.patients.findUnique({ where: { email } });
  if (patient) {
    const auth = await bcrypt.compare(password, patient.password);
    if (!auth) return res.status(401).json({ error: "invalid credentials" });

    const accessToken = jwt.sign(
      { userId: patient.id, role: "patient" },
      process.env.ACCESS_SECRET!,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: patient.id, role: "patient" },
      process.env.REFRESH_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({ accessToken, refreshToken });
  }

  // If no user found
  return res.status(404).json({ error: "email not registered" });
};

// REFRESH
export const refresh = (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      userId: string;
    };
    const { accessToken } = generateTokens(payload.userId);
    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};
