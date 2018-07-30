const { expect } = require('chai')
const db = require('../index')
const Star = db.model('stars')

describe('Star model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  it('has the expected schema definition', () => {
    expect(Star.attributes.name).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(Star.attributes.magnitude).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(Star.attributes.image).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(Star.attributes.price).to.be.an('object');
  });
  it('has the expected schema definition', () => {
    expect(Star.attributes.owned).to.be.an('object');
  });
  describe('Validations', () => {
    it('requires name', async () => {
      const star = Star.build();
      try {
        await star.validate()
        throw Error('validation was successful but should have failed without `name`');
      }
      catch (err) {
        expect(err.message).to.contain('name cannot be null');
      }
    });

    it('requires name to not be an empty string', async () => {
      const star = Star.build({
        name: ''
      });

      try {
        await star.validate()
        throw Error('validation was successful but should have failed if name is an empty string');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });

    it('requires magnitude', async () => {
      const star = Star.build();
      try {
        await star.validate()
        throw Error('validation was successful but should have failed without `magnitude`');
      }
      catch (err) {
        expect(err.message).to.contain('magnitude cannot be null');
      }
    });

    it('requires magnitude to not be an empty string', async () => {
      const star = Star.build({
        magnitude: ''
      });

      try {
        await star.validate()
        throw Error('validation was successful but should have failed if magnitude is an empty string');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
    it('defaults image to true', () => {
      const star = Star.build();
      expect(star.image).to.be.equal('true')
    });
    it('requires price', async () => {
      const star = Star.build();
      try {
        await star.validate()
        throw Error('validation was successful but should have failed without `price`');
      }
      catch (err) {
        expect(err.message).to.contain('price cannot be null');
      }
    });

    it('requires price to not be an empty string', async () => {
      const star = Star.build({
        price: ''
      });

      try {
        await star.validate()
        throw Error('validation was successful but should have failed if price is an empty string');
      } catch (err) {
        expect(err.message).to.contain('Validation error');
      }
    });
  })
})