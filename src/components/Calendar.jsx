import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Simulate sending data to a database (replace with actual API call)
const sendToDatabase = async (date) => {
  try {
    const response = await fetch("/api/booked-dates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date }),
    });

    if (!response.ok) {
      throw new Error("Failed to save data");
    }
    return response.json();
  } catch (error) {
    console.error("Error saving data: ", error);
    alert("Failed to save the selected date. Please try again.");
  }
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get month name from index
  const getMonthName = (monthIndex) =>
    new Date(0, monthIndex).toLocaleString("default", { month: "long" });

  // Calculate days in month
  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // Get the first day of the month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Move to previous month
  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  // Move to next month
  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  // Handle day selection and send data to DB
  const handleDayClick = async (day) => {
    const selectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const dateString = selectedDate.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"

    // Prevent multiple clicks on the same date
    if (bookedDates.includes(dateString)) {
      alert("This date is already booked.");
      return;
    }

    setLoading(true);

    try {
      await sendToDatabase(dateString); // Send the selected date to the database
      setBookedDates((prevDates) => [...prevDates, dateString]);
      alert(`Date ${dateString} booked successfully!`);
    } catch (error) {
      console.error("Error booking date:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderDays = () => {
    const totalDays = daysInMonth(
      currentDate.getFullYear(),
      currentDate.getMonth()
    );
    const blankDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <>
        {/* Blank Days */}
        {blankDays.map((_, index) => (
          <div
            key={`blank-${index}`}
            className="h-12 w-12 cursor-default"
            aria-hidden="true"
          ></div>
        ))}

        {/* Actual Days */}
        {daysArray.map((day) => {
          const dateString = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            day
          )
            .toISOString()
            .split("T")[0]; // Get formatted date string "YYYY-MM-DD"

          const isBooked = bookedDates.includes(dateString);

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`h-12 w-12 flex items-center justify-center rounded-lg cursor-pointer transition-all ease-in-out duration-300 shadow-md transform ${
                isBooked
                  ? "bg-red-500 text-white cursor-not-allowed"
                  : "bg-gradient-to-br from-purple-500 to-blue-500 text-white hover:scale-110 hover:from-purple-700 hover:to-blue-700"
              }`}
              aria-disabled={isBooked}
              aria-label={`${
                isBooked ? "Booked" : "Available"
              } date: ${dateString}`}
            >
              {day}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={previousMonth}
          className="text-purple-600 hover:text-purple-800 transition-all transform hover:scale-110"
          disabled={loading}
        >
          <FaChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-purple-700">
          {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="text-purple-600 hover:text-purple-800 transition-all transform hover:scale-110"
          disabled={loading}
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-medium mb-3">
        <div className="text-lg font-semibold">Sun</div>
        <div className="text-lg font-semibold">Mon</div>
        <div className="text-lg font-semibold">Tue</div>
        <div className="text-lg font-semibold">Wed</div>
        <div className="text-lg font-semibold">Thu</div>
        <div className="text-lg font-semibold">Fri</div>
        <div className="text-lg font-semibold">Sat</div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2">{renderDays()}</div>

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800">
          <div className="text-white text-xl">Processing...</div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
