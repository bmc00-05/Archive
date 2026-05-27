import { cn } from "@/lib/utils";

type Frame = "default" | "bordered" | "polaroid" | "browser" | "terminal" | "phone";

interface FigureProps {
  src: string;
  alt?: string;
  caption?: string;
  frame?: Frame;
  className?: string;
}

export function Figure({
  src,
  alt,
  caption,
  frame = "default",
  className,
}: FigureProps) {
  return (
    <figure className={cn("my-8", className)}>
      <FrameWrapper frame={frame}>
        <img
          src={src}
          alt={alt ?? caption ?? ""}
          loading="lazy"
          className={cn(
            "block w-full h-auto",
            frame === "polaroid" || frame === "browser" || frame === "terminal"
              ? ""
              : "rounded-md"
          )}
        />
      </FrameWrapper>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function FrameWrapper({ frame, children }: { frame: Frame; children: React.ReactNode }) {
  switch (frame) {
    case "bordered":
      return (
        <div className="rounded-lg border-2 border-border bg-card p-1 shadow-sm">
          {children}
        </div>
      );

    case "polaroid":
      return (
        <div className="mx-auto max-w-xl rotate-[-0.5deg] bg-white p-3 pb-10 shadow-md dark:bg-neutral-100">
          {children}
        </div>
      );

    case "browser":
      return (
        <div className="overflow-hidden rounded-lg border bg-card shadow-sm">
          <div className="flex items-center gap-1.5 border-b bg-muted/40 px-3 py-2">
            <span className="size-2.5 rounded-full bg-red-400" />
            <span className="size-2.5 rounded-full bg-yellow-400" />
            <span className="size-2.5 rounded-full bg-green-400" />
            <div className="mx-auto h-5 w-2/3 max-w-md rounded-sm bg-background/70" />
          </div>
          {children}
        </div>
      );

    case "terminal":
      return (
        <div className="overflow-hidden rounded-lg border bg-neutral-950 text-neutral-100 shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-neutral-800 px-3 py-2">
            <span className="size-2.5 rounded-full bg-red-500/80" />
            <span className="size-2.5 rounded-full bg-yellow-500/80" />
            <span className="size-2.5 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-[10px] text-neutral-500">~/Archive</span>
          </div>
          {children}
        </div>
      );

    case "phone":
      return (
        <div className="mx-auto max-w-[320px] overflow-hidden rounded-[2rem] border-[10px] border-neutral-900 bg-neutral-900 shadow-lg dark:border-neutral-800">
          <div className="overflow-hidden rounded-[1.25rem]">{children}</div>
        </div>
      );

    case "default":
    default:
      return (
        <div className="overflow-hidden rounded-md border bg-card">{children}</div>
      );
  }
}
