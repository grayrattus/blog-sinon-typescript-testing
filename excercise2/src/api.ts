export const fetchDataFromRemoteApi = async (shouldThrow: boolean): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (shouldThrow) {
            reject('Api rejected response');
        }
        setTimeout(() => resolve('Api responded: CrystalFightersGigShouldHappenInPoland'), 1500);
    })
}

export const apiFetch = async (shouldThrown: boolean) => {
    try {
        return await fetchDataFromRemoteApi(shouldThrown);
    } catch (error) {
        return 'Error was thrown';
    }
}
