/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../app';


chai.should();
let userId;
let userToken;
const userTokens = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthZ2Fib0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZV9zZWN1cmVfdXJsIjpudWxsLCJpbWFnZV91cmwiOm51bGwsImlkIjo1LCJpYXQiOjE1NzkzODY1MzksImV4cCI6MTU3OTM4NjU0MH0.pA8HpLY0T8CQxJMN1RQWvcJN_ax8J5WnvgfTt8Hcwtc';

describe('GraphQL', () => {
  it('isAuthshould be fau', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ query: '{ User(id: 2) {name age email } }' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('No user found');
        done();
      });
  });

  it('should not find a user', (done) => {
    request(app).post('/')
      .send({ query: '{ User(id: 2) {name age email } }' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('No user found');
        done();
      });
  });

  it('should find empty array', (done) => {
    request(app).post('/')
      .send({ query: '{ Users {name age email } }' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('No user found');
        done();
      });
  });

  it('should signup with user mugish', (done) => {
    request(app).post('/')
      .send({ query: 'mutation{ CreateUser(name: "mugisha", email: "fofo@gmail.com", password: "Fofo1@", age: 30, role: "admin"){ id name email }}' })
      .expect(200)
      .end((err, res) => {
        userId = res.body.data.CreateUser.id;
        res.body.data.CreateUser.name.should.equal('mugisha');
        done();
      });
  });

  it('should not signin with a bad email', (done) => {
    request(app).post('/')
      .send({ query: '{ Signin (email: "fof@gmail.com", password: "Fofo1@"){ token name } }' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('Invalid user name or password');
        done();
      });
  });

  it('should signin with user mugish', (done) => {
    request(app).post('/')
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ name token } }' })
      .expect(200)
      .end((err, res) => {
        const { name } = res.body.data.Signin;
        name.should.equal('mugisha');
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should signin with user mugish with the token', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ token name } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Signin.name.should.equal('mugisha');
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should signin with user mugish with expired token', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${userTokens}`)
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ token name } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Signin.name.should.equal('mugisha');
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should signin with user mugish with the rong token', (done) => {
    request(app).post('/')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthZ2Fib0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZV9zZWN1cmVfdXJsIjpudWxsLCJpbWFnZV91cmwiOm51bGwsImlkIjo1LCJpYXQiOjE1NzkyNzg4MzEsImV4cCI6MTU4MTg3MDgzMX0.UJeJeXp2YXRMJzZKXfRQWiHB-fNK5LTpu89VXRC9I2c')
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ token name } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Signin.name.should.equal('mugisha');
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should find shoud find user mugisha', (done) => {
    request(app).post('/')
      .send({ query: `{ User(id: ${userId} ) {name age email } }` })
      .expect(200)
      .end((err, res) => {
        res.body.data.User.name.should.equal('mugisha');
        done();
      });
  });

  it('should find an array', (done) => {
    request(app).post('/')
      .send({ query: '{ Users { name age email } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Users.length.should.equal(1);
        done();
      });
  });
});
