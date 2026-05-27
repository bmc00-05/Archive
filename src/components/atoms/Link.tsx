import { cn } from "@/lib/utils";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
}

export function Link({ href, external, className, children, ...rest }: LinkProps) {
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto:"));
  const externalProps = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};
  return (
    <a
      href={href}
      className={cn(
        "underline-offset-4 hover:underline text-foreground",
        className
      )}
      {...externalProps}
      {...rest}
    >
      {children}
    </a>
  );
}
