import React from "react";
import axios from "axios";
import "./Edit.css";

function Edit() {
  function saveNewAnimal(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    const ime = podaci.get("ime");
    const vrsta = podaci.get("vrsta");
    const godine = podaci.get("godine");
    const opis = podaci.get("opis");
    const pregled = new Date(podaci.get("pregled")).toISOString().split("T")[0];
    const cip = podaci.get("cip") === "on";

    axios
      .post("http://localhost:3001/zivotinje/", {
        ime,
        vrsta,
        godine,
        opis,
        pregled,
        cip,
        udomljen: false,
      })
      .then(() => {
        e.target.reset();
      });
  }
  //

  return (
    <div className="w-600 flex flex-col">
      <h3 className="text-lg font-semibold">Unos nove životinje</h3>
      <form onSubmit={saveNewAnimal} className="flex flex-col mt-4">
        <label className="mb-2">
          {" "}
          Ime:
          <input className="w-400 mt-4 border border-gray-800 px-2 py-1" type="text" required name="ime" />
        </label>{" "}
        <label className="mb-2">
          Vrsta:
          <select name="vrsta" className="w-400 mt-4 border border-gray-800 px-2 py-1">
            <option value="Macka">Macka</option>
            <option value="Pas">Pas</option>
          </select>
        </label>{" "}
        <label className="mb-2">
          Godine:
          <input
            placeholder="Nemojte upisivati 'ljudske' godine :)"
            className="w-400 mt-4 border border-gray-800 px-2 py-1"
            type="number"
            required
            name="godine"
          />
        </label>{" "}
        <label className="mb-2">
          Opis:
          <input className="w-400 mt-4 border border-gray-800 px-2 py-1" type="text" required name="opis" />
        </label>{" "}
        <label className="mb-2">
          Datum pregleda:
          <input type="date" required name="pregled" className="w-400 mt-4 border border-gray-800 px-2 py-1" />
        </label>{" "}
        <label className="mb-2 flex items-center">
          <input type="checkbox" name="cip" className="mr-2" />
          Cipiran
        </label>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded" type="submit">
          Spremi
        </button>
      </form>
    </div>
  );
}

export default Edit;
