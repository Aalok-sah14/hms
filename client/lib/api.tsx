const BASE = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// AUTH
export const loginApi = (data: object) =>
  fetch(`${BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());

// GUESTS
export const getGuests = () =>
  fetch(`${BASE}/guests/all`, { headers: headers() }).then(r => r.json());

export const registerGuest = (data: object) =>
  fetch(`${BASE}/guests/register`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

// ROOMS
export const getRooms = () =>
  fetch(`${BASE}/rooms/all`, { headers: headers() }).then(r => r.json());

export const addRoom = (data: object) =>
  fetch(`${BASE}/rooms/add`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

// BOOKINGS
export const getBookings = () =>
  fetch(`${BASE}/bookings/all`, { headers: headers() }).then(r => r.json());

export const checkIn = (data: object) =>
  fetch(`${BASE}/bookings/checkin`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const checkOut = (id: string) =>
  fetch(`${BASE}/bookings/checkout/${id}`, { method: "PATCH", headers: headers() }).then(r => r.json());

// BILLING
export const addServiceCharge = (data: object) =>
  fetch(`${BASE}/billing/add-service`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const getInvoice = (bookingId: string) =>
  fetch(`${BASE}/billing/invoice/${bookingId}`, { headers: headers() }).then(r => r.json());

// MAINTENANCE
export const getMaintenance = () =>
  fetch(`${BASE}/maintenance/all`, { headers: headers() }).then(r => r.json());

export const addMaintenance = (data: object) =>
  fetch(`${BASE}/maintenance/add`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const updateMaintenance = (id: string, data: object) =>
  fetch(`${BASE}/maintenance/update/${id}`, { method: "PATCH", headers: headers(), body: JSON.stringify(data) }).then(r => r.json());