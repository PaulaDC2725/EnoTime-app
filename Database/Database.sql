-- =====================================================================
-- SCRIPT DEFINITIVO: ENOTIME (Todo en esquema public)
-- =====================================================================

-- 1. Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 2. Limpieza total (Borra todo en public)
DROP TABLE IF EXISTS request_event CASCADE;
DROP TABLE IF EXISTS request CASCADE;
DROP TABLE IF EXISTS balance CASCADE;
DROP TABLE IF EXISTS user_account CASCADE;
DROP TABLE IF EXISTS employee CASCADE;
DROP TABLE IF EXISTS allowed_domain CASCADE;

DROP TYPE IF EXISTS request_type CASCADE;
DROP TYPE IF EXISTS request_status CASCADE;
DROP TYPE IF EXISTS request_action CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- 3. Crear tipos de datos (ENUMs)
CREATE TYPE request_type AS ENUM ('Vacation', 'Comp Time', 'Sick Leave');
CREATE TYPE request_status AS ENUM ('Pending', 'Approved', 'Rejected');
CREATE TYPE request_action AS ENUM ('Created', 'Updated', 'Approved', 'Rejected');
CREATE TYPE user_role AS ENUM ('Employee', 'Administrator');

-- 4. Creación de tablas
CREATE TABLE allowed_domain (
    domain_id BIGSERIAL PRIMARY KEY,
    domain_name CITEXT UNIQUE NOT NULL
);

CREATE TABLE employee (
    employee_id BIGSERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email CITEXT UNIQUE NOT NULL,
    position_title TEXT,
    manager_id BIGINT REFERENCES employee(employee_id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_account (
    user_id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT REFERENCES employee(employee_id) ON DELETE CASCADE,
    email CITEXT UNIQUE NOT NULL,
    password_hash TEXT,
    external_id TEXT,
    role_name user_role NOT NULL DEFAULT 'Employee',
    profile_completed BOOLEAN DEFAULT FALSE,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE balance (
    balance_id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT REFERENCES employee(employee_id) ON DELETE CASCADE,
    vacation_available INTEGER DEFAULT 0,
    comp_time_available INTEGER DEFAULT 0,
    cutoff_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request (
    request_id BIGSERIAL PRIMARY KEY,
    employee_id BIGINT REFERENCES employee(employee_id) ON DELETE CASCADE,
    manager_id BIGINT REFERENCES employee(employee_id),
    type request_type NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    days INTEGER NOT NULL,
    justification TEXT,
    status request_status NOT NULL DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request_event (
    event_id BIGSERIAL PRIMARY KEY,
    request_id BIGINT REFERENCES request(request_id) ON DELETE CASCADE,
    action request_action NOT NULL,
    user_id BIGINT REFERENCES user_account(user_id),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Inserción de datos iniciales
INSERT INTO employee (full_name, email, manager_id) 
VALUES ('Paula Delgado', 'admin@enotime.com', NULL);

INSERT INTO user_account (employee_id, email, password_hash, role_name) 
VALUES (1, 'admin@enotime.com', 'Admin2026*', 'Administrator');

SELECT email, password_hash, role_name 
FROM user_account 
WHERE email = 'admin@enotime.com';