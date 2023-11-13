console.log = () => { };
const rewire = require('rewire');
const expect = require('chai').expect;
const request = require('supertest');

describe('', function () {
    it('', function (done) {
        process.env.PORT = 8000;
        const appModule = rewire('../app.js');
        const app = appModule.__get__('app');
        const expressions = appModule.__get__('expressions');
        const expressionIndex = expressions.findIndex((element) => {
            return element.id === Number('1');
        });
        let originalExpressions;
        const expressionToFind = expressions[expressionIndex];
        const expressionToUpdate = Object.assign({}, expressionToFind, { name: 'test' });
        request(app)
            .put('/expressions/1')
            .query(expressionToUpdate)
            .then((response) => {
                console.log('RES', response.body)
                expect(response.status, 'Did you send a response from the PUT `/expressions/:id` route?').to.equal(200);
                expect(response.body, 'Did you send back a single expression object instead of the whole array?').to.not.be.an.instanceof(Array);
                expect(response.body, 'Did you send back the updated expression?').to.deep.equal(expressionToUpdate);
                expect(response.body, 'Did you use the `updateElement()` to update the element in the `expressions` array?').to.deep.equal(expressions[expressionIndex]);
            })
            .then(() => {
                originalExpressions = Array.from(expressions);
                return request(app)
                    .put('/expressions/invalid');
            })
            .then((response) => {
                expect(response.status, 'Your PUT route should send back a 404 response on a request with an invalid ID.').to.equal(404);
                expect(expressions, 'A PUT `/expressions/:id` should not alter update any expressions on a request with an invalid ID.').to.deep.equal(originalExpressions);
                done();
            })
            .catch(done);
    });
});
