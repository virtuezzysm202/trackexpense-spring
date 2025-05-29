# trackexpense-spring
A simple and efficient Expense Tracker application built with Java Spring Boot. Easily record, manage, and analyze your personal expenses.


# Structure Explanation
---

**Brief explanation of each folder:**

- `.mvn/wrapper`: Maven wrapper to ensure consistent Maven version.
- `src/main/java/com/expanse/expensetracker`: The main Java code of the project.
- `config`: Spring application configuration place, e.g. database configuration, security.
- `controller`: Class that handles REST API requests.
- `dto`: Class for request/response data format (to separate data between layers).
- `models`: Entity that maps database tables.
- `repository`: Interface for database access, usually extends from JpaRepository.
- `security`: All classes related to authentication, authorization, and security.
- `service`: Main application logic (business process) that is called from the controller.
- `resources`: Resources needed by the application, such as configuration properties, static files, and templates.

---