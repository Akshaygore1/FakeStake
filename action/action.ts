import { Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint(process.env.ENDPOINT!)
  .setProject(process.env.PROJECT_ID!);

const databases = new Databases(client);

let cache = "";

const createFeedback = async (feedback: string) => {
  if (cache === feedback) return;
  cache = feedback;
  const response = await databases.createDocument(
    process.env.DATABASE_ID!,
    process.env.COLLECTION_ID!,
    ID.unique(),
    { feedback }
  );
  return response;
};

export default createFeedback;
