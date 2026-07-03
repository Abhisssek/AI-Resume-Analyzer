import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ]


    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type only pdf and docx are allowed"), false);
    }


    
};


const upload = multer({
        storage: storage,
        limits:{ fileSize: 5 * 1024 * 1024},
        fileFilter: fileFilter
    })


export default upload



