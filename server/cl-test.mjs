import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config();
console.log("Config in use:", cloudinary.config());

cloudinary.uploader.upload(
  "../client/public/logo.svg",
  { folder: "QuickDine-test" },
  (error, result) => {
    if (error) {
      console.error("UPLOAD FAILED:");
      console.error(error);
    } else {
      console.log("UPLOAD SUCCEEDED:");
      console.log(result.secure_url);
    }
  }
);