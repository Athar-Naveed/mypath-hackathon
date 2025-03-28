"use client";
import {useState} from "react";
import {Copy, Check} from "lucide-react";
import {Tooltip} from "@mui/material";
const CopyButton = ({selection, color = undefined}: {selection: string; color?: string}) => {
  const [copied, setCopied] = useState<boolean>(false);
  // -----------------------
  // Copy Message
  // -----------------------
  const handleCopyMessage = async (text: string) => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <>
      {/* 
            // ---------------------------
            // Copy to clipboard
            // ---------------------------
            */}
      {!copied ? (
        <Tooltip arrow={true} title={"Copy"} placement="bottom">
          <button onClick={() => handleCopyMessage(selection)}>
            <Copy
              className={`size-4 ${color == undefined ? "text-dark-custom-dark-blue dark:text-white" : "text-white"}`}
            />
          </button>
        </Tooltip>
      ) : (
        <Check
          className={`size-4 ${color == undefined ? "text-dark-custom-dark-blue dark:text-white" : "text-white"}`}
        />
      )}
    </>
  );
};

export default CopyButton;
