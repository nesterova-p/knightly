import React from 'react';
import { calculateLevelProgress, getLevelTitle } from '../utils/xpLevelUtils';

export default function LevelProgress({ totalXP = 0, className = "" }) {
    const progress = calculateLevelProgress(totalXP);
    const levelTitle = getLevelTitle(progress.currentLevel);

    const getProgressBarColor = () => {
        if (progress.progressPercentage >= 90) {
            return "bg-rose-900";
        } else if (progress.progressPercentage >= 70) {
            return "bg-rose-400";
        } else if (progress.progressPercentage >= 40) {
            return "bg-primary";
        } else {
            return "bg-gray-500";
        }
    };


    const progressBarColor = getProgressBarColor();

    return (
        <div className={`bg-slate-50   rounded-xl p-4 w-full ${className}`}>
            {/* Header Section - Level and Title */}
            <div className="text-center mb-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="bg-primary text-white px-3 py-1 rounded-full font-bold text-sm shadow-md">
                        Level {progress.currentLevel}
                    </div>

                    <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded-full border">
                        {progress.totalXP} XP
                    </div>
                </div>

                <div className="text-sm font-medium text-gray-700 mb-1">
                    {levelTitle}
                </div>
            </div>

            {/* Progress Section */}
            <div className="mb-2">
                <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <div
                        className={`h-full ${progressBarColor} transition-all duration-700 ease-out rounded-full`}
                        style={{ width: `${progress.progressPercentage}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-center mt-1 text-xs text-gray-600">
                    <span>{progress.progressXP} / {progress.neededXP} XP</span>
                    <span>{progress.progressPercentage}%</span>
                </div>
            </div>

            <div className="text-center">
                <div className="text-xs text-gray-500">
                    {progress.progressPercentage >= 90 ? (
                        <span className="text-rose-900 font-medium">
                            🔥 Almost there! Just {progress.neededXP - progress.progressXP} XP to level up!
                        </span>
                    ) : (
                        <span>
                            Next: {getLevelTitle(progress.currentLevel + 1)}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

