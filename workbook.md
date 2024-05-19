# Strategy for Stateless Chat Room Using Redis

## Requirements

- This app should allow user-to-user chat without using Socket.io, meaning it should be stateless.
- A user can create a unique chat room and share the Room Id or the URL with another user to join and start chatting.
- Utilize Redis for storing and managing chat data.

## Approach

    - Frontend(Next.js)
        - Chat Home Page
            - User can create a new chat room
            - User can join an existing chat room
        - Chat Room Page
            - User can send messages
            - User can see messages from other users

    - Backend(Next.js API)
        - Create Chat Room
            - Generate a unique Room Id
            - Store the Room Id in Redis
        - Join Chat Room
            - Get Room Id from the user or the URL
            - Check if the Room Id exists in Redis
        - Send Message
            - Store the message in Redis
        - Get Messages
            - Get all messages from Redis

## Redis Setup

    - Install Redis
    - Start Redis Server
    - Connect to Redis Server
    - Create Redis Client

## How to Use

    - Clone the Repository
    - Install the dependencies
    - Start the Redis Server
    - Fill all the required environment variables in `.env` file
    - Start the Next.js Server
    - Open the Browser and go to `http://localhost:3000`
    - Click the User Chat Button to go to user chat section

## Some Improvements can be done

    - User Sign Up was not working hence simple username was used
    - User Sign Up can be added
    - Styling
    - Delete the Room by creator
