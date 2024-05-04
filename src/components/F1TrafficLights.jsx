"use client";
import React, {useState, useEffect, useRef} from 'react';
import TrafficLight from './TrafficLight';
import ResultCard from "@/components/ResultCard";

const LIGHTS_COUNT = 5;
const LIGHT_INTERVAL = 700;
const MIN_DELAY = 1000;
const MAX_DELAY = 5000;

const Separator = () => <div className="w-3 h-7 bg-gray-950"/>;

const F1TrafficLights = () => {
    const [result, setResult] = useState("0.000");
    const [currentLight, setCurrentLight] = useState(0);
    const [lightsOffTime, setLightsOffTime] = useState(null);
    const [timeDifference, setTimeDifference] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [lightsStarted, setLightsStarted] = useState(false);

    const [bestTime, setBestTime] = useState(null);
    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedBestTime = localStorage.getItem('bestTime');
            if (storedBestTime) {
                setBestTime(storedBestTime);
            }
        }
    }, []);

    const clearAndSetInterval = (id) => {
        clearInterval(intervalId);
        setIntervalId(id);
    };

    const startLights = () => {
        setCurrentLight(0);
        setLightsOffTime(null);
        setTimeDifference(null);
        let light = 1; // Start from 1
        setCurrentLight(light); // Immediately turn on the first light
        const id = setInterval(() => {
            light++;
            setCurrentLight(light);
            if (light >= LIGHTS_COUNT) {
                clearAndSetInterval(null);
                const randomDelay = Math.floor(Math.random() * (MAX_DELAY - MIN_DELAY + 1)) + MIN_DELAY;
                setTimeout(() => {
                    setCurrentLight(0);
                    setLightsOffTime(Date.now());
                }, randomDelay);
            }
        }, LIGHT_INTERVAL);
        clearAndSetInterval(id);
    };

    const measureTime = () => {
        clearAndSetInterval(null);
        if (lightsOffTime) {
            const timeDiff = (Date.now() - lightsOffTime) / 1000;
            const formattedTimeDiff = timeDiff.toFixed(3);
            setTimeDifference(formattedTimeDiff);
            setResult(formattedTimeDiff);

            if (bestTime === null || formattedTimeDiff < bestTime) {
                setBestTime(formattedTimeDiff);
                if (typeof window !== 'undefined') {
                    localStorage.setItem('bestTime', formattedTimeDiff);
                }
            }

        } else {
            setResult("JUMPSTART!");
        }
        setCurrentLight(0);
        setLightsOffTime(null);
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


    return (<div className="flex flex-col items-center pt-20">
        <p className="w-3/4 text-m text-center font-formula1-regular text-gray-200 mb-6">Click or tap anywhere on the
            screen to start.
            Click again when
            lights go off.
        </p>
        <div className="flex items-center justify-center">
            {[...Array(LIGHTS_COUNT).keys()].map((index) => (<React.Fragment key={index}>
                <TrafficLight isOn={currentLight >= index + 1}/>
                {index !== LIGHTS_COUNT - 1 && <Separator/>}
            </React.Fragment>))}
        </div>
        <div className="mt-10">
            <ResultCard result={result} best={bestTime}/>
        </div>
    </div>);
};

export default F1TrafficLights;