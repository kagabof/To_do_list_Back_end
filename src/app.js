/* eslint-disable no-console */
import config from 'dotenv';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './schema/schema';
import isAuth from './middleware/isAuth';


config.config();

const app = express();
app.use(cors());

app.use(isAuth);
app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
}));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(process.env.NODE_ENV === 'staging'
    ? 'process.env.server listen on https://back-end-to-do-list.herokuapp.com/'
    : `process.env.server listen on http://localhost: ${port}/`);
});

export default app;
