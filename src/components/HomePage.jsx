import React from "react";
import AboutUs from "./AboutUs";
import List from "./List";
import Donations from "./Donations";
import News from "./News";
import Edit from "./Edit";
import Logo from "../../public/adc-logo.png";

import { UserContext } from "./LogInForm";

import { useState, useContext } from "react";

const tabs = {
  o_nama: "o nama",
  popis: "popis",
  donacije: "donacije",
  novosti: "novosti",
  unos: "unos",
};

function HomePage(props) {
  const contextData = useContext(UserContext);

  //
  const [activeTab, setActiveTab] = useState(tabs.o_nama);
  function handleTabChange(newTab) {
    setActiveTab(newTab);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-100">
      <nav className="flex gap-4 mt-4">
        <button
          className={`${
            activeTab === tabs.o_nama ? "text-green-800 font-bold" : "text-gray-600"
          } hover:text-green-800 hover:font-bold transition duration-300 px-3 py-2 rounded-lg`}
          onClick={() => handleTabChange(tabs.o_nama)}
        >
          <img src={Logo} alt="Logo" className="w-40 h-auto" />
        </button>

        <button
          className={`${
            activeTab === tabs.popis ? "text-green-800 font-bold" : "text-gray-600"
          } hover:text-green-800 hover:font-bold transition duration-300 px-4 py-3 rounded-lg`}
          onClick={() => handleTabChange(tabs.popis)}
        >
          Naši najbolji prijatelji
        </button>

        <button
          className={`${
            activeTab === tabs.donacije ? "text-green-800 font-bold" : "text-gray-600"
          } hover:text-green-800 hover:font-bold transition duration-300 px-4 py-2 rounded-lg`}
          onClick={() => handleTabChange(tabs.donacije)}
        >
          Donacije
        </button>
        <button
          className={`${
            activeTab === tabs.novosti ? "text-green-800 font-bold" : "text-gray-600"
          } hover:text-green-800 hover:font-bold transition duration-300 px-4 py-2 rounded-lg`}
          onClick={() => handleTabChange(tabs.novosti)}
        >
          Obavijesti
        </button>
        {contextData.logiraniKorisnik.uloga === "admin" && (
          <button
            className={`${
              activeTab === tabs.unos ? "text-green-800 font-bold" : "text-gray-600"
            } hover:text-green-800 hover:font-bold transition duration-300 px-4 py-2 rounded-lg`}
            onClick={() => handleTabChange(tabs.unos)}
          >
            Unos
          </button>
        )}
        <button
          className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition duration-300"
          onClick={props.onLogoffClick}
        >
          Odjavi se
        </button>
      </nav>
      <div className="bg-white mt-6 p-6 rounded-lg shadow-lg">
        {activeTab === tabs.o_nama && <AboutUs />}
        {activeTab === tabs.popis && <List />}
        {activeTab === tabs.donacije && <Donations />}
        {activeTab === tabs.novosti && <News />}
        {activeTab === tabs.unos && <Edit />}
      </div>
    </div>
  );
}

export default HomePage;
