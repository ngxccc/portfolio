"use client";

import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const LoadingComponent = () => {
  const t = useTranslations("Common");
  return (
    <div className="my-8 flex h-125 w-full items-center justify-center rounded-xl border border-white/10 bg-gray-900/50 text-gray-500">
      {t("drawing")}
    </div>
  );
};

const MermaidWrapper = dynamic(() => import("./mermaid"), {
  ssr: false,
  loading: LoadingComponent,
});

export default MermaidWrapper;
