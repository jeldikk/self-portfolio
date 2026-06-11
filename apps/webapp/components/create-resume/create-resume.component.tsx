"use client";
import { startTransition, useActionState } from "react";
import {
  createResumeAction,
  CreateFormState,
} from "@/actions/resume-builder.actions";

const initialState: CreateFormState = {
  success: false,
  message: "",
  errors: null,
};

export default function CreateResumeForm() {
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
      <form onSubmit={handleSubmit} className="p-4">
        <input type="hidden" name="name" value="resume for testing" />
        <input
          type="hidden"
          name="job-description"
          value={`
            About the job
                About The Role

                Role Description: The Senior Full Stack Engineer will design, build, and deliver modern web applications that power Amgen’s next-generation digital platforms. This hands-on engineering role requires deep experience in modern UI frameworks (React, TypeScript, JavaScript) combined with strong backend development in Node.js and API design This role is part of our growing engineering presence in Hyderabad and will work closely with global teams across the globe.

                You will work in a fast-paced environment, collaborating with product, architecture, security, and DevOps teams to deliver high-quality digital solutions.

                Roles & Responsibilities

                Design and develop responsive, accessible, and performant web applications using React, Node.js, TypeScript, and JavaScript.
                Build and integrate RESTful and REST APIs that support modern, data-driven UIs.
                Collaborate with Product Managers, and Backend Engineers to translate business requirements into elegant, maintainable software solutions.
                Implement component-based UI architectures with reusable, testable React components following best practices.
                Familiarity with AWS services such as IAM, EC2, RDS, Lambda, API Gateway, DynamoDB, CloudFront, and S3, as well as managing cross account deployments.
                Develop server-side logic, database models, and APIs using Node.js, Express, OR other modern ORM frameworks (Sequelize, Prisma, etc.).
                Optimize applications for maximum speed, scalability, and reliability.
                Apply CI/CD, version control (Gitlab / GitHub actions), and cloud deployment best practices.
                Ensure high code quality through peer reviews, unit/integration testing, and continuous improvement.
                Work closely with security, architecture, and DevOps teams to align with Amgen’s engineering standards.
                Mentor junior engineers and contribute to a culture of technical excellence.

                Basic Qualifications

                Bachelor's degree in computer science, Software Engineering, or related field.
                8–12 years of full stack engineering experience with strong front-end expertise.

                Must-Have Skills

                Expert-level proficiency with React.js, TypeScript, JavaScript, and HTML5/CSS3.
                Strong backend development experience with Node.js, Express, or equivalent frameworks.
                Strong understanding of modern front-end build pipelines (Webpack, Vite, Babel).
                Experience designing and consuming RESTful APIs.
                Experience with cloud-based application deployment (AWS).
                Familiarity with relational and NoSQL databases (PostgreSQL, DynamoDB, etc.).
                Proficiency with managing projects with Git, GitLab, and automated testing frameworks (Jest, Cypress) in a multi-developer environment.

                Good-to-Have Skills

                Experience with UI/UX design systems and libraries (Material UI).
                Knowledge of authentication frameworks (OAuth2, OpenID Connect).
                Experience with microservices, serverless functions, or event-driven architecture.

                Soft Skills

                Strong analytical and problem-solving ability.
                Passion for clean, scalable, and maintainable code.
                Excellent communicator and collaborator across engineering, product, and design teams.
                Adaptable and results-driven in a cloud-first, agile environment.

                Shift Information:

                This is an onsite role at the Hyderabad office. This position also requires you to be onsite and participate in 24/5 and weekend on call in rotation fashion and may require you to work a later shift. Candidates must be willing and able to work off hours, as required based on business requirements.
            `}
        />
        <input type="hidden" name="company-name" value="Acme Corp" />
        <input type="hidden" name="pdf-template-type" value="single_column" />
        <button type="submit" className="btn btn-primary">
          Create Resume
        </button>
      </form>
    </div>
  );
}
