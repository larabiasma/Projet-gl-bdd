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
  }
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);

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
    const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = selectedDate.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"

    if (!bookedDates.includes(dateString)) {
      setBookedDates((prevDates) => [...prevDates, dateString]);
      await sendToDatabase(dateString); // Send the selected date to the database
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
          <div key={index} className="h-10 w-10"></div>
        ))}
        {/* Actual Days */}
        {daysArray.map((day) => {
          const dateString = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            .toISOString()
            .split("T")[0]; // Get formatted date string "YYYY-MM-DD"

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer transition-all ${
                bookedDates.includes(dateString)
                  ? "bg-red-500 text-white" // Mark booked dates with red
                  : "bg-purple-500 text-white hover:bg-purple-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white shadow-lg rounded-lg p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={previousMonth}
          className="text-purple-500 hover:text-purple-700 transition-all"
        >
          <FaChevronLeft size={20} />
        </button>
        <h2 className="text-lg font-bold text-purple-700">
          {getMonthName(currentDate.getMonth())} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="text-purple-500 hover:text-purple-700 transition-all"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-2 text-center text-gray-700 font-medium mb-3">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 gap-2 text-center">{renderDays()}</div>
    </div>
  );
};

export default Calendar;
