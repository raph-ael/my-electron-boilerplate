const electron = require('electron');
const { ipcRenderer } = require('electron');
const path = require('path');
const logger = require('../logger');

let api_router = {

    init: () => {

        ipcRenderer.on('command-from-window', (event, arg) => {

            if(api_router[arg.command] !== undefined) {

                api_router[arg.command](arg.params, (answer) => {

                    /*
                     * sende antwort an das fenster über den main prozess
                     */
                    ipcRenderer.send('answer-from-worker', {
                        command: arg.command, answer: answer
                    });

                });
            }
        });
    },

    ping: (params, callback) => {

        callback('pong');

    }

};

module.exports = api_router;