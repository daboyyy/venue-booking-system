// Data
const bookingData = [
    {
        "id": 1,
        "roomId": "A101",
        "startTime": "2019-09-28 13:00:00",
        "endTime": "2019-09-28 14:00:00",
        "title": "Lunch with Petr"
    },
    {
        "id": 2,
        "roomId": "A101",
        "startTime": "2019-09-28 14:00:00",
        "endTime": "2019-09-28 15:00:00",
        "title": "Sales Weekly Meeting"
    },
    {
        "id": 3,
        "roomId": "A101",
        "startTime": "2019-09-28 16:00:00",
        "endTime": "2019-09-28 18:00:00",
        "title": "Anastasia Website Warroom"
    },
    {
        "id": 4,
        "roomId": "A101",
        "startTime": "2019-09-29 13:00:00",
        "endTime": "2019-09-29 14:00:00",
        "title": "One-on-One Session"
    },
    {
        "id": 5,
        "roomId": "A101",
        "startTime": "2019-09-29 16:00:00",
        "endTime": "2019-09-29 18:00:00",
        "title": "UGC Sprint Planning"
    },
    {
        "id": 6,
        "roomId": "A102",
        "startTime": "2019-09-30 09:00:00",
        "endTime": "2019-10-04 18:00:00",
        "title": "5-Day Design Sprint Workshop"
    },
    {
        "id": 7,
        "roomId": "Auditorium",
        "startTime": "2019-09-19 09:00:00",
        "endTime": "2019-09-23 19:00:00",
        "title": "Thai Tech Innovation 2019"
    },
    {
        "id": 8,
        "roomId": "A101",
        "startTime": "2019-09-28 10:00:00",
        "endTime": "2019-09-28 13:00:00",
        "title": "Raimonland project"
    },
    {
        "id": 9,
        "roomId": "A102",
        "startTime": "2019-09-30 18:00:00",
        "endTime": "2019-09-30 20:00:00",
        "title": "Management Meetinng"
    },
    {
        "id": 10,
        "roomId": "A101",
        "startTime": "2019-10-04 14:00:00",
        "endTime": "2019-10-06 11:00:00",
        "title": "3-day workshop Corgi costume"
    },
];
// END DATA

// checkAvailability Function
const convertDateFormat = (time) => {
    const newDateFormat = new Date(time);
    return newDateFormat;
};

const checkCondition = (roomFilterArr, startTime, endTime) => {
    const startTimeDate = convertDateFormat(startTime);
    const endTimeDate = convertDateFormat(endTime);

    const availableFilterArr = roomFilterArr.filter((data) => {
      const lessThanCondition =
        startTimeDate < convertDateFormat(data.startTime) &&
        startTimeDate < convertDateFormat(data.endTime) &&
        endTimeDate < convertDateFormat(data.startTime) &&
        endTimeDate < convertDateFormat(data.endTime);

      if (lessThanCondition) return true;

      const moreThanCondition =
        startTimeDate > convertDateFormat(data.startTime) &&
        startTimeDate > convertDateFormat(data.endTime) &&
        endTimeDate > convertDateFormat(data.startTime) &&
        endTimeDate > convertDateFormat(data.endTime);

      if (moreThanCondition) return true;

      return false;
    });

    if (availableFilterArr.length === roomFilterArr.length) {
      return true;
    }

    return false;
};

const checkAvailability = (roomId, startTime, endTime) => {
    const roomFilterArr = bookingData.filter((data) => data.roomId === roomId);
    const isAvailable = checkCondition(roomFilterArr, startTime, endTime);

    return isAvailable
};
// END CHECKAVAILABILITY FUNCTION

// getBookings Function
const getDate = (time) => {
    const newDateFormat = new Date(time.split(' ')[0]);
    return newDateFormat;
};

const getCurrentDayData = (roomFilterArr) => {
    // if you want current date just uncomment line 131 - 132

    /*
    const rawToday = new Date();
    const today = new Date(Date.UTC(rawToday.getFullYear(), rawToday.getMonth(), rawToday.getDate(), 0, 0, 0));
    */

    // mock up current date
    const today = new Date('2019-09-28T00:00:00.000Z');

    const todayBookingArr = roomFilterArr.filter((data) => getDate(data.startTime).toDateString() === today.toDateString());
    return todayBookingArr;
}

Date.prototype.getNextWeekDay = function(day) {
    if (day) {
      var next = this;
      next.setDate(this.getDate() - this.getDay() + 7 + day);
      return next;
    }
}

const getcurrentWeekData = (roomFilterArr) => {
    // mock up current date
    const todaySring = '2019-10-04T00:00:00.000Z';

    const today = new Date(todaySring);
    const tempToday = new Date(todaySring);
    const nextSevenDay = tempToday.getNextWeekDay(tempToday.getDay());

    const todayBookingArr = roomFilterArr.filter((data) => {
        if (
            getDate(data.endTime) >= today &&
            getDate(data.endTime) < nextSevenDay
        ) {
            return true
        }

        return false
    });
    return todayBookingArr;
};

Date.prototype.getNextTwoWeekDay = function(day) {
    if (day) {
      var next = this;
      next.setDate(this.getDate() - this.getDay() + 14 + day);
      return next;
    }
}

const getNextWeekData = (roomFilterArr) => {
    // mock up current date
    const todaySring = '2019-09-27T00:00:00.000Z';

    const tempTodayForWeek = new Date(todaySring);
    const tempTodayForTwoWeek = new Date(todaySring);
    const nextSevenDay = tempTodayForWeek.getNextWeekDay(tempTodayForWeek.getDay());
    const nextFourteenDay = tempTodayForTwoWeek.getNextTwoWeekDay(tempTodayForTwoWeek.getDay());

    const todayBookingArr = roomFilterArr.filter((data) => {
        if (
            getDate(data.endTime) >= nextSevenDay &&
            getDate(data.endTime) < nextFourteenDay
        ) {
            return true
        }

        return false
    });
    return todayBookingArr;
};

const getBookings = (roomId, bookingRange) => {
    const roomFilterArr = bookingData.filter((data) => data.roomId === roomId);
    switch(bookingRange) {
        case 'today':
          return getCurrentDayData(roomFilterArr);
        case 'this week':
          return getcurrentWeekData(roomFilterArr);
        case 'next week':
          return getNextWeekData(roomFilterArr);
        default:
          return bookingData;
    }
}
// END GETBOOKINGS FUNCTION

// MAIN
const roomId = 'A101';
const startTime = '2019-09-28 11:00:00';
const endTime = '2019-09-28 14:00:00';

console.log(checkAvailability(roomId, startTime, endTime));
console.log(getBookings('A101', 'next week'))
// END MAIN