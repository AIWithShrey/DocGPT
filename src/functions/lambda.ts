import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { useQuery } from "react-query";

const client = new LambdaClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_ACCESS_KEY!,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY!,
  },
});

export async function lambdaCall(inputData: string) {
  const input = {
    FunctionName: "carterTest",
    Payload: JSON.stringify(inputData), // Pass the inputData as the Payload
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

export const useLambdaCall = (inputData: string, options = {}) => {
  return useQuery(["call", inputData], () => lambdaCall(inputData), options);
};
