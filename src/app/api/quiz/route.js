import {NextResponse} from "next/server";
import {getCustomQuestions, saveQuiz} from "@/db/queries";
import {getUserId} from "@/app/actions";
import {getGuidedQuestions} from "@/db/queries";

export async function POST(req, res) {
       const {userId, questionPack} = await req.json();
       const data = processQuizData(questionPack);
       if (!data) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
       }
       const {title, questions} = data;
       const quiz = await saveQuiz(userId, title, questions);
       if (!quiz) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500})
       }
      const questionList = await getCustomQuestions(quiz.id)
    return NextResponse.json({ message: 'Question generated successfully', questionList }, {status: 201});
}

export async function GET(req, res) {
    const url = new URL(req.url);
    const mode = url.searchParams.get('mode');
    const userId = await getUserId();
    let questions = [];
    if (mode === 'guided') {
        const preferences = {
            category: url.searchParams.get('category'),
            difficulty: url.searchParams.get('difficulty'),
        };
        questions = await getGuidedQuestions(userId, preferences);
    }
    
    return NextResponse.json({ message: 'Success', questions });
}

