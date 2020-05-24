import { simulatedQuery } from "./api-dependency";

export const fetchData = async (name: string) => {
    return await simulatedQuery(name);
}

const hareKryszna = 'harerama';

export const promission = async (name: string) => {
    return Promise.resolve(hareKryszna);
}


export function setup() {
    const hereIsMyFunction = async (name: string) => {
        return await promission(name);
    }
    
    return {
        hereIsMyFunction
    }
}

export async function asyncSetupBig() {
    await promission('keku');
    const hereIsMyFunction = async (name: string) => {
        return await promission(name);
    }
    
    return {
        hereIsMyFunction
    }
}