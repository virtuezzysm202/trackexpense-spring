# ExpanseTracker – Database Schema Documentation

## Database: MySQL

---

## Tables

### 1. `users`
Stores registered user data.

| Column         | Type          | Description                         |
|----------------|---------------|-------------------------------------|
| id             | BIGINT        | Primary key, auto-incremented       |
| full_name      | VARCHAR(255)  | Full name of the user               |
| email          | VARCHAR(255)  | Unique user email (used for login) |
| phone_number   | VARCHAR(255)  | Optional phone number               |
| password_hash  | VARCHAR(255)  | Encrypted password (BCrypt)         |
| created_at     | TIMESTAMP     | Record creation timestamp           |
| updated_at     | TIMESTAMP     | Last update timestamp               |
| profile_photo  | VARCHAR(255)  | Optional URL or path to profile pic |

---

### 2. `categories`
Stores custom expense categories per user.

| Column   | Type         | Description                            |
|----------|--------------|----------------------------------------|
| id       | BIGINT       | Primary key, auto-incremented          |
| name     | VARCHAR(100) | Category name                          |
| user_id  | BIGINT       | Foreign key to `users.id`              |

**Constraints**:
- `user_id` references `users(id)`  
- `ON DELETE CASCADE`: deletes all categories if user is deleted
- Table name is categories
---

### 3. `expense`
Stores individual expense records.

| Column       | Type          | Description                               |
|--------------|---------------|-------------------------------------------|
| id           | BIGINT        | Primary key, auto-incremented             |
| description  | VARCHAR(255)  | Short description of the expense          |
| amount       | DOUBLE        | Expense amount                            |
| date         | DATE          | Date of the expense                       |
| user_id      | BIGINT        | Foreign key to `users.id`                 |
| category_id  | BIGINT (nullable) | Foreign key to `categories.id`       |

**Constraints**:
- `user_id` references `users(id)` – `ON DELETE CASCADE`
- `category_id` references `categories(id)` – `ON DELETE SET NULL`
