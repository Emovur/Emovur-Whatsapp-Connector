import multer from "multer";
import path from "path";
import fs from "fs";

const multerUpload = (fields, uploadPath = 'uploads') => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            // Automatically creates the upload directory if it does not exist locally
            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            // Keeps your original naming pattern: timestamp_originalname
            const fileName = `${Date.now().toString()}_${file.originalname}`;
            cb(null, fileName);
        }
    });

    return multer({
        storage: storage,
        // Optional safety feature: You can append limits here if needed (e.g., 5MB limit)
        // limits: { fileSize: 5 * 1024 * 1024 } 
    }).fields(fields);
};

export { multerUpload };