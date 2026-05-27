import { useState } from "react";
import { Github, Mail, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
}

interface Props {
  base: string;
  siteName: string;
  recentPosts: NavItem[];
  projects: NavItem[];
  author: { github: string; email: string };
}

export default function MobileSidebar({
  base,
  siteName,
  recentPosts,
  projects,
  author,
}: Props) {
  const [open, setOpen] = useState(false);
  const handleNav = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open menu">
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle>{siteName}</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 text-sm">
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
            Blog
          </p>
          <a
            href={base + "/"}
            onClick={handleNav}
            className="block py-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            전체 글
          </a>
          {recentPosts.length === 0 && (
            <p className="text-xs text-muted-foreground italic py-1">
              아직 글이 없습니다.
            </p>
          )}
          {recentPosts.map((p) => (
            <a
              key={p.href}
              href={p.href}
              onClick={handleNav}
              className="block py-1 text-muted-foreground hover:text-foreground transition-colors truncate"
            >
              {p.title}
            </a>
          ))}
        </nav>

        <div className="my-6 h-px bg-border" />

        <div className="text-sm">
          <a
            href={base + "/portfolio"}
            onClick={handleNav}
            className="text-xs uppercase tracking-wider text-muted-foreground inline-flex items-center gap-1 hover:text-foreground transition-colors"
          >
            Portfolio <span aria-hidden>→</span>
          </a>
          <div className="mt-2 space-y-1">
            {projects.map((p) => (
              <a
                key={p.href}
                href={p.href}
                onClick={handleNav}
                className="block py-1 text-muted-foreground hover:text-foreground transition-colors truncate"
              >
                {p.title}
              </a>
            ))}
          </div>
        </div>

        <div className="my-6 h-px bg-border" />

        <div className="text-sm space-y-2">
          <a
            href={base + "/about"}
            onClick={handleNav}
            className="block text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={author.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-4" />
            </a>
            <a
              href={`mailto:${author.email}`}
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="size-4" />
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
