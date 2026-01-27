"use client";

import { useState, useRef, ComponentProps } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreProps extends ComponentProps<"pre"> {
  "data-language"?: string; // Nhận language từ rehype
}

const Pre = ({
  children,
  className,
  "data-language": lang,
  ...props
}: PreProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    if (!preRef.current) return;

    const text = preRef.current?.textContent ?? "";

    void navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="group bg-glass relative my-4 overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
        <span className="text-xs font-medium tracking-wider text-gray-400 uppercase">
          {lang ?? "TEXT"}
        </span>

        <button
          aria-label="Copy code"
          type="button"
          className={cn(
            "absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-white/5 text-gray-400 backdrop-blur transition-all hover:bg-white/10 hover:text-white",
            "opacity-100 lg:opacity-0 lg:group-hover:opacity-100",
          )}
          onClick={onCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="relative">
        <pre
          ref={preRef}
          className={cn(
            "overflow-x-auto p-4 font-mono text-sm leading-relaxed",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </div>
    </div>
  );
};

export default Pre;
