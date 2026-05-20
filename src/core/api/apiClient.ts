const SERVER_API_URL = "http://127.0.0.1:5000/api";
const CLIENT_API_URL = "/api/backend";
const API_URL = typeof window === "undefined" ? SERVER_API_URL : CLIENT_API_URL;
console.log("Resolved API_URL", API_URL);

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