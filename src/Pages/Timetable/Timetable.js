import React, { useEffect, useState } from "react";
import TimetableCalendar from "../../Components/TimetableCalendar";
import { min } from "moment";

function Timetable() {
  return (
    <>
      <div style={{ height: "800px" }}>
        <TimetableCalendar />
      </div>
    </>
  );
}

export default Timetable;
