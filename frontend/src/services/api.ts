import { friendRelationDto } from '@/components/Profile/types';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND;

// Helper function to make GET requests
export async function getData<T>(
  login: string,
  endpoint: string
): Promise<T | null> {
  try {
    const response = await fetch(`${backendUrl}${endpoint}${login}`, {
      credentials: 'include', // Include credentials in the request
    });

    if (response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
      return null;
    }

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
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
      return null;
    }
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
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
      return null;
    }
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
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
      return null;
    }
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

export async function postDataWithImage(data: FormData, endpoint: string) {
  try {
    const response = await fetch(`${backendUrl}${endpoint}`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    if (response.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/login';
      return null;
    }
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
