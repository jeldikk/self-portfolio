export default function ContactMe() {
  return (
    <div className="min-h-screen md:max-w-10/12 mx-auto flex flex-col">
      <div role="alert" className="alert alert-warning m-2">
        <span>This Page is still under construction</span>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-center mt-10">
        Contact Me
      </h1>
      <form className="p-4">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            How you would like to be called
          </legend>
          <input
            id="name"
            type="text"
            className="input w-[stretch]"
            placeholder="Your Name"
          />
          <p className="label text-wrap">
            I will use this name to address you in my response. You can also
            leave it blank if you prefer to stay anonymous.
          </p>
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Your Email Address</legend>
          <input
            id="email"
            type="email"
            className="input w-[stretch]"
            placeholder="Your Email"
          />
          <p className="label text-wrap">
            I will acknowledge your email. I promise to keep it private and not
            share it with anyone else.
          </p>
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Your Message</legend>
          <textarea
            id="message"
            className="textarea w-[stretch]"
            rows={10}
            placeholder="Write your message here..."
          ></textarea>
        </fieldset>
        <button type="submit" className="btn btn-primary mt-4">
          Send Message
        </button>
      </form>
    </div>
  );
}
