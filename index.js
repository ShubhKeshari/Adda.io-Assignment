class BookingScheduler {
  constructor() {
    this.bookings = [];
  }
  book(bookingDetails) {
    const { name, date, startTime, endTime } = bookingDetails;

    if (this.isAvailable(name, date, startTime, endTime)) {
      const amount = this.calculateAmount(name, startTime, endTime);
      this.bookings.push({ name, date, startTime, endTime });
      return `Booked, Rs. ${amount}`;
    } else {
      return "Booking Failed, Already Booked";
    }
  }

  isAvailable(name, date, startTime, endTime) {
    for (const booking of this.bookings) {
      if (
        booking.name === name &&
        booking.date === date &&
        ((startTime >= booking.startTime && startTime < booking.endTime) ||
          (endTime > booking.startTime && endTime <= booking.endTime))
      ) {
        return false;
      }
    }
    return true;
  }

  calculateAmount(name, startTime, endTime) {
    let amount = 0;
    const rateCard = this.getRateCard(name);
    for (let hour = startTime; hour < endTime; hour++) {
      for (const rate of rateCard) {
        if (hour >= rate.start && hour < rate.end) {
          amount += rate.rate;
          break;
        }
      }
    }
    return amount;
  }

  getRateCard(name) {
    const rateCards = {
      Clubhouse: [
        { start: 10, end: 16, rate: 100 },
        { start: 16, end: 22, rate: 500 },
      ],
      "Tennis Court": [{ start: 0, end: 24, rate: 50 }],
    };
    return rateCards[name];
  }
}

const scheduler = new BookingScheduler();

console.log(
  scheduler.book({
    name: "Clubhouse",
    date: "26-10-2020",
    startTime: 11,
    endTime: 13,
  })
);
console.log(
  scheduler.book({
    name: "Tennis Court",
    date: "26-10-2020",
    startTime: 14,
    endTime: 19,
  })
);
console.log(
  scheduler.book({
    name: "Clubhouse",
    date: "26-10-2020",
    startTime: 12,
    endTime: 15,
  })
);
console.log(
  scheduler.book({
    name: "Tennis Court",
    date: "26-10-2020",
    startTime: 10,
    endTime: 15,
  })
);
