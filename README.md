# Memories App

### <h2 align="center"> 💫💫💫 &nbsp; [Live Demo](https://hao-memories-mern-app.netlify.app/) 💫💫💫 </h2>

Full Stack "R"ERN Application - from start to finish.

The App is called "Memories" and it is a simple social media app that allows users to post interesting events that happened in their lives. with real app features like user authentication and social login using Google accounts and **REDIS database**.

- Redis is an open-source (BSD-licensed), high-performance key value database and in-memory data structure store used as a database, cache, and message broker. Redis has excellent read-write performance, fast IO read-write speed from memory, and supports read-write frequencies of more than 100k + per second.

# Overview video (Optional)

Here's a short video that explains the project and how it uses Redis:

[![Embed your YouTube video](https://i.ytimg.com/vi/vyxdC1qK4NE/maxresdefault.jpg)](https://www.youtube.com/watch?v=vyxdC1qK4NE)

## How it works

### How the data is stored:

Refer to [this example](https://github.com/redis-developer/basic-analytics-dashboard-redis-bitmaps-nodejs#how-the-data-is-stored) for a more detailed example of what you need for this section.

### How the data is accessed:

Refer to [this example](https://github.com/redis-developer/basic-analytics-dashboard-redis-bitmaps-nodejs#how-the-data-is-accessed) for a more detailed example of what you need for this section.

### Performance Benchmarks

[If you migrated an existing app to use Redis, please put performance benchmarks here to show the performance improvements.]

## How to run it locally?

- Fork this repo and run the `git clone <forked repo>` command from your terminal/bash
- Make a copy of the `.env.example` file by running the command:

```
$ cp  .env.example .env
```

- Insert the correct values for the environmental variables

- Run the following command to start the application

```
$ npm install concurrently
$ npm install-all
$ npm run dev (to run both React client and Node server side development)
```

> To start Redis Stack developer container using the redis-stack image, run the following command in your terminal:

```
$ docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

> For Google client Id you have to visit [Google developers console](https://console.cloud.google.com/apis/dashboard?pli=1) from here generate your respective client Id Ensure the first line of the env file contains the REACT_APP_GOOGLE_API_TOKEN REDIS_HOST = `redis://localhost:6379`

- Backend server will be running on http://localhost:3005
- Frontend server will be running on http://localhost:3000

### Prerequisites

- Node - v16.16.0
- NPM - v8.11.0
- Docker - v20.10.16

### Local installation

- Run the command below in your rooot directory:

```
$ npm install concurrently
$ npm install-all
```

- Note: This installs all dependencies for the client and the server simultaneously

## Deployment

To make deploys work, you need to create free account on [Redis Cloud](https://redis.info/try-free-dev-to)

### Heroku

[Insert Deploy on Heroku button](https://devcenter.heroku.com/articles/heroku-button)

### Netlify

[Insert Deploy on Netlify button](https://www.netlify.com/blog/2016/11/29/introducing-the-deploy-to-netlify-button/)
