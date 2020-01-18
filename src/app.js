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
  console.log('server listen on http://localhost:3000/');
});

export default app;
