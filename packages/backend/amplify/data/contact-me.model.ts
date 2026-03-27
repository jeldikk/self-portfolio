import { a } from "@aws-amplify/backend";
import { createContactMeFunction } from "../function/resource";

export const contactMeSchema = a
  .schema({
    ContactMe: a
      .model({
        name: a.string().required(),
        email: a.string().required(),
        message: a.string().required(),
        acknowledged: a.boolean().default(false),
        wantAcknowledgement: a.boolean(),
        acknowledgedAt: a.datetime(),
      })
      .authorization((allow) => [
        allow.guest().to(["create", "get", "update"]),
        allow.authenticated().to(["update", "delete", "create", "list", "get"]),
      ]),

    ContactMeMutation: a
      .mutation()
      .arguments({
        name: a.string().required(),
        email: a.string().required(),
        message: a.string().required(),
        wantAcknowledgement: a.boolean(),
      })
      .returns(a.ref("ContactMe"))
      .authorization((allow) => [allow.guest(), allow.authenticated()])
      .handler(a.handler.function(createContactMeFunction)),
  })
  .authorization((allow) => [allow.resource(createContactMeFunction)]);
