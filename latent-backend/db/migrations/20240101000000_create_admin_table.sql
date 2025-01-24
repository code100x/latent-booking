-- Create admin table
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY,
    number VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false
);

-- Create super_admin table
CREATE TABLE IF NOT EXISTS super_admins (
    id UUID PRIMARY KEY,
    number VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    verified BOOLEAN NOT NULL DEFAULT false
);
