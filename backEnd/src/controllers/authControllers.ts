import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Utility to generate tokens
const generateTokens = (userId: string, role: string, email?: string) => {
  const accessToken = jwt.sign(
    { userId, role, email },
    process.env.ACCESS_SECRET!,
    {
      expiresIn: "15m",
    }
  );
  const refreshToken = jwt.sign(
    { userId, role, email },
    process.env.REFRESH_SECRET!,
    {
      expiresIn: "7d",
    }
  );
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

// LOGIN
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Admin check from DB
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (admin) {
    // For hardcoded test admin without hash
    if (admin.password === password) {
      const { accessToken, refreshToken } = generateTokens(admin.id, "admin");

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ accessToken });
    } else {
      return res.status(401).json({ error: "invalid credentials" });
    }
  }

  // 🔹 Staff check
  const staff = await prisma.staff.findUnique({ where: { email } });
  if (staff) {
    const auth = await bcrypt.compare(password, staff.password);
    if (!auth) return res.status(401).json({ error: "invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(staff.id, "staff");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  }

  // 🔹 Patient check
  const patient = await prisma.patients.findUnique({ where: { email } });
  if (patient) {
    const auth = await bcrypt.compare(password, patient.password);
    if (!auth) return res.status(401).json({ error: "invalid credentials" });

    const { accessToken, refreshToken } = generateTokens(patient.id, "patient");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  }

  return res.status(404).json({ error: "email not registered" });
};

// REFRESH
export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      userId: string;
      role: string;
    };
    const { accessToken } = generateTokens(payload.userId, payload.role);

    res.json({ accessToken });
  } catch {
    res.sendStatus(403);
  }
};
