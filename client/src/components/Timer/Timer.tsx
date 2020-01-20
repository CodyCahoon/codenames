import React, { useState, useEffect } from 'react';
import './Timer.scss';

const Timer = () => {
    const [timeRemaining, setTimeRemaining] = useState(60000);

    const intervalId = setInterval(() => {
        if (timeRemaining > 0) {
            setTimeRemaining(timeRemaining - 100);
        }
    }, 100);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    });

    if (timeRemaining <= 0) {
        clearInterval(intervalId);
        return null;
    }

    const sec = Math.floor(timeRemaining / 1000);
    const ms = Math.floor((timeRemaining - sec * 1000) / 10);
    const seconds = sec < 10 ? '0' + sec : sec;
    const milliseconds = ms < 10 ? '0' + ms : ms;
    return <div className="timer">{seconds + '.' + milliseconds + 's'}</div>;
};
export default Timer;
