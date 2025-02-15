-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    number VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT '',
    verified BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create admin_type enum
CREATE TYPE admin_type AS ENUM ('SuperAdmin', 'Creator');

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY,
    number VARCHAR(15) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT '',
    verified BOOLEAN NOT NULL DEFAULT FALSE,
    type admin_type NOT NULL DEFAULT 'Creator'
);

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    banner TEXT NOT NULL,
    admin_id UUID NOT NULL REFERENCES admins(id),
    location_id UUID NOT NULL REFERENCES locations(id),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    processed INTEGER NOT NULL DEFAULT 0,
    published BOOLEAN NOT NULL DEFAULT FALSE,
    ended BOOLEAN NOT NULL DEFAULT FALSE,
    timeout_in_s INTEGER NOT NULL DEFAULT 600,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create seat_types table
CREATE TABLE IF NOT EXISTS seat_types (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_id UUID NOT NULL REFERENCES events(id),
    price INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    filled INTEGER NOT NULL DEFAULT 0,
    locked INTEGER NOT NULL DEFAULT 0
);

-- Create booking_status enum
CREATE TYPE booking_status AS ENUM ('Pending', 'PendingPayment', 'Confirmed', 'Timeout', 'Filled');

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id),
    user_id UUID NOT NULL REFERENCES users(id),
    sequence_number INTEGER NOT NULL,
    payment_id UUID,
    status booking_status NOT NULL,
    expiry TIMESTAMP WITH TIME ZONE NOT NULL,
    current_sequence_number INTEGER NOT NULL
);

-- Create seats table
CREATE TABLE IF NOT EXISTS seats (
    id UUID PRIMARY KEY,
    seat_type_id UUID NOT NULL REFERENCES seat_types(id),
    booking_id UUID NOT NULL REFERENCES bookings(id),
    qr TEXT NOT NULL
);

-- Create payment_state enum
CREATE TYPE payment_state AS ENUM ('Success', 'Fail', 'Pending');

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY,
    event_id UUID NOT NULL REFERENCES events(id),
    user_id UUID NOT NULL REFERENCES users(id),
    status payment_state NOT NULL
); 