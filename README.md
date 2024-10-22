# yellowbox-api

## Project Title
Locker Management API

## Description
A simple RESTful API built with Node.js and Express that allows clients to manage locker bookings. The API uses mock functions to simulate database operations.

## Features

* User Managemen
  * Create new user accounts.  
  * Generate API tokens for authentication.
* Locker Management
  * Open specific lockers.
  * Start and end locker bookings.
  * Retrieve the status of lockers.
* Authentication
  * **Uses HASHED API tokens to authenticate requests for better secret storage than unhashed values.**
* Documentation
  * **See the Commends within the `locker.ts` and `user.ts` files for explanations on the choices of that data model**

## Explanation of features & Challenges Handled
1. Rate Limiting
   * Implementation: The solution implements rate limiting using middleware in the Express.js application. It utilizes the express-rate-limit library to control the number of requests a user can make. Each API token is allowed a maximum of 100 requests per minute.
   * How It Works: The rate-limiting middleware tracks the number of requests associated with each API token within a specified time window (1 minute). If a user exceeds the allowed number of requests, the API responds with a 429 Too Many Requests error. This mechanism prevents any single user from overwhelming the system, ensuring fair usage and protecting against denial-of-service attacks.
2. Versioning Strategy
   * Implementation: The API adopts a URL-based versioning strategy by including the version number in the endpoint paths (e.g., /api/v1/...). Semantic versioning is used, where major version changes indicate breaking changes.
   * How It Works: By specifying the version in the URL, clients can continue to use a specific version of the API even as new versions are released. Backward compatibility is maintained by supporting multiple versions concurrently, allowing clients time to migrate to newer versions. The strategy facilitates structured API evolution without disrupting existing integrations.
3. Security: Implementing a Robust Single-Token Authentication System
   * Solution: The API uses a token-based authentication system, where each user receives a unique API token upon registration. API tokens are securely generated using UUIDs and are stored as hashed values using bcrypt in the database. The authentication middleware verifies incoming requests by comparing the hashed token in the database with the provided token.
   * Benefits:
     * Enhanced Security: Hashing tokens ensures that even if the database is compromised, the actual tokens cannot be retrieved.
     * Stateless Authentication: Simplifies scaling and maintains session information without server-side storage.
     * Ease of Use: Clients can easily include the API token in request headers for authenticated access.
4. Scalability: Designing the API to Handle High Volumes of Requests
   * Solution: The API is built using Express.js, known for its lightweight and efficient handling of HTTP requests. Asynchronous operations are used to prevent blocking, allowing the server to handle multiple requests concurrently. The data structures are designed using NoSQL Firestore, which is optimized for scalability and high read/write throughput. Rate limiting ensures no single client can consume disproportionate resources.
   * Benefits:
     * Horizontal Scalability: The stateless nature of the API allows for easy scaling across multiple servers.
     * Efficient Data Access: Firestore's data model and indexing facilitate quick data retrieval, even as the dataset grows.
     * Resource Management: Rate limiting and efficient code prevent resource exhaustion, maintaining performance under load.
5. Error Handling: Providing Clear, Informative Error Responses
   * Solution: The API consistently uses appropriate HTTP status codes (e.g., 400, 401, 403, 404, 409, 429, 500). Error responses are standardized in a JSON format with an error field containing a descriptive message. Input validation is implemented to catch and report errors due to invalid client input. Middleware and centralized error-handling mechanisms ensure consistent responses across all endpoints.
   * Benefits:
     * Developer-Friendly: Clear error messages help clients understand what went wrong and how to fix it.
     * Consistent Responses: Standardization allows clients to programmatically handle errors.
     * Improved Debugging: Detailed errors facilitate faster issue resolution during development and production.
6. Versioning and Backward Compatibility
   * Solution: The API uses a URL-based versioning strategy, embedding the version number in the endpoint paths
   * Semantic versioning is followed, where:
     * Major versions (e.g., v1, v2) include breaking changes.
     * Minor updates and patches may be released without changing the version number but are documented.
     * Documentation is updated with each release, and clients are informed of deprecations.
   * Benefits:
     * Stability for Clients: Clients can rely on a specific API version without unexpected changes.
     * Controlled Evolution: New features and improvements can be added without disrupting existing users.
     * Backward Compatibility: Supports multiple versions simultaneously, giving clients time to migrate.


## Discussion on Further Enhancements

In a real-world application, we'd use tools like Jest and Docker to make our lives easier and our application more reliable.

Jest is like a safety net for our code. It's a testing framework that lets us write tests to check if our code is working as it should. By using Jest, we can automatically test our API endpoints, functions, and features every time we make changes. This helps catch bugs early, so we don't accidentally break something that was working before. It gives us confidence that our application behaves correctly as we add new features or fix issues.

Docker is like a shipping container for our app. It packages our application along with all its dependencies into a "container" that can run anywhere—on a developer's machine, a testing server, or in production. This means we don't have to worry about differences in environments causing problems ("it works on my computer!"). With Docker, deploying our app becomes much smoother because we know it will run the same way everywhere.

## Getting Started

### Prerequisites

* Node.js installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tristanbagnulo/yellowbox-api.git
cd locker-management-api
```
2. Install dependencies:

```bash
npm install
```
3. Start the server:

```bash
node app.js
```

## Usage

See document titled `APIDOCS.md` and example Workflow below for quick all-encompassig tutorial.

## Example Workflow

1. Register a New User

```bash
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"user@example.com\"}" http://localhost:3000/api/v1/users/register
```
Save the apiToken from the response. E.g....

```bash
{"userId":"8eb8b430-62ac-4c09-b7e3-d7735bb50727","apiToken":"Your Token"}
```


2. Start a Locker Booking

```bash
curl -X POST -H "Authorization: your-api-token" http://localhost:3000/api/v1/lockers/book/start/locker1
```
3. Check Locker Status

```bash
curl -X GET -H "Authorization: your-api-token" http://localhost:3000/api/v1/lockers/status/locker1
```

4. End a Locker Booking

```bash
curl -X POST -H "Authorization: your-api-token" http://localhost:3000/api/v1/lockers/book/end/locker1
```

5. Open a specific locker

```bash
curl -X POST -H "Authorization: your-api-token" http://localhost:3000/api/v1/lockers/open/locker1
```


## Project Structure
```go
├── app.js
├── mockDatabase.js
├── middleware
│   └── auth.js
|   └── rateLimit.js
├── models
│   ├── locker.ts
│   └── user.ts
├── routes
│   ├── users.js
│   └── lockers.js
└── package.json
└── README.md
└── APIDOCS.md
└── .gitignore
```