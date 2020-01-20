/* eslint-disable no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../app';
import token from './signupTest';


chai.should();

describe('GraphQL to do list test', () => {
  it('should create to do list', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({ query: 'mutation{CreateToDoList(type: "list", title: "setup to do project"){type title }}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.CreateToDoList.type.should.equal('list');
        done();
      });
  });
  it('should create to do list with no title', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({ query: 'mutation{CreateToDoList(description: "hello me"){ description }}' })
      .expect(200)
      .end((err, res) => {
        res.body.data.CreateToDoList.description.should.equal('hello me');
        done();
      });
  });
  it('should not create to do list without a token', (done) => {
    request(app).post('/')
      .send({ query: 'mutation{CreateToDoList(type: "list", title: "setup to do project"){type title }}' })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('Please signup or signin for creating a to do list!');
        done();
      });
  });
});
