import axios from "axios";
import * as cheerio from "cheerio";

const extractJobTextFromUrl = async (url) => {
    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
        });

        const $ = cheerio.load(response.data);

        const text = $("body").text();

        return text
            .replace(/\s+/g, " ")
            .trim();

    } catch (error) {
        throw new Error(
            "Failed to extract job description from URL"
        );
    }
};

export default extractJobTextFromUrl;