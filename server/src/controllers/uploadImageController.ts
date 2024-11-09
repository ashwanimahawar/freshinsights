import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";

export const uploadImage = async (req: Request, res: Response) => {
  cloudinary.uploader
    .upload_stream((error, result) => {
      if (error) {
        return res.status(500).json({
          message: "Error while uploading the image, try again later!",
          error: error,
          status: 400,
        });
      }
      const imageUrl = result?.secure_url;
      return res.status(200).json({
        message: "Image Uploaded Successfully",
        status: 200,
        imgsrc: imageUrl,
      });
    })
    .end(req?.file?.buffer);
};
