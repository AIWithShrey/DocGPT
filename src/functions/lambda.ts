import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { useQuery } from "react-query";

const client = new LambdaClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY!,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!,
  },
});

export async function inputDocUrl(url: string, httpMethod: string) {
  const input = {
    FunctionName: "ScrapingWebsite",
    Payload: JSON.stringify(url), // Pass the inputData as the Payload
  };
  const command = new InvokeCommand(input);

  try {
    const response = await client.send(command);

    // Assuming the Lambda function's response is a stringified JSON object
    const payloadString = new TextDecoder().decode(response.Payload);
    const payload = JSON.parse(payloadString);
    // Extract the message from the parsed payload
    const message = payload.body;

    // console.log("Message from Lambda:", message);
    return message;
  } catch (error) {
    console.error("Error calling Lambda", error);
  }
}

export const useInputDocUrl = (
  url: string,
  httpMethod: string,
  options = {}
) => {
  return useQuery(["call", url], () => inputDocUrl(url, httpMethod), options);
};

export async function promptGpt4(library: string, prompt: string) {
  const input = {
    FunctionName: "carterTest",
    Payload: JSON.stringify({ library, prompt }), // Pass the inputData as the Payload
  };
  const command = new InvokeCommand(input);

  try {
    const response = await client.send(command);

    // Assuming the Lambda function's response is a stringified JSON object
    const payloadString = new TextDecoder().decode(response.Payload);
    const payload = JSON.parse(payloadString);
    // Extract the message from the parsed payload
    const message = payload.body;

    // console.log("Message from Lambda:", message);
    return message;
  } catch (error) {
    console.error("Error calling Lambda", error);
  }
}

export const usePromptGpt4 = (
  library: string,
  prompt: string,
  options = {}
) => {
  return useQuery(
    ["call", library],
    () => promptGpt4(library, prompt),
    options
  );
};
