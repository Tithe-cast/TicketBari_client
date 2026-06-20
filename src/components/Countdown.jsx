"use client";

import Countdown from "react-countdown";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <span className="badge badge-error gap-1 font-ticket text-xs">Departed</span>;
  }

  return (
    <div className="flex items-center gap-2 font-ticket text-sm">
      <span className="text-base-content/60">Departs in</span>
      <span className="rounded bg-base-200 px-1.5 py-0.5">{days}d</span>
      <span className="rounded bg-base-200 px-1.5 py-0.5">{hours}h</span>
      <span className="rounded bg-base-200 px-1.5 py-0.5">{minutes}m</span>
      <span className="rounded bg-base-200 px-1.5 py-0.5">{seconds}s</span>
    </div>
  );
};

const DepartureCountdown = ({ departureDateTime }) => {
  return <Countdown date={new Date(departureDateTime)} renderer={renderer} />;
};

export default DepartureCountdown;
