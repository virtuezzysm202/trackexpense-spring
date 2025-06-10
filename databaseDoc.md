# Expansetracker Database Documentation

---

# USING MY SQL 

## 1. Main Table

### 1.2. `users`
This table stores application user data.

Columns:
id bigint AI PK 
full_name varchar(255) 
email varchar(255) 
phone_number varchar(255) 
password_hash varchar(255) 
created_at timestamp 
updated_at timestamp 
profile_photo varchar(255)
---

## 2. Relationships
- Currently, only the `users` table exists with no relationships.

---

## 3. Notes
- Passwords are stored as BCrypt hashes for security.
- Login is done using the email as the username.
- Implemented features so far: user registration and login.
