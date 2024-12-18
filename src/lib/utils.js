import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export const processQuizData = (questionPack) => {
    try {
        const cleanedPack = questionPack.trim();
        const parsedPack = JSON.parse(cleanedPack);

        if (!parsedPack.title || !Array.isArray(parsedPack.questions)) {
            console.error("Missing required fields in quiz data");
            return null;
        }

        // Validate each question object
        for (const question of parsedPack.questions) {
            if (!question.question || !Array.isArray(question.options) || !question.answer) {
                console.error("Invalid question format in quiz data");
                return null;
            }
        }

        return {
            title: parsedPack.title,
            questions: parsedPack.questions
        };
    } catch (error) {
        console.error("Error parsing quiz data:", error);
        return null; 
    }
};