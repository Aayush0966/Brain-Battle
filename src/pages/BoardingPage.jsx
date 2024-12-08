'use client'
import React from 'react'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import ModeSelection from "@/components/ui/ModeSelection";
import {boardingHeader, guidedHeader, customHeader} from "@/lib/constants";
import CustomMode from "@/components/ui/CustomMode";
import GuidedMode from "@/components/ui/GuidedMode";
import {useLayoutEffect} from "react";

const BoardingPage = () => {
    const [level, setLevel] = React.useState(0);
    const [selected, setSelected] = React.useState(null);

    const getHeader = () => {
        return level === 0 ? boardingHeader : selected === 'guided' ? guidedHeader : customHeader;
    }

    const handleLevels = () => {
        setLevel(level + 1);
        const boardingDetails = {
            level: level + 1,
            selected
        }
        localStorage.setItem('boardingDetails', JSON.stringify(boardingDetails));
    }

    React.useEffect(() => {
        const questions = JSON.parse(localStorage.getItem('questions'));
        const boardingDetails = JSON.parse(localStorage.getItem('boardingDetails'));
        if (questions) {
            window.location.href = '/game';
        }
        if (boardingDetails) {
            setLevel(boardingDetails.level);
            setSelected(boardingDetails.selected);
        }
    }, [])

    return (
        <div className="w-full flex flex-col items-center space-y-8">
            <h1 className="dark:text-white text-3xl font-sans font-semibold">
                {getHeader()}
            </h1>
            <div className="w-full max-w-3xl flex justify-center">
                {level === 0 && (
                    <ModeSelection
                        setSelected={setSelected}
                        handleLevels={handleLevels}
                        selected={selected}
                    />
                )}
                {level === 1 && selected === 'custom' && (
                    <div className="w-full space-y-6 dark:text-white">
                        <CustomMode />
                    </div>
                )}
                {level === 1 && selected === 'guided' && (
                    <div className="w-full space-y-6 dark:text-white">
                        <GuidedMode />
                    </div>
                )}

            </div>
        </div>
    )
}
export default BoardingPage



