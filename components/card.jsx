'use client'
import code from "@/public/code.png"


import Image from "next/image";

export default function Card({ 
    title, 
    description, 
    children }) {
  return (
    <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white">
      <div className="flex items-center justify-center">

        <Image className="w-full" src={code}/>
      </div>
      <h3 className="text-lg font-medium pt-8 pb-2">{title}</h3>
      <p className="py-2">{description}</p>
      {children}
    </div>
  );
}

