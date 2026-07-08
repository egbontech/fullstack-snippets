"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownRendererProps {
  children: string;
}

export default function MarkdownRenderer({
  children,
}: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;

          const match = /language-(\w+)/.exec(
            className || ""
          );

          if (!match) {
            return (
              <code className="rounded bg-background px-1.5 py-0.5 text-sm">
                {children}
              </code>
            );
          }

          return (
            <SyntaxHighlighter
              style={oneDark}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          );
        },

        h1: ({ children }) => (
          <h1 className="mb-4 text-3xl font-bold">
            {children}
          </h1>
        ),

        h2: ({ children }) => (
          <h2 className="mb-3 mt-6 text-2xl font-semibold">
            {children}
          </h2>
        ),

        h3: ({ children }) => (
          <h3 className="mb-2 mt-5 text-xl font-semibold">
            {children}
          </h3>
        ),

        p: ({ children }) => (
          <p className="mb-3 leading-7">
            {children}
          </p>
        ),

        ul: ({ children }) => (
          <ul className="mb-4 list-disc pl-6">
            {children}
          </ul>
        ),

        ol: ({ children }) => (
          <ol className="mb-4 list-decimal pl-6">
            {children}
          </ol>
        ),

        blockquote: ({ children }) => (
          <blockquote className="my-4 border-l-4 border-primary pl-4 italic">
            {children}
          </blockquote>
        ),

        table: ({ children }) => (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {children}
            </table>
          </div>
        ),

        th: ({ children }) => (
          <th className="border border-border px-3 py-2 text-left">
            {children}
          </th>
        ),

        td: ({ children }) => (
          <td className="border border-border px-3 py-2">
            {children}
          </td>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
