# Lokkeroom

### features

-   Users can sign up using an email and a password
-   Users can log in using their email and password
-   User can create a message lobby (and become the admin of said lobby)
-   Users can view message from their lobby
-   Users can post message on their lobby
-   Users can edit their own message



### List of endpoints
| Endpoint                           | Method | Bearer token? | Admin only | Request                                      | Response                                                                                                 |
| ---------------------------------- | ------ | ------------- | ---------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| /api/register                      | POST   |               |            | An object containing a login, and a password | A message stating the user has been created (or the approriate error, if any)                            |
| /api/login                         | POST   |               |            | An object containing a login, and a password | A JSON Web Token/session ID (or the approriate error, if any)                                            |
| /api/lobby/[lobby-id]              | GET    | yes           |            | -                                            | An array containing all the message from the lobby                                                       |
| /api/lobby/[lobby-id]/[message-id] | GET    | yes           |            | -                                            | A single message object from the lobby                                                                   |
| /api/lobby/[lobby-id]              | POST   | yes           |            | An object containing the message             | A message stating the message has been posted (or the approriate error, if any)                          |
| /api/users                         | GET    | yes           | (yes)      | -                                            | All the users from the same lobby                                                                        |
| /api/users/[user-id]               | GET    | yes           |            | -                                            | A single user. If the user is not an admin, can only get details from people that are in the same lobby. |
| /api/lobby/[lobby-id]/add-user     | POST   | yes           | yes        | The user to add to the lobby                 | Add an user to a lobby                                                                                   |
| /api/lobby/[lobby-id]/remove-user  | POST   | yes           | yes        | The user to remove from the lobby            | Removes an user from the lobby                                                                           |
| /api/lobby/[message-id]            | PATCH  | yes           | (yes)      | An object containing the message patches     | Edit a message. Users can only edit their own messages, unless they are admins.                          |
| /api/messages/[message-id]         | DELETE | yes           | (yes)      | -                                            | Delete a message. Users can only edit their own messages, unless they are admins.                        |

## To Do List

### Setup
- [x] Initialize a new Node.js project
- [x] Install necessary dependencies (Express, PostgreSQL/MariaDB client, JWT, etc.)
- [x] Set up the project structure
- [x] Configure the database connection

### User Authentication
- [x] Implement user registration endpoint (`/api/register`)
- [x] Implement user login endpoint (`/api/login`)
- [ ] Set up JWT authentication middleware

### Lobby Management
- [x] Implement endpoint to create a message lobby (`/api/lobby`)
- [x] Implement endpoint to add a user to a lobby (`/api/lobby/[lobby-id]/add-user`)
- [x] Implement endpoint to remove a user from a lobby (`/api/lobby/[lobby-id]/remove-user`)

### Message Management
- [x] Implement endpoint to get all messages from a lobby (`/api/lobby/[lobby-id]`)
- [x] Implement endpoint to get a single message from a lobby (`/api/lobby/[lobby-id]/[message-id]`)
- [x] Implement endpoint to post a message to a lobby (`/api/lobby/[lobby-id]`)
- [x] Implement endpoint to edit a message (`/api/lobby/[message-id]`)
- [x] Implement endpoint to delete a message (`/api/messages/[message-id]`)

### User Management
- [x] Implement endpoint to get all users from the same lobby (`/api/users`)
  
  <!-- TODO : Needs to add authentication with JWT token  -->
- [ ] Implement endpoint to get a single user (`/api/users/[user-id]`)

### Deployment
- [ ] Set up environment variables for production
- [ ] Deploy the application to a cloud provider (e.g., Heroku, AWS)

### Testing 
-[] Testing the app