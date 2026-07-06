import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const parsePDF = async (pdfBuffer) => {
    try {
        const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(pdfBuffer),
        });

        const pdf = await loadingTask.promise;

        let extractedText = "";

        for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
            const page = await pdf.getPage(pageNumber);

            const textContent = await page.getTextContent();

            const pageText = textContent.items
                .map(item => item.str)
                .join(" ");

            extractedText += pageText + "\n";
        }

        return extractedText;

    } catch (error) {
        throw new Error("Failed to parse PDF: " + error.message);
    }
};

export default parsePDF;