# Quote Generator

The following project named **Quote Generator** is a simple app that generates random quotes and displays it to the user, organizing it by tags. It has a secure user system required to access the app.

## Getting Started
Make sure you have **docker** installed in your computer. I recommend installing the [Docker Desktop](https://www.docker.com/products/docker-desktop/) app which includes **docker** and offers a user interface to easily manage your docker.

Edit your hosts file (you can find it in `/etc/hosts` on a MacOS or Linux, or in `C:\Windows\System32\drivers\etc\hosts` on Windows) and add the following line:
```
127.0.0.1 host.docker.internal
```
This will be essential for the frontend to communicate correctly via the client with its internal configuration.

Clone the project repo from GitHub:
```bash
git clone git@github.com:foxviewr/quote-generator.git
cd quote-generator/
```

Copy the existing file `.env.dev.example` into `.env` and customize your environment variables. For development, all default values should work for you (you still need to set passwords and secret keys).
```bash
cp .env.dev.example .env
nano .env # edit the file variables (nano is an example)
```


Install the project docker services:
```bash
make docker-install
```

Run the project docker containers
```bash
make docker-start
```
After the docker containers start, it might take a moment to install all `npm` dependencies, specially at first run.

Once the containers are fully running, you can access the app at `http://localhost:${FRONTEND_PORT}`

Initially the database is empty of data, so start by creating a user, logging in with it, and generating new quotes, all through the app UI.

## Notes

The app is divided into 3 docker services:
1. `db` this is a database container built with `postrgre`. The data is stored in the `.pgdata` folder in the project's root directory.
2. `backend` this is a custom container built with `node.js` that serves as a backend API to deal with all the logic and connect with the `db` database container. Developed using the `nestjs` framework with `prisma` ORM.
3. `frontend` this is a custom container built with `node.js` that serves as a frontend UI for the user and connects with the `backend` API container. Developed using `react` and the `nextjs` framework with `tailwind` css framework.

The project's `makefile` has various targets that could be interesting for development. Check the `./makefile` file to view all available targets and what they do.
