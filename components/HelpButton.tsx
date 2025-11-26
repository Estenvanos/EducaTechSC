"use client"

import { useState } from "react";
import ChatBot from "./ChatBot";
import { Module } from "@/types";

interface Props {
  modules: Module[];
}

const HelpButton = ({ modules } : Props) => {
    const [open, setOpen] = useState(false)

  return (
    <>
    <button 
    onClick={() => setOpen(true)}
    className="w-full py-3 rounded-lg cursor-pointer transition-all duration-300 items-center justify-center flex bg-blue-800 ">
      <p className="font-bold text-xl text-white">
        Precisa de ajuda ?
      </p>
    </button>
    <ChatBot open={open} setOpen={setOpen} modules={modules}/>
      </>
  );
};

export default HelpButton;
