/**
 * Normal fetch with callback handler.
 * @param {string} url 
 * @param {boolean} echo 
 * @param {function} callback 
 */
 const fetchAsync = async (url, echo, callback) => {
    let res, data = null, ec = echo || false, statuscode;
    try {
        res = await fetch(url);
        statuscode = res.status;
        if (ec) console.log("fetchAsync", { url: url, status: res.status});
        data = await res.json();
    }catch(err) {
        // console.log("fetchAsync Error", err);
        if (ec) console.log("fetchAsync:Error", err);
        data = { status: res.status, data: err};
    } finally {
        callback({status: statuscode, data: data});
    }
};

/**
 * GetBiasAsync - handles GET action with biased return types.
 * @param {String} url - a valid string url
 * @param {Boolean} echo - (!dev mode) to logcat action 
 * @param {Boolean} bias - for api sending only http status  
 * @param {Function} callback - action to handle return
 * @param {Function} errorCallback - action to handle error
 */
const GetBiasAsync = async (url, echo, bias, callback, errorCallback) => {
    const ec = echo || false, hasbias = bias || false;
    const res = await fetch(url);
    if(hasbias) {
        if(ec) console.log("GetBiasAsync:HttpStatus", res.status);
        callback({ status: res.status, data: null });
        return;
    }
    res.json().then(data => {
        if (ec) console.log("GetBiasAsync:ReturnData", { data: data, status: res.status });
        callback({status: res.status, data: data});
    })
    .catch(err => {
        if (ec) console.log("GetBiasAsync:CatchError", err);
        errorCallback(err);
    });
};


/**
 * PostBiasAsync - handles POST action with biased return types.
 * @param {String} url - a valid string url
 * @param {String} method - a valid method for request
 * @param {object} data - data to send 
 * @param {object} headers - acceptable fetch related headers 
 * @param {Boolean} echo - (!dev mode) to logcat action (default- false/null)
 * @param {Boolean} bias - for api sending only http status 
 * @param {Function} callback - action to handle return
 * @param {Function} errorCallback - action to handle return
 */
const PostBiasAsync = async (url, method, data, headers, echo, bias, callback, errorCallback) => {
    const ec = echo || false, hasbias = bias || false, _headers = headers || {"Content-type": "application/json"};
    
    const res = await fetch(url, { method: String(method).toUpperCase(), headers: _headers, body: JSON.stringify(data) });
    if(ec) {
        console.log("PostBiasAsync", { url: url, method: method, data: JSON.stringify(data), headers: _headers});
    }
    if(hasbias) {
        if(ec) console.log("PostBiasAsync:HttpStatus", res.status);
        callback({ status: res.status, data: null });
        return;
    }
    res.json().then(data => {
        if (ec) console.log("return data", { data: data, status: res.status });
        callback({status: res.status, data: data});
    })
    .catch(err => {
        if (ec) console.log("PostBiasAsync:CatchError", err);
        errorCallback(err);
    });
};

export { fetchAsync, GetBiasAsync, PostBiasAsync };