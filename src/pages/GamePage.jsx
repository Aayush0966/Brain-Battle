'use client'
import React, { useState, useEffect } from 'react';
import OptionButton from "@/components/ui/OptionButton";
import {Button} from "@/components/ui/button";

const GamePage = () => {
    const [questionList, setQuestionList] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [correct, setCorrect] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect (() => {
        const questions = JSON.parse(localStorage.getItem('questions'));
        if (!questions) {
            window.location.href = '/home';
        }
        setQuestionList(questions);
        const optionArr = JSON.parse(questions[currentQuestion]?.options);
        setOptions(optionArr.options);
    }, [currentQuestion]);

    const handleSubmit = () => {
        if (selectedOption === questionList[currentQuestion]?.correctAnswer) {
            setCorrect(true);
        } else {
            setCorrect(false);
        }
    }



    return (
        <div className='p-20  '>
            <div className=''>
             <h1 className='text-4xl dark:text-white  font-bold text-center'>{currentQuestion}. {questionList[currentQuestion]?.questionText}</h1>
            </div>
             <div className='grid mt-10  grid-cols-2 gap-12  items-center justify-center '>
                 { options && options.map((option, index) => (
                    <OptionButton select={() => setSelectedOption(option)} selected={selectedOption}  key={index} option={option} />
                 ))}
             </div>
            <Button variant='success'  size='large' onClick={() => handleSubmit()} className='mt-10 px-12 py-4 bg-green-300 hover:bg-green-500 transition ease-in-out delay-100 hover:scale-110 duration-300 text-xl font-serif'>Submit</Button>
            <div className='absolute right-12'>
                <Button onClick={() => setCurrentQuestion(currentQuestion + 1)} size='lg' variant='outline' className='text-white '>Next</Button>
            </div>
        </div>
    )
}

export default GamePage;