export const fetchDataFromRemoteApi = async (): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Api responded: CrystalFightersGigShouldHappenInPoland'), 1500);
    })
}

export const apiFetch = async () => {
    try {
        return await fetchDataFromRemoteApi();
    } catch (error) {
        return 'Error was thrown';
    }
}
