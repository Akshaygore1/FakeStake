import { Client, Databases, ID } from "appwrite";

// Check if environment variables are configured
const ENDPOINT = process.env.ENDPOINT;
const PROJECT_ID = process.env.PROJECT_ID;
const DATABASE_ID = process.env.DATABASE_ID;
const COLLECTION_ID = process.env.COLLECTION_ID;

let client: Client | null = null;
let databases: Databases | null = null;

// Only initialize Appwrite if environment variables are present
if (ENDPOINT && PROJECT_ID) {
  client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  databases = new Databases(client);
}

let cache = "";

const createFeedback = async (feedback: string) => {
  // Check if Appwrite is configured
  if (!databases || !DATABASE_ID || !COLLECTION_ID) {
    console.warn("Appwrite not configured. Feedback not saved:", feedback);
    return { success: false, message: "Feedback service not configured" };
  }

  if (cache === feedback)
    return { success: true, message: "Duplicate feedback ignored" };

  try {
    cache = feedback;
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      { feedback }
    );
    return { success: true, data: response };
  } catch (error) {
    console.error("Failed to save feedback:", error);
    return { success: false, message: "Failed to save feedback" };
  }
};

export default createFeedback;
