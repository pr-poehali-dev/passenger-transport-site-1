
CREATE TABLE IF NOT EXISTS t_p33034807_passenger_transport_.users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p33034807_passenger_transport_.sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES t_p33034807_passenger_transport_.users(id),
  token TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS t_p33034807_passenger_transport_.bookings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES t_p33034807_passenger_transport_.users(id),
  booking_code TEXT UNIQUE NOT NULL,
  route_from TEXT NOT NULL,
  route_to TEXT NOT NULL,
  departure_date TEXT NOT NULL,
  departure_time TEXT NOT NULL,
  arrival_time TEXT NOT NULL,
  seat TEXT NOT NULL,
  bus_id TEXT NOT NULL,
  price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);
