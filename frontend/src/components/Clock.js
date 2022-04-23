import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Clock = () => {
    const [currentCount, setCount] = useState(300);
    const timer = () => setCount(currentCount - 1);

    useEffect(
        () => {
            if (currentCount <= 0) {
                return;
            }
            const id = setInterval(timer, 1000);
            return () => clearInterval(id);
        },
        [currentCount]
    );

    return <div  className='form-group mt-2' style={{"text-align" : "center", color: "red"}}> OTP Valid for - {currentCount} secs</div>;
};

export default Clock;