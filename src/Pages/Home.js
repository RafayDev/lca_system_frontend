import {
  IconButton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { fetchStatistics } from "../Features/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  ArrowDown01,
  Box,
  Boxes,
  DollarSign,
  FileBox,
  GraduationCap,
  HandCoins,
  RotateCw,
  AlertTriangle,
} from "lucide-react";

function Home() {
  const data = [
    {
      key: "current_batches_count",
      title: "Current Batches",
      helpText: "Number of batches in current year",
      icon: <Box size={32} color="#d69e2e" />,
    },
    {
      key: "previous_batches_count",
      title: "Previous Batches",
      helpText: "Number of batches in previous year",
      icon: <FileBox size={32} color="#d69e2e" />,
    },
    {
      key: "total_batches_count",
      title: "Total Batches",
      helpText: "Total number of batches",
      icon: <Boxes size={32} color="#d69e2e" />,
    },
    {
      key: "total_enrolled_students_count",
      title: "Total Enrolled Students",
      helpText: "Total number of enrolled students",
      icon: <GraduationCap size={32} color="#d69e2e" />,
    },
    {
      key: "total_fee_record",
      title: "Total Fee Record",
      helpText: "Total fee record of all batches",
      icon: <DollarSign size={32} color="#d69e2e" />,
    },
    {
      key: "total_fee_recovered",
      title: "Total Fee Recovered",
      helpText: "Total fee recovered from all students",
      icon: <HandCoins size={32} color="#d69e2e" />,
    },
    {
      key: "total_fee_pending",
      title: "Total Fee Pending",
      helpText: "Total fee pending from all students",
      icon: <ArrowDown01 size={32} color="#d69e2e" />,
    },
    {
      key: "total_fee_defaulters",
      title: "Total Fee defaulters",
      helpText: "Total fee pending students",
      icon: <AlertTriangle size={32} color="#d69e2e" />,
    },
  ];

  const [statistics, setStatistics] = React.useState({});

  const [authToken, setAuthToken] = React.useState(Cookies.get("authToken"));
  const { status } = useSelector((state) => state.statistics);
  const dispatch = useDispatch();

  const handleReload = () => {
    dispatch(fetchStatistics({ authToken }))
      .unwrap()
      .then((response) => {
        setStatistics(response);
      });
  };

  useEffect(() => {
    dispatch(fetchStatistics({ authToken }))
      .unwrap()
      .then((response) => {
        setStatistics(response);
      });
  }, []);

  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="text-xl font-semibold ml-6 mb-5">
          Welcome to LCA System
        </h1>
        <IconButton icon={<RotateCw size={18} />} onClick={handleReload} className={`!rounded-full !text-gray-600 ${status === "loading" ? "animate-spin" : ""}`} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data.map((item, index) => (
          <div className="w-full" key={index}>
            <div
              key={index}
              className="bg-white rounded-xl border border-[#E0E8EC] p-6 flex justify-between items-start"
            >
              <Stat>
                <StatLabel>{item.title}</StatLabel>
                {status === "loading" ? (
                  <div className="animate-pulse h-4 my-3 w-20 bg-gray-300 rounded-lg"></div>
                ) : (
                  <StatNumber>{statistics[item.key]}</StatNumber>
                )}
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
