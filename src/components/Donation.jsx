import React, { useContext } from "react";
import { UserContext } from "./LogInForm";

function Donation(props) {
  const contextData = useContext(UserContext);
  const isAdmin = contextData.logiraniKorisnik.uloga === "admin";

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="py-2 px-4 text-lg text-gray-800">{props.type}</td>
      <td className="py-2 px-4">{props.amount} €</td>
      <td className="py-2 px-4">{props.description}</td>
      <td className="py-2 px-4">
        <button className={props.btnClassName} onClick={props.onBtnClick}>
          {props.btnText}
        </button>
        {isAdmin && (
          <button className="bg-red-200 hover:bg-red-700 text-red-700 hover:text-red-200 font-bold py-2 px-4 rounded" onClick={props.onDeleteBtn}>
            Izbriši
          </button>
        )}
      </td>
    </tr>
  );
}

export default Donation;
