export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center">
        Welcome to My Portfolio web page
      </h1>
      <p className="text-lg text-center max-w-2xl">
        This Page is under construction
      </p>
      <footer className="text-sm text-center text-gray-500">
        &copy; {new Date().getFullYear()} Kamal. All rights reserved.
      </footer>
    </div>
  );
}
