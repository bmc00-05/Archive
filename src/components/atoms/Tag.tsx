import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export function Tag({ children, href, className }: TagProps) {
  const badge = (
    <Badge variant="outline" className={cn("font-normal", className)}>
      {children}
    </Badge>
  );
  if (!href) return badge;
  return (
    <a href={href} className="hover:opacity-80 transition-opacity">
      {badge}
    </a>
  );
}
