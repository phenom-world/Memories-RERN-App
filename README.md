# Memories App

### <h2 align="center"> 💫💫💫 &nbsp; [Live Demo](https://memories-app-redis.netlify.app) 💫💫💫 </h2>

Full Stack "R"ERN Application - from start to finish.

The App is called "Memories" and it is a simple social media app that allows users to post interesting events that happened in their lives. with real app features like user authentication and social login using Google accounts and **REDIS database**.

- Redis is an open-source (BSD-licensed), high-performance key value database and in-memory data structure store used as a database, cache, and message broker. Redis has excellent read-write performance, fast IO read-write speed from memory, and supports read-write frequencies of more than 100k + per second.

# Overview video (Optional)

Here's a short video that explains the project and how it uses Redis:

[![Embed your YouTube video](https://github.com/phenom-world/Memories-RERN-App/blob/main/docs/cover.png)](https://www.youtube.com/watch?v=u6_c0e6xrY4&t=35s)

## How it works

- Redis OM (pronounced REDiss OHM) makes it easy to add Redis to your Node.js application by mapping the Redis data structures you know and love to classes that you define. No more pesky, low-level commands, just pure code with a fluent interface.

#### User

```
const userSchema = new Schema(
  User,
  {
    name: {
      type: "string",
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
  },
  {
    dataStructure: "JSON",
  }
);

await userSchema.createIndex(); // Builds the index for user repository

```

#### Posts

```
const postSchema = new Schema(
  Post,
  {
    title: { type: "text" },
    message: { type: "text" },
    name: { type: "string" },
    creator: { type: "string" },
    tags: { type: "text" },
    selectedFile: { type: "string" },
    likes: { type: "string[]" },
    comments: { type: "string[]" },
    createdAt: { type: "date", sortable: true },
  },
  {
    dataStructure: "JSON",
  }
);

await postSchema.createIndex(); // Builds the index for post repository

```

For simplicity, a unique key index with an hash value is created when a user or post is created and creates a new hashed index for subsequently added new repositories. This index key is unique for each repository, User and Post data are then stored in the redis database

> The created unique index keys allows you to perform search on each of the repository

### How the data is stored:

- The user and post data are stored in various keys and various data types.

* For each of user, key like: `User:{userId}` is generated and data is stored like:

  - email: like johndoe@gmail.com
  - password: Encrypted password
  - name: Wakeel Kehinde

* For each of the post, key like: `Post:{postId}` is generated and data is stored like:
  - title: "My memory"
  - message: "Blissful memory"
  - name: "Wakeel Kehinde"
  - creator:"01GBMJVW68YR91FA94Y32NB6FZ" (an entityId of a user)
  - tags: "New, Honey, Moon"
  - selectedFile:"react-string"
  - likes:[ "01GBMJVW68YR91FA94Y32NB6FZ"] (an array of entityId of a user)
  - comments:["wow", "interesting"]
  - createdAt: 1661720826.775 (date stored in milliseconds)

### How the data is accessed:

- if an object's entityId is known, such object can be accessed using .fetch method on the repository

  const post = await postRepository.fetch(req.params.id)

  e.g:

  ```
  post.title // "My memory"
  post.message // "Blissful memory"
  post.name // "Wakeel Kehinde"
  post.creator // "01GBMJVW68YR91FA94Y32NB6FZ" (an entityId of a user)
  post.tags // "New, Honey, Moon"
  post.selectedFile // "react-string"
  post.likes // [ "01GBMJVW68YR91FA94Y32NB6FZ"] (an array of entityId of a user)
  post.comments // ["wow", "interesting"]
  post.createdAt // 1661720826.775 (date stored in milliseconds)
  ```

- to access all data for a particular repository or perform any partial searche: Using RediSearch with Redis OM is where the power of this fully armed and operational battle station starts to become apparent. If you have RediSearch installed(which is installed along with latest Redis stack) on your Redis server you can use the search capabilities of Redis OM. This enables commands like:

  ```
  const posts = await postRepository.search()
  .where('name').equals('Wakeel')
  .and('tags').match('New')
  .return.all()
  ```

- The above returns the posts with precisely name `Wakeel` and any tags that matches `New`

- Recall that we built the index both user and post repository, this allows you to perform Redis searches on the repositories.

> If you change your schema, no worries. Redis OM will automatically rebuild the index for you. Just call `.createIndex` again. And don't worry if you call .`createIndex` when your schema hasn't changed. Redis OM will only rebuild your index if the schema has changed. So, you can safely use it in your startup code.



- Also, you can find all posts and return them with the command, This will return all of the posts that you've put in Redis:

```
const posts = await postRepository.search().return.all()
```

- You can page through the results and sort in descending or ascending order. Just pass in the zero-based offset and the number of results you want:

```
const offset = 8
const count = 10
const posts = await postRepository.search().sortDescending("createdAt").return.page(offset, limit);
```

- To access the first post. You can easily grab the first result of your search with .first:

```
const firstPost = await postRepository.search().return.first();
Note: If you have no posts, this will return null.
```

### Performance Benchmarks

<img src="https://github.com/phenom-world/Memories-RERN-App/blob/main/docs/response3.png" width="50%" height="auto">
<img src="https://github.com/phenom-world/Memories-RERN-App/blob/main/docs/response2.png" width="50%" height="auto">

- The first frame represents the response from the endpoint with MONGODB database
- The second frame represents the response from the endpoint with REDIS database which implies more than 3x faster response

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

> For Google client Id you have to visit [Google developers console](https://console.cloud.google.com/apis/dashboard?pli=1) from here generate your respective client Id Ensure the first two lines of the env file contains the REACT_APP_GOOGLE_API_TOKEN and REACT_APP_BASE_URL

> REDIS_HOST = `redis://localhost:6379`

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

[Deployed Backend Link](https://memories-app-redis.herokuapp.com)

### Netlify

[Frontend Memories App](https://memories-app-redis.netlify.app)
