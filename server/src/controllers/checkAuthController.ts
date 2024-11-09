import { Request } from "express";
import { User } from "../models/user";

interface AuthenticatedUser extends Request {
  user?: User;
}

export const checkAuth = (req: AuthenticatedUser, res: any): Promise<any> => {
  if (req.isAuthenticated()) {
    const user = req?.user as User;
    return res.status(200).json({
      message: "User Logged In!",
      isAuthenticated: true,
      status: 200,
      USER: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        created_at: user?.created_at,
      },
    });
  } else {
    return res.status(401).json({
      message: "User is not logged In!",
      status: 400,
      isAuthenticated: false,
    });
  }
};
