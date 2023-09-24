import {
  SSMClient,
  GetParameterCommand,
  SSMClientConfig,
} from "@aws-sdk/client-ssm";
import { fromSSO } from "@aws-sdk/credential-provider-sso";
import * as fs from "fs";

const REGION = "us-east-1";
const PROFILE = "dev";

// const env = process.env.DEPLOYING_ENV_VAR || null;

// Initializing the SSM client with specific profile and region
const ssmClientConfig: SSMClientConfig = {
  region: REGION,
};

if (false) {
  ssmClientConfig.credentials = fromSSO({ profile: PROFILE });
  console.log("RUNNING IN LOCAL CONFIG");
}

const ssmClient = new SSMClient(ssmClientConfig);
// Fetch parameters
async function fetchParameters() {
  try {
    const accessId = new GetParameterCommand({
      Name: "accessKey",
      WithDecryption: true,
    });
    const secretKey = new GetParameterCommand({
      Name: "secretKey",
      WithDecryption: true,
    });

    const accessIdResponse = await ssmClient.send(accessId);
    const secretKeyResponse = await ssmClient.send(secretKey);
    const envContent = `
      REACT_APP_SECRET_ACCESS_KEY=${accessIdResponse.Parameter?.Value}
      REACT_APP_ACCESS_KEY=${secretKeyResponse.Parameter?.Value}
        `;

    const formattedEnv = envContent
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
      .trim();
    fs.writeFileSync(".env", formattedEnv);
  } catch (error) {
    console.error("Error fetching parameters:", error);
  }
}

fetchParameters();
