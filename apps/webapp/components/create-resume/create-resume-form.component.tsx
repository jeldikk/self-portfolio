"use client";
import { startTransition, useActionState, useId } from "react";
import {
  createResumeAction,
  type CreateFormState,
} from "@/actions/resume-builder.actions";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

const initialState: CreateFormState = {
  success: false,
  message: "",
  errors: null,
};

export default function CreateResumeForm() {
  const baseId = useId();
  const [state, formAction, isPending] = useActionState(
    createResumeAction,
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
    <div className="create-resume-form">
      {state.errors && (
        <div className="alert alert-error alert-outline m-4">
          <div>
            <ExclamationCircleIcon className="inline w-5 h-5 mr-2" />
            {state.message}
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-4">
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            How do you like to label the resume
          </legend>
          <input
            id={`${baseId}-name`}
            required
            name="name"
            type="text"
            className="input w-[stretch]"
            placeholder="How do you like to call"
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">
            Provide Job Description here
          </legend>
          <textarea
            id={`${baseId}-job-description`}
            required
            name="job-description"
            rows={10}
            placeholder="Paste the job description here"
            className="textarea h-36 w-[stretch]"
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Provide Company Name here</legend>
          <input
            id={`${baseId}-company-name`}
            required
            name="company-name"
            type="text"
            className="input w-[stretch]"
            placeholder="How do you like to call"
          />
        </fieldset>
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend">Select Template</legend>

          <label className="label cursor-pointer">
            <input
              type="radio"
              name="pdf-template-type"
              className="radio radio-primary"
              value="single_column"
              defaultChecked
            />
            <span className="label-text">Single Column</span>
          </label>
          <label className="label cursor-pointer">
            <input
              type="radio"
              name="pdf-template-type"
              className="radio radio-primary"
              value="two_column"
            />
            <span className="label-text">Two Column</span>
          </label>
        </fieldset>
        <div className="button-controls my-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending && <span className="loading loading-spinner"></span>}
            {isPending ? "Creating..." : "Create Resume"}
          </button>
        </div>
      </form>
    </div>
  );
}
