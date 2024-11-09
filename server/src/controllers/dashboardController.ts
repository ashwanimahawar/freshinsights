import { Request, Response } from "express";

export const getDashboard = async (req: Request, res: Response): Promise<any> => {
    // console.log("Authenticated: ", req.isAuthenticated());
    if (req.isAuthenticated()) {
      return res.status(200).json({
        redirect: "/dashboard",
      });
    } else {
      return res.status(401).json({
        redirect: "/login",
      });
    }
  };