import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";


interface NotFoundProps {
    image: React.ReactNode
    title?: string;
    textButton: string;  
    firstText: string;
    href: string;
    secondText?: string;
    width?: number;
    height?: number;
}

export default function NotFoundComponent({
    image, 
    title, 
    textButton, 
    firstText, 
    secondText,
    width,
    height,
    href
}: NotFoundProps) {

    return (
        <div className="relative flex items-center justify-center pt-32">
            <div className="relative z-10 space-y-4 text-center text-lg">
                <div>
                    <h2 className="text-5xl opacity-90">{title}</h2>
                    <span>{firstText}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span>{secondText}</span>
                    <Button 
                        onClick={ () => window.location.href = href}
                        className="bg-blue-500 text-white"
                    >
                        {textButton}
                    </Button>
                </div>
            </div>
            <div className="absolute pt-10">
                <Image
                    src={`/imgs/${image}`}
                    alt="not found image"
                    width={width ?? 400}
                    height={height ?? 400}
                    className="opacity-50"
                />
            </div>
        </div>

    )

}