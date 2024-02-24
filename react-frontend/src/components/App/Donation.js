import React from "react";
import SideBar from "./SideBar";

const DonationBarData = [
  {
    title: "Home",
    icon: "🏠",
    link: "https://duckduckgo.com/",
  },
];

const Donation = () => {
  return (
    <>
      <div>Donation</div>
      <SideBar data={DonationBarData} />
    </>
  );
};

export default Donation;
