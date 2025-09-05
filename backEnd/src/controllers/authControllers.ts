import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//token utils
const generateTokens = (userId: string, role: string) => {
  const accessToken = jwt.sign({ userId, role }, process.env.ACCESS_SECRET!, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId, role }, process.env.REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const setRefreshCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

//register
export const register = async (req: Request, res: Response) => {
  const { fName, lName, email, password, studentId } = req.body;

  try {
    const existingUser = await prisma.patients.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.patients.create({
      data: { fName, lName, email, password: hashedPassword, studentId },
    });
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

//login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // admin
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (admin && admin.password === password) {
      const { accessToken, refreshToken } = generateTokens(admin.id, "admin");
      setRefreshCookie(res, refreshToken);
      return res.json({ accessToken });
    }

    // Try staff
    const staff = await prisma.staff.findUnique({ where: { email } });
    if (staff && (await bcrypt.compare(password, staff.password))) {
      const { accessToken, refreshToken } = generateTokens(staff.id, "staff");
      setRefreshCookie(res, refreshToken);
      return res.json({ accessToken });
    }

    // Try patient
    const patient = await prisma.patients.findUnique({ where: { email } });
    if (patient && (await bcrypt.compare(password, patient.password))) {
      const { accessToken, refreshToken } = generateTokens(
        patient.id,
        "patient"
      );
      setRefreshCookie(res, refreshToken);
      return res.json({ accessToken });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};

//refresh
export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET!) as {
      userId: string;
      role: string;
      email?: string;
    };

    // Rotate tokens (new refresh + access)
    const { accessToken, refreshToken } = generateTokens(
      payload.userId,
      payload.role
    );

    setRefreshCookie(res, refreshToken);
    res.json({ accessToken });
  } catch (err) {
    console.error("Invalid refresh token:", err);
    res.sendStatus(403);
  }
};

//logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
});

  res.json({ message: "Logged out successfully" });
};
