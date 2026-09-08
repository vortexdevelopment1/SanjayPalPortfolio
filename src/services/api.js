const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginAdmin(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  localStorage.setItem('admin_token', data.token);
  return data;
}

export async function getProjects() {
  const res = await fetch(`${API_URL}/projects`);
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
}

export async function getProjectById(id) {
  const res = await fetch(`${API_URL}/projects/${id}`);
  if (!res.ok) throw new Error('Failed to fetch project');
  return res.json();
}

export async function createProject(data) {
  const isFormData = data instanceof FormData;
  const headers = authHeaders();
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to create project');
  return result;
}

export async function updateProject(id, data) {
  const isFormData = data instanceof FormData;
  const headers = authHeaders();
  if (!isFormData) headers['Content-Type'] = 'application/json';

  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers,
    body: isFormData ? data : JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to update project');
  return result;
}

export async function deleteProject(id) {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to delete project');
  return result;
}

export function logout() {
  localStorage.removeItem('admin_token');
}

export function isAuthenticated() {
  return !!getToken();
}

export async function submitContactForm(data) {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to send message');
  return result;
}

// Contact Messages API
export async function getContactMessages() {
  const res = await fetch(`${API_URL}/contact`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error('Failed to fetch contact messages');
  return res.json();
}

export async function getUnreadContactCount() {
  const res = await fetch(`${API_URL}/contact/unread-count`, {
    headers: { ...authHeaders() },
  });
  if (!res.ok) throw new Error('Failed to fetch unread count');
  return res.json();
}

export async function markMessageAsRead(id) {
  const res = await fetch(`${API_URL}/contact/${id}/read`, {
    method: 'PATCH',
    headers: { ...authHeaders() },
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to mark message as read');
  return result;
}

export async function markMessageAsUnread(id) {
  const res = await fetch(`${API_URL}/contact/${id}/unread`, {
    method: 'PATCH',
    headers: { ...authHeaders() },
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to mark message as unread');
  return result;
}

export async function deleteContactMessage(id) {
  const res = await fetch(`${API_URL}/contact/${id}`, {
    method: 'DELETE',
    headers: { ...authHeaders() },
  });
  const result = await res.json();
  if (!res.ok) throw new Error(result.message || 'Failed to delete message');
  return result;
}
