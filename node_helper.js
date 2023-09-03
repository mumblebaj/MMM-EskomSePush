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

    deconstructData: function (data) {
        var payload = data
            const eventsLength = payload.events.length;
        const espEvents = [];
        if (payload.events.length > 1) {

            let start1 = DateTime.fromISO(payload.events[1].start);
            let end1 = DateTime.fromISO(payload.events[1].end);
            const diff = end1.diff(start1, ["years", "months", "days", "hours"])
                var timeDiff = diff.toObject()
                let eventsData = []
                payload.events.forEach(event => {
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
                "areaInfo": payload.info.name,
                "region": payload.info.region,
                "events": eventsData
            })
            fs.appendFile(datalog, JSON.stringify(espEvents, null, 2) + os.EOL, function (err) {
                if (err)
                    throw err;
            })
            this.sendSocketNotification("ESP_DATA", espEvents)
        }
    },

    async getEspData(payload) {
        var tkn = payload.token
            var endPoint = this.espUrl + payload.area
            //+ "&test=current"
            // jhbcitypower2-13-ormonde
            const response = await fetch(endPoint, {
                method: 'get',
                headers: {
                    'token': tkn
                }
            });

        const data = await response.json();
        var results = this.deconstructData(data);
        //fs.appendFile(datalog, JSON.stringify(data, null, 2) + os.EOL, function (err) {
        //	if (err) throw err;
        //})
        //console.log(data)
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "GET_ESP_DATA") {
            this.getEspData(payload)
        }
    }
})
