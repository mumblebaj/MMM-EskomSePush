var NodeHelper = require('node_helper')
var fetch = require('node-fetch')

module.exports = NodeHelper.create({
    requiresVersion: '2.24.0',

    start: function () {
        console.log('Starting node_helper for module: ' + this.name)

        this.espUrl = "https://developer.sepush.co.za/business/2.0/area?id="
    },

    async getEspData(payload) {
        var tkn = payload.token
        var endPoint = this.espUrl + payload.area
        // jhbcitypower2-13-ormonde
        const response = await fetch(endPoint, {
            method: 'get',
            body: JSON.stringify(body),
            headers: { 'token': tkn }
        });

        const data = await response.json();
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_ESP_DATA") {
            getEspData(payload)
        }
    }
})