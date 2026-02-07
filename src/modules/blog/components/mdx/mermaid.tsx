"use client";

import { cn } from "@/shared/lib/utils";
import { Move, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import mermaid from "mermaid";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "inherit",
});

interface MermaidProps {
  chart: string;
  className?: string;
}

const Mermaid = ({ chart, className }: MermaidProps) => {
  const [svgContent, setSvgContent] = useState<string>("");
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState(false);
  const t = useTranslations("Common");

  useEffect(() => {
    const initAndRender = async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          fontFamily: "inherit",
        });

        const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);

        setSvgContent(svg);
        setIsRendered(true);
      } catch (error) {
        console.error("Mermaid failed to load or render:", error);
        setError(true);
      }
    };

    if (chart) {
      void initAndRender();
    }
  }, [chart]);

  if (error) return <div className="text-red-500">{t("mermaind_error")}</div>;

  return (
    <div
      className={cn(
        "relative my-8 h-fit w-full overflow-hidden rounded-xl border border-white/10 bg-white/5",
        className,
      )}
    >
      {isRendered ? (
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={5}
          centerOnInit={true}
          wheel={{ step: 0.4 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Vùng hiển thị nội dung (Pan/Zoom Area) */}
              <TransformComponent
                wrapperClass="!w-full !min-h-[200] cursor-grab active:cursor-grabbing pb-20"
                contentClass="!w-full !h-full flex items-center justify-center"
              >
                <div
                  // ép SVG của Mermaid full size để dễ zoom
                  className="[&>svg]:h-auto! [&>svg]:max-w-none!"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              </TransformComponent>

              {/* Thanh công cụ (Toolbar) */}
              <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2 rounded-lg border border-white/10 bg-gray-200/10 p-1.5 shadow-xl backdrop-blur">
                <button
                  onClick={() => zoomIn()}
                  className="rounded p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  title="Zoom In"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>

                <button
                  onClick={() => zoomOut()}
                  className="rounded p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  title="Zoom Out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>

                <button
                  onClick={() => resetTransform()}
                  className="rounded p-1.5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  title="Reset View"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>

                <div className="my-0.5 h-px w-full bg-white/10" />

                <div
                  className="flex items-center justify-center p-1.5 text-gray-500"
                  title="Pan Mode Active"
                >
                  <Move className="h-4 w-4" />
                </div>
              </div>
            </>
          )}
        </TransformWrapper>
      ) : (
        <div className="flex h-75 w-full animate-pulse flex-col items-center justify-center gap-2">
          <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-white" />
          <p className="text-sm text-gray-500">{t("drawing")}</p>
        </div>
      )}
    </div>
  );
};
export default Mermaid;
