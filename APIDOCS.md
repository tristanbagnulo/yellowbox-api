# Endpoints

## Users

1. Create a New User Account
   * Endpoint
      * URL: /api/v1/users/register
      * Method: POST
      * Authentication: Not required

### Request
* Headers:
  * Content-Type: application/json
* Body Parameters:

| Parameter |Type	| Required	| Description| 
| - | - | - | - |
| email |string	| Yes	| User's email address.|

### Example:

```json
{
  "email": "user@example.com"
}
```
* Response
Success (201 Created):

```json
{
  "userId": "unique-user-id",
  "apiToken": "generated-api-token"
}
```
#### Error Responses:

* 400 Bad * Request:

```json
{
  "error": "Email is required."
}
```
* 409 Conflict:

```json
{
  "error": "Email already registered."
}
```
### Usage Example
* Request:

```cmd
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"user@example.com\"}" http://localhost:3000/api/v1/users/register
```
* Response:

```json
{
  "userId": "abc123",
  "apiToken": "def456"
}
```

## Lockers

2. Start a Locker Booking
   * Endpoint
     * URL: /api/v1/lockers/book/start/{lockerId}
     * Method: POST
     * Authentication: Required

### Request
* Headers:
Authorization: your-api-token

* Path Parameters:

| Parameter |Type	| Required	| Description| 
| - | - | - | - |
| email |string	| Yes	| ID of the locker.|

* Body Parameters: None

#### Success Response
Success (200 OK):

```json
{
  "message": "Locker {lockerId} booked successfully."
}
```
#### Error Responses:

* 400 Bad * Request:

```json
{
  "error": "Locker ID is required."
}
```

* 401 Unauthorized:

```json
{
  "error": "Invalid API token."
}
```

* 404 Not Found:
```json
{
  "error": "Locker not found."
}
```

* * 409 Conflict:

```json
{
  "error": "Locker is already occupied."
}
```

### Usage Example
* Request:

```cmd
curl -X POST -H "Authorization: def456" http://localhost:3000/api/v1/lockers/book/start/locker1
```

* Response:

```json
{
  "message": "Locker locker1 booked successfully."
}
```

3. End a Locker Booking
* Endpoint
  * URL: /api/v1/lockers/book/end/{lockerId}
  * Method: POST
  * Authentication: Required

### Request
  * Headers:

* Authorization: your-api-token
* Path * 409 Conflict:s:

Parameter	Type	Required	Description
lockerId	string	Yes	ID of the locker.
* Body Parameters: None

#### Success Response
* Success (200 OK):

```json
{
  "message": "Locker {lockerId} booking ended."
}
```

#### Error Responses:

* 400 Bad * Request:

```json
{
  "error": "Locker ID is required."
}
```

* 401 Unauthorized:

```json
{
  "error": "Invalid API token."
}
```

* 403 Forbidden:

```json
{
  "error": "You did not book this locker."
}
```

* 404 Not Found:

```json
{
  "error": "Locker not found."
}
```

### Usage Example
* Request:

```cmd
curl -X POST -H "Authorization: def456" http://localhost:3000/api/v1/lockers/book/end/locker1
```
* Response:

```json
{
  "message": "Locker locker1 booking ended."
}
```

4. Retrieve the Status of a Locker
Endpoint
* URL: /api/v1/lockers/status/{lockerId}
* Method: GET
* Authentication: Required
### Request
* Headers:

* Authorization: your-api-token
* Path Parameters:

| Parameter |Type	| Required	| Description| 
| - | - | - | - |
| email |string	| Yes	| ID of the locker.|

* Body Parameters: None

#### Success Response

* Success (200 OK):

```json
{
  "lockerId": "locker1",
  "status": "available",
  "currentUserId": null,
  "bookingStart": null,
  "bookingEnd": null,
  "location": "Floor 1, Section A"
}
```

#### Error Responses:

* 400 Bad * Request:

```json
{
  "error": "Locker ID is required."
}
```

* 401 Unauthorized:

```json
{
  "error": "Invalid API token."
}
```

* 404 Not Found:

```json
{
  "error": "Locker not found."
}
```

#### Usage Example
* Request:

```cmd
curl -X GET -H "Authorization: def456" http://localhost:3000/api/v1/lockers/status/locker1
```

* Response:

```json
{
  "lockerId": "locker1",
  "status": "occupied",
  "currentUserId": "abc123",
  "bookingStart": "2023-10-22T12:45:00.000Z",
  "bookingEnd": null,
  "location": "Floor 1, Section A"
}
```

5. Open a Specific Locker
   * Endpoint
   * URL: /api/v1/lockers/open/{lockerId}
   * Method: POST
   * Authentication: Required

    ####  Request
   * Headers:
     * Authorization: your-api-token
     * Path Parameters:

        | Parameter |Type	| Required	| Description| 
        | - | - | - | - |
        | email |string	| Yes	| ID of the locker.|
   * Body Parameters: None

#### Success Response
* Success (200 OK):

```json
{
  "message": "Locker {lockerId} opened successfully."
}
```

#### Error Responses:

* 400 Bad * Request:

```json
{
  "error": "Locker is not currently booked."
}
```

* 401 Unauthorized:

```json
{
  "error": "Invalid API token."
}
```

* 403 Forbidden:
```json
{
  "error": "You did not book this locker."
}
```

* 404 Not Found:
```json
{
  "error": "Locker not found."
}
```

### Usage Example
* Request:

```cmd
curl -X POST -H "Authorization: def456" http://localhost:3000/api/v1/lockers/open/locker1
```

* Response:


```json
{
  "message": "Locker locker1 opened successfully."
}
```

### Usage Examples
Complete Workflow
#### Step 1: Register a New User
```cmd
curl -X POST -H "Content-Type: application/json" -d "{\"email\":\"user@example.com\"}" http://localhost:3000/api/v1/users/register
```

* Sample * Response:

```json
{
  "userId": "abc123",
  "apiToken": "def456"
}
```

#### Step 2: Start a Locker Booking
```cmd
curl -X POST -H "Authorization: def456" http://localhost:3000/api/v1/lockers/book/start/locker1
```

* Sample * Response:

```json
{
  "message": "Locker locker1 booked successfully."
}
```

#### Step 3: Retrieve Locker Status
```cmd
curl -X GET -H "Authorization: def456" http://localhost:3000/api/v1/lockers/status/locker1
```

* Sample * Response:

```json
{
  "lockerId": "locker1",
  "status": "occupied",
  "currentUserId": "abc123",
  "bookingStart": "2023-10-22T12:45:00.000Z",
  "bookingEnd": null,
  "location": "Floor 1, Section A"
}
```

#### Step 4: Open the Locker
```cmd
curl -X POST -H "Authorization: def456" http://localhost:3000/api/v1/lockers/open/locker1
```

* Sample * Response:

```json
{
  "message": "Locker locker1 opened successfully."
}
```

#### Step 5: End the Locker Booking
```cmd
curl -X POST -H "Authorization: def456" http://localhost:3000/api/v1/lockers/book/end/locker1
```

* Sample * Response:

```json
{
  "message": "Locker locker1 booking ended."
}
```