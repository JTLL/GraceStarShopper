/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  it('has the expected schema definition', () => {
    expect(User.attributes.email).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(User.attributes.password).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(User.attributes.salt).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(User.attributes.googleId).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(User.attributes.admin).to.be.an('object');
  });
  describe('Validations', () => {
    it('requires name', async () => {
      const user = User.build();

      try {
        await user.validate()
        throw Error('validation was successful but should have failed without `name`');
      }
      catch (err) {
        expect(err.message).to.contain('name cannot be null');
      }
    });

    it('requires name to not be an empty string', async () => {
      const user = User.build({
        name: ''
      });

      try {
        await user.validate()
        throw Error('validation was successful but should have failed if name is an empty string');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
    it('requires email', async () => {
      const user = User.build();

      try {
        await user.validate()
        throw Error('validation was successful but should have failed without `name`');
      }
      catch (err) {
        expect(err.message).to.contain('name cannot be null');
      }
    });

    it('requires name to not be an empty string', async () => {
      const user = User.build({
        email: ''
      });

      try {
        await user.validate()
        throw Error('validation was successful but should have failed if email is an empty string');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
  });

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          name: 'cody',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  })
}) // end describe('instanceMethods')
 // end describe('User model')