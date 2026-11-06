// Reservation page: book a table or a special event
import { useState } from "react"; // hook for state

// empty form values
const emptyForm = {
  name: "", // customer name
  phone: "", // phone number
  date: "", // booking date
  time: "", // booking time
  guests: 2, // number of people
  type: "Table", // Table, Birthday Party, or Corporate Event
  notes: "", // extra requests
};

// make the list of booking times: 11:00 to 22:00, every 30 minutes
const timeSlots = []; // empty list to fill
for (let hour = 11; hour <= 22; hour++) {
  timeSlots.push(hour + ":00"); // on the hour, e.g. "11:00"
  if (hour < 22) timeSlots.push(hour + ":30"); // half past, e.g. "11:30" (last slot is 22:00)
}

// show "13:30" as "1:30 PM" so it is easy to read
function niceTime(slot) {
  const [h, m] = slot.split(":").map(Number); // split hours and minutes
  const ampm = h >= 12 ? "PM" : "AM"; // morning or afternoon
  const hour12 = h > 12 ? h - 12 : h; // 13 becomes 1
  return hour12 + ":" + (m === 0 ? "00" : m) + " " + ampm; // e.g. "1:30 PM"
}

// props: reservations, addReservation, updateReservation, user
function Reservation({ reservations, addReservation, updateReservation, user }) {
  const [form, setForm] = useState(emptyForm); // form data
  const [error, setError] = useState(""); // error message
  const [success, setSuccess] = useState(""); // confirmation message

  // update one field when the user types
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value }); // keep other fields, change this one
  }

  // when the form is sent
  function handleSubmit(e) {
    e.preventDefault(); // stop page reload

    // check that required fields are filled
    if (!form.name || !form.phone || !form.date || !form.time) {
      setError("Please fill in all required fields."); // show error
      return; // stop
    }

    // check that the date is not in the past
    const today = new Date().toISOString().split("T")[0]; // today as yyyy-mm-dd
    if (form.date < today) {
      setError("Please choose a date in the future."); // show error
      return; // stop
    }

    // check opening hours (the time must be one of our slots)
    if (!timeSlots.includes(form.time)) {
      setError("We are open from 11:00 AM to 10:00 PM."); // show error
      return; // stop
    }

    // check number of guests
    if (form.guests < 1 || form.guests > 50) {
      setError("Guests must be between 1 and 50."); // show error
      return; // stop
    }

    // everything is OK: save the booking
    addReservation(form); // send to App
    setSuccess("✅ Thank you " + form.name + "! Your " + form.type + " on " + form.date + " at " + niceTime(form.time) + " is booked."); // confirmation
    setError(""); // clear error
    setForm(emptyForm); // clear the form
  }

  // my bookings (by email if logged in, otherwise guest)
  const myBookings = reservations.filter((r) => r.customer === (user ? user.email : "guest"));

  return (
    <div className="page">
      <h1 className="page-title">BOOK A TABLE</h1>

      {/* BOOKING FORM */}
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name *" value={form.name} onChange={handleChange} />
        <input name="phone" placeholder="Phone number *" value={form.phone} onChange={handleChange} />

        {/* date and time side by side */}
        <div className="row">
          {/* min = today, so past days can't be picked */}
          <input type="date" name="date" min={new Date().toISOString().split("T")[0]} value={form.date} onChange={handleChange} />

          {/* dropdown with only open times, list rendering with map */}
          <select name="time" value={form.time} onChange={handleChange}>
            <option value="">Choose a time *</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{niceTime(slot)}</option>
            ))}
          </select>
        </div>

        {/* guests and booking type side by side */}
        <div className="row">
          <label>
            Guests
            <input type="number" name="guests" min="1" max="50" value={form.guests} onChange={handleChange} />
          </label>
          <label>
            Type
            <select name="type" value={form.type} onChange={handleChange}>
              <option>Table</option>
              <option>Birthday Party</option>
              <option>Corporate Event</option>
            </select>
          </label>
        </div>

        {/* extra box only for events (conditional rendering) */}
        {form.type !== "Table" && (
          <textarea
            name="notes"
            placeholder="Event details: decorations, cake, menu choices..."
            value={form.notes}
            onChange={handleChange}
          />
        )}

        {/* messages */}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button type="submit" className="btn">Reserve</button>
      </form>

      {/* MY BOOKINGS list */}
      {myBookings.length > 0 && (
        <section>
          <h2 className="category-title">MY RESERVATIONS</h2>
          {myBookings.map((r) => (
            <div key={r.id} className="order-box">
              <div className="order-top">
                <b>{r.type} · {r.guests} guests</b>
                <span className={"status " + r.status}>{r.status}</span>
              </div>
              <p>{r.date} at {niceTime(r.time)}</p>
              {r.notes && <p>📝 {r.notes}</p>}

              {/* customer can cancel if not cancelled already */}
              {r.status !== "Cancelled" && (
                <button className="btn btn-small" onClick={() => updateReservation(r.id, "Cancelled")}>
                  Cancel
                </button>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

// share Reservation with App.jsx
export default Reservation;
