import React from "react";

function Footer() {
  return (
    <footer className="max-w-3xl mx-auto mt-2 border-t border-gray-200 p-6">
      <h4 className="text-2xl font-medium text-green-800">Kontakt</h4>
      <ul className="mt-4">
        <li>
          <p className="text-green-800">Adresa: Ulica grada Marseillea 9, Split</p>
        </li>
        <li className="mt-4 text-green-800">Telefon: 021/488-355</li>
        <li className="mt-4 text-green-800">E-mail: info@adc.hr</li>
        <li className="mt-4 text-green-800">OIB: 43902983745</li>
      </ul>
    </footer>
  );
}

export default Footer;
