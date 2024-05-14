'use client'
import code from "@/public/code.png"

import Image from "next/image";

export default function Socials({  
    href, 
    sourcey }) {

  const Icon = sourcey;
  return (
    <a href = {href}><Icon/> </a> // wasn't rendering before
  );
}

