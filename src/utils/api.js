const API_URL = "http://localhost:5000/api";

// Generic fetch helper
const request = async (url, method = "GET", body = null, token = null) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`; // Important

  const res = await fetch(`${API_URL}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

// Auth APIs
export const registerUser = (userData) =>
  request("/auth/register", "POST", userData);
export const loginUser = (userData) => request("/auth/login", "POST", userData);

// Notes APIs
export const fetchNotes = (token) => request("/notes", "GET", null, token);
export const addNote = (note, token) => request("/notes", "POST", note, token);
export const updateNote = (id, note, token) =>
  request(`/notes/${id}`, "PUT", note, token);
export const deleteNote = (id, token) => request(`/notes/${id}`, "DELETE", null, token);
