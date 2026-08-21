var NodeHelper = require("node_helper");
var fetch = require("node-fetch");
var { DateTime } = require("luxon");

module.exports = NodeHelper.create({
  requiresVersion: "2.23.0",

  start: function () {
    console.log("Starting node_helper for module: " + this.name);

    this.espUrl = "https://developer.sepush.co.za/business/3.0/schedule?id=";
    this.espReportsUrl = "https://developer.sepush.co.za/business/3.1/reports";
  },

  deconstructData: function (data, code) {
    var payload = data;
    const espEvents = [];
    if (payload.events.length >= 1) {
      let eventsData = [];
      payload.events.forEach((event) => {
        let start1 = DateTime.fromISO(event.start);
        let end1 = DateTime.fromISO(event.end);
        const diff = end1.diff(start1, ["years", "months", "days", "hours"]);
        var timeDiff = diff.toObject();
        eventsData.push({
          stage: event.note,
          relDate: DateTime.fromISO(event.start).toRelativeCalendar(),
          start: event.start,
          end: event.end,
          startTime:
            DateTime.fromISO(event.start).hour + ":" + DateTime.fromISO(event.start).minute,
          endTime: DateTime.fromISO(event.end).hour + ":" + DateTime.fromISO(event.end).minute,
          duration: timeDiff.hours
        });
      });
      espEvents.push({
        code: code,
        areaInfo: payload.info.name,
        region: payload.info.region,
        events: eventsData
      });
      return espEvents;
    } else {
      espEvents.push({
        code: code,
        areaInfo: payload.areaInfo,
        region: payload.region,
        events: "No upcoming loadshedding"
      });
      return espEvents;
    }
  },

  async getEspData(payload) {
    var tkn = payload.token;
    var endPoint = this.espUrl + payload.area;

    const response = await fetch(endPoint, {
      method: "get",
      headers: {
        token: tkn
      }
    });

    if (response.status !== 200) {
      const errorText = await response.text();
      const espEvents = [];
      const errorObject = JSON.parse(errorText);
      const errorMessage = errorObject.error;
      espEvents.push({
        code: response.status,
        areaInfo: payload.area,
        region: "",
        events: errorMessage
      });
      this.sendSocketNotification("ESP_DATA", espEvents);
      return;
    } else {
      const data = await response.json();
      const code = response.status;
      var results = this.deconstructData(data, code);
      this.sendSocketNotification("ESP_DATA", results);
    }
  },

  async getEspReports(payload) {
    const reportArea = payload.reportArea;
    const validCategories = ["electricity", "water", "internet"];
    const configuredCategories = Array.isArray(payload.reportCategories)
      ? payload.reportCategories
      : [];
    const categories = [...new Set(configuredCategories)].filter((category) =>
      validCategories.includes(category)
    );

    if (!reportArea || categories.length === 0 || this.reportQuotaReset > Date.now()) {
      return;
    }

    const requests = categories.map(async (category) => {
      const query = `?id=${encodeURIComponent(reportArea)}&category=${encodeURIComponent(category)}`;
      const response = await fetch(this.espReportsUrl + query, {
        method: "get",
        headers: {
          token: payload.token
        }
      });

      const quota = {
        remaining: response.headers.get("x-ratelimit-remaining"),
        reset: response.headers.get("x-ratelimit-reset")
      };

      if (response.status !== 200) {
        const errorBody = await response.json().catch(() => ({}));
        if (response.status === 429 && quota.reset) {
          const resetAt = Date.parse(quota.reset);
          if (!Number.isNaN(resetAt)) {
            this.reportQuotaReset = resetAt;
          }
        }
        return {
          category: category,
          code: response.status,
          error: errorBody.error || "Unable to retrieve outage reports",
          quota: quota
        };
      }

      const data = await response.json();
      return {
        category: category,
        code: response.status,
        health: data.health || { state: "UNKNOWN" },
        metrics: data.metrics || {},
        reports: data.reports || [],
        chats: data.chats || [],
        quota: quota
      };
    });

    const results = await Promise.allSettled(requests);
    const reports = results.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      }

      return {
        category: categories[index],
        code: 0,
        error: "Unable to retrieve outage reports"
      };
    });

    this.sendSocketNotification("ESP_REPORTS", reports);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "GET_ESP_DATA") {
      this.getEspData(payload);
    }
    if (notification === "GET_ESP_REPORTS") {
      this.getEspReports(payload);
    }
  }
});
