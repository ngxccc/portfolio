"use client";

import dynamic from "next/dynamic";

const MermaidWrapper = dynamic(() => import("./mermaid"), {
  ssr: false,
  loading: () => (
    <div className="my-8 flex h-125 w-full items-center justify-center rounded-xl border border-white/10 bg-gray-900/50 text-gray-500">
      Đang vẽ sơ đồ...
    </div>
  ),
});

export default MermaidWrapper;
