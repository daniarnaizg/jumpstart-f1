import React from 'react';

const colors = {
    lightOn: '#FF0000',
    lightOff: '#15151e'
};

const lightColors = {
    on: [colors.lightOff, colors.lightOff, colors.lightOn, colors.lightOn],
    off: [colors.lightOff, colors.lightOff, colors.lightOff, colors.lightOff]
};

const Light = ({color}) => (
    <div style={{backgroundColor: color}}
         className="w-10 md:w-15 lg:w-16 h-10 md:h-15 lg:h-16 rounded-full m-1"></div>
);

const TrafficLight = ({isOn}) => {
    const colors = isOn ? lightColors.on : lightColors.off;

    return (<div className="flex flex-col items-center justify-center px-1 py-2 bg-gray-950 rounded-xl">
        {colors.map((color, index) => (<Light key={index} color={color}/>))}
    </div>);
};

export default TrafficLight;