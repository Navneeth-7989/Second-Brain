import type { ReactElement } from "react";

interface ButtonInterface{
    title: String;
    size: "sm" | "md" | "lg";
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    vairant: "primary" | "secondary"
}


const sizeStyles = {
    "lg": "px-8 py-4 text-3xl rounded-lg",
    "md": "px-4 py-2 text-2xl rounded-md",
    "sm": "px-2 py-1 text-xl rounded-sm"
}
const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-purple-600"
}



export function Button(props: ButtonInterface){

    return <button className={`${sizeStyles[props.size]} ${variantStyles[props.vairant]}`}>
        <div className="flex gap-4 items-center">
         {props.startIcon}
         {props.title}
         {props.endIcon}
         </div>
         </button>

}