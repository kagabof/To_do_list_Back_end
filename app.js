import config from 'dotenv';
import express from 'express';
import graphqlHTTP  from 'express-graphql';
import schema from './src/schema/schema';
import cors from 'cors';

config.config();

const app = express();

app.use(cors());

app.use('/', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(3000, () => {
    console.log('server listen on http://localhost:3000/')
});


