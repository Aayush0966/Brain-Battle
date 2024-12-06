import {NextResponse} from "next/server";
import {saveQuiz} from "@/db/queries";

export async function POST(req, res) {
    const {userId, questionPack} = await req.json();
    const {quizName, questions} = processQuizData(questionPack);
    const quiz = await saveQuiz(userId, quizName, questions);
    console.log('Quiz saved:', quiz);
    return NextResponse.json({ message: 'User details received' });
}
const processQuizData = (questionPack) => {
    try {
        // Remove leading and trailing quotes and unescape any control characters
        const cleanedPack = questionPack.trim().replace(/^"|"$/g, '').replace(/\n/g, '').replace(/\\/g, '');
        // Parse the cleaned JSON string
        const parsedPack = JSON.parse(cleanedPack);
        const title = parsedPack.title;
        const questions = parsedPack.questions;
        return {title, questions} // Return the parsed JSON object
    } catch (error) {
        console.error("Error parsing quiz data:", error);
        return null; // Return null if parsing fails
    }
};
