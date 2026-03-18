"use client";

import { Amplify } from "aws-amplify";
import React from "react";
import { parseAmplifyConfig } from "aws-amplify/utils";
import config from "../amplify_outputs.json";

const parsedConfig = parseAmplifyConfig(config);

Amplify.configure(parsedConfig, {
  ssr: true,
});

interface Props {
  children: React.ReactNode;
}

export default function AmplifyProvider(props: Props) {
  const { children } = props;
  return <>{children}</>;
}
