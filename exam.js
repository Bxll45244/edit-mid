// ประเภทของบัญชี
const AccountType = {
  GUEST: "Guest",
  RECEPTIONIST: "Receptionist"
};

// สถานะของบัญชี
const AccountStatus = {
  ACTIVE: "Active",
  INACTIVE: "Inactive"
};

// ประเภทของห้องพัก
const RoomType = {
  SINGLE: "Single",
  DOUBLE: "Double",
  SUITE: "Suite"
};

// สถานะของการจองห้องพัก
const BookingStatus = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled"
};

class Person {
  constructor(name, address, email, phone, accountType) {
    this.name = name;
    this.address = address;
    this.email = email;
    this.phone = phone;
    this.accountType = accountType;
  }

  toString() {
    return `Person: [Name: ${this.name} Address: ${this.address} Email: ${this.email} Phone: ${this.phone} AccountType: ${this.accountType}]`;
  }
}

class Account {
  constructor(username, password, status) {
    this.username = username;
    this.password = password;
    this.status = status;
  }

  login(username, password) {
    if (this.username === username && this.password === password) {
      return true;
    } else {
      return false;
    }
  }

  resetPassword(newPassword) {
    this.password = newPassword;
    return true;
  }
}

class Room {
  constructor(number, type, view, price, status) {
    this.number = number;
    this.type = type;
    this.view = view;
    this.price = price;
    this.status = status;
  }

  toString() {
    return `Room: [Number: ${this.number} Type: ${this.type} View: ${this.view} Price: ${this.price} Status: ${this.status}]`;
  }
}

class RoomBooking {
  constructor(reservationNumber, room, startDate, durationDays, status, createdBy) {
    this.reservationNumber = reservationNumber;
    this.room = room;
    this.startDate = startDate;
    this.durationDays = durationDays;
    this.status = status;
    this.createdBy = createdBy;
  }

  toString() {
    const statusLabel = this.status === BookingStatus.PENDING ? "Reserved" : "Booked";
    return `RoomBooking: [Reservation Number: ${this.reservationNumber} Room: ${this.room.toString()} Status: ${statusLabel} Check in date: ${this.startDate} stay for ${this.durationDays} nights booked by: ${this.createdBy.name}]`;
  }
}

class Receptionist extends Person {
  createBooking() {
    // สร้างการจองห้องพัก
  }
}

class Hotel {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.rooms = [];
  }

  getRooms() {
    return this.rooms;
  }

  addNewRoom(room) {
    this.rooms.push(room);
    return true;
  }

  toString() {
    let roomDetails = this.rooms.map(room => room.toString()).join('\n');
    return `Hotel: [Name: ${this.name}, Location: ${this.location}\n${roomDetails}]`;
  }
}

class Guest extends Person {
  constructor(name, address, email, phone, accountType) {
    super(name, address, email, phone, accountType);
    this.totalRoomBooked = 0;
    this.bookings = [];
  }

  createBooking(room, startDate, durationDays) {
    const reservationNumber = `Booking${Date.now()}`;
    const status = BookingStatus.PENDING;
    const newBooking = new RoomBooking(reservationNumber, room, startDate, durationDays, status, this);
    this.bookings.push(newBooking);
    this.totalRoomBooked++;
    return newBooking;
  }

  toString() {
    let bookingsInfo = "";
    if (this.bookings.length > 0) {
      bookingsInfo = this.bookings.map(booking => booking.toString()).join('\n');
    }
    return `${super.toString()} Total Bookings: ${this.totalRoomBooked}\n${bookingsInfo}`;
  }
}

// สร้าง Room 4 ห้อง
const room1 = new Room(101, RoomType.SINGLE, "Garden View", 1000, BookingStatus.PENDING);
const room2 = new Room(102, RoomType.DOUBLE, "Sea View", 2000, BookingStatus.PENDING);
const room3 = new Room(103, RoomType.SINGLE, "City View", 1500, BookingStatus.PENDING);
const room4 = new Room(104, RoomType.SUITE, "Mountain View", 3000, BookingStatus.PENDING);

// สร้าง person 4 คน
const person1 = new Guest("Alice", "Nakhon Pathom", "alice@mail", "0123456789", AccountType.GUEST);
const person2 = new Guest("Bob", "Kanchanaburi", "bob@mail", "0123456789", AccountType.GUEST);
const person3 = new Person("Catherine", "Bangkok", "catherine@mail", "0123456789", AccountType.RECEPTIONIST);
const person4 = new Person("David", "Bangkok", "david@mail", "0123456789", AccountType.RECEPTIONIST);

// แสดง input ของ person 4 คน
console.log(person1.toString());
console.log(person2.toString());
console.log(person3.toString());
console.log(person4.toString());

// สร้าง Hotel และเพิ่ม Room 4 ห้องลงใน Hotel
const hotel = new Hotel("SE Hotel", "Nakhon Pathom");
hotel.addNewRoom(room1);
hotel.addNewRoom(room2);
hotel.addNewRoom(room3);
hotel.addNewRoom(room4);

// สร้าง RoomBooking และแสดง input
const booking1 = person2.createBooking(room2, "2024-03-16", 3);
console.log(person2.toString());
console.log(booking1.toString());

const booking2 = person1.createBooking(room4, "2024-03-19", 5);
console.log(person1.toString());
console.log(booking2.toString());

// แสดง input ของ Room 4 ห้อง
console.log(hotel.toString());
