import Link from "next/link";

interface Props {
  title: string;
  description: string;
  link: string;
  date: string;
}

export default function BlogSummary(props: Props) {
  const { title, description, link, date } = props;

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-500 text-sm">{date}</p>
      <Link
        href={link}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Read more
      </Link>
    </div>
  );
}
