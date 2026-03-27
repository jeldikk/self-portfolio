"use client";
import { startTransition, useActionState } from "react";
import {
  createContactMeAction,
  CreateFormState,
} from "@/actions/contact-me.actions";

const initialState: CreateFormState = {
  success: false,
  message: "",
  errors: null,
};

export default function CreateContactForm() {
  const [state, formAction, isPending] = useActionState(
    createContactMeAction,
    initialState,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit} className="create-contact-form p-4">
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">
          How you would like to be called
        </legend>
        <input
          id="name"
          name="name"
          type="text"
          className="input w-[stretch]"
          placeholder="Your Name"
        />
        <p className="label text-wrap">
          I will use this name to address you in my response. You can also leave
          it blank if you prefer to stay anonymous.
        </p>
      </fieldset>
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">Your Email Address</legend>
        <input
          id="email"
          name="email"
          type="email"
          className="input w-[stretch]"
          placeholder="Your Email"
        />
        <p className="label text-wrap">
          I will acknowledge your mail. I promise to keep it private and not
          share it with anyone else.
        </p>
      </fieldset>
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">Your Message</legend>
        <textarea
          id="message"
          name="message"
          className="textarea w-[stretch]"
          rows={10}
          placeholder="Write your message here..."
        ></textarea>
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">
          Do you want an acknowledgement?
        </legend>
        <label className="label">
          <input name="acknowledge" type="checkbox" className="checkbox" />
          Yes, please send me an acknowledgement email.
        </label>
      </fieldset>
      <div className="button-controls flex flex-col gap-2 my-4">
        <button type="submit" className="btn btn-primary">
          {isPending && <span className="loading loading-spinner"></span>}
          Send Message
        </button>
        <button type="reset" className="btn btn-secondary">
          Clear
        </button>
      </div>
    </form>
  );
}
