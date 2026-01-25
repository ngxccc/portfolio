/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

const components = {
  h1: (props: any) => (
    <h1 className="mt-8 mb-4 text-3xl font-bold text-white" {...props} />
  ),
  p: (props: any) => <p className="mb-4 leading-7 text-gray-300" {...props} />,
  a: (props: any) => {
    // Tự động detect link nội bộ để dùng Next Link
    const isInternal =
      props.href && (props.href.startsWith("/") ?? props.href.startsWith("#"));
    if (isInternal) {
      return <Link className="text-cyan-400 hover:underline" {...props} />;
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
  img: (props: any) => (
    <div className="relative my-8 h-64 w-full overflow-hidden rounded-lg border border-white/10">
      <Image
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 800px"
        alt={props.alt ?? "Blog Image"}
        src={props.src}
      />
    </div>
  ),
};

export const MDXContent = ({ source }: { source: string }) => {
  return (
    <MDXRemote
      source={source}
      components={components}
      // options={{
      //   mdxOptions: {
      //     rehypePlugins: [], // config highlight code sau
      //   },
      // }}
    />
  );
};
