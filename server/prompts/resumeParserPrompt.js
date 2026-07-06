const resumeParserPrompt = (rawText) => `
You are an expert ATS Resume Parser.

Your task is to extract structured information from the resume provided below.

STRICT RULES:

1. Return ONLY valid JSON.
2. Do NOT wrap the response inside markdown.
3. Do NOT explain anything.
4. Do NOT add comments.
5. Do NOT hallucinate information.
6. If a field is missing, return an empty string ("") or an empty array ([]).
7. Preserve the order of work experience and education exactly as they appear.
8. Keep all dates exactly as written in the resume.
9. Extract technologies mentioned in projects.
10. Do not infer skills that are not explicitly mentioned.

Return JSON in exactly this format:

{
  "name": "",
  "email": "",
  "phone": "",
  "location": "",
  "summary": "",

  "skills": {
    "programmingLanguages": [],
    "frameworks": [],
    "databases": [],
    "cloud": [],
    "tools": [],
    "other": []
  },

  "education": [
    {
      "degree": "",
      "institution": "",
      "year": "",
      "grade": ""
    }
  ],

  "experience": [
    {
      "company": "",
      "role": "",
      "duration": "",
      "description": ""
    }
  ],

  "projects": [
    {
      "title": "",
      "description": "",
      "technologies": []
    }
  ],

  "certifications": [],

  "languages": [],

  "links": {
    "github": "",
    "linkedin": "",
    "portfolio": ""
  }
}

Resume:

${rawText}
`;

export default resumeParserPrompt;