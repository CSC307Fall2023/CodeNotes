This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, get a database running. You will need Docker installed on your machine. 

```bash
docker-compose up
```

Then, make sure all your node modules are installs

```bash
npm install
```

Next, make sure you modify the .env file to have the correct information for database connection. 

Make sure the database is migrated. 

```bash
npx prisma migrate dev
```

Finally, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To add a teacher and a class to the database, run the following curl commands to add data

```bash
curl --location 'http://localhost:3000/api/users/newteacher' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email" : "teacher@gmail.com",
    "password" : "password"
}'
```

```bash
curl --location 'http://localhost:3000/api/classes' \
--header 'Content-Type: application/json' \
--data '{
    "name" : "CSC 307",
    "password" : "password",
    "description" : "Software Development",
    "teacherId" : 4
}'
```

This adds a class, called CSC 307, which has an ID of 1 and a password of 'password'


## Look at our database

```bash
npx prisma studio
```


