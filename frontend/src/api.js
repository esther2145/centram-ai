const API_BASE_URL = import.meta.env.PROD
  ? "/api"
  : "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    let message = "Something went wrong.";

    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail)) {
      message = data.detail
        .map((err) => `${err.loc.at(-1)}: ${err.msg}`)
        .join(", ");
    }

    throw new Error(message);
  }

  return data;
}

export const api = {
  getCourses: () => request("/courses"),
  getCourse: (id) => request(`/courses/${id}`),
  getCourseDetails: (id) => request(`/courses/${id}/details`),
  apply: (payload) => request("/applications", { method: "POST", body: JSON.stringify(payload) }),
  contact: (payload) => request("/contact", { method: "POST", body: JSON.stringify(payload) }),
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
};
