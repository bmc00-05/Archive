import { getStackIcon } from "@/lib/stack-icons";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  className?: string;
  /** 브랜드 컬러 사용 여부 (기본 true) */
  brandColor?: boolean;
}

/**
 * 기술 스택 이름(string)을 받아 해당 react-icons SVG를 렌더링.
 * 매칭 실패 시 텍스트 fallback.
 */
export function StackIcon({ name, className, brandColor = true }: Props) {
  const entry = getStackIcon(name);
  if (!entry) {
    return (
      <span
        className={cn(
          "text-[10px] font-semibold uppercase tracking-tight text-muted-foreground",
          className
        )}
      >
        {name.slice(0, 4)}
      </span>
    );
  }
  const Icon = entry.icon;
  return (
    <Icon
      className={className}
      style={brandColor && entry.color ? { color: entry.color } : undefined}
      aria-label={entry.label}
      role="img"
    />
  );
}
