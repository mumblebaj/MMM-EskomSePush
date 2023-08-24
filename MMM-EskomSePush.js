Module.register("MMM-EskomSePush", {
    defaults: {
        token: "token",
        area: "yourarea",
        updateInterval: 30*60*1000,
        fetchInterval: 2*60*60*1000

    },

    getStyles: function() {
        return[this.file("MMM-EskomSePush.css")]
    },

    start: function() {
        this.getESPData()

        this.scheduleUpdate()
    },

    stop: function() {
        Log.info('Stopping module: ' + this.name);
    },

    getESPData: function() {
        this.sendSocketNotification("GET_ESP_DATA", this.config)
    },

    getDom: function() {
        const wrapper = document.createElement("div")
        wrapper.id = "esp-wrapper"
        wrapper.className = "esp-container"

        const esp_text_div = document.createElement("div")
        esp_text_div.className = "esp-text-div"
        const esp_text_span = document.createElement("span")
        esp_text_span.className = "esp-text-span"

        esp_text_div.appendChild(esp_text_span)

        const esp_columns = document.createElement("div")
        esp_columns.className = "esp-columns"
        const col030 = document.createElement("div")
        col030.className = "column col30 gray"
        const col1 = document.createElement("div")
        col1.className = "column col1 gray"
        const col130 = document.createElement("div")
        col130.className = "column col130 gray"
        const col2 = document.createElement("div")
        col2.className = "column col2 gray"
        const col230 = document.createElement("div")
        col230.className = "column col230 gray"
        const col3 = document.createElement("div")
        col3.className = "column col3 gray"
        const col330 = document.createElement("div")
        col330.className = "column col330 gray"
        const col4 = document.createElement("div")
        col4.className = "column col4 gray"
        const col430 = document.createElement("div")
        col430.className = "column col430 gray"
        const col5 = document.createElement("div")
        col5.className = "column col5 gray"
        const col530 = document.createElement("div")
        col530.className = "column col530 gray"
        const col6 = document.createElement("div")
        col6.className = "column col6 gray"
        const col630 = document.createElement("div")
        col630.className = "column col630 gray"
        const col7 = document.createElement("div")
        col7.className = "column col7 gray"
        const col730 = document.createElement("div")
        col730.className = "column col730 gray"
        const col8 = document.createElement("div")
        col8.className = "column col8 gray"
        const col830 = document.createElement("div")
        col830.className = "column col830 gray"
        const col9 = document.createElement("div")
        col9.className = "column col9 gray"
        const col930 = document.createElement("div")
        col930.className = "column col930 gray"
        const col10 = document.createElement("div")
        col10.className = "column col10 gray"
        const col1030 = document.createElement("div")
        col1030.className = "column col1030 gray"
        const col11 = document.createElement("div")
        col11.className = "column col11 gray"
        const col1130 = document.createElement("div")
        col1130.className = "column col1130 gray"
        const col12 = document.createElement("div")
        col12.className = "column col12 gray"
        const col1230 = document.createElement("div")
        col1230.className = "column col1230 gray"
        const col13 = document.createElement("div")
        col13.className = "column col13 gray"
        const col1330 = document.createElement("div")
        col1330.className = "column col1330 gray"
        const col14 = document.createElement("div")
        col14.className = "column col14 gray"
        const col1430 = document.createElement("div")
        col1430.className = "column col1430 gray"
        const col15 = document.createElement("div")
        col15.className = "column col15 gray"
        const col1530 = document.createElement("div")
        col1530.className = "column col1530 gray"
        const col16 = document.createElement("div")
        col16.className = "column col16 gray"
        const col1630 = document.createElement("div")
        col1630.className = "column col1630 gray"
        const col17 = document.createElement("div")
        col17.className = "column col17 gray"
        const col1730 = document.createElement("div")
        col1730.className = "column col1730 gray"
        const col18 = document.createElement("div")
        col18.className = "column col18 gray"
        const col1830 = document.createElement("div")
        col1830.className = "column col1830 gray"
        const col19 = document.createElement("div")
        col19.className = "column col19 gray"
        const col1930 = document.createElement("div")
        col1930.className = "column col1930 gray"
        const col20 = document.createElement("div")
        col20.className = "column col20 gray"
        const col2030 = document.createElement("div")
        col2030.className = "column col2030 gray"
        const col21 = document.createElement("div")
        col21.className = "column col21 gray"
        const col2130 = document.createElement("div")
        col2130.className = "column col30 gray"
        const col22 = document.createElement("div")
        col22.className = "column col22 gray"
        const col2230 = document.createElement("div")
        col2230.className = "column col2230 gray"
        const col23 = document.createElement("div")
        col23.className = "column col23 gray"
        const col2330 = document.createElement("div")
        col2330.className = "column col2330 gray"
        const col00 = document.createElement("div")
        col00.className = "column col00 gray"

        esp_columns.append(col030, col1, col130, col2, col230, col3, col330, col4, col430, col5, col530, col6, col630, col7, col730, col8, col830, col9, col930, col10, col1030, col11, col1130, col12, col1230, col13, col1330, col14, col1430, col15, col1530, col16, col1630, col17, col1730, col18, col1830, col19, col1930, col20, col2030, col21, col2130, col22, col2230, col23, col2330, col00)

        const esp_times = document.createElement('div')
        esp_times.className = 'esp-times'

        const tcols = document.createElement('div')
        tcols.className = 'time-s tcol1 hide'
        const tcol1 = document.createElement('div')
        tcol1.className = 'time tcol1 hide'
        tcol1.innerHTML = "01:00"
        const tcol2 = document.createElement('div')
        tcol2.className = 'time tcol2 hide'
        tcol2.innerHTML = "02:00"
        const tcol3 = document.createElement('div')
        tcol3.className = 'time tcol3 hide'
        tcol3.innerHTML = "03:00"
        const tcol4 = document.createElement('div')
        tcol4.className = 'time tcol4 hide'
        tcol4.innerHTML = "04:00"
        const tcol5 = document.createElement('div')
        tcol5.className = 'time tcol5 hide'
        tcol5.innerHTML = "05:00"
        const tcol6 = document.createElement('div')
        tcol6.className = 'time tcol6 hide'
        tcol6.innerHTML = "06:00"
        const tcol7 = document.createElement('div')
        tcol7.className = 'time tcol7 hide'
        tcol7.innerHTML = "07:00"
        const tcol8 = document.createElement('div')
        tcol8.className = 'time tcol8 hide'
        tcol8.innerHTML = "08:00"
        const tcol9 = document.createElement('div')
        tcol9.className = 'time tcol9 hide'
        tcol9.innerHTML = "09:00"
        const tcol10 = document.createElement('div')
        tcol10.className = 'time tcol10 hide'
        tcol10.innerHTML = "010:00"
        const tcol11 = document.createElement('div')
        tcol11.className = 'time tcol11 hide'
        tcol11.innerHTML = "11:00"
        const tcol12 = document.createElement('div')
        tcol12.className = 'time tcol12 hide'
        tcol12.innerHTML = "12:00"
        const tcol13 = document.createElement('div')
        tcol13.className = 'time tcol13 hide'
        tcol13.innerHTML = "13:00"
        const tcol14 = document.createElement('div')
        tcol14.className = 'time tcol14 hide'
        tcol14.innerHTML = "14:00"
        const tcol15 = document.createElement('div')
        tcol15.className = 'time tcol15 hide'
        tcol15.innerHTML = "15:00"
        const tcol16 = document.createElement('div')
        tcol16.className = 'time tcol16 hide'
        tcol16.innerHTML = "16:00"
        const tcol17 = document.createElement('div')
        tcol17.className = 'time tcol17 hide'
        tcol17.innerHTML = "17:00"
        const tcol18 = document.createElement('div')
        tcol18.className = 'time tcol18 hide'
        tcol18.innerHTML = "18:00"
        const tcol19 = document.createElement('div')
        tcol19.className = 'time tcol19 hide'
        tcol19.innerHTML = "19:00"
        const tcol20 = document.createElement('div')
        tcol20.className = 'time tcol20 hide'
        tcol20.innerHTML = "20:00"
        const tcol21 = document.createElement('div')
        tcol21.className = 'time tcol21 hide'
        tcol21.innerHTML = "21:00"
        const tcol22 = document.createElement('div')
        tcol22.className = 'time tcol22 hide'
        tcol22.innerHTML = "22:00"
        const tcol23 = document.createElement('div')
        tcol23.className = 'time tcol23 hide'
        tcol23.innerHTML = "23:00"
        const tcol00 = document.createElement('div')
        tcol00.className = 'time tcol00 hide'
        tcol00.innerHTML = "00:00"

        esp_times.append(tcols, tcol1, tcol2, tcol3, tcol4, tcol5, tcol6, tcol7, tcol8, tcol9, tcol10, tcol11, tcol12, tcol13, tcol14, tcol15, tcol16, tcol17, tcol18, tcol19, tcol20, tcol21, tcol22, tcol23, tcol00)

        wrapper.append(esptext_div, esp_columns, esp_times)

    },

    scheduleUpdate: function(delay){
        var nextLoad = this.config.fetchInterval
        if (typeof delay != "undefined" && delay >= 0) {
            nextUpdate = delay
        }

        var self = this
        setInterval(function(){
            self.getESPData()
        }, nextUpdate)
    },

    socketNotificationReceived: function(notification, payload) {
        var self = this;
        if (notification === "ESP_DATA") {
            this.espData = payload;
            this.updateESP(this.espData)
        }
    }


})