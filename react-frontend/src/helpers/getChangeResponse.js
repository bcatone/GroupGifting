export const getChangeResponse = (response) => {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(`Error: ${res.status}`);
};