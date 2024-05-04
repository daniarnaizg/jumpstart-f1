"use client";

const TextBlock = ({children, classes, text, isBestTime}) => (
    <div className={classes}>
        <div className="text-xl text-gray-300 font-formula1-bold italic select-none">{children}</div>
        <div className={`text-4xl ${isBestTime ? 'text-green-500' : 'text-gray-300'} font-formula1-bold italic select-none`}>
            {text}
            <span className={`text-2xl font-medium ${isBestTime ? 'text-green-500' : ''}`}>s</span>
        </div>
    </div>
);

const ResultCard = ({result, best}) => {
    let resultBlock = null;

    if (result === "JUMPSTART!") {
        resultBlock = <div className="w-full items-center justify-center py-1 px-3 bg-gradient-to-tr from-red-900 to-red-700">
            <div className="text-2xl text-center text-gray-300 font-formula1-bold italic select-none">{result}</div>
        </div>;
    } else if (result !== "0.000") {
        resultBlock = <TextBlock classes="w-full flex flex-col items-start justify-center py-1 px-3 bg-gradient-to-tr from-[#141e2e] to-[#2a4e6d]" text={result}>NEW TIME</TextBlock>;
    }

    return best && (
        <div className="flex flex-col items-center justify-center">
            <div className="text-2xl w-full text-center font-formula1-regular p-1 bg-gray-950 text-red-600 select-none">START ANALYSIS</div>
            <div className="text-2xl w-full text-center font-formula1-bold p-1 bg-yellow-500 select-none">REACTION TIME</div>
            <TextBlock classes="w-full flex flex-col items-start justify-center py-1 px-3 bg-gradient-to-tr from-[#1f403d] to-[#296560]" text={best} isBestTime={true}>CURRENT BEST</TextBlock>
            {resultBlock}
        </div>
    );
}

export default ResultCard;