"use client";
// ----------------------------
// Imports
// ----------------------------
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";
import rehypeRaw from "rehype-raw";
import {CodeBlock} from "../CodeBlock";

// ----------------------------
// Custom markdown code starts here
// ----------------------------
const CustomMarkdown = ({content}: {content: string | undefined}) => {
  return (
    <ReactMarkdown
      children={content?.toString()}
      remarkPlugins={[remarkMath, remarkGfm]} // Enable LaTeX syntax in Markdown
      rehypePlugins={[rehypeMathjax, rehypeRaw]}
      components={{
        // ----------------------------
        // Code starts here
        // ----------------------------
        code: ({inline, className, children, ...props}: any) => {
          const match = /language-(\w+)/.exec(className || "");
          const language = match ? match[1] : "bash";
          return !inline && match ? (
            <div className="overflow-x-scroll max-w-full my-5">
              <CodeBlock language={language} value={String(children)} />
            </div>
          ) : (
            <code
              className="bg-dark-primary-text dark:bg-dark-button-blue px-2 py-1 rounded-md max-w-full"
              {...props}
            >
              {children}
            </code>
          );
        },
        // ----------------------------
        // Code ends here
        // ----------------------------
        strong: ({children}) => <strong className="font-semibold text-lg">{children}</strong>,
        h1: ({children}) => <h1 className="text-3xl font-bold my-5">{children}</h1>,
        h2: ({children}) => <h2 className="text-2xl font-bold my-5">{children}</h2>,
        h3: ({children}) => <h3 className="text-xl font-semibold my-5">{children}</h3>,
        p: ({children}) => (
          <>
            <p className="text-lg leading-relaxed my-5">{children}</p>
            <hr className="my-8 last:hidden h-[0.2px] border-light-light-white dark:border-slate-700" />
          </>
        ),
        blockquote: ({children}) => (
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-2">
            {children}
          </blockquote>
        ),
        ul: ({children}) => <ul className="list-disc">{children}</ul>,
        ol: ({children}) => <ol className="list-decimal pl-5">{children}</ol>,
        li: ({children}) => <li className="mb-2">{children}</li>,
        a: ({href, children}) => (
          <a
            href={href}
            className="text-blue-500 dark:text-dark-logo-primary underline hover:text-blue-700"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
        img: ({src, alt}) => <img src={src} alt={alt} className="max-w-full h-auto rounded-md" />,
        table: ({children}) => (
          <table className="w-full border-collapse my-4 text-left">{children}</table>
        ),
        th: ({children}) => (
          <th className="border px-4 py-2 bg-slate-100 dark:bg-dark-button-blue font-bold">
            {children}
          </th>
        ),
        td: ({children}) => <td className="border px-4 py-2">{children}</td>,
        em: ({children}) => <em className="font-bold">{children}</em>,
        sup: ({children}) => <sup className="font-bold">{children}</sup>,
        span: ({children, ...props}) => {
          return (
            <span className="text-lg my-2" {...props}>
              {children}
            </span>
          );
        },
      }}
    />
  );
};

export default CustomMarkdown;
