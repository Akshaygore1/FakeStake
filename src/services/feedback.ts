import { Client, Databases, ID, Models } from "appwrite";

const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID;

let cache = "";

let databases: Databases | null = null;

if (ENDPOINT && PROJECT_ID) {
  const client = new Client().setEndpoint(ENDPOINT).setProject(PROJECT_ID);
  databases = new Databases(client);
}

export async function submitFeedback(
  feedback: string
): Promise<{ success: true; data: Models.Document }> {
  const trimmedFeedback = feedback.trim();

  if (!trimmedFeedback) {
    throw new Error("Feedback is required");
  }

  if (!databases || !DATABASE_ID || !COLLECTION_ID) {
    throw new Error("Feedback service not configured");
  }

  if (cache === trimmedFeedback) {
    throw new Error("Duplicate feedback - please submit different feedback");
  }

  try {
    cache = trimmedFeedback;

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      { feedback: trimmedFeedback }
    );

    return { success: true, data: response };
  } catch {
    throw new Error("Failed to save feedback. Please try again.");
  }
}
