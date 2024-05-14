'use client'
import code from "@/public/code.png"


import Image from "next/image";

export default function ActivitiesCard({ description, sourcey }) {
    return (
        <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white">
            <h3>{description}</h3>

          
                <div className="w-full flex items-center justify-center">
                <Image src={sourcey} height={200} width={200}/>
                </div>
         
        </div>
    
    );
}