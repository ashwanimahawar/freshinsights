import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({
      message: "You are not authorized to access this route, please login!",
      status: 401,
      redirect: "/login",
    });
  }
};
