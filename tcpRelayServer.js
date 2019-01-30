'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _consoleStamp = require('console-stamp');

var _consoleStamp2 = _interopRequireDefault(_consoleStamp);

var _tcpRelayConfig = require('./tcpRelayConfig.js');

var _tcpRelayConfig2 = _interopRequireDefault(_tcpRelayConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// disable any tcp encoding
const _encoding = null;

// prepare console message format


(0, _consoleStamp2.default)(console, { pattern: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss.l' });
console.log('running in ' + process.env.NODE_ENV + ' environment on', process.platform, process.arch);

class TcpRelayApp {
    /**
     * Forward the given packet to the given destination
     * @param packet
     * @param destination
     * @private
     */
    _forward(packet, destination) {
        try {
            const client = _net2.default.connect(destination, () => {
                client.setNoDelay(true);

                // send the data, then destroy the socket immediately after
                client.write(packet, _encoding, () => {
                    client.destroy();
                });
            });

            client.on('error', error => {
                console.error('error forwarding to', destination, error);
            });
        } catch (err) {
            console.error('_forward relay error', err);
        }
    }

    constructor() {
        if (_tcpRelayConfig2.default.destinations.length > 0) {
            console.log('listening on', _tcpRelayConfig2.default.port, 'and forwarding to:');
            _tcpRelayConfig2.default.destinations.forEach(d => {
                console.log('  ', d);
            });

            // create the TCP server to listen for connections
            _net2.default.createServer(client => {
                client.setEncoding(_encoding);

                client.on('data', data => {
                    console.log('forwarding', data);
                    _tcpRelayConfig2.default.destinations.forEach(d => {
                        this._forward(data, d);
                    });
                });

                client.on('error', error => {
                    console.error('error', error);
                });

                client.on('end', () => {
                    // client has disconnected
                });
            }).listen(_tcpRelayConfig2.default.port);
        } else {
            console.log('No destinations to forward to');
        }
    }
}

exports.default = TcpRelayApp;
new TcpRelayApp();
