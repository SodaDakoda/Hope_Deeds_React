import { apiRequest } from "../utils/api";

export async function getOrgProfile(token) {
  return apiRequest("/organizations/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
