import { equal } from "assert";
import { apiFetch } from './api';
import * as sinon from 'sinon';
import * as api from './api';

describe("Sinon tests mocking API", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("Fetch data without sinon", async () => {
        const response = await apiFetch(false);
        equal(response, 'Api responded: CrystalFightersGigShouldHappenInPoland');
    });

    it("Fetch data without sinon and promise is rejected", async () => {
        const response = await apiFetch(true);
        equal(response, 'Error was thrown');
    });

    it("Stub api with SinonJS", async () => {
        sinon.stub(api, 'fetchDataFromRemoteApi').returns(Promise.resolve('Subbed by Sinon'));
        const response = await apiFetch(false);
        equal(response, 'Subbed by Sinon');
    });

    it("Stub api with SinonJS and simulate throw Exception", async () => {
        sinon.stub(api, 'fetchDataFromRemoteApi').throws(new Error('Api Error'));
        const response = await apiFetch(false);
        equal(response, 'Error was thrown');
    });
});
