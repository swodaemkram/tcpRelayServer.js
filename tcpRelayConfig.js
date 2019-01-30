'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *  Copyright Surveillus Networks LLC 2018
 *
 *  TCP relay configuration example file
 */

// in a real deployment scenario, pull all these settings from environment variables
exports.default = {

    // listen on this port
    port: 32011,

    destinations: [
    // forward to existing ImageVault system
    {
        host: '10.1.1.99',
        port: 32011
    },
    // also forward to local blackbox
    {
        host: '127.0.0.1',
        port: 12001
    }]

};
