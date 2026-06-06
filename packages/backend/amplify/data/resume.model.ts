import { a } from "@aws-amplify/backend";
import { resumeBuilderWorkerFunction } from "../function/resume-builder-worker/resource";
import { createResumeHandlerFunction } from "../function/create-resume-handler/resource";

export const resumeSchema = a
  .schema({
    Resume: a
      .model({
        name: a.string().required(),
        jobDescription: a.string().required(),
        s3Key: a.string().required(),
        companyName: a.string(),
        pdfTemplateType: a.enum(["single_column", "two_column"]),
        status: a.enum(["processing", "completed", "failed"]),
      })
      .authorization((allow) => [
        allow.authenticated().to(["create", "update", "delete"]),
      ]),
    createResumeMutation: a
      .mutation()
      .arguments({
        name: a.string().required(),
        jobDescription: a.string().required(),
        companyName: a.string().required(),
        pdfTemplateType: a.enum(["single_column", "two_column"]),
      })
      .returns(
        a.customType({
          message: a.string(),
          messageId: a.string(),
        }),
      )
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(createResumeHandlerFunction)),
  })
  .authorization((allow) => [
    allow.resource(resumeBuilderWorkerFunction).to(["mutate", "query"]),
    allow.resource(createResumeHandlerFunction),
  ]);
