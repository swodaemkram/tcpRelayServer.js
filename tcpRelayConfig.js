'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = {

    // listen on this port
    port: 32011,

    destinations: [
    // forward to Host 1
    {
        host: '10.1.1.99',
        port: 32011
    },
    // also forward to Host 2
    {
        host: '127.0.0.1',
        port: 12001
    }]

};
