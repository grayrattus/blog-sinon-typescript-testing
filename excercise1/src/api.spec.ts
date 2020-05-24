import { equal } from "assert";
import * as api from './api';
import { fetchData } from './api';
import * as sinon from 'sinon';
import { inspect } from 'util';

describe("Sinon tests mocking API", () => {
    afterEach(() => {
        sinon.restore();
    });

    it("How sinon works test", () => {
        console.log('Before stub', inspect(api, { showHidden: true }));
        sinon.stub(api, 'fetchData').returns('Mocked by Sinon');
        console.log('After stub', inspect(api, { showHidden: true }));

        equal(fetchData('test'), 'Mocked by Sinon');
        equal((api.fetchData as any).wrappedMethod('test'), 'Original message: I would love to rave on Crystal Fighters: test');
    });
});
