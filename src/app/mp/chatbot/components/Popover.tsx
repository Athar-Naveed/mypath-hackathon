"use client";
import {useState} from "react";
import {meaningFetcher} from "../../mpHandler/chatbotChatHandler";
import {Tooltip} from "@mui/material";
import {BookA} from "lucide-react";
import CustomMarkdown from "../../components/global/ReactMarkdown";
import CopyButton from "../../components/CopyButton";
// -----------------------
// Displaying tooltip and popover for fetching the meaning of the word
// -----------------------
const renderPopover = ({selection}: {selection: string}) => {
  const [meaning, setMeaning] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  // -----------------------
  // Fetching meaning of the word
  // -----------------------
  const handleMeaningFetch = async () => {
    if (meaning) {
      setMeaning("");
    }
    try {
      setLoading(true);
      const resp = await meaningFetcher(selection.trim());
      setMeaning(resp.message);
    } catch (error: any) {
      setMeaning(error);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------
  // Count the number of words in the selection
  // -----------------------
  const wordCount = selection.trim().split(/\s+/).length;
  // -----------------------
  // Render the popover if the selection is within the limit
  // -----------------------
  return (
    <>
      <div
        className={`bg-dark-button-blue rounded-lg px-4 py-2 shadow-lg select-none text-light-light-white grid ${meaning ? "ml-56 sm:ml-80" : "ml-20 sm:ml-40"} `}
      >
        <div className="flex justify-start items-center gap-2">
          {/* 
            // ---------------------------
            // Get Meaning
            // ---------------------------
            */}
          <Tooltip
            className={`${wordCount > 3 && "cursor-not-allowed text-red-500"}`}
            arrow={true}
            title={
              wordCount > 3
                ? "You can't select more than 3 words!"
                : `Get Meaning: ${selection.trim()}`
            }
            placement="bottom"
          >
            <button disabled={wordCount > 3 && true} onClick={handleMeaningFetch}>
              <BookA className="size-4 lg:size-5" color="white" />
            </button>
          </Tooltip>
          <CopyButton color="white" selection={selection} />
        </div>
        {/* 
// ------------------------
// Displaying meaning here
// ------------------------
*/}
        <div className="max-w-[250px] max-h-[150px] sm:max-w-[300px] overflow-y-scroll">
          {meaning && <CustomMarkdown content={meaning} />}
          {loading && (
            <div className="spinner-border text-light-light-white" role="status">
              <span className="visually-hidden">Fetching...</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default renderPopover;
