"use client";

import { cn } from "@/lib/utils";
import { Move, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import mermaid from "mermaid";
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

  useEffect(() => {
    const renderChart = async () => {
      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvgContent(svg);
        setIsRendered(true);
      } catch (error) {
        console.error("Mermaid error:", error);
      }
    };
    void renderChart();
  }, [chart]);

  return (
    <div
      className={cn(
        "relative my-8 h-fit w-full overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm",
        className,
      )}
    >
      {isRendered ? (
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
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
              <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2 rounded-lg border border-white/10 bg-gray-800/90 p-1.5 shadow-xl backdrop-blur">
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
        <div className="flex h-full w-full items-center justify-center text-gray-500">
          Đang tải biểu đồ...
        </div>
      )}
    </div>
  );
};
export default Mermaid;
