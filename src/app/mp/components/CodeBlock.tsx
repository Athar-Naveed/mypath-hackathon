import type React from "react";
import {forwardRef, useState} from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {ClipboardIcon, CheckIcon} from "lucide-react";
import rehypePrism from "rehype-prism-plus";
import rehypeRewrite from "rehype-rewrite";

export interface CodeBlockProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  language?: string;
  darkMode?: boolean;
}

const CodeBlock = forwardRef<HTMLTextAreaElement, CodeBlockProps>(
  ({className, language = "plaintext", ...props}, ref) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = () => {
      if (props.value) {
        navigator.clipboard.writeText(props.value.toString()).then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        });
      }
    };

    return (
      <div
        className={`relative rounded-lg border overflow-hidden dark:!bg-dark-custom-dark-blue dark:border-gray-700 bg-[#ececec] border-gray-300`}
      >
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {language.toUpperCase()}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            {isCopied ? <CheckIcon className="w-5 h-5" /> : <ClipboardIcon className="w-5 h-5" />}
            <span>{isCopied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
        <div className="p-4">
          <CodeEditor
            aria-disabled={true}
            disabled={true}
            value={props.value}
            language={language}
            padding={0}
            rehypePlugins={[[rehypePrism, {ignoreMissing: true, showLineNumbers: true}]]}
            className={`w-full !leading-relaxed !text-sm dark:!bg-dark-custom-dark-blue !bg-transparent`}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  },
);

CodeBlock.displayName = "CodeBlock";

export {CodeBlock};
