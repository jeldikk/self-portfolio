"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export default function ActiveTabLink(props: Props) {
  const { href, className, children } = props;
  const pathName = usePathname();
  console.log({ pathName });

  return (
    <Link
      href={href}
      className={`${className} ${pathName === href ? "tab-active" : ""}`}
    >
      {children}
    </Link>
  );
}
