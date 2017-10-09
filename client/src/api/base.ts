interface IResponse {
    data: any;
    errors: string[];
}

function parseResponse(resolve, reject, response: IResponse) {
    console.log(response);
    if (response.errors && response.errors.length) {
        console.log('reject');
        reject(response.errors);
    } else {
        console.log('resolve');
        resolve(response);
    }
}

function callRequest<TRequest>(method: string, path: string, params: Object): Promise<TRequest> {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('load', () => parseResponse(resolve, reject, JSON.parse(request.response)));
        request.open(method, 'http://' + window.location.host + '/api' + path);
        request.withCredentials = true;
        request.send(JSON.stringify(params));
    });
}

export function callGet<TRequest>(path: string): Promise<TRequest> {
    return callRequest('GET', path, {});
}

export function callPost<TRequest>(path: string, params: Object): Promise<TRequest> {
    return callRequest('POST', path, params);
}
