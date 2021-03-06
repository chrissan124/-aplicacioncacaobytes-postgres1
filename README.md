# Cacao Admin API

### API Version

`/api/v1`

### Requirements

- **Node.js**
  You can download the lasted Node version [here](https://nodejs.org/es/)

### Setup

- Install dependencies:

```shell
npm i
```

- Setup .env file:

  You should follow `.env.example` to see required variables

- Setup databases:

  1. Create your databases, under the same name you put in `.env`. _Note: dont't worry about tables or collections, the API will set them up._
  2. Create your no sql database, under the same name you put in `.env`

- Setup first user:

  When setting up from scratch, you have to create your first user:

  1. Create a `user.json` file with your user data inside src. _(there's a `user.example.json` file to copy its format)_
  2. Run the API (`npm run dev`). Then, make a request to `/setup-user`
  3. Check the response to see if the result is successful, otherwise an error message will be displayed.
  4. Now, you can start using our API by getting a token from `auth/access`, providing your _user_ and _email_.

### Scripts

- Run the project locally:

```shell
    npm run dev
```

- Build only:

```shell
    npm run build
```

- Run build with nodemon:

```shell
    npm run watch:dev
```

### API Reference

#### 🐍 TODO 🐍
