const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "API request failed.");
    }

    return result.data;
}