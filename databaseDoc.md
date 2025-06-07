# Expansetracker Database Documentation

---

## 1. Main Table

### 1.2. `users`
This table stores application user data.

| Column         | Data Type          | Description                         |
|----------------|--------------------|-----------------------------------|
| `id`           | BIGINT (PK, AI)    | Primary key, auto-increment        |
| `full_name`    | VARCHAR            | User's full name                   |
| `email`        | VARCHAR (Unique)   | User's email, unique               |
| `phone_number` | VARCHAR            | Phone number                      |
| `password`     | VARCHAR            | Password stored as a hashed value (BCrypt) |

---

## 2. Relationships
- Currently, only the `users` table exists with no relationships.

---

## 3. Notes
- Passwords are stored as BCrypt hashes for security.
- Login is done using the email as the username.
- Implemented features so far: user registration and login.
