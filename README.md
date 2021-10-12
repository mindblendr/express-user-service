# Kiosk User Service

Kiosk User Service is an app of compilation of user services.

## Installation

You need [nodejs](https://nodejs.org/en/) and its [npm](https://nodejs.org/en/) in order to deploy this app.

To install the packages:
```bash
npm install
```
## Starting The Service

Run the application:

```bash
npm run dev
```
or
```bash
npm run start
```

## Running local redis servers

In order to test locally, you need 2 redis servers. 1 for session caching, and another for the pub/sub. Run this twice with 2 different PUBLIC_PORTs.

```bash
docker run --name <REDIS_SERVER_NAME> -p <PUBLIC_PORT>:6379 -d redis
```

## Using sequelize-cli with MAIN_DB_URL

When using the sequelize-cli, you may use the --url parameter to execute your command.

```bash
sequelize-cli db:migrate --url "mysql://root@localhost:3306/sample_db"
```