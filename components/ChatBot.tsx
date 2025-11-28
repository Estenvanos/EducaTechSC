"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeOff, X } from "lucide-react";
import { getChatMessage, speak } from "@/utils";
import { MessageProps, Module, OptionBase } from "@/types";
import { ChatOption } from "./ChatOption";
import { ChatLinkOption } from "./ChatLinkOption";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modules: Module[];
}

const ChatBot = ({ open, setOpen, modules }: Props) => {
  const [muted, setMuted] = useState(true);
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState<MessageProps | null>(null);
  const [moduleId, setModuleId] = useState("");

  useEffect(() => {
    getChatMessage(index, modules, moduleId).then(setMessage);
  }, [index, modules, moduleId]);

  useEffect(() => {
    if (muted) {
      window.speechSynthesis.cancel();
      return;
    }

    const speakMessage = async () => {
      if (!muted && message?.main) {
        await speak(message.main);

        if (message.options) {
          const optionsArray: OptionBase[] = Array.isArray(message.options)
            ? message.options
            : Object.values(message.options ?? {});

          for (const option of optionsArray) {
            const label = option.label || option.info;
            if (label) {
              await speak(label);
            }
          }
        }
      }
    };

    speakMessage();
  }, [message, muted]);

  const renderOptions = () => {
    if (!message?.options) return null;

    if (!Array.isArray(message.options)) {
      return Object.entries(message.options).map(([key, opt]) => (
        <ChatOption
          key={key}
          label={opt.info}
          onClick={() => setIndex(opt.index!)}
        />
      ));
    }

    if (index === 1) {
      return message.options
        .filter(
          (opt): opt is { label: string; moduleId: string; index: number } =>
            "moduleId" in opt
        )
        .map((opt) => (
          <ChatOption
            key={opt.moduleId}
            label={opt.label}
            onClick={() => {
              setModuleId(opt.moduleId);
              setIndex(opt.index);
            }}
          />
        ));
    }

    if (index === 3) {
      return message.options
        .filter(
          (opt): opt is { label: string; lessonId: string } => "lessonId" in opt
        )
        .map((opt, index) => (
          <ChatLinkOption
            key={index}
            label={opt.label}
            href={`/lesson/${opt.lessonId}`}
          />
        ));
    }

    return null;
  };

  return (
    <div
      className={`
        ${open ? "fixed" : "hidden"} 
        bottom-4 left-1/2 -translate-x-1/2
        lg:left-auto lg:right-4 lg:translate-x-0
        md:right-4 md:left-auto md:translate-x-0
        w-5/6 lg:w-1/3 md:w-2/3 h-6/7 bg-white
        border-4 border-blue-800 rounded-xl shadow-xl z-50
      `}
    >
      <div className="w-full h-1/9 bg-blue-800  flex items-center justify-end px-7">
        <button
          onClick={() => {
            setOpen(false);
            setMuted(true);
          }}
          className="text-white cursor-pointer"
        >
          <X size={40} />
        </button>
      </div>

      <div className="w-full h-4/5 p-5 overflow-y-auto no-scrollbar gap-3 flex flex-col">
        <div className="w-5/6 py-3 px-2 font-bold bg-blue-500 rounded-lg text-2xl text-white">
          {message?.main}
        </div>

        <div className="flex flex-col gap-2 pl-3">{renderOptions()}</div>
      </div>

      <div className="w-full h-1/10 border-t-4 border-blue-800 fixed bottom-0 flex items-center justify-end ">
        <div className="p-3 border-2 cursor-pointer text-gray-600 border-gray-600 rounded-full flex items-center mr-7">
          {muted ? (
            <VolumeOff size={20} onClick={() => setMuted(false)} />
          ) : (
            <Volume2 size={20} onClick={() => setMuted(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
