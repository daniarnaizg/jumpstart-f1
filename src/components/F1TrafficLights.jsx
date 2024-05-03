"use client";
import React, {useState, useEffect, useRef} from 'react';

const Separator = () => <div className="w-3 h-7 bg-gray-950"/>;

const Light = ({color}) => (
    <div style={{backgroundColor: color}} className="w-10 h-10 rounded-full m-1"></div>
);

const TrafficLight = ({isOn}) => {
    const colors = isOn ? ['#454545', '#454545', '#FF0000', '#FF0000'] : ['#454545', '#454545', '#454545', '#454545'];

    return (
        <div className="flex flex-col items-center justify-center px-1 py-2 bg-gray-950 rounded-xl">
            {colors.map((color, index) => (
                <Light key={index} color={color}/>
            ))}
        </div>
    );
};

const F1TrafficLights = () => {
    const [placeholder, setPlaceholder] = useState("0.000");
    const [currentLight, setCurrentLight] = useState(0);
    const [lightsOffTime, setLightsOffTime] = useState(null);
    const [timeDifference, setTimeDifference] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [lightsStarted, setLightsStarted] = useState(false);
    const [textChanged, setTextChanged] = useState(false);

    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    const startLights = () => {
        setCurrentLight(0);
        setLightsOffTime(null);
        setTimeDifference(null);
        setPlaceholder("0.000"); // Reset the placeholder
        let light = 0;
        const id = setInterval(() => {
            light++;
            setCurrentLight(light);
            if (light >= 5) {
                clearInterval(id);
                const randomDelay = Math.floor(Math.random() * (5400 - 800 + 1)) + 800;
                setTimeout(() => {
                    setCurrentLight(0);
                    setLightsOffTime(Date.now());
                }, randomDelay);
            }
        }, 1000);
        setIntervalId(id);
        setTextChanged(true);
        setTimeout(() => setTextChanged(false), 200); // Reset after 200ms
    };

    const measureTime = () => {
        clearInterval(intervalId);
        if (lightsOffTime) {
            const timeDiff = (Date.now() - lightsOffTime) / 1000; // Convert to seconds
            const formattedTimeDiff = timeDiff.toFixed(3); // Format to xxx.xxx
            setTimeDifference(formattedTimeDiff);
            setPlaceholder(formattedTimeDiff);
        } else {
            setPlaceholder("JUMP START!");
        }
        setCurrentLight(0);
        setLightsOffTime(null);
        setTextChanged(true);
        setTimeout(() => setTextChanged(false), 200); // Reset after 200ms
    };
    const handleClick = () => {
        if (!lightsStarted) {
            startLights();
            setLightsStarted(true);
        } else {
            measureTime();
            setLightsStarted(false);
        }
    };

    // Store the latest version of handleClick in a ref
    const handleClickRef = useRef();
    handleClickRef.current = handleClick;

    useEffect(() => {
        // Use the ref in the event listener
        const handleClickFromRef = () => handleClickRef.current();
        document.addEventListener('click', handleClickFromRef);

        return () => {
            document.removeEventListener('click', handleClickFromRef);
        };
    }, []); // Empty dependency array ensures this runs once on mount and cleanup on unmount


    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
                {[...Array(5).keys()].map((index) => (
                    <React.Fragment key={index}>
                        <TrafficLight isOn={currentLight >= index + 1}/>
                        {index !== 4 && <Separator/>}
                    </React.Fragment>
                ))}
            </div>
            {placeholder && <p className={`mt-6 text-7xl font-semibold ${textChanged ? 'transform transition-transform duration-200 scale-110' : ''}`}>{placeholder}</p>}
        </div>
    );
};

export default F1TrafficLights;