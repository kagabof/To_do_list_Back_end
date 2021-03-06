/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../app';


chai.should();
let userId;
let userToken;
const token = {
  token: userToken,
};
const userTokens = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthZ2Fib0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZV9zZWN1cmVfdXJsIjpudWxsLCJpbWFnZV91cmwiOm51bGwsImlkIjo1LCJpYXQiOjE1NzkzODY1MzksImV4cCI6MTU3OTM4NjU0MH0.pA8HpLY0T8CQxJMN1RQWvcJN_ax8J5WnvgfTt8Hcwtc';

describe('GraphQL', () => {
  it('isAuthshould be fau', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ query: '{ User(id: 2) {firstName age email } }' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('No user found');
        done();
      });
  });

  it('should not find a user', (done) => {
    request(app).post('/')
      .send({ query: '{ User(id: 2) {firstName age email } }' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('No user found');
        done();
      });
  });

  it('should find an array', (done) => {
    request(app).post('/')
      .send({ query: '{ Users {firstName age email } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Users.should.be.a('Array');
        done();
      });
  });

  it('should signup with user mugish', (done) => {
    request(app).post('/')
      .send({ query: 'mutation{ CreateUser(firstName: "mugisha", email: "fofo@gmail.com", password: "Fofo1@", age: 30, role: "admin"){ id firstName email }}' })
      .expect(200)
      .end((err, res) => {
        userId = res.body.data.CreateUser.id;
        res.body.data.CreateUser.firstName.should.equal('mugisha');
        done();
      });
  });

  it('should not signin with a bad email', (done) => {
    request(app).post('/')
      .send({ query: '{ Signin (email: "fof@gmail.com", password: "Fofo1@"){ token firstName } }' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('Invalid user name or password');
        done();
      });
  });

  it('should signin with user mugish', (done) => {
    request(app).post('/')
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ firstName token } }' })
      .expect(200)
      .end((err, res) => {
        const { firstName } = res.body.data.Signin;
        firstName.should.equal('mugisha');
        token.token = res.body.data.Signin.token;
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should signin with user mugish with the token', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ token firstName } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Signin.firstName.should.equal('mugisha');
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should signin with user mugish with expired token', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${userTokens}`)
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ token firstName } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Signin.firstName.should.equal('mugisha');
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should signin with user mugish with the rong token', (done) => {
    request(app).post('/')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthZ2Fib0BnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZV9zZWN1cmVfdXJsIjpudWxsLCJpbWFnZV91cmwiOm51bGwsImlkIjo1LCJpYXQiOjE1NzkyNzg4MzEsImV4cCI6MTU4MTg3MDgzMX0.UJeJeXp2YXRMJzZKXfRQWiHB-fNK5LTpu89VXRC9I2c')
      .send({ query: '{ Signin (email: "fofo@gmail.com", password: "Fofo1@"){ token firstName } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Signin.firstName.should.equal('mugisha');
        userToken = res.body.data.Signin.token;
        done();
      });
  });

  it('should find shoud find user mugisha', (done) => {
    request(app).post('/')
      .send({ query: `{ User(id: ${userId} ) {firstName age email } }` })
      .expect(200)
      .end((err, res) => {
        res.body.data.User.firstName.should.equal('mugisha');
        done();
      });
  });

  it('should find an array', (done) => {
    request(app).post('/')
      .send({ query: '{ Users { firstName age email id } }' })
      .expect(200)
      .end((err, res) => {
        res.body.data.Users.length.should.equal(2);
        done();
      });
  });
});


export default token;
