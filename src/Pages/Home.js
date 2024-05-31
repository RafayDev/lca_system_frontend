import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { GraduationCap } from "lucide-react";
import React from "react";
import TimetableCalendar from "../Components/TimetableCalendar";

function Home() {
  const data = [
    {
      title: "Overall Students Count",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      title: "Active Students Count",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      title: "Former Students Count",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      title: "Overall Fees Collected",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      title: "Total Active Students Fees Collected",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      title: "Total Active Students Fees Pending",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      title: "Batch Count",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      title: "Course Count",
      value: 0,
      helpText: "Some Text ...",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
  ];

  return (
    <>
      <h1 className="text-xl font-semibold ml-6 mb-5">Welcome to LCA System</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div className="w-full">
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E0E8EC] p-6 flex justify-between items-start"
            >
              <Stat>
                <StatLabel>{item.title}</StatLabel>
                <StatNumber>{item.value}</StatNumber>
                <StatHelpText>{item.helpText}</StatHelpText>
              </Stat>
              <div className="p-2 bg-[#d69e2e]/30 rounded-lg">{item.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
