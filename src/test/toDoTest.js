/* eslint-disable no-undef */
import chai from 'chai';
import request from 'supertest';
import app from '../app';
import token from './signupTest';
import listId from './toDoListTest';

chai.should();

describe('GraphQL to do test', () => {
  it('should create to do', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        query: `mutation{
            CreateToDo(toDoListId: ${parseInt(listId.id, 10)},
                title: "meeting",
                description: "with joseph",
                location: "Kigali"){
                title
                startTime
                endTime
                location
                description
            }
            }`,
      })
      .expect(200)
      .end((err, res) => {
        res.body.data.CreateToDo.title.should.equal('meeting');
        done();
      });
  });

  it('should not create to do with no title', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        query: `mutation{
            CreateToDo(toDoListId: ${parseInt(listId.id, 10)},
                description: "with joseph",
                location: "Kigali"){
                title
                startTime
                endTime
                location
                description
            }
            }`,
      })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('Field "CreateToDo" argument "title" of type "String!" is required, but it was not provided.');
        done();
      });
  });

  it('should not create to do with no list id', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        query: `mutation{
            CreateToDo(
                title: "meeting",
                description: "with joseph",
                location: "Kigali"){
                title
                startTime
                endTime
                location
                description
            }
            }`,
      })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.should.equal('Field "CreateToDo" argument "toDoListId" of type "Int!" is required, but it was not provided.');
        done();
      });
  });

  it('should not create to do with no token', (done) => {
    request(app).post('/')
      .send({
        query: `mutation{
            CreateToDo(toDoListId: ${parseInt(listId.id, 10)},
                title: "meeting",
                description: "with joseph",
                location: "Kigali"){
                title
                startTime
                endTime
                location
                description
            }
            }`,
      })
      .expect(200)
      .end((err, res) => {
        res.body.errors[0].message.message.should.equal('Please signup or signin for creating a to do list!');
        done();
      });
  });

  it('should find an all users will all todo list and to do', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        query: `{
        Users{
          id
          firstName
          age
          email
          createdAt
          toDoList{
            id
            type
            title
            toDo{
              title
              id
              description
              location
            }
          }
        }
      }`,
      })
      .expect(200)
      .end((err, res) => {
        res.body
          .data.Users[1]
          .toDoList[0].toDo[0]
          .title.should.equal('meeting');
        done();
      });
  });

  it('should find all todo list', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        query: `{
          GetAllToDo{
            id
            title
            description
            location
            toDoListId
          }
        }`,
      })
      .expect(200)
      .end((err, res) => {
        res.body.data.GetAllToDo[0].id
          .should.equal('1');
        done();
      });
  });

  it('should find all todo', (done) => {
    request(app).post('/')
      .set('Authorization', `Bearer ${token.token}`)
      .send({
        query: `{
          GetAllToDoList{
            title
            type
            toDo{
                title
            }
          }
        }`,
      })
      .expect(200)
      .end((err, res) => {
        res.body.data.GetAllToDoList[0].toDo[0].title
          .should.equal('meeting');
        done();
      });
  });
});
