import { equal } from "assert";
import * as api from './api-dependency';
import { fetchData } from './api';
import * as sinon from 'sinon';

import * as setupapi from './api';

describe("Sinon tests mocking API", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("Fetch data test", async () => {
        const stub = sinon.stub(api, 'simulatedQuery').returns(Promise.resolve('Sinon mocked'))

        equal(await fetchData('Hello'), 'Sinon mocked');
        stub.calledOnceWith('Hello');
    });

    it("Fetch data test1", async () => {
        sinon.stub(setupapi, 'promission').returns(Promise.resolve('Sinon mocked'));
        equal(await setupapi.setup().hereIsMyFunction('fsdf'), 'Sinon mocked');
    });

    it("Fetch data test2", async () => {
        sinon.stub(setupapi, 'promission').returns(Promise.resolve('Sinon mocked'));
        equal(await(await setupapi.asyncSetupBig()).hereIsMyFunction('fsdf'), 'Sinon mocked');
    });

    it("Fetch data test3", async () => {
        equal(await setupapi.setup().hereIsMyFunction('fsdf'), 'harerama');
    });

});
