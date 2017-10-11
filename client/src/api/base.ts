interface IResponse {
    data: any;
    errors: string[];
}

function callRequest<TRequest>(method: string, path: string, params: Object, onLoad?: (data: any) => void) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', () => onLoad && onLoad(JSON.parse(request.response)));
    request.open(method, 'http://' + window.location.host + '/api' + path);
    request.send(JSON.stringify(params));
}

export function callGet<TRequest>(path: string, onLoad?: (data: any) => void) {
    return callRequest('GET', path, {}, onLoad);
}

export function callPost<TRequest>(path: string, params: Object) {
    return callRequest('POST', path, params);
}
