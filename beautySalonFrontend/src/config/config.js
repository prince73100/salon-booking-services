const apiUrl = import.meta.env.MODE === "development" ? import.meta.env.VITE_LOCAL_BASE_URL: import.meta.env.VITE_LIVE_BASE_URL;
console.log(import.meta.env.MODE)
export default apiUrl;