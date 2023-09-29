const backendUrl = "http://localhost:3001";

// Helper function to make GET requests
export async function getData<T>(login: string, endpoint: string): Promise<T> {
  try {
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
// export async function postData(url: string, data: any): Promise<T> {
//     try {
//       const response = await fetch(`${backendUrl}${url}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(
//           `HTTP error!
//                     Status: ${response.status}
//                     Message: ${errorData.message}`
//         );
//       }
//       return response.json();
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
// }

// Additional CRUD functions (PUT, DELETE, etc.) can be added here
