"use client";

import {useState} from "react";
import {meaningFetcher} from "../../mpHandler/chatbotChatHandler";
import {Tooltip} from "@mui/material";
import {BookOpen, Copy, Check, X, Loader2} from "lucide-react";
import CustomMarkdown from "../../components/global/ReactMarkdown";

interface RenderPopoverProps {
  selection: string;
  onClose?: () => void;
}

const WordMeaningPopover = ({selection, onClose}: RenderPopoverProps) => {
  const [meaning, setMeaning] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Count the number of words in the selection
  const wordCount = selection.trim().split(/\s+/).length;
  const isSelectionValid = wordCount <= 3;

  // Fetching meaning of the word
  const handleMeaningFetch = async () => {
    if (!isSelectionValid) return;

    if (meaning) {
      setMeaning(undefined);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const resp = await meaningFetcher(selection.trim());
      setMeaning(resp.message);
    } catch (error: any) {
      setError(typeof error === "string" ? error : "Failed to fetch meaning");
    } finally {
      setLoading(false);
    }
  };

  // Handle copy functionality
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selection.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative z-50">
      <div className="absolute top-0 left-0 transform -translate-y-full -translate-x-1/2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden w-64">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-1.5">
              <BookOpen className="h-3.5 w-3.5 text-blue-500 dark:text-blue-400" />
              <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                {selection.length > 25 ? `${selection.substring(0, 25)}...` : selection}
              </h3>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Content */}
          <div className="px-3 py-2">
            {/* Action buttons */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-1.5">
                <Tooltip
                  arrow
                  title={
                    !isSelectionValid
                      ? "You can't select more than 3 words!"
                      : meaning
                        ? "Hide meaning"
                        : `Get meaning`
                  }
                >
                  <span>
                    <button
                      disabled={!isSelectionValid}
                      onClick={handleMeaningFetch}
                      className={`
                        p-1.5 rounded-md transition-colors
                        ${
                          meaning
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }
                        ${!isSelectionValid && "opacity-50 cursor-not-allowed"}
                      `}
                      aria-label={meaning ? "Hide meaning" : "Get meaning"}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                    </button>
                  </span>
                </Tooltip>

                <Tooltip arrow title={copied ? "Copied!" : "Copy text"}>
                  <button
                    onClick={handleCopy}
                    className={`
                      p-1.5 rounded-md transition-colors
                      ${
                        copied
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                      }
                    `}
                    aria-label={copied ? "Copied" : "Copy text"}
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </Tooltip>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400">
                {wordCount} {wordCount === 1 ? "word" : "words"}
              </div>
            </div>

            {/* Word meaning content */}
            {loading ? (
              <div className="flex items-center justify-center py-3">
                <Loader2 className="h-4 w-4 text-blue-500 dark:text-blue-400 animate-spin mr-2" />
                <p className="text-xs text-gray-600 dark:text-gray-400">Loading...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded p-2 text-center">
                <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
              </div>
            ) : meaning ? (
              <div className="max-h-[150px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 bg-gray-50 dark:bg-gray-700/50 rounded p-2">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <CustomMarkdown content={meaning} />
                </div>
              </div>
            ) : (
              <div className="py-1 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {isSelectionValid
                    ? "Click the book icon to get the meaning"
                    : "Please select 3 words or fewer to fetch meaning"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Pointer */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white dark:border-t-gray-800"></div>
      </div>
    </div>
  );
};

export default WordMeaningPopover;
