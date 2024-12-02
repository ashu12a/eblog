import multer from "multer";
import path from "path";
import fs from "fs"; // Import fs module to check and create directories

// Set the default directory for storing uploads
const publicDir = path.join(process.cwd(), "public"); // Use process.cwd() for ES Modules

// Create the public directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// Multer setup to store files in the 'public' directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicDir); // Save to the public folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Extract the file extension
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`; // Unique filename
    cb(null, filename); // Generate unique filename
  },
});

// Export multer with the defined storage settings
export const upload = multer({ storage: storage });

export const deleteFile = (file) => {
  // Check and delete the file if it exists
    const filePath = path.join(process.cwd(), "public", file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      return true;
    }else{
      return false; // File does not exist
    }
};
