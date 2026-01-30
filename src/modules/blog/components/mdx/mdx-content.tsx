import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Pre from "./pre";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import MermaidWrapper from "./mermaid-wrapper";

interface VisitLineNode {
  children: { type: string; value: string }[];
}

interface CodeNode {
  type: string;
  lang?: string;
  value: string;
  name?: string;
  attributes?: { type: string; name: string; value: string }[];
}

const prettyCodeOptions = {
  theme: "dracula",
  keepBackground: false,
  onVisitLine(node: VisitLineNode) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
};

const remarkMermaid = () => {
  return (tree: any) => {
    visit(tree, "code", (node: CodeNode) => {
      if (node.lang === "mermaid") {
        node.type = "mdxJsxFlowElement";
        node.name = "Mermaid"; // Tên component mapping
        node.attributes = [
          { type: "mdxJsxAttribute", name: "chart", value: node.value },
        ];
      }
    });
  };
};

const components = {
  h1: (props: any) => (
    <h1
      className="mt-10 mb-4 scroll-mt-24 text-3xl font-bold text-white"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="mt-8 mb-4 scroll-mt-24 border-b border-white/10 pb-2 text-2xl font-bold text-white"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h3
      className="mt-6 mb-4 scroll-mt-24 text-xl font-bold text-white"
      {...props}
    />
  ),
  p: (props: any) => <p className="mb-4 leading-7 text-gray-300" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    // Tự động detect link nội bộ để dùng Next Link
    const isInternal =
      typeof props.href === "string" &&
      (props.href.startsWith("/") || props.href.startsWith("#"));

    if (isInternal && props.href) {
      return (
        <Link
          href={props.href}
          className="text-xl text-cyan-400 hover:underline"
          {...props}
        />
      );
    }

    return (
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:underline"
        {...props}
      />
    );
  },
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    const src = typeof props.src === "string" ? props.src : "";
    return (
      <div className="relative my-8 h-64 w-full overflow-hidden rounded-lg border border-white/10">
        <Image
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          alt={props.alt ?? "Blog Image"}
          src={src}
        />
      </div>
    );
  },
  pre: Pre,
  Mermaid: MermaidWrapper,
  code: (props: any) => (
    <code className="bg-transparent p-0 text-inherit" {...props} />
  ),
  table: (props: any) => (
    <div className="my-4 w-full overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-2">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  thead: (props: any) => (
    <thead
      className="border-b border-white/10 bg-white/5 text-gray-200"
      {...props}
    />
  ),
  tbody: (props: any) => (
    <tbody className="divide-y divide-white/5" {...props} />
  ),
  tr: (props: any) => (
    <tr className="transition-colors hover:bg-white/5" {...props} />
  ),
  th: (props: any) => (
    <th className="px-4 py-3 font-semibold text-white" {...props} />
  ),
  td: (props: any) => <td className="px-4 py-3 text-gray-300" {...props} />,
};

export const MDXContent = ({ source }: { source: string }) => {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm, remarkMermaid, remarkMath],
          rehypePlugins: [
            rehypeSlug,
            [rehypeAutolinkHeadings, { behavior: "wrap" }],
            rehypeKatex,
            [rehypePrettyCode, prettyCodeOptions],
          ],
        },
      }}
    />
  );
};
