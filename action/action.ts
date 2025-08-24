"use server";

import { Client, Databases, ID } from "appwrite";
import { redirect } from "next/navigation";

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

export async function createFeedback(formData: FormData) {
  const feedback = formData.get("feedback") as string;

  if (!feedback || feedback.trim().length === 0) {
    throw new Error("Feedback is required");
  }
  console.log("createFeedback", feedback);

  // Check if Appwrite is configured
  if (!databases || !DATABASE_ID || !COLLECTION_ID) {
    console.warn("Appwrite not configured. Feedback not saved:", feedback);
    throw new Error("Feedback service not configured");
  }

  if (cache === feedback) {
    throw new Error("Duplicate feedback - please submit different feedback");
  }

  try {
    cache = feedback;
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      { feedback }
    );
    console.log("Feedback saved successfully:", response);
    // Return success - in server actions, you typically redirect or revalidate
    return { success: true, data: response };
  } catch (error) {
    console.error("Failed to save feedback:", error);
    throw new Error("Failed to save feedback. Please try again.");
  }
}
