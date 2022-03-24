let server = "http://localhost:8000";

function postServiceData(method, params) {
    return fetch(server + "/" + method, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    .then((response) => 
        response.json()
        .then((data) => {
            return Promise.resolve(data);
        })
        .catch (error => {
            console.log(error);
            return error;
        })
    );
}

export  { postServiceData };

/*
let cachedData = null;
const getServiceData = (url) => {
    console.log('cache status' + cachedData );
    if (cachedData === null) {
        console.log('get-data: requesting data');
        return fetch(url, {})
        .then(response => {
            cachedData = response.json();
            return cachedData;
        });
    } else {
        console.log('get-data: returning cached data');
        return Promise.resolve(cachedData);
    }
};

export  { getServiceData, postServiceData };

*/