Module.register("MMM-EskomSePush", {
    defaults: {
        token: "token",
        area: "yourarea",
        updateInterval: 30*60*1000,
        fetchInterval: 2*60*60*1000

    },

    getStyles: function () {
        return [this.file("MMM-EskomSePush.css")]
    },

    start: function () {
		this.getESPData()

        this.scheduleUpdate()

    },

    stop: function () {
        Log.info('Stopping module: ' + this.name);
    },

    getESPData: function () {
		this.resetColumnElements()
		this.resetTimeElements()
        this.sendSocketNotification("GET_ESP_DATA", this.config)
    },

    getDom: function () {
        const wrapper = document.createElement("div")
            wrapper.id = "esp-wrapper"
            wrapper.className = "esp-container"

            const esp_text_div = document.createElement("div")
            esp_text_div.className = "esp-text-div"
            const esp_text_span = document.createElement("span")
            esp_text_span.className = "esp-text-span"
            //	esp_text_span.innerHTML = "Loadshedding Schedule"

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
            col2130.className = "column col2130 gray"
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

            esp_columns.appendChild(col030)
            esp_columns.appendChild(col1)
            esp_columns.appendChild(col130)
            esp_columns.appendChild(col2)
            esp_columns.appendChild(col230)
            esp_columns.appendChild(col3)
            esp_columns.appendChild(col330)
            esp_columns.appendChild(col4)
            esp_columns.appendChild(col430)
            esp_columns.appendChild(col5)
            esp_columns.appendChild(col530)
            esp_columns.appendChild(col6)
            esp_columns.appendChild(col630)
            esp_columns.appendChild(col7)
            esp_columns.appendChild(col730)
            esp_columns.appendChild(col8)
            esp_columns.appendChild(col830)
            esp_columns.appendChild(col9)
            esp_columns.appendChild(col930)
            esp_columns.appendChild(col10)
            esp_columns.appendChild(col1030)
            esp_columns.appendChild(col11)
            esp_columns.appendChild(col1130)
            esp_columns.appendChild(col12)
            esp_columns.appendChild(col1230)
            esp_columns.appendChild(col13)
            esp_columns.appendChild(col1330)
            esp_columns.appendChild(col14)
            esp_columns.appendChild(col1430)
            esp_columns.appendChild(col15)
            esp_columns.appendChild(col1530)
            esp_columns.appendChild(col16)
            esp_columns.appendChild(col1630)
            esp_columns.appendChild(col17)
            esp_columns.appendChild(col1730)
            esp_columns.appendChild(col18)
            esp_columns.appendChild(col1830)
            esp_columns.appendChild(col19)
            esp_columns.appendChild(col1930)
            esp_columns.appendChild(col20)
            esp_columns.appendChild(col2030)
            esp_columns.appendChild(col21)
            esp_columns.appendChild(col2130)
            esp_columns.appendChild(col22)
            esp_columns.appendChild(col2230)
            esp_columns.appendChild(col23)
            esp_columns.appendChild(col2330)
            esp_columns.appendChild(col00)

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
            tcol10.innerHTML = "10:00"
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

            esp_times.appendChild(tcols)
            esp_times.appendChild(tcol1)
            esp_times.appendChild(tcol2)
            esp_times.appendChild(tcol3)
            esp_times.appendChild(tcol4)
            esp_times.appendChild(tcol5)
            esp_times.appendChild(tcol6)
            esp_times.appendChild(tcol7)
            esp_times.appendChild(tcol8)
            esp_times.appendChild(tcol9)
            esp_times.appendChild(tcol10)
            esp_times.appendChild(tcol11)
            esp_times.appendChild(tcol12)
            esp_times.appendChild(tcol13)
            esp_times.appendChild(tcol14)
            esp_times.appendChild(tcol15)
            esp_times.appendChild(tcol16)
            esp_times.appendChild(tcol17)
            esp_times.appendChild(tcol18)
            esp_times.appendChild(tcol19)
            esp_times.appendChild(tcol20)
            esp_times.appendChild(tcol21)
            esp_times.appendChild(tcol22)
            esp_times.appendChild(tcol23)
            esp_times.appendChild(tcol00)

            wrapper.appendChild(esp_text_div)
            wrapper.appendChild(esp_columns)
            wrapper.appendChild(esp_times)

            return wrapper;

    },

    scheduleUpdate: function (delay) {
        var nextLoad = this.config.fetchInterval
            if (typeof delay != "undefined" && delay >= 0) {
                nextLoad = delay
            }

            var self = this
            setInterval(function () {
                self.getESPData()
            }, nextLoad)
    },

    resetTimeElements: function () {
        let wrapper = document.getElementById("esp-wrapper")
            const elements = document.querySelectorAll('time')
            elements.forEach(element => {
                element.classList.add('hide')
                element.classList.remove('show')
            })
    },
	
	resetColumnElements: function () {
        let wrapper = document.getElementById("esp-wrapper")
            const elements = document.querySelectorAll('column')
            elements.forEach(element => {
                element.classList.add('gray')
                element.classList.remove('upcoming', 'shedding')
            })
    },
	
    updateShow: function (className) {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            element.classList.add('show');
            element.classList.remove('hide');
        });
    },

    updateColor: function (className) {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            element.classList.remove('gray');
            element.classList.add('upcoming');
        });
    },

    updateShedding: function (className) {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(element => {
            element.classList.remove('gray');
            element.classList.add('shedding');
        });
    },

    updateESP: function (espData) {
        let wrapper = document.getElementById("esp-wrapper")
            Log.log("EskomSePush Data: ", espData)

            const currentTime = new Date();
        const hours = currentTime.getHours();

        const txtspan = document.querySelector(".esp-text-span")
            txtspan.innerHTML = espData[0].areaInfo + " : " + espData[0].events[0].stage

            espData[0]?.events.forEach(event => {
                if (
                    event.relDate === "today" &&
                    event.startTime === "0:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol00');
                    if (hours == 0 || hours == 1 || hours == 2) {
                        this.updateColor('col30');
                        this.updateColor('col1');
                        this.updateColor('col130');
                        this.updateColor('col2');
                        this.updateColor('col230');
                        this.updateColor('col00');
                    } else {
                        this.updateColor('col30');
                        this.updateColor('col1');
                        this.updateColor('col130');
                        this.updateColor('col2');
                        this.updateColor('col230');
                        this.updateColor('col00');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "2:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol2');
                    if (hours == 2 || hours == 3 || hours == 4) {
                        this.updateShedding('col2');
                        this.updateShedding('col230');
                        this.updateShedding('col3');
                        this.updateShedding('col330');
                        this.updateShedding('col40');
                        this.updateShedding('col430');
                    } else {
                        this.updateShedding('col2');
                        this.updateShedding('col230');
                        this.updateShedding('col3');
                        this.updateShedding('col330');
                        this.updateShedding('col40');
                        this.updateShedding('col430');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "4:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol4');
                    if (hours == 4 || hours == 5 || hours == 6) {
                        this.updateShedding('col4');
                        this.updateShedding('col430');
                        this.updateShedding('col5');
                        this.updateShedding('col530');
                        this.updateShedding('col6');
                        this.updateShedding('col630');
                    } else {
                        this.updateColor('col4');
                        this.updateColor('col430');
                        this.updateColor('col5');
                        this.updateColor('col530');
                        this.updateColor('col6');
                        this.updateColor('col630');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "6:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol6');
                    if (hours == 6 || hours == 7 || hours == 8) {
                        this.updateShedding('col6');
                        this.updateShedding('col630');
                        this.updateShedding('col7');
                        this.updateShedding('col730');
                        this.updateShedding('col8');
                        this.updateShedding('col830');
                    } else {
                        this.updateColor('col6');
                        this.updateColor('col630');
                        this.updateColor('col7');
                        this.updateColor('col730');
                        this.updateColor('col8');
                        this.updateColor('col830');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "8:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol8');
                    if (hours == 8 || hours == 9 || hours == 10) {
                        this.updateShedding('col8');
                        this.updateShedding('col830');
                        this.updateShedding('col9');
                        this.updateShedding('col930');
                        this.updateShedding('col10');
                        this.updateShedding('col1030');
                    } else {
                        this.updateColor('col8');
                        this.updateColor('col830');
                        this.updateColor('col9');
                        this.updateColor('col930');
                        this.updateColor('col10');
                        this.updateColor('col1030');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "10:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol10');
                    if (hours == 10 || hours == 11 || hours == 12) {
                        this.updateShedding('col10');
                        this.updateShedding('col1030');
                        this.updateShedding('col11');
                        this.updateShedding('col1130');
                        this.updateShedding('col12');
                        this.updateShedding('col1230');
                    } else {
                        this.updateColor('col10');
                        this.updateColor('col1030');
                        this.updateColor('col11');
                        this.updateColor('col1130');
                        this.updateColor('col12');
                        this.updateColor('col1230');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "12:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol12');
                    if (hours == 12 || hours == 13 || hours == 14) {
                        this.updateShedding('col12');
                        this.updateShedding('col1230');
                        this.updateShedding('col13');
                        this.updateShedding('col1330');
                        this.updateShedding('col14');
                        this.updateShedding('col1430');
                    } else {
                        this.updateColor('col12');
                        this.updateColor('col1230');
                        this.updateColor('col13');
                        this.updateColor('col1330');
                        this.updateColor('col14');
                        this.updateColor('col1430');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "14:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol14');
                    if (hours == 14 || hours == 15 || hours == 16) {
                        this.updateShedding('col14');
                        this.updateShedding('col1430');
                        this.updateShedding('col15');
                        this.updateShedding('col1530');
                        this.updateShedding('col16');
                        this.updateShedding('col1630');
                    } else {
                        this.updateColor('col14');
                        this.updateColor('col1430');
                        this.updateColor('col15');
                        this.updateColor('col1530');
                        this.updateColor('col16');
                        this.updateColor('col1630');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "16:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol16');
                    if (hours == 16 || hours == 17 || hours == 18) {
                        this.updateShedding('col16');
                        this.updateShedding('col1630');
                        this.updateShedding('col17');
                        this.updateShedding('col1730');
                        this.updateShedding('col18');
                        this.updateShedding('col1830');
                    } else {
                        this.updateColor('col16');
                        this.updateColor('col1630');
                        this.updateColor('col17');
                        this.updateColor('col1730');
                        this.updateColor('col18');
                        this.updateColor('col1830');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "18:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol18');
                    if (hours == 18 || hours == 19 || hours == 20) {
                        this.updateShedding('col18');
                        this.updateShedding('col1830');
                        this.updateShedding('col19');
                        this.updateShedding('col1930');
                        this.updateShedding('col20');
                        this.updateShedding('col2030');
                    } else {
                        this.updateColor('col18');
                        this.updateColor('col1830');
                        this.updateColor('col19');
                        this.updateColor('col1930');
                        this.updateColor('col20');
                        this.updateColor('col2030');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "20:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol20');
                    if (hours == 20 || hours == 21 || hours == 22) {
                        this.updateShedding('col20');
                        this.updateShedding('col2030');
                        this.updateShedding('col21');
                        this.updateShedding('col2130');
                        this.updateShedding('col22');
                        this.updateShedding('col2230');
                    } else {
                        this.updateColor('col20');
                        this.updateColor('col2030');
                        this.updateColor('col21');
                        this.updateColor('col2130');
                        this.updateColor('col22');
                        this.updateColor('col2230');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "22:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol22');
                    if (hours == 22 || hours == 23 || hours == 0) {
                        this.updateShedding('col22');
                        this.updateShedding('col2230');
                        this.updateShedding('col23');
                        this.updateShedding('col2330');
                        this.updateShedding('col00');
                        this.updateShedding('col030');
                    } else {
                        this.updateColor('col22');
                        this.updateColor('col2230');
                        this.updateColor('col23');
                        this.updateColor('col2330');
                        this.updateColor('col00');
                        this.updateColor('col30');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "0:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol00');
                    if (hours == 0 || hours == 1 || hours == 2) {
                        this.updateShedding('col30');
                        this.updateShedding('col1');
                        this.updateShedding('col130');
                        this.updateShedding('col2');
                        this.updateShedding('col230');
                    } else {
                        this.updateColor('col30');
                        this.updateColor('col1');
                        this.updateColor('col130');
                        this.updateColor('col2');
                        this.updateColor('col230');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "2:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol00');
                    if (hours == 2 || hours == 3 || hours == 4) {
                        this.updateShedding('col2');
                        this.updateShedding('col230');
                        this.updateShedding('col3');
                        this.updateShedding('col330');
                        this.updateShedding('col4');
                        this.updateShedding('col430');
                    } else {
                        this.updateColor('col2');
                        this.updateColor('col230');
                        this.updateColor('col3');
                        this.updateColor('col330');
                        this.updateColor('col4');
                        this.updateColor('430')
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "4:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol4');
                    if (hours == 4 || hours == 5 || hours == 6) {
                        this.updateShedding('col4');
                        this.updateShedding('col430');
                        this.updateShedding('col5');
                        this.updateShedding('col530');
                        this.updateShedding('col6');
                        this.updateShedding('col630');
                    } else {
                        this.updateColor('col4');
                        this.updateColor('col430');
                        this.updateColor('col5');
                        this.updateColor('col530');
                        this.updateColor('col6');
                        this.updateColor('col630');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "6:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol6');
                    if (hours == 6 || hours == 7 || hours == 8) {
                        this.updateShedding('col6');
                        this.updateShedding('col630');
                        this.updateShedding('col7');
                        this.updateShedding('col730');
                        this.updateShedding('col8');
                        this.updateShedding('col830');
                    } else {
                        this.updateColor('col6');
                        this.updateColor('col630');
                        this.updateColor('col7');
                        this.updateColor('col730');
                        this.updateColor('col8');
                        this.updateColor('col830');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "8:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol8');
                    if (hours == 8 || hours == 9 || hours == 10) {
                        this.updateShedding('col8');
                        this.updateShedding('col830');
                        this.updateShedding('col9');
                        this.updateShedding('col930');
                        this.updateShedding('col10');
                        this.updateShedding('col1030');
                    } else {
                        this.updateColor('col8');
                        this.updateColor('col830');
                        this.updateColor('col9');
                        this.updateColor('col930');
                        this.updateColor('col10');
                        this.updateColor('col1030');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "10:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol10');
                    if (hours == 10 || hours == 11 || hours == 12) {
                        this.updateShedding('col10');
                        this.updateShedding('col1030');
                        this.updateShedding('col11');
                        this.updateShedding('col1130');
                        this.updateShedding('col12');
                        this.updateShedding('col1230');
                    } else {
                        this.updateColor('col10');
                        this.updateColor('col1030');
                        this.updateColor('col11');
                        this.updateColor('col1130');
                        this.updateColor('col12');
                        this.updateColor('col1230');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "12:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol12');
                    if (hours == 12 || hours == 13 || hours == 14) {
                        this.updateShedding('col12');
                        this.updateShedding('col1230');
                        this.updateShedding('col13');
                        this.updateShedding('col1330');
                        this.updateShedding('col14');
                        this.updateShedding('col1430');
                    } else {
                        this.updateColor('col12');
                        this.updateColor('col1230');
                        this.updateColor('col13');
                        this.updateColor('col1330');
                        this.updateColor('col14');
                        this.updateColor('col1430');
                    }
                }
            })
    },

    socketNotificationReceived: function (notification, payload) {
        var self = this;
        if (notification === "ESP_DATA") {
            this.espData = payload;
            this.updateESP(this.espData)
        }
    }

})
