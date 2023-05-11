import React, { useState, useEffect } from "react";
import axios from "axios";
import ListItem from "./ListItem";

function List() {
  const [listItems, setListItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  function handleStatusSelecting(e) {
    setSelectedStatus(e.target.value);
  }
  function handleTypeSelecting(e) {
    setSelectedType(e.target.value);
  }
  useEffect(() => {
    getDataFromJsonFile();
  }, []);

  function getDataFromJsonFile() {
    axios.get("http://localhost:3001/zivotinje").then((res) => setListItems(res.data));
  }

  //
  const filteredListItems = listItems.filter((listItem) => {
    if (selectedStatus === "adopted" && !listItem.udomljen) {
      return false;
    } else if (selectedStatus === "inshelter" && listItem.udomljen) {
      return false;
    } else if (selectedType === "cat" && listItem.vrsta !== "Macka") {
      return false;
    } else if (selectedType === "dog" && listItem.vrsta !== "Pas") {
      return false;
    }
    return true;
  });
  //
  function handleChip(item) {
    axios
      .patch(`http://localhost:3001/zivotinje/${item.id}`, {
        cip: true,
      })
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDateChange(item) {
    axios
      .patch(`http://localhost:3001/zivotinje/${item.id}`, {
        pregled: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDay()}`,
      })
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleAdopt(item) {
    axios
      .patch(`http://localhost:3001/zivotinje/${item.id}`, {
        udomljen: true,
      })
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex flex-wrap justify-between items-center mb-4">
        <div className="w-full md:w-auto mb-2 md:mb-0">
          <span className="font-bold text-lg mr-2">Filtriraj po statusu:</span>
          <label className="inline-flex items-center ml-2">
            <input type="radio" name="status" value="adopted" onClick={handleStatusSelecting} className="form-radio h-4 w-4 text-green-500" />
            <span className="ml-2">Udomljeni</span>
          </label>
          <label className="inline-flex items-center ml-2">
            <input type="radio" name="status" value="inshelter" onClick={handleStatusSelecting} className="form-radio h-4 w-4 text-red-500" />
            <span className="ml-2">Nisu udomljeni</span>
          </label>
          <label className="inline-flex items-center ml-2">
            <input type="radio" name="status" value="alltypes" onClick={handleStatusSelecting} className="form-radio h-4 w-4 text-gray-500" />
            <span className="ml-2">Svi</span>
          </label>
        </div>
        <div className="w-full md:w-auto">
          <span className="font-bold text-lg mr-2">Filtriraj po vrsti:</span>
          <label className="inline-flex items-center ml-2">
            <input type="radio" name="type" value="cat" onClick={handleTypeSelecting} className="form-radio h-4 w-4 text-gray-500" />
            <span className="ml-2">Mačke</span>
          </label>
          <label className="inline-flex items-center ml-2">
            <input type="radio" name="type" value="dog" onClick={handleTypeSelecting} className="form-radio h-4 w-4 text-gray-500" />
            <span className="ml-2">Psi</span>
          </label>
          <label className="inline-flex items-center ml-2">
            <input type="radio" name="type" value="allspecies" onClick={handleTypeSelecting} className="form-radio h-4 w-4 text-gray-500" />
            <span className="ml-2">Svi</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredListItems.map((filteredListItem) => (
          <div key={filteredListItem.id}>
            <ListItem
              className={filteredListItem.udomljen ? "p-4 shadow-lg bg-sky-50" : "p-4 shadow-lg bg-rose-50"}
              name={filteredListItem.ime}
              type={`${filteredListItem.vrsta} (${filteredListItem.opis})`}
              status={filteredListItem.udomljen ? "Udomljen" : "Nije udomljen"}
              chipped={filteredListItem.cip ? "Cipiran" : "Nije cipiran"}
              date={filteredListItem.pregled.split("-").reverse().join(".")}
              handleChip={() => handleChip(filteredListItem)}
              handleDateChange={() => handleDateChange(filteredListItem)}
              handleAdopt={() => handleAdopt(filteredListItem)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
