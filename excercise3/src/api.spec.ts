import { equal, throws } from "assert";
import { firstFetch, secondFetch, apiFetch } from './api';
import * as api from './api';
import * as sinon from 'sinon';

describe("Sinon tests mocking API", () => {

    describe('Not stubbed api calls', () => {
        it("apiFetch should return firstResponse", async () => {
            const response = await apiFetch(false, 'Custom message');
            equal(response, 'First fetch responded: Custom message');
        });

        it("apiFetch should return secondResponse as no custom message is provided", async () => {
            const response = await apiFetch(false);
            equal(response, 'Second fetch responded: Corona please staph, I need party');
        });
    });

    describe('apiFetch stub fistFech, secondFetch', () => {
        afterEach(() => {
            sinon.restore();
        });

        it("firstFetch stub return custom message", async () => {
            sinon.stub(api, 'firstFetch').returns(Promise.resolve('firstFetch Sinon stub'));
            const response = await apiFetch(false);
            equal(response, 'firstFetch Sinon stub');
        });

        it("firstFetch stub return predefined message and trigger stubbed secondFetch", async () => {
            sinon.stub(api, 'firstFetch').returns(Promise.resolve('First fetch responded: CrystalFightersGigShouldHappenInPoland'));
            sinon.stub(api, 'secondFetch').returns(Promise.resolve('secondFetch Sinon stub'));
            const response = await apiFetch(false);
            equal(response, 'secondFetch Sinon stub');
        });

        it("firstFetch stub throws errror", async () => {
            sinon.stub(api, 'firstFetch').throws('firstFetch rejected response');
            const response = await apiFetch(false);
            equal(response, 'Error was thrown: firstFetch rejected response');
        });

        it("firstFetch stub rejects promise", async () => {
            sinon.stub(api, 'firstFetch').rejects('firstFetch rejected response');
            const response = await apiFetch(false);
            equal(response, 'Error was thrown: firstFetch rejected response');
        });

        it("secondFetch stub rejects promise", async () => {
            sinon.stub(api, 'firstFetch').returns(Promise.resolve('First fetch responded: CrystalFightersGigShouldHappenInPoland'));
            sinon.stub(api, 'secondFetch').rejects('secondFetch rejected response');
            const response = await apiFetch(false);
            equal(response, 'Error was thrown: secondFetch rejected response');
        });

        it("secondFetch stub throws promise", async () => {
            sinon.stub(api, 'firstFetch').returns(Promise.resolve('First fetch responded: CrystalFightersGigShouldHappenInPoland'));
            sinon.stub(api, 'secondFetch').throws('secondFetch rejected response');
            const response = await apiFetch(false);
            equal(response, 'Error was thrown: secondFetch rejected response');
        });
    })
});
