import { Request, Response } from "express";
import app from "./app";

const PORT = 5000;

//Default App.get
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Welcome to Blog Arcade.");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});