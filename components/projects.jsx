import React, { Suspense, useState } from 'react';
import Showcase from './showcase.jsx';
import Image from "next/image";
import code from "@/public/code.png"


export default function Project({ 
    title, 
    description,
    children }) {

      const [project, showProject] = useState(false);
      const base = "text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white"
  return (
    <div className={project ? base+" col-span-full" :base+" col-span-auto"}>
      <div className="inline-block">
        
        {!project && <Image src={code} width={100} height={100} />}
        
      </div>
      <h3 className="text-lg font-medium pt-8 pb-2">{title}</h3>
      <p className="py-2">{description}</p>
      
      <div className="w-full flex items-center justify-center">
      {project && children}
      </div>
      <button onClick={() => showProject(!project)} className= " text-center dark:text-white text-gb px-4 py-1 rounded-md h-8  justify-self-center btn bg-gray-300 p-1">{project ? "Hide" :  "Show"}</button>

    </div>
  );
}

