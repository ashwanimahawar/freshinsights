import React from "react";

interface Props {
    text :string
    onClick?: () => void;
    style?: React.CSSProperties;
}

export const DashMenuItems: React.FC<Props> = ({text, onClick, style}) => {

    return <div onClick={onClick} className="my-1 w-full px-2 hover:bg-border rounded-lg hover:underline cursor-pointer">
        <p style={style} className="px-4 py-[5px] text-md text-secondary-text">{text}</p>
    </div>
}