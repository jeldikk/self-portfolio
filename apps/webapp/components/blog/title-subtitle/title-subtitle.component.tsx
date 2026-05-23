type Props = Readonly<{
  title: string;
  subtitle: string;
}>;

export default function TitleAndSubtitle(props: Props) {
  return (
    <div className="mb-8">
      <h1 className="text-5xl font-bold mb-2">{props.title}</h1>
      <h2 className="text-3xl text-gray-600">{props.subtitle}</h2>
    </div>
  );
}
