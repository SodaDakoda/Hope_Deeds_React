import { apiRequest } from "../utils/api";

// List opportunities for current user's organization
export async function listOpportunities(token) {
  return apiRequest("/opportunities", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Get a single opportunity with its shifts
export async function getOpportunity(id, token) {
  return apiRequest(`/opportunities/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Create an opportunity (admin/manager only)
export async function createOpportunity(data, token) {
  return apiRequest("/opportunities", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// Update opportunity
export async function updateOpportunity(id, data, token) {
  return apiRequest(`/opportunities/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// Delete opportunity
export async function deleteOpportunity(id, token) {
  return apiRequest(`/opportunities/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
