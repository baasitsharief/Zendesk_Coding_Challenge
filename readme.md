## Usage

```
npm install
```

from both backend and frontend folder

## Starting the backend nodejs server

Before starting the backend server change the environment variables in the dummy .env file in backend folder.

For example -

replace 
  1. {subdomain} with your subdomain,
  2. {user id or user_token} with user id or taken
  3. {password or auth_token} with the password or generated oauth token

```
URL = "https://mysubdomain.zendesk.com/api/v2/tickets.json"
USER = "abc@gmail.com/token"
TOKEN = "8JRyFE0wybPIrerkayBbG12himcyMrxYpJHZiw7k"
TICKET_URL = "https://mysubdomain.zendesk.com/api/v2/tickets/"
```

from backend folder

```
nodemon start server.js
```

## Starting the frontend react app

from frontend folder

```
yarn start
```
