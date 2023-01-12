#Network Utility Pack#

network-util-pack is a simple fetch based utility library to fetch data using headers, and bias flag where APIs are usually malformed or returned without any return body.

###Installation###

    npm i @banjurider/network-util-pack

###Usage###

GetBiasAsync (url::String, debugEcho::Boolean, biasFlag::Boolean, callback::Function, errorCallback::Function)
    
    GetBiasAsync(url, __DEV__, false, successHandler, errorHandler)

    function successHandler(data) { 
        // function body
    }

    function errorHandler(err) {
        // function body
    }

GetBiasAsync_Extended(url::String, headers::Object, debugEcho::Boolean, biasFlag::Boolean, callback::Function, errorCallback::Function)


    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token",
        ...
    };
    // By default, valud of header is { "Content-Type": "application/json", "Accept": "application/json" } 

    hSuccess = data => { // };
    hError = err => { // };

    GetBiasAsync_Extended(url, headers, __DEV__, true, hSuccess, hError);

PostBiasAsync(url::String, method::String, data::Object, headers::Object, debugEcho::Boolean, biasFlag::Boolean, callback::Function, errorCallback::Function)

    /*
    url : 'https://...'
    headers: default - { "Content-Type": "application/json", "Accept": "application/json" }
    method: verb eg- "POST"|"DELETE"|"PATCH"| ...
    echo: will debug print the function itself
    data: payload to be passed. eg- { data: "test", data2: "testdata"... }
    biasFlag: it will read only the return code from http response. default: false
    callback: callback function to handle success
    errorCallback: callback function to handle error
    */

    let method = "POST";

    let payload = { d: '', };
    
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Token",
        ...
    };
    // By default, valud of header is { "Content-Type": "application/json", "Accept": "application/json" } 

    hSuccess = data => { // };
    hError = err => { // };

    GetBiasAsync_Extended(url, method, payload, headers, __DEV__, true, hSuccess, hError);