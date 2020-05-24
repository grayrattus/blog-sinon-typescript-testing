export const firstFetch = async (shouldThrow: boolean, customMessage?: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (shouldThrow) {
            reject({ error: 'firstFetch rejected response' });
        }
        setTimeout(() => {
            const message = customMessage ? customMessage : 'CrystalFightersGigShouldHappenInPoland'
            return resolve(`First fetch responded: ${message}`)
        }, 500);
    })
}

export const secondFetch = async (shouldThrow: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (shouldThrow) {
            reject('secondFetch rejected response');
        }
        setTimeout(() => resolve('Second fetch responded: Corona please staph, I need party'), 500);
    })
}

export const apiFetch = async (shouldThrown: boolean, customMessage?: string) => {
    try {
        const firstResponse = await firstFetch(shouldThrown, customMessage);

        if (firstResponse === 'First fetch responded: CrystalFightersGigShouldHappenInPoland') {
            const secondResponse = await secondFetch(shouldThrown);
            return secondResponse;
        }
        return firstResponse;
    } catch (error) {
        return `Error was thrown: ${error}`;
    }
}
