const AUTH_URL = "https://functions.poehali.dev/49d17f6f-5ae8-4049-9df0-56fba85cdf0d";
const BOOKINGS_URL = "https://functions.poehali.dev/f8fa8c8a-1261-4ed2-9ca0-3758e69f9758";

function getToken(): string {
  return localStorage.getItem("transport_token") || "";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${getToken()}`,
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface Booking {
  id: number;
  booking_code: string;
  route_from: string;
  route_to: string;
  departure_date: string;
  departure_time: string;
  arrival_time: string;
  seat: string;
  bus_id: string;
  price: number;
  status: "active" | "cancelled" | "done";
  created_at: string;
}

export const api = {
  async register(name: string, email: string, password: string, phone: string) {
    const res = await fetch(`${AUTH_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Ошибка регистрации");
    localStorage.setItem("transport_token", data.token);
    return data as { token: string; user: User };
  },

  async login(email: string, password: string) {
    const res = await fetch(`${AUTH_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Неверный email или пароль");
    localStorage.setItem("transport_token", data.token);
    return data as { token: string; user: User };
  },

  async getMe(): Promise<User | null> {
    const token = getToken();
    if (!token) return null;
    const res = await fetch(`${AUTH_URL}/me`, { headers: authHeaders() });
    if (!res.ok) return null;
    const data = await res.json();
    return data.user as User;
  },

  async logout() {
    await fetch(`${AUTH_URL}/logout`, { method: "POST", headers: authHeaders() });
    localStorage.removeItem("transport_token");
  },

  async updateProfile(name: string, phone: string) {
    const res = await fetch(`${AUTH_URL}/update-profile`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ name, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Ошибка сохранения");
    return data;
  },

  async getBookings(): Promise<Booking[]> {
    const res = await fetch(BOOKINGS_URL, { headers: authHeaders() });
    if (!res.ok) return [];
    return res.json();
  },

  async cancelBooking(booking_id: number) {
    const res = await fetch(`${BOOKINGS_URL}/cancel`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ booking_id }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Ошибка отмены");
    return data;
  },
};
