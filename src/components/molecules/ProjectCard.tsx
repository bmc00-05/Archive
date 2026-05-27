import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  href: string;
  title: string;
  summary: string;
  period: string;
  role: string;
  stack: readonly string[];
}

export function ProjectCard({
  href,
  title,
  summary,
  period,
  role,
  stack,
}: ProjectCardProps) {
  return (
    <a href={href} className="group block">
      <Card className="p-6 transition-colors hover:bg-accent/30 h-full flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-base tracking-tight">{title}</h3>
          <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0 mt-1" />
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{summary}</p>
        <div className="text-xs text-muted-foreground space-x-3 mt-auto">
          <span>{period}</span>
          <span>·</span>
          <span>{role}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {stack.slice(0, 5).map((s) => (
            <Badge key={s} variant="outline" className="font-normal text-xs">
              {s}
            </Badge>
          ))}
          {stack.length > 5 && (
            <Badge variant="outline" className="font-normal text-xs">
              +{stack.length - 5}
            </Badge>
          )}
        </div>
      </Card>
    </a>
  );
}
