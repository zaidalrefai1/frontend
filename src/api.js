import axios from "axios";
const API_BASE = "http://127.0.0.1:5000";

export function fetchGameState() {
  return axios.get(`${API_BASE}/game-state`);
}

export function updateLocation(location) {
  return axios.post(`${API_BASE}/update-location`, { location });
}
