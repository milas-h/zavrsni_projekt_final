import React, { useContext } from "react";
import { UserContext } from "./LogInForm";

function NewsItem(props) {
  const contextData = useContext(UserContext);
  const isAdmin = contextData.logiraniKorisnik.uloga === "admin";

  return (
    <div className={props.className}>
      <div>
        <h2 className="text-lg font-bold mb-2 text-green-800">{props.title}</h2>
        <p className="text-gray-600 mb-4">{props.text}</p>
      </div>
      {isAdmin && (
        <div className="flex justify-end">
          <button
            onClick={props.onDeleteNewsItem}
            className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-2 px-4 rounded"
          >
            Briši
          </button>
        </div>
      )}
    </div>
  );
}

export default NewsItem;
