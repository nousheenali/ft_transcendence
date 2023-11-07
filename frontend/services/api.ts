import { friendRelationDto } from "@/components/Profile/types";

const backendUrl = "http://localhost:3001";

// Helper function to make GET requests
export async function getData<T>(login: string, endpoint: string): Promise<T> {
  try {
    console.log("IN HERE...",login);
    const response = await fetch(`${backendUrl}${endpoint}${login}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error!
            Status: ${response.status}
            Message: ${errorData.message}`
      );
    }
    const records = await response.json();
    return records;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Helper function to make POST requests
export async function postData<T>(data: T, endpoint: string) {
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error!
                    Status: ${response.status}
                    Message: ${errorData.message}`
      );
    }
    return response.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Helper function to make PUT requests
export async function updateData<T>(data: T, endpoint: string) {
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error!
            Status: ${response.status}
            Message: ${errorData.message}`
      );
    }
    return response.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// Helper function to delete requests
export async function deleteData<T>(data: T, endpoint: string) {
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `HTTP error!
                    Status: ${response.status}
                    Message: ${errorData.message}`
      );
    }
    return response.text();
  } catch (error: any) {
    throw new Error(error.message);
  }
}
