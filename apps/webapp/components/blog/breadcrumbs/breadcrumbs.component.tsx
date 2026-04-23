import Link from "next/link";

type Props = {
  items: { label: string; href: string | null }[];
};

export default function Breadcrumbs({ items }: Props) {
  return (
    <div className="breadcrumbs text-sm text-gray-500 my-2">
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
