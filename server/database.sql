-- how to set up the database schema for Juvanta application
-- open cdm run "psql -U postgres"
-- password for user postgres: your_password_here "Jayanth114!"

-- \l -- List existing databases
-- \c postgres; -- Connect to the default postgres database
-- "DROP DATABASE IF EXISTS Juvanta;"" -- Drop existing database if it exists
-- \dt -- List tables in the current database


CREATE DATABASE Juvanta;

\c juvanta;

-- Table to store agency information
CREATE TABLE Agencies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    companyType VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('active', 'inactive')),
    tenants INT CHECK (tenants >= 0)
);

-- Table to store child agencies linked to parent agencies
CREATE TABLE agencies_childs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    companyType VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('active', 'inactive')),
    locations INT CHECK (locations >= 0),
    agency_name VARCHAR(100) NOT NULL,
    CONSTRAINT fk_agency
        FOREIGN KEY (agency_name)
        REFERENCES Agencies(name)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Table to store location information
CREATE TABLE Locations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    type VARCHAR(50),
    locality VARCHAR(100),
    region VARCHAR(100),
    country VARCHAR(100)
);


-- Table to store tenant information
CREATE TABLE Tenants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    companyType VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('active', 'inactive')),
    accountType VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    agency VARCHAR(100) NOT NULL,
    agencyId INT NOT NULL,
    locations INT CHECK (locations >= 0),
    CONSTRAINT fk_agency
        FOREIGN KEY (agencyId)
        REFERENCES Agencies(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);





-- open cdm run "psql -U postgres"

-- Create database
CREATE DATABASE jwt_tutorial;

-- Connect to database
\c jwt_tutorial;

-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  user_password VARCHAR(255) NOT NULL
);
