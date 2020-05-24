import { equal, throws, ok } from "assert";
import { firstFetch, secondFetch, apiFetch } from './api';
import * as api from './api';
import * as sinon from 'sinon';

describe("Sinon tests mocking API", () => {
    describe('apiFetch stub fistFech, secondFetch with called amount', () => {
        afterEach(() => {
            sinon.restore();
        });

        it("firstFetch stub return custom message", async () => {
            const firstFetchStub = sinon.stub(api, 'firstFetch').returns(Promise.resolve('firstFetch Sinon stub'));
            const secondFetchStub = sinon.stub(api, 'secondFetch');
            const response = await apiFetch(false);
            equal(response, 'firstFetch Sinon stub');
            ok(firstFetchStub.calledOnce);
            ok(secondFetchStub.notCalled);
            ok(firstFetchStub.calledWith(false, undefined));
        });

        it("firstFetch stub return predefined message and trigger stubbed secondFetch", async () => {
            const firstFetchStub = sinon.stub(api, 'firstFetch').returns(Promise.resolve('First fetch responded: CrystalFightersGigShouldHappenInPoland'));
            const secondFetchStub = sinon.stub(api, 'secondFetch').returns(Promise.resolve('secondFetch Sinon stub'));
            const response = await apiFetch(false);
            equal(response, 'secondFetch Sinon stub');
            ok(firstFetchStub.calledOnce);
            ok(secondFetchStub.calledOnce);
            ok(firstFetchStub.calledWith(false));
            ok(secondFetchStub.calledWith(false));
        });

        it("firstFetch stub throws errror", async () => {
            const firstFetchStub = sinon.stub(api, 'firstFetch').throws('firstFetch rejected response');
            const secondFetchStub = sinon.stub(api, 'secondFetch');
            const response = await apiFetch(true);
            equal(response, 'Error was thrown: firstFetch rejected response');
            ok(firstFetchStub.calledOnce);
            ok(firstFetchStub.calledWith(true));
            ok(secondFetchStub.notCalled);

        });

        it("firstFetch stub rejects promise", async () => {
            const firstFetchStub = sinon.stub(api, 'firstFetch').rejects('firstFetch rejected response');
            const secondFetchStub = sinon.stub(api, 'secondFetch');
            const response = await apiFetch(true);
            equal(response, 'Error was thrown: firstFetch rejected response');
            ok(firstFetchStub.calledOnce);
            ok(firstFetchStub.calledWith(true));
            ok(secondFetchStub.notCalled);
        });

        it("secondFetch stub rejects promise", async () => {
            const firstFetchStub = sinon.stub(api, 'firstFetch').returns(Promise.resolve('First fetch responded: CrystalFightersGigShouldHappenInPoland'));
            const secondFetchStub = sinon.stub(api, 'secondFetch').rejects('secondFetch rejected response');
            const response = await apiFetch(false);
            equal(response, 'Error was thrown: secondFetch rejected response');
            ok(firstFetchStub.calledOnce);
            ok(firstFetchStub.calledWith(false));
        });

        it("secondFetch stub throws promise", async () => {
            const firstFetchStub = sinon.stub(api, 'firstFetch').returns(Promise.resolve('First fetch responded: CrystalFightersGigShouldHappenInPoland'));
            const secondFetchStub = sinon.stub(api, 'secondFetch').throws('secondFetch rejected response');
            const response = await apiFetch(false);
            equal(response, 'Error was thrown: secondFetch rejected response');
            ok(firstFetchStub.calledOnce);
            ok(firstFetchStub.calledWith(false));
            ok(secondFetchStub.calledOnce);
        });

        it("apiFetch stub with custom message", async () => {
            const firstFetchStub = sinon.stub(api, 'firstFetch').returns(Promise.resolve('First fetch responded: custom message'));
            const secondFetchStub = sinon.stub(api, 'secondFetch');
            const response = await apiFetch(false, 'custom message');

            equal(response, 'First fetch responded: custom message');
            ok(firstFetchStub.calledOnce);
            ok(firstFetchStub.calledWith(false, 'custom message'));
            ok(secondFetchStub.notCalled);
        });
    })
});
