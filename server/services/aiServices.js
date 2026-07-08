import { GoogleGenerativeAI } from "@google/generative-ai";

import resumeParserPrompt from "../prompts/resumeParserPrompt.js";
import atsAnalysisPrompt from "../prompts/atsAnalysisPrompt.js";
import jobParserPrompt from "../prompts/jobParserPrompt.js";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

export const parseResume = async (rawText) => {
    try {

        const result = await model.generateContent(
            resumeParserPrompt(rawText)
        );

        const response = await result.response;

        const text = response.text();

        return JSON.parse(text);

    } catch (error) {
        throw new Error(error.message);
    }
};

export const analyzeResume = async (
    parsedResume,
    jobDescription
) => {
    try {

        const result = await model.generateContent(
            atsAnalysisPrompt(
                parsedResume,
                jobDescription
            )
        );

        const response = await result.response;

        const text = response.text();

        return JSON.parse(text);

    } catch (error) {
        throw new Error(error.message);
    }
};

export const parseJobDescription = async (
    jobDescription
) => {
    try {

        const result = await model.generateContent(
            jobParserPrompt(jobDescription)
        );

        const response = await result.response;

        const text = response.text();

        return JSON.parse(text);

    } catch (error) {
        throw new Error(error.message);
    }
};