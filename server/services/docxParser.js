import mammoth from 'mammoth';

const parseDocx = async (docxBuffer) => {
    try{
    const result = await mammoth.extractRawText(docxBuffer);
    return result.value;
    }catch(error){
        throw new Error("Failed to parse DOCX: " + error.message);
    }

};


export default parseDocx