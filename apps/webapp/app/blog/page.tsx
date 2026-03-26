import BlogSummary from "@/components/blog/blog-summary.component";

const blogs = [
  {
    id: "favorite-stack",
    title: "Favorite Stack and Tools",
    description: "A list of my favorite technologies and tools.",
    link: "/blog/favorite-stack",
    date: "2026-03-26",
  },
];

export default function BlogMainPage() {
  return (
    <>
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-10">
        My Notes
      </h1>
      <div className="divider"></div>
      {blogs.map((blog) => (
        <BlogSummary
          key={blog.id}
          title={blog.title}
          description={blog.description}
          link={blog.link}
          date={blog.date}
        />
      ))}
    </>
  );
}
