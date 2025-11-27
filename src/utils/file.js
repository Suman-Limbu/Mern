import { v2 as cloudinary } from "cloudinary";
const CLOUDINARY_FOLDER = "mern-2025";
async function uploadFile(files) {
  for (const file of files) {
    console.log(file);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: CLOUDINARY_FOLDER }, (error, data) => {
          if (error) return reject(error);

          resolve(data);
        })
        .end(file.buffer);
    });
    console.log(result);
  }
}
export default uploadFile;
