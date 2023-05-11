import React from "react";

function ListItem(props) {
  return (
    <div className={props.className}>
      <h5 className="text-lg text-center font-bold mb-2 text-green-700">{props.name}</h5>
      <p className="text-l text-center text-green-700 mb-2">{props.type}</p>
      <p className="mb-2">Status: {props.status}</p>
      <p className="mb-2">Datum zadnjeg pregleda: {props.date}</p>
      <p className="mb-2">{props.chipped}</p>
      <button
        className="bg-green-200 hover:bg-green-700 text-green-800 hover:text-green-50 font-bold py-2 px-4 rounded mb-2"
        onClick={props.handleChip}
      >
        Čipiraj
      </button>
      <button
        className="bg-green-300 hover:bg-green-800 text-green-800 hover:text-green-50 font-bold py-2 px-4 rounded mb-2"
        onClick={props.handleDateChange}
      >
        Evidentiraj današnji pregled
      </button>
      <button
        className="bg-green-400 hover:bg-green-900 text-green-800 hover:text-green-50 font-bold py-2 px-4 rounded mb-2"
        onClick={props.handleAdopt}
      >
        Udomi
      </button>
    </div>
  );
}

export default ListItem;
