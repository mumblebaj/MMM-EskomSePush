var NodeHelper = require('node_helper')
var fetch = require('node-fetch')
var fs = require('fs')
var os = require('os')
var {
    DateTime
} = require('luxon')

var datalog = `${__dirname}/data.log`;

module.exports = NodeHelper.create({
    requiresVersion: '2.23.0',

    start: function () {
        console.log('Starting node_helper for module: ' + this.name)

        this.espUrl = "https://developer.sepush.co.za/business/2.0/area?id="
    },

    deconstructData: function (data, code) {
        var payload = data;
        var code = code;
        const eventsLength = payload.events.length;
        const espEvents = [];
        if (payload.events.length > 1) {
            let eventsData = []
            payload.events.forEach(event => {
                let start1 = DateTime.fromISO(event.start);
                let end1 = DateTime.fromISO(event.end);
                const diff = end1.diff(start1, ["years", "months", "days", "hours"])
                var timeDiff = diff.toObject()
                eventsData.push({
                    "stage": event.note,
                    "relDate": DateTime.fromISO(event.start).toRelativeCalendar(),
                    "start": event.start,
                    "end": event.end,
                    "startTime": DateTime.fromISO(event.start).hour + ":" + DateTime.fromISO(event.start).minute,
                    "endTime": DateTime.fromISO(event.end).hour + ":" + DateTime.fromISO(event.end).minute,
                    "duration": timeDiff.hours
                })
            });
            espEvents.push({
                "code": code,
                "areaInfo": payload.info.name,
                "region": payload.info.region,
                "events": eventsData
            })
            this.sendSocketNotification("ESP_DATA", espEvents)
        } else {
            espEvents.push({
                "code": code,
                "areaInfo": payload.areaInfo,
                "region": payload.region,
                "events": "No upcoming loadshedding"
            })
            this.sendSocketNotification("ESP_DATA", espEvents)
        }
    },

    async getEspData(payload) {
        var tkn = payload.token
        var endPoint = this.espUrl + payload.area

        const response = await fetch(endPoint, {
            method: 'get',
            headers: {
                'token': tkn
            }
        });

        if (response.status !== 200) {
            const errorText = await response.text();
            const espEvents = [];
            const errorObject = JSON.parse(errorText);
            const errorMessage = errorObject.error;
            espEvents.push({
                "code": response.status,
                "areaInfo": payload.area,
                "region": "",
                "events": errorMessage
            })
            this.sendSocketNotification("ESP_DATA", espEvents)
            return;
        }

        const data = await response.json();
        const code = response.status;
        var results = this.deconstructData(data, code);
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_ESP_DATA") {
            this.getEspData(payload)
        }
    }
})
