const apiUrl = import.meta.env.MODE === "development" ? import.meta.env.VITE_LIVE_BASE_URL : import.meta.env.VITE_LOCAL_BASE_URL;

export default apiUrl;