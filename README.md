# crypto_app

This is a web-app which allows you to see current prices of crypto coins and their charts. The backend of this project is connected to the database from which it takes all the data. The database auto-updates each day at 2PM.

To get this website running, you need to create two separate enviroments to run servers on.
For the first server go to:

```bash
cd backend
```

and continue with the backend section.

For the second server go to:

```bash
cd frontend
```

and continue with the frontend section.

# backend

First, download all the necessary files for the project:

```bash
npm install
```

Second, run the development server:

```bash
npm run dev
```

# frontend

First, download all the necessary files for the project:

```bash
npm install
```

Second, run the development server:
(make sure that your backend server (:4000) is running before you run this port)

```bash
npm run dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the website.
