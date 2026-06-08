CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Crear el perfil de empleado
INSERT INTO employee (full_name, email, position_title) 
VALUES ('Paula Delgado', 'admin@enotime.com', 'Administradora Principal');

-- 3. Crear la cuenta de usuario con la contraseña 'Admin2026*'
-- La función crypt() la encripta exactamente igual que Node.js
INSERT INTO user_account (employee_id, email, password_hash, role_name, profile_completed)
VALUES (
    1, 
    'admin@enotime.com', 
    crypt('Admin2026*', gen_salt('bf')), 
    'Administrador', 
    TRUE
);