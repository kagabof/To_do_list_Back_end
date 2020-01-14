/* eslint-disable no-console */
import config from 'dotenv';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import schema from './src/schema/schema';


config.config();

const app = express();
app.use(cors());


app.use('/', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(3000, () => {
  console.log('server listen on http://localhost:3000/');
});

export default app;
