import {NextResponse} from "next/server";
import {saveQuiz} from "@/db/queries";
import {getUserId} from "@/app/actions";
import {getGuidedQuestions} from "@/db/queries";

export async function POST(req, res) {
       const {userId, questionPack} = await req.json();
       const {quizName, questions} = processQuizData(questionPack);
       const quiz = await saveQuiz(userId, quizName, questions);
    return NextResponse.json({ message: 'User details received' });
}

export async function GET(req, res) {
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode');
    let questions = [];
    if (mode === 'guided') {
        const userId = await getUserId();
        const preferences = {
            category: url.searchParams.get('category'),
            difficulty: url.searchParams.get('difficulty'),
        };
        questions = await getGuidedQuestions(userId, preferences);
    }
    return NextResponse.json({ message: 'Success', questions });
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
