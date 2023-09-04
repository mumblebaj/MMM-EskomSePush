Module.register("MMM-EskomSePush", {
    defaults: {
        token: "token",
        area: "yourarea",
        updateInterval: 30 * 60 * 1000,
        fetchInterval: 2 * 60 * 60 * 1000

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

        this.sendSocketNotification("GET_ESP_DATA", this.config)
    },

    getDom: function () {
        // Function to create a div element with a specified class
        function createDivWithClass(className) {
            const div = document.createElement("div");
            div.className = className;
            return div;
        }

        const wrapper = createDivWithClass("esp-container");
        wrapper.id = "esp-wrapper";

        const esp_text_div = createDivWithClass("esp-text-div");
        const esp_text_span = createDivWithClass("esp-text-span");
        // esp_text_span.innerHTML = "Loadshedding Schedule";

        esp_text_div.appendChild(esp_text_span);
        wrapper.appendChild(esp_text_div);

        const esp_columns = createDivWithClass("esp-columns");

        // Loop to create columns for each hour and 30-minute intervals
        for (let i = 0; i <= 23; i++) {
            const hour = i < 10 ? `0${i}` : `${i}`; // Format the hour as "01" instead of "1" if needed
            const colHour = createDivWithClass(`column col${hour}00`);
            colHour.classList.add("gray");
            esp_columns.appendChild(colHour);

            // Create columns for 30-minute intervals if not midnight
            if (i !== 23) {
                const colHalfHour = createDivWithClass(`column col${hour}30`);
                colHalfHour.classList.add("gray");
                esp_columns.appendChild(colHalfHour);
            }
        }

        // Add a column for 23:30 (11:30 PM)
        const col2330 = createDivWithClass("column col2330");
        col2330.classList.add("gray");
        esp_columns.appendChild(col2330);

        wrapper.appendChild(esp_columns);

       const esp_times = createDivWithClass("esp-times");
        const tcols = createDivWithClass("time-s tcol01 hide");

        // Loop to create time elements from 01:00 to 00:00
        for (let i = 0; i <= 24; i++) {
            const time = createDivWithClass(`time tcol${i < 10 ? "0" : ""}${i} hide`);
            time.innerHTML = `${i < 10 ? "0" : ""}${i}:00`;
            esp_times.appendChild(time);
        } 
		
		wrapper.appendChild(esp_times);

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
        Log.log("Resetting Time Elements")
        let wrapper = document.getElementById("esp-wrapper")
            const elements = document.querySelectorAll('.time')
            //Log.log("Time elements selected: ", elements)
            elements.forEach(element => {
                Log.log("Resetting this time element: ", element)
                element.classList.add('hide')
                element.classList.remove('show')
            })
    },

    resetColumnElements: function () {
        Log.log("Resetting Column Elements")
        let wrapper = document.getElementById("esp-wrapper")
            const elements = document.querySelectorAll('.column')
            //Log.log("Column Elements Selected: ", elements)
            elements.forEach(element => {
                Log.log("Resetting this column element: ", element)
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
        this.resetColumnElements();
        this.resetTimeElements();
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
                    this.updateShow('tcol24');
                    if (hours == 0 || hours == 1 || hours == 2) {
                        this.updateShedding('col0000');
                        this.updateShedding('col0030');
                        this.updateShedding('col0100');
                        this.updateShedding('col0130');
                        this.updateShedding('col0200');
                        this.updateShedding('col0230');
                    } else {
                        this.updateColor('col0000');
                        this.updateColor('col0030');
                        this.updateColor('col0100');
                        this.updateColor('col0130');
                        this.updateColor('col0200');
                        this.updateColor('col0230');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "2:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol02');
                    if (hours == 2 || hours == 3 || hours == 4) {
                        this.updateShedding('col0200');
                        this.updateShedding('col0230');
                        this.updateShedding('col0300');
                        this.updateShedding('col0330');
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
                    } else {
                        this.updateColor('col0200');
                        this.updateColor('col0230');
                        this.updateColor('col0300');
                        this.updateColor('col0330');
                        this.updateColor('col0400');
                        this.updateColor('col0430');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "4:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol04');
                    if (hours == 4 || hours == 5 || hours == 6) {
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
                        this.updateShedding('col0500');
                        this.updateShedding('col0530');
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
                    } else {
                        this.updateColor('col0400');
                        this.updateColor('col0430');
                        this.updateColor('col0500');
                        this.updateColor('col0530');
                        this.updateColor('col0600');
                        this.updateColor('col0630');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "6:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol06');
                    if (hours == 6 || hours == 7 || hours == 8) {
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
                        this.updateShedding('col0700');
                        this.updateShedding('col0730');
                        this.updateShedding('col0800');
                        this.updateShedding('col0830');
                    } else {
                        this.updateColor('col0600');
                        this.updateColor('col0630');
                        this.updateColor('col0700');
                        this.updateColor('col0730');
                        this.updateColor('col0800');
                        this.updateColor('col0830');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "8:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol08');
                    if (hours == 8 || hours == 9 || hours == 10) {
						this.updateShedding('col0800');
                        this.updateShedding('col0830');
                        this.updateShedding('col0900');
                        this.updateShedding('col0930');
                        this.updateShedding('col1000');
						this.updateShedding('col1030');
                    } else {
                        this.updateColor('col0800');
                        this.updateColor('col0830');
                        this.updateColor('col0900');
                        this.updateColor('col0930');
                        this.updateColor('col1000');
						this.updateShedding('col1030');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "10:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol10');
                    if (hours == 10 || hours == 11 || hours == 12) {
                        this.updateShedding('col1000');
                        this.updateShedding('col1030');
                        this.updateShedding('col1100');
                        this.updateShedding('col1130');
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
                    } else {
                        this.updateColor('col1000');
                        this.updateColor('col1030');
                        this.updateColor('col1100');
                        this.updateColor('col1130');
                        this.updateColor('col1200');
                        this.updateColor('col1230');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "12:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol12');
                    if (hours == 12 || hours == 13 || hours == 14) {
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
                        this.updateShedding('col1300');
                        this.updateShedding('col1330');
                        this.updateShedding('col1400');
                        this.updateShedding('col1430');
                    } else {
                        this.updateColor('col1200');
                        this.updateColor('col1230');
                        this.updateColor('col1300');
                        this.updateColor('col1330');
                        this.updateColor('col1400');
                        this.updateColor('col1430');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "14:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol14');
                    if (hours == 14 || hours == 15 || hours == 16) {
                        this.updateShedding('col1400');
                        this.updateShedding('col1430');
                        this.updateShedding('col1500');
                        this.updateShedding('col1530');
                        this.updateShedding('col1600');
                        this.updateShedding('col1630');
                    } else {
                        this.updateColor('col1400');
                        this.updateColor('col1430');
                        this.updateColor('col1500');
                        this.updateColor('col1530');
                        this.updateColor('col1600');
                        this.updateColor('col1630');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "16:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol16');
                    if (hours == 16 || hours == 17 || hours == 18) {
                        this.updateShedding('col1600');
                        this.updateShedding('col1630');
                        this.updateShedding('col1700');
                        this.updateShedding('col1730');
                        this.updateShedding('col1800');
                        this.updateShedding('col1830');
                    } else {
                        this.updateColor('col1600');
                        this.updateColor('col1630');
                        this.updateColor('col1700');
                        this.updateColor('col1730');
                        this.updateColor('col1800');
                        this.updateColor('col1830');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "18:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol18');
                    if (hours == 18 || hours == 19 || hours == 20) {
                        this.updateShedding('col1800');
                        this.updateShedding('col1830');
                        this.updateShedding('col1900');
                        this.updateShedding('col1930');
                        this.updateShedding('col2000');
                        this.updateShedding('col2030');
                    } else {
                        this.updateColor('col1800');
                        this.updateColor('col1830');
                        this.updateColor('col1900');
                        this.updateColor('col1930');
                        this.updateColor('col2000');
                        this.updateColor('col2030');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "20:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol20');
                    if (hours == 20 || hours == 21 || hours == 22) {
                        this.updateShedding('col2000');
                        this.updateShedding('col2030');
                        this.updateShedding('col2100');
                        this.updateShedding('col2130');
                        this.updateShedding('col2200');
                        this.updateShedding('col2230');
                    } else {
                        this.updateColor('col2000');
                        this.updateColor('col2030');
                        this.updateColor('col2100');
                        this.updateColor('col2130');
                        this.updateColor('col2200');
                        this.updateColor('col2230');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "22:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol22');
                    if (hours == 22 || hours == 23 || hours == 0) {
                        this.updateShedding('col2200');
                        this.updateShedding('col2230');
                        this.updateShedding('col2300');
                        this.updateShedding('col2330');
                        this.updateShedding('col0000');
                        this.updateShedding('col0030');
                    } else {
                        this.updateColor('col2200');
                        this.updateColor('col2230');
                        this.updateColor('col2300');
                        this.updateColor('col2330');
                        this.updateColor('col0000');
                        this.updateColor('col0030');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "0:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol24');
                    if (hours == 0 || hours == 1 || hours == 2) {
                        this.updateShedding('col0000');
                        this.updateShedding('col0030');
                        this.updateShedding('col0100');
                        this.updateShedding('col0130');
                        this.updateShedding('col0200');
                        this.updateShedding('col0230');
                    } else {
                        this.updateColor('col0000');
                        this.updateColor('col0030');
                        this.updateColor('col0100');
                        this.updateColor('col0130');
                        this.updateColor('col0200');
                        this.updateColor('col0230');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "2:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol02');
                    if (hours == 2 || hours == 3 || hours == 4) {
                        this.updateShedding('col0200`');
                        this.updateShedding('col0230');
                        this.updateShedding('col0300');
                        this.updateShedding('col0330');
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
                    } else {
                        this.updateColor('col0200`');
                        this.updateColor('col0230');
                        this.updateColor('col0300');
                        this.updateColor('col0330');
                        this.updateColor('col0400');
                        this.updateColor('col0430');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "4:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol04');
                    if (hours == 4 || hours == 5 || hours == 6) {
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
                        this.updateShedding('col0500');
                        this.updateShedding('col0530');
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
                    } else {
                        this.updateColor('col0400');
                        this.updateColor('col0430');
                        this.updateColor('col0500');
                        this.updateColor('col0530');
                        this.updateColor('col0600');
                        this.updateColor('col0630');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "6:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol06');
                    if (hours == 6 || hours == 7 || hours == 8) {
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
                        this.updateShedding('col0700');
                        this.updateShedding('col0730');
                        this.updateShedding('col0800');
                        this.updateShedding('col0830');
                    } else {
                        this.updateColor('col0600');
                        this.updateColor('col0630');
                        this.updateColor('col0700');
                        this.updateColor('col0730');
                        this.updateColor('col0800');
                        this.updateColor('col0830');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "8:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol08');
                    if (hours == 8 || hours == 9 || hours == 10) {
                        this.updateShedding('col0800');
                        this.updateShedding('col0830');
                        this.updateShedding('col0900');
                        this.updateShedding('col0930');
                        this.updateShedding('col1000');
                        this.updateShedding('col1030');
                    } else {
                        this.updateColor('col0800');
                        this.updateColor('col0830');
                        this.updateColor('col0900');
                        this.updateColor('col0930');
                        this.updateColor('col1000');
                        this.updateColor('col1030');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "10:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol10');
                    if (hours == 10 || hours == 11 || hours == 12) {
                        this.updateShedding('col1000');
                        this.updateShedding('col1030');
                        this.updateShedding('col1100');
                        this.updateShedding('col1130');
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
                    } else {
                        this.updateColor('col1000');
                        this.updateColor('col1030');
                        this.updateColor('col1100');
                        this.updateColor('col1130');
                        this.updateColor('col1200');
                        this.updateColor('col1230');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "12:0" &&
                    event.duration == 2.5) {
                    this.updateShow('tcol12');
                    if (hours == 12 || hours == 13 || hours == 14) {
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
                        this.updateShedding('col1300');
                        this.updateShedding('col1330');
                        this.updateShedding('col1400');
                        this.updateShedding('col1430');
                    } else {
                        this.updateColor('col1200');
                        this.updateColor('col1230');
                        this.updateColor('col1300');
                        this.updateColor('col1330');
                        this.updateColor('col1400');
                        this.updateColor('col1430');
                    }
                }
				if (
                    event.relDate === "today" &&
                    event.startTime === "0:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol24');
                    if (hours >= 0 || hours <= 4) {
                        this.updateShedding('col0000');
                        this.updateShedding('col0030');
                        this.updateShedding('col0100');
                        this.updateShedding('col0130');
                        this.updateShedding('col0200');
                        this.updateShedding('col0230');
						this.updateShedding('col0300');
						this.updateShedding('col0400');
						this.updateShedding('col0430');
                    } else {
                        this.updateColor('col0000');
                        this.updateColor('col0030');
                        this.updateColor('col0100');
                        this.updateColor('col0130');
                        this.updateColor('col0200');
                        this.updateColor('col0230');
						this.updateColor('col0300');
						this.updateColor('col0330');
						this.updateColor('col0400');
						this.updateColor('col0430');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "2:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol02');
                    if (hours >= 2 || hours <= 6) {
                        this.updateShedding('col0200');
                        this.updateShedding('col0230');
                        this.updateShedding('col0300');
                        this.updateShedding('col0330');
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
						this.updateShedding('col0500');
						this.updateShedding('col0530');
						this.updateShedding('col0600');
						this.updateShedding('col0630');
                    } else {
                        this.updateColor('col0200');
                        this.updateColor('col0230');
                        this.updateColor('col0300');
                        this.updateColor('col0330');
                        this.updateColor('col0400');
                        this.updateColor('col0430');
						this.updateColor('col0500');
						this.updateColor('col0530');
						this.updateColor('col0600');
						this.updateColor('col0630');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "4:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol04');
                    if (hours >= 4 || hours <= 8) {
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
                        this.updateShedding('col0500');
                        this.updateShedding('col0530');
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
						this.updateShedding('col0700');
						this.updateShedding('col0730');
						this.updateShedding('col0800');
						this.updateShedding('col0830');
                    } else {
                        this.updateColor('col0400');
                        this.updateColor('col0430');
                        this.updateColor('col0500');
                        this.updateColor('col0530');
                        this.updateColor('col0600');
                        this.updateColor('col0630');
						this.updateColor('col0700');
						this.updateColor('col0730');
						this.updateColor('col0800');
						this.updateColor('col0830');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "6:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol06');
                    if (hours >= 6 || hours <= 10) {
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
                        this.updateShedding('col0700');
                        this.updateShedding('col0730');
                        this.updateShedding('col0800');
                        this.updateShedding('col0830');
						this.updateShedding('col0900');
						this.updateShedding('col0930');
						this.updateShedding('col1000');
						this.updateShedding('col1030');
                    } else {
                        this.updateColor('col0600');
                        this.updateColor('col0630');
                        this.updateColor('col0700');
                        this.updateColor('col0730');
                        this.updateColor('col0800');
                        this.updateColor('col0830');
						this.updateColor('col0900');
						this.updateColor('col0930');
						this.updateColor('col1000');
						this.updateColor('col1030');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "8:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol08');
                    if (hours >= 8 || hours <= 12) {
						this.updateShedding('col0800');
                        this.updateShedding('col0830');
                        this.updateShedding('col0900');
                        this.updateShedding('col0930');
                        this.updateShedding('col1000');
						this.updateShedding('col1030');
						this.updateShedding('col1100');
						this.updateShedding('col1130');
						this.updateShedding('col1200');
						this.updateShedding('col1230');
                    } else {
                        this.updateColor('col0800');
                        this.updateColor('col0830');
                        this.updateColor('col0900');
                        this.updateColor('col0930');
                        this.updateColor('col1000');
						this.updateColor('col1030');
						this.updateColor('col1100');
						this.updateColor('col1130');
						this.updateColor('col1200');
						this.updateColor('col1230');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "10:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol10');
                    if (hours >= 10 || hours <= 14) {
                        this.updateShedding('col1000');
                        this.updateShedding('col1030');
                        this.updateShedding('col1100');
                        this.updateShedding('col1130');
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
						this.updateShedding('col1300');
						this.updateShedding('col1330');
						this.updateShedding('col1400');
						this.updateShedding('col1430');
                    } else {
                        this.updateColor('col1000');
                        this.updateColor('col1030');
                        this.updateColor('col1100');
                        this.updateColor('col1130');
                        this.updateColor('col1200');
                        this.updateColor('col1230');
						this.updateColor('col1300');
						this.updateColor('col1330');
						this.updateColor('col1400');
						this.updateColor('col1430');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "12:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol12');
                    if (hours >= 12 || hours <= 16) {
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
                        this.updateShedding('col1300');
                        this.updateShedding('col1330');
                        this.updateShedding('col1400');
                        this.updateShedding('col1430');
						this.updateShedding('col1500');
						this.updateShedding('col1530');
						this.updateShedding('col1600');
						this.updateShedding('col1630');
                    } else {
                        this.updateColor('col1200');
                        this.updateColor('col1230');
                        this.updateColor('col1300');
                        this.updateColor('col1330');
                        this.updateColor('col1400');
                        this.updateColor('col1430');
						this.updateColor('col1500');
						this.updateColor('col1530');
						this.updateColor('col1600');
						this.updateColor('col1630');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "14:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol14');
                    if (hours >= 14 || hours <= 18) {
                        this.updateShedding('col1400');
                        this.updateShedding('col1430');
                        this.updateShedding('col1500');
                        this.updateShedding('col1530');
                        this.updateShedding('col1600');
                        this.updateShedding('col1630');
						this.updateShedding('col1700');
						this.updateShedding('col1730');
						this.updateShedding('col1800');
						this.updateShedding('col1830');
                    } else {
                        this.updateColor('col1400');
                        this.updateColor('col1430');
                        this.updateColor('col1500');
                        this.updateColor('col1530');
                        this.updateColor('col1600');
                        this.updateColor('col1630');
						this.updateColor('col1700');
						this.updateColor('col1730');
						this.updateColor('col1800');
						this.updateColor('col1830');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "16:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol16');
                    if (hours >= 16 || hours <= 20) {
                        this.updateShedding('col1600');
                        this.updateShedding('col1630');
                        this.updateShedding('col1700');
                        this.updateShedding('col1730');
                        this.updateShedding('col1800');
                        this.updateShedding('col1830');
						this.updateShedding('col1900');
						this.updateShedding('col1930');
						this.updateShedding('col2000');
						this.updateShedding('col2030');
                    } else {
                        this.updateColor('col1600');
                        this.updateColor('col1630');
                        this.updateColor('col1700');
                        this.updateColor('col1730');
                        this.updateColor('col1800');
                        this.updateColor('col1830');
						this.updateColor('col1900');
						this.updateColor('col1930');
						this.updateColor('col2000');
						this.updateColor('col2030');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "18:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol18');
                    if (hours >= 18 || hours <= 22) {
                        this.updateShedding('col1800');
                        this.updateShedding('col1830');
                        this.updateShedding('col1900');
                        this.updateShedding('col1930');
                        this.updateShedding('col2000');
                        this.updateShedding('col2030');
						this.updateShedding('col2100');
						this.updateShedding('col2130');
						this.updateShedding('col2200');
						this.updateShedding('col2230');
                    } else {
                        this.updateColor('col1800');
                        this.updateColor('col1830');
                        this.updateColor('col1900');
                        this.updateColor('col1930');
                        this.updateColor('col2000');
                        this.updateColor('col2030');
						this.updateColor('col2100');
						this.updateColor('col2130');
						this.updateColor('col2200');
						this.updateColor('col2230');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "20:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol20');
                    if (hours >= 20 || hours <= 0) {
                        this.updateShedding('col2000');
                        this.updateShedding('col2030');
                        this.updateShedding('col2100');
                        this.updateShedding('col2130');
                        this.updateShedding('col2200');
                        this.updateShedding('col2230');
						this.updateShedding('col2300');
						this.updateShedding('col2330');
						this.updateShedding('col0000');
						this.updateShedding('col0030');
                    } else {
                        this.updateColor('col2000');
                        this.updateColor('col2030');
                        this.updateColor('col2100');
                        this.updateColor('col2130');
                        this.updateColor('col2200');
                        this.updateColor('col2230');
						this.updateColor('col2300');
						this.updateColor('col2330');
						this.updateColor('col0000');
						this.updateColor('col0030');
                    }
                }
                if (
                    event.relDate === "today" &&
                    event.startTime === "22:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol22');
                    if (hours >= 22 || hours <= 2) {
                        this.updateShedding('col2200');
                        this.updateShedding('col2230');
                        this.updateShedding('col2300');
                        this.updateShedding('col2330');
                        this.updateShedding('col0000');
                        this.updateShedding('col0030');
						this.updateShedding('col0100');
						this.updateShedding('col0130');
						this.updateShedding('col0200');
						this.updateShedding('col0230');
                    } else {
                        this.updateColor('col2200');
                        this.updateColor('col2230');
                        this.updateColor('col2300');
                        this.updateColor('col2330');
                        this.updateColor('col0000');
                        this.updateColor('col0030');
						this.updateColor('col0100');
						this.updateColor('col0130');
						this.updateColor('col0200');
						this.updateColor('col0230');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "0:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol24');
                    if (hours >= 0 || hours <= 4) {
                        this.updateShedding('col0000');
                        this.updateShedding('col0030');
                        this.updateShedding('col0100');
                        this.updateShedding('col0130');
                        this.updateShedding('col0200');
                        this.updateShedding('col0230');
						this.updateShedding('col0300');
						this.updateShedding('col0330');
						this.updateShedding('col0400');
						this.updateShedding('col0430');
                    } else {
                        this.updateColor('col0000');
                        this.updateColor('col0030');
                        this.updateColor('col0100');
                        this.updateColor('col0130');
                        this.updateColor('col0200');
                        this.updateColor('col0230');
						this.updateColor('col0300');
						this.updateColor('col0330');
						this.updateColor('col0400');
						this.updateColor('col0430');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "2:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol02');
                    if (hours >= 2 || hours <= 6) {
                        this.updateShedding('col0200`');
                        this.updateShedding('col0230');
                        this.updateShedding('col0300');
                        this.updateShedding('col0330');
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
						this.updateShedding('col0500');
						this.updateShedding('col0530');
						this.updateShedding('col0600');
						this.updateShedding('col0630');
                    } else {
                        this.updateColor('col0200`');
                        this.updateColor('col0230');
                        this.updateColor('col0300');
                        this.updateColor('col0330');
                        this.updateColor('col0400');
                        this.updateColor('col0430');
						this.updateColor('col0500');
						this.updateColor('col0530');
						this.updateColor('col0600');
						this.updateColor('col0630');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "4:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol04');
                    if (hours >= 4 || hours <= 8) {
                        this.updateShedding('col0400');
                        this.updateShedding('col0430');
                        this.updateShedding('col0500');
                        this.updateShedding('col0530');
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
						this.updateShedding('col0700');
						this.updateShedding('col0730');
						this.updateShedding('col0800');
						this.updateShedding('col0830');
                    } else {
                        this.updateColor('col0400');
                        this.updateColor('col0430');
                        this.updateColor('col0500');
                        this.updateColor('col0530');
                        this.updateColor('col0600');
                        this.updateColor('col0630');
						this.updateColor('col0700');
						this.updateColor('col0730');
						this.updateColor('col0800');
						this.updateColor('col0830');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "6:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol06');
                    if (hours >= 6 || hours == 10) {
                        this.updateShedding('col0600');
                        this.updateShedding('col0630');
                        this.updateShedding('col0700');
                        this.updateShedding('col0730');
                        this.updateShedding('col0800');
                        this.updateShedding('col0830');
						this.updateShedding('col0900');
						this.updateShedding('col0930');
						this.updateShedding('col1000');
						this.updateShedding('col1030');
                    } else {
                        this.updateColor('col0600');
                        this.updateColor('col0630');
                        this.updateColor('col0700');
                        this.updateColor('col0730');
                        this.updateColor('col0800');
                        this.updateColor('col0830');
						this.updateColor('col0900');
						this.updateColor('col0930');
						this.updateColor('col1000');
						this.updateColor('col1030');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "8:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol08');
                    if (hours >= 8 || hours <= 12) {
                        this.updateShedding('col0800');
                        this.updateShedding('col0830');
                        this.updateShedding('col0900');
                        this.updateShedding('col0930');
                        this.updateShedding('col1000');
                        this.updateShedding('col1030');
						this.updateShedding('col1100');
						this.updateShedding('col1130');
						this.updateShedding('col1200');
						this.updateShedding('col1230');
                    } else {
                        this.updateColor('col0800');
                        this.updateColor('col0830');
                        this.updateColor('col0900');
                        this.updateColor('col0930');
                        this.updateColor('col1000');
                        this.updateColor('col1030');
						this.updateColor('col1100');
						this.updateColor('col1130');
						this.updateColor('col1200');
						this.updateColor('col1230');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "10:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol10');
                    if (hours >= 10 || hours <= 14) {
                        this.updateShedding('col1000');
                        this.updateShedding('col1030');
                        this.updateShedding('col1100');
                        this.updateShedding('col1130');
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
						this.updateShedding('col1300');
						this.updateShedding('col1330');
						this.updateShedding('col1400');
						this.updateShedding('col1430');
                    } else {
                        this.updateColor('col1000');
                        this.updateColor('col1030');
                        this.updateColor('col1100');
                        this.updateColor('col1130');
                        this.updateColor('col1200');
                        this.updateColor('col1230');
						this.updateColor('col1300');
						this.updateColor('col1330');
						this.updateColor('col1400');
						this.updateColor('col1430');
                    }
                }
                if (
                    event.relDate === "tomorrow" &&
                    event.startTime === "12:0" &&
                    event.duration == 4.5) {
                    this.updateShow('tcol12');
                    if (hours >= 12 || hours <= 16) {
                        this.updateShedding('col1200');
                        this.updateShedding('col1230');
                        this.updateShedding('col1300');
                        this.updateShedding('col1330');
                        this.updateShedding('col1400');
                        this.updateShedding('col1430');
						this.updateShedding('col1500');
						this.updateShedding('col1530');
						this.updateShedding('col1600');
						this.updateShedding('col1630');
                    } else {
                        this.updateColor('col1200');
                        this.updateColor('col1230');
                        this.updateColor('col1300');
                        this.updateColor('col1330');
                        this.updateColor('col1400');
                        this.updateColor('col1430');
						this.updateColor('col1500');
						this.updateColor('col1530');
						this.updateColor('col1600');
						this.updateColor('col1630');
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
