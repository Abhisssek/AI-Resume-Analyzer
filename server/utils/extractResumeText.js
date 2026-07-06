import parsePDF from "../services/pdfParser.js";
import parseDocx from "../services/docxParser.js";


const extractResumeText = async (file) => {
    try {
        if(!file){
            throw new Error("No file provided");
        }

        switch (file.mimetype) {
            case "application/pdf":
                return await parsePDF(file.buffer);
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return await parseDocx(file.buffer);
            default:
                throw new Error("Unsupported file type");
        }


    } catch (error) {
        throw new Error("Failed to extract resume text: " + error.message);
    }
}


export default extractResumeText