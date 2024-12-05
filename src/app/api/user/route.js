import {NextResponse} from "next/server";
import {saveQuiz} from "@/db/queries";

export async function POST(req, res) {
    const {userId, questionPack} = await req.json();
    const { quizName, questions} = processQuizData(questionPack);
    const quiz = await saveQuiz({userId, quizName, questions});
    console.log('Quiz saved:', quiz);
    return NextResponse.json({ message: 'User details received' });
}
const processQuizData = (questionPack) => {
    console.log(typeof questionPack);
    const parsedPack = questionPack.replace(/```json\n|```/g, '').trim()

    const quizName = parsedPack.quizName;
    const questions = parsedPack.questions;

    return { quizName, questions };
};
