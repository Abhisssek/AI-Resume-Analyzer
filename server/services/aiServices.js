import Groq from "groq-sdk";
import resumeParserPrompt from "../prompts/resumeParserPrompt.js";
import atsAnalysisPrompt from "../prompts/atsAnalysisPrompt.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const parseResume = async (rawText) => {

    const completion = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
            {
                role: "system",
                content: "You are an expert ATS Resume Parser."
            },
            {
                role: "user",
                content: resumeParserPrompt(rawText)
            }
        ],

        temperature: 0,

        response_format: {
            type: "json_object"
        }
    });

    return JSON.parse(completion.choices[0].message.content);
};


export const analyzeResume = async (parsedResume, jobDescription) => {
    try {

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            messages: [
                {
                    role: "system",
                    content: "You are an expert ATS analyzer and technical recruiter."
                },
                {
                    role: "user",
                    content: atsAnalysisPrompt(parsedResume, jobDescription)
                }
            ],

            temperature: 0,

            response_format: {
                type: "json_object"
            }
        });

        return JSON.parse(completion.choices[0].message.content);

    } catch (error) {
        throw new Error(error.message);
    }
};