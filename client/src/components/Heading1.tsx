import React from "react";

interface HeadingProps {
    text: string | undefined
}

export const Heading1: React.FC<HeadingProps> = ({text}) => {
    return <h1 className="arimo text-2xl font-bold text-primary-text">
        {text}
    </h1>
}