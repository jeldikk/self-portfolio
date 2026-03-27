import CreateContactForm from "@/components/contact-me/create-contact-form.component";

export default function ContactMe() {
  return (
    <div className="min-h-screen md:max-w-10/12 mx-auto flex flex-col">
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-10">
        Contact Me
      </h1>
      <CreateContactForm />
    </div>
  );
}
