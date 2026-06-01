import tanstack from "@/assets/icons/tanstack.svg?raw";
import shadcn from "@/assets/icons/shadcn-ui.svg?raw";
import { cn } from "@/lib/utils";

/**
 * svgl 등에서 받아둔 로컬 SVG를 인라인 렌더.
 * react-icons에 없는 신규 라이브러리 보강용.
 */
const REGISTRY: Record<string, string> = {
  tanstack,
  shadcn,
};

interface Props {
  name: keyof typeof REGISTRY | string;
  className?: string;
}

export function BrandIcon({ name, className }: Props) {
  const svg = REGISTRY[name];
  if (!svg) return null;
  return (
    <span
      className={cn("inline-flex [&_svg]:size-full", className)}
      dangerouslySetInnerHTML={{ __html: svg }}
      aria-hidden="true"
    />
  );
}
