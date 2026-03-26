import type { MDXComponents } from "mdx/types";
import Link from "next/link";

const components: MDXComponents = {
  h1: (props) => <h1 className="text-5xl font-bold my-4" {...props} />,
  h2: (props) => <h2 className="text-4xl font-bold my-3" {...props} />,
  h3: (props) => <h3 className="text-3xl font-bold my-2" {...props} />,
  h4: (props) => <h4 className="text-2xl font-bold my-1" {...props} />,
  p: (props) => <p className="text-lg my-4" {...props} />,
  a: (props) => <Link className="text-blue-500 hover:underline" {...props} />,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
