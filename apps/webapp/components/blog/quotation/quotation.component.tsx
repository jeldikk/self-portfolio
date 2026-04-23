type Props = Readonly<{
  quote: string;
  author: string;
}>;

export default function BlogQuotation(props: Props) {
  return (
    <blockquote className="border-l-4 border-gray-300 p-4 italic text-gray-600 my-8">
      <p className="text-2xl">{props.quote}</p>
      <footer className="mt-2 text-sm text-gray-500 text-right">
        — {props.author}
      </footer>
    </blockquote>
  );
}
