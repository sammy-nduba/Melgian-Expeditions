const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://melgian-api.onrender.com/api";

export async function apiClient<T>(
    endpoint: string,
    options?: RequestInit
): Promise<T> {
    const { headers, ...restOptions } = options || {};
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        ...restOptions,
    });

    const result = await response.json();

    if (!response.ok) {
        if (result.details) {
            console.error("API Error Details:", result.details);
            // Handle parsed.error.flatten() format: fieldErrors or just generic objects
            const detailsObj = (result.details as any).fieldErrors || result.details;
            const detailedMsg = typeof detailsObj === "object"
                ? Object.entries(detailsObj)
                    .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : JSON.stringify(val)}`)
                    .join("; ")
                : JSON.stringify(result.details);
            throw new Error(`${result.message} (${detailedMsg})`);
        }
        throw new Error(result.message || "API request failed.");
    }

    return result.data;
}