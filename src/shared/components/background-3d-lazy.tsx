"use client";

import dynamic from "next/dynamic";

const Background3D = dynamic(() => import("./background-3d"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-black" />,
});

export default function Background3DLazy() {
  return <Background3D />;
}
