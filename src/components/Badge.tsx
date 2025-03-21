import * as React from 'react';
import {  FaClock } from "react-icons/fa";
import PiAirlineSeat from './svg/PiAirlineSeat';
import { FcCancel } from "react-icons/fc";

type StatusType = "matched" | "not_matched" | "pending";

interface BadgeProps {
  status: StatusType;
}

const statusConfig: Record<StatusType, { text: string; color: string; bgColor: string; icon: React.JSX.Element }> = {
  matched: {
    text: "Matched",
    color: "#32ADE6", 
    bgColor: "#F8FAFC",
    icon: <PiAirlineSeat/>,
  },
  not_matched: {
    text: "Not Matched",
    color: "#036B26",
    bgColor: "#E7F6EC",
    icon: <FcCancel />
  },
  pending: {
    text: "Pending",
    color: "#D97706",
    bgColor: "#FFFBEB",
    icon: <FaClock color="#D97706" />,
  },
};

export default function Badge({ status }: BadgeProps) {
  const { text, color, bgColor, icon } = statusConfig[status];

  return (
    <div className="flex gap-2 items-center py-1 px-3 rounded-xl w-fit" style={{ backgroundColor: bgColor, color }}>
      {icon}
      <p>{text}</p>
    </div>
  );
}
