"use client";

const ResultCard = ({result, best}) => {

    return ( best && <div className="flex flex-col items-center justify-center">
        <div className="text-2xl w-full text-center font-formula1-regular p-1 bg-gray-950 text-red-600 select-none">START ANALYSIS</div>
        <div className="text-2xl w-full text-center font-formula1-bold p-1 bg-yellow-500 select-none">REACTION TIME</div>
        <div
            className="w-full flex flex-col items-start justify-center py-1 px-3 bg-gradient-to-tr from-[#1f403d] to-[#319b92]">
            <div className="text-xl text-gray-300 font-formula1-bold italic select-none">CURRENT BEST</div>
            <div className="text-4xl text-lime-500 font-formula1-bold italic select-none">{best}<span
                className="text-2xl font-medium">s</span></div>
        </div>
        {result !== "0.000" && result !== "JUMPSTART!" && <div
            className="w-full flex flex-col items-start justify-center py-1 px-3 bg-gradient-to-tr from-[#141e2e] to-[#2a4e6d]">
            <div className="text-xl text-gray-300 font-formula1-bold italic select-none">NEW TIME</div>
            <div className="text-4xl text-gray-300 font-formula1-bold italic select-none">{result}<span
                className="text-2xl font-medium">s</span></div>
        </div>}
        {result === "JUMPSTART!" && <div
            className="w-full items-center justify-center py-1 px-3 bg-gradient-to-tr from-red-900 to-red-700">
            <div className="text-2xl text-center text-gray-300 font-formula1-bold italic select-none">{result}</div>
        </div>}
    </div>);

}

export default ResultCard;