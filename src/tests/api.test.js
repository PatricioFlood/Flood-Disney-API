const chai = require('chai')
const chaiHttp = require('chai-http')
require('chai').should()
const server = require('../index')
const config = require('../utils/config')


chai.use(chaiHttp)

describe('API Tests', () => {

  let token = null

  before((done) => {
    const user = config.TEST_USER
    chai.request(server)
      .post('/auth/login')
      .send(user)
      .end((error, resp) => {
        token = resp.body.token
        done()
      })
  })

  // Auth TESTS

  describe('Auth', () => {
    describe('POST /auth/register with missing required fields', () => {
      const user = {
        name: 'Testing',
        password: 'test123'
      }
      it('It should respond with a 400 error "field is required"',
        (done) => {
          chai.request(server)
            .post('/auth/register')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(user)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('email is required')
              done()
            })
        })
    })

    describe('POST /auth/register with an existing email', () => {
      const user = { ...config.TEST_USER, name: 'Testing' }
      it('It should respond with a 400 error "email already exists"',
        (done) => {
          chai.request(server)
            .post('/auth/register')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(user)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('email already exists')
              done()
            })
        })
    })

    describe('POST /auth/login with nonexistent email', () => {
      const user = {
        email: 'thisemail@notexists.com',
        password: 'test123'
      }
      it('It should respond with a 400 "invalid email or password"',
        (done) => {
          chai.request(server)
            .post('/auth/login')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(user)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('invalid email or password')
              done()
            })
        })
    })

    describe('POST /auth/login with incorrect password', () => {
      const user = { ...config.TEST_USER, password: 'incorrectPassword' }

      it('It should respond with a 400 "invalid email or password"',
        (done) => {
          chai.request(server)
            .post('/auth/login')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(user)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('invalid email or password')
              done()
            })
        })
    })

  })

  // Characters TESTS

  describe('Characters', () => {
    describe('POST /characters with missing required fields', () => {
      const character = { age: 15 }
      it('It should respond with a 400 error "field is required"',
        (done) => {
          chai.request(server)
            .post('/characters')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(character)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('name is required')
              done()
            })
        })
    })

    describe('POST /characters with malformed fields', () => {
      const character = {
        name: 'Pluto',
        age: 'Red' // should be an integer
      }
      it('It should respond with a 400 error "malformed field"',
        (done) => {
          chai.request(server)
            .post('/characters')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(character)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('malformed field')
              done()
            })
        })
    })

    describe('POST /characters with malformed body', () => {
      const character = '{"invalid"}'
      it('It should respond with a 400 error "malformed body"',
        (done) => {
          chai.request(server)
            .post('/characters')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(character)
            .type('json')
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('malformed body')
              done()
            })
        })
    })

    describe('GET /characters/{characterId} with nonexistent characterId', () => {
      const characterId = 99999999
      it('It should respond with a 404 error',
        (done) => {
          chai.request(server)
            .post(`/characters/${characterId}`)
            .set({ 'Authorization': `Bearer ${token}` })
            .end((error, resp) => {
              resp.should.have.status(404)
              done()
            })
        })
    })

  })

  // Movies TESTS

  describe('Movies', () => {
    describe('POST /movies with missing required fields', () => {
      const movie = { calification: 5 }
      it('It should respond with a 400 error "field is required"',
        (done) => {
          chai.request(server)
            .post('/movies')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(movie)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('title is required')
              done()
            })
        })
    })

    describe('POST /movies with malformed fields', () => {
      const movies = {
        title: 'Nemo',
        creationDate: 'Red' // should be a date
      }
      it('It should respond with a 400 error "malformed field"',
        (done) => {
          chai.request(server)
            .post('/movies')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(movies)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('malformed field')
              done()
            })
        })
    })

    describe('POST /movies with malformed body', () => {
      const movie = '{"invalid"}'
      it('It should respond with a 400 error "malformed body"',
        (done) => {
          chai.request(server)
            .post('/movies')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(movie)
            .type('json')
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('malformed body')
              done()
            })
        })
    })

    describe('GET /movies/{movieId} with nonexistent movieId', () => {
      const movieId = 99999999
      it('It should respond with a 404 error',
        (done) => {
          chai.request(server)
            .post(`/movies/${movieId}`)
            .set({ 'Authorization': `Bearer ${token}` })
            .end((error, resp) => {
              resp.should.have.status(404)
              done()
            })
        })
    })
  })
  // Genres TESTS

  describe('Genres', () => {
    describe('POST /genres with missing required fields', () => {
      const genre = { }
      it('It should respond with a 400 error "field is required"',
        (done) => {
          chai.request(server)
            .post('/genres')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(genre)
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('name is required')
              done()
            })
        })
    })

    describe('POST /genres with malformed body', () => {
      const genre = '{"invalid"}'
      it('It should respond with a 400 error "malformed body"',
        (done) => {
          chai.request(server)
            .post('/genres')
            .set({ 'Authorization': `Bearer ${token}` })
            .send(genre)
            .type('json')
            .end((error, resp) => {
              resp.should.have.status(400)
              resp.body.should.be.a('object')
              resp.body.should.have.property('error').eq('malformed body')
              done()
            })
        })
    })

    describe('GET /genres/{genreId} with nonexistent genreId', () => {
      const genreId = 99999999
      it('It should respond with a 404 error',
        (done) => {
          chai.request(server)
            .post(`/genres/${genreId}`)
            .set({ 'Authorization': `Bearer ${token}` })
            .end((error, resp) => {
              resp.should.have.status(404)
              done()
            })
        })
    })
  })
})