import { apiRequest } from "../utils/api";

// List volunteers (admin/manager only)
export async function listVolunteers(token) {
  return apiRequest("/volunteers", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Get a volunteer's profile & hours
export async function getVolunteer(id, token) {
  return apiRequest(`/volunteers/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Update volunteer (background check, orientation, role)
export async function updateVolunteer(id, data, token) {
  return apiRequest(`/volunteers/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// Admin/Manager adds volunteer hours manually
export async function addVolunteerHours(id, data, token) {
  return apiRequest(`/volunteers/${id}/hours`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}
