import NewsItem from "./NewsItem";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./LogInForm";

function News() {
  const [listedNews, setListedNews] = useState([]);
  const [newPost, setNewPost] = useState(false);

  const contextData = useContext(UserContext);
  const isAdmin = contextData.logiraniKorisnik.uloga === "admin";

  useEffect(() => {
    getDataFromJsonFile();
  }, []);

  function getDataFromJsonFile() {
    axios.get("http://localhost:3001/obavijesti").then((res) => setListedNews(res.data));
  }

  function addNewPost() {
    setNewPost(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNewPost(true);
    const novaObavijest = new FormData(e.target);
    const naslov = novaObavijest.get("naslov");
    const tekst = novaObavijest.get("tekst");
    const vazno = novaObavijest.get("vazno");

    axios
      .post("http://localhost:3001/obavijesti/", {
        naslov,
        tekst,
        vazno: vazno === "on" ? true : false,
      })
      .then(() => {
        getDataFromJsonFile();
        setNewPost(false);
      });
  }

  function handleDeleteNewsItem(newsItemId) {
    axios
      .delete(`http://localhost:3001/obavijesti/${newsItemId}`)
      .then(() => {
        getDataFromJsonFile();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      {/* VIDLJIVO SAMO ADMINU - dodavanje novih obavijesti */}
      {isAdmin && !newPost && (
        <button onClick={addNewPost} className="bg-green-500 text-gray-50 px-6 py-3 rounded">
          Dodaj novu obavijest
        </button>
      )}
      {isAdmin && newPost && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <label className="block mb-2">
            Naslov:
            <input type="text" name="naslov" required className="block w-full border border-gray-300 rounded p-2 mt-1"></input>
          </label>
          <label className="block mb-2">
            Tekst obavijesti:
            <textarea name="tekst" rows={6} maxLength={2000} required className="block w-full border border-gray-300 rounded p-2 mt-1" />
          </label>
          <label className="flex items-center mb-2">
            <input type="checkbox" name="vazno" className="mr-2" />
            Označi kao važno
          </label>
          <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Dodaj
          </button>
        </form>
      )}
      {/* OBAVIJESTI - vidljivo svima */}
      <h2 className="text-2xl text-green-900 text-center mb-4">Obavijesti</h2>
      {listedNews.map((item) => (
        <NewsItem
          className={
            item.vazno ? "border border-gray-300 p-4 mb-4 flex flex-col bg-red-100" : "border border-gray-300 p-4 mb-4 flex flex-col bg-gray-200"
          }
          key={item.id}
          title={item.naslov}
          text={item.tekst}
          onDeleteNewsItem={() => handleDeleteNewsItem(item.id)}
        />
      ))}
    </div>
  );
}

export default News;
