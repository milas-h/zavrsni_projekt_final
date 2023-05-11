import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Donation from "./Donation";
import { UserContext } from "./LogInForm";

function Donations() {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState(false);

  const contextData = useContext(UserContext);
  const isAdmin = contextData.logiraniKorisnik.uloga === "admin";

  useEffect(() => {
    getDataFromJsonFile();
  }, []);

  function getDataFromJsonFile() {
    axios.get("http://localhost:3001/donacije").then((res) => setDonations(res.data));
  }

  function addNewDonation() {
    setNewDonation(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNewDonation(true);
    const novaDonacija = new FormData(e.target);
    const tip = novaDonacija.get("tip");
    const vrijednost = novaDonacija.get("vrijednost");
    const opis = novaDonacija.get("opis");

    axios
      .post("http://localhost:3001/donacije/", {
        tip,
        vrijednost,
        opis,
        kategorija: isAdmin ? "trazi" : "nudi",
      })
      .then(() => {
        getDataFromJsonFile();
        setNewDonation(false);
      });
  }

  function handleAccept(donationId) {
    axios
      .patch(`http://localhost:3001/donacije/${donationId}`, {
        kategorija: "donirano",
      })
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleMarkAsDonated(donationId) {
    axios
      .patch(`http://localhost:3001/donacije/${donationId}`, {
        kategorija: "donirano",
      })
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDeleteDonation(donationId) {
    axios
      .delete(`http://localhost:3001/donacije/${donationId}`)
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleRepeatRequest(donationId) {
    axios
      .patch(`http://localhost:3001/donacije/${donationId}`, {
        kategorija: "trazi",
      })
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="w-full">
      {!newDonation ? (
        <button className="bg-green-500 text-gray-50 px-6 py-3 rounded" onClick={addNewDonation}>
          Nova donacija
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <label className="block mb-4">
            <span className="text-gray-700">Vrsta donacije</span>
            <select name="tip" className="mt-1 block w-full border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
              <option value="Hrana">Hrana</option>
              <option value="Igracke">Igračke</option>
              <option value="Novac">Novac</option>
              <option value="Ostalo">Ostalo</option>
            </select>
          </label>
          <br />
          <label className="block mb-4">
            <span className="text-gray-700">Vrijednost donacije</span>
            <input
              name="vrijednost"
              type="number"
              required
              className="mt-1 block w-full border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>
          <br />
          <label className="block mb-4">
            <span className="text-gray-700">Kratki opis donacije</span>
            <input
              name="opis"
              type="text"
              required
              className="mt-1 block w-full border-gray-800 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </label>

          <button className="bg-sky-500 text-gray-50 px-6 py-3 rounded" type="submit">
            {isAdmin ? "Zatraži novu donaciju" : "Ponudi novu donaciju"}
          </button>
        </form>
      )}

      {/* NUDENJE NOVIH DONACIJA */}
      <h3 className="text-2xl text-green-700 text-center mb-4 mt-6 border-b-2 border-green-700 w-full">Ponuđene donacije</h3>
      <table className="border border-gray-800 mt-2 mb-4 rounded shadow-lg w-full">
        <thead className="w-full justify-evenly">
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
            {isAdmin && <th>Opcije</th>}
          </tr>
        </thead>
        <tbody className="w-full justify-evenly">
          {donations
            .filter((item) => item.kategorija === "nudi")
            .map((item) => (
              <Donation
                key={item.id}
                type={item.tip}
                amount={item.vrijednost}
                description={item.opis}
                onBtnClick={() => handleAccept(item.id)}
                btnText={isAdmin && "Prihvati"}
                btnClassName={
                  isAdmin
                    ? "bg-green-200 hover:bg-green-700 text-green-700 hover:text-green-200 font-bold py-2 px-4 rounded mr-2"
                    : "bg-green-200 hover:bg-green-700 text-green-700 hover:text-green-200 font-bold py-2 px-4 rounded mr-2 hidden"
                }
              />
            ))}
        </tbody>
      </table>

      {/* TRAZENJE NOVIH DONACIJA */}
      <h3 className="text-2xl text-green-700 text-center mb-4 mt-6 border-b-2 border-green-700">Tražimo</h3>
      <table className="border border-gray-800 mt-2 mb-4 rounded shadow-lg">
        <thead className="mt-4 text-lg py-8">
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
            {isAdmin && <th>Opcije</th>}
          </tr>
        </thead>
        <tbody>
          {donations
            .filter((item) => item.kategorija === "trazi")
            .map((item) => (
              <Donation
                key={item.id}
                type={item.tip}
                amount={item.vrijednost}
                description={item.opis}
                btnText={isAdmin ? "Označi kao donirano" : "Doniraj"}
                onBtnClick={() => handleMarkAsDonated(item.id)}
                onDeleteBtn={() => handleDeleteDonation(item.id)}
                btnClassName="bg-green-200 hover:bg-green-700 text-green-700 hover:text-green-200 font-bold py-2 px-4 rounded mr-2"
              />
            ))}
        </tbody>
      </table>

      {/* PRIHVACENE DONACIJE */}
      <h3 className="text-2xl text-green-700 text-center mb-4 mt-6 border-b-2 border-green-700">Realizirane donacije - HVALA SVIMA</h3>
      <table className="border border-gray-800 mt-2 mb-4 rounded shadow-lg w-full">
        <thead>
          <tr>
            <th>Tip</th>
            <th>Vrijednost</th>
            <th>Opis</th>
            {isAdmin && <th>Opcije</th>}
          </tr>
        </thead>
        <tbody>
          {donations
            .filter((item) => item.kategorija === "donirano")
            .map((item) => (
              <Donation
                key={item.id}
                type={item.tip}
                amount={item.vrijednost}
                description={item.opis}
                btnText={isAdmin && "Zatraži ponovno"}
                onBtnClick={() => handleRepeatRequest(item.id)}
                onDeleteBtn={() => handleDeleteDonation(item.id)}
                btnClassName={
                  isAdmin
                    ? "bg-green-200 hover:bg-green-700 text-green-700 hover:text-green-200 font-bold py-2 px-4 rounded mr-2"
                    : "bg-green-200 hover:bg-green-700 text-green-700 hover:text-green-200 font-bold py-2 px-4 rounded mr-2 hidden"
                }
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Donations;
