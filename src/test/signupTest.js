/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../../app';


chai.should();
let userId;

describe('GraphQL', () => {
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
