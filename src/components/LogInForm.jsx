import axios from "axios";
import React, { useState } from "react";
import HomePage from "./HomePage";
import { createContext } from "react";

export const UserContext = createContext(null);

function LogInForm() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loggedInUser, setLoggedInUser] = useState(null);

  async function handleLogIn(e) {
    e.preventDefault();
    await axios.get("http://localhost:3001/korisnici/").then((res) => {
      res.data.find((user) => {
        if (user.ime === username && user.lozinka === password) {
          setLoggedInUser(user);
        }
      });
    });
  }

  function handleUsernameChange(e) {
    const value = e.target.value;
    setUsername(value);
  }

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
  }

  function handleLogoff() {
    setLoggedInUser(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      {!loggedInUser ? (
        <form onSubmit={handleLogIn} className="bg-green-50 p-8 rounded shadow-md">
          <h2 className="text-2xl mb-4">Prijavite se</h2>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="username">
              Korisničko ime:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded"
              type="text"
              id="username"
              onChange={handleUsernameChange}
              required
              value={username}
              placeholder="admin ili korisnik"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2" htmlFor="password">
              Lozinka:
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded"
              type="password"
              id="password"
              onChange={handlePasswordChange}
              required
              value={password}
              placeholder="admin123 ili korisnik123"
            />
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Prijavi se
          </button>
        </form>
      ) : (
        <UserContext.Provider value={{ logiraniKorisnik: loggedInUser }}>
          <HomePage onLogoffClick={handleLogoff} />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default LogInForm;
