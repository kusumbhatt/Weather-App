class HTTP {
    // Make an HTTP GET Request;
    async get(url) {
        const response = await fetch(url);
        const resData = await response.json();
        return resData;
    }
    // Make an HTTP POST request
    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    }
    // Make an HTTP PUT request
    async put(url, data) {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
    } 
    // Make an HTTP DELETE request
    async delete(url) {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const data = await 'Resource Deleted...';
        return data;
    }
}