import React from 'react'

interface CircularProgressProps {
    width: number
    percentage: number
    max: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({ width, percentage, max }) => {
    const radius = width / 2
    const circumference = radius * Math.PI * 2;
    const offset = (percentage / 99) * circumference;
    return (
        <div className='relative flex justify-center items-center'>
            <div
                className={`absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center`}
                style={{ fontSize: (width / 2) - 2 }}>
                {max - percentage}
            </div>
            <svg className='rounded-[50%]'
                width={width}
                height={width}
                viewBox={`0 0 ${width} ${width}`}>

                <circle
                    cx={width / 2}
                    cy={width / 2}
                    r={width / 2}
                    strokeWidth="8px"
                    className="fill-none stroke-white dark:stroke-Dark200" />

                <circle
                    className="fill-none  stroke-secondary"
                    style={{

                        strokeDasharray: circumference,
                        strokeDashoffset: offset
                    }}
                    cx={width / 2}
                    cy={width / 2}
                    r={width / 2}
                    strokeWidth="8px"
                    transform={`rotate(-90 ${width / 2} ${width / 2})`}
                />
            </svg>

        </div>
    )
}

export default CircularProgress