import React from "react";
import Footer from "./Footer";
function AboutUs() {
  //
  return (
    <div className="bg-gray-100 px-4 py-8 sm:px-6 lg:pt-8">
      <div className="max-w-3xl mx-auto">
        <h4 className="text-2xl font-medium text-green-800">Dobrodošli na web azila za pse i mačke ADC!</h4>
        <h6 className="mt-6 text-lg font-medium text-green-800">Tko smo?</h6>
        <p className="mt-4 text-gray-600">
          Mi smo neprofitna, volonterska udruga ADC koja skrbi o napuštenim psima i mačkama na području Splita i okolice. Nažalost, svjedoci smo toga
          da se pojedinci među nama odlušuju napustiti svog dojučerasnjeg najboljeg prijatelja samo zato što je star, bolestan, nije više onako
          zaigran, ili im je jednostavno dosadio.
        </p>
        <p className="mt-4 text-gray-600">Tada na scenu stupamo mi, ADC, i pomažemo životinjama u nevolji.</p>
        <h6 className="mt-6 text-lg font-medium text-green-800">Koja je naša misija?</h6>
        <p className="mt-4 text-gray-600">
          Jednostavno je: svakoj napuštenoj životinji pružiti samo ono sto ona zaslužuje: život dostojan svakog živog bića. Krov nad glavom, slastice
          u zdjelici i veterinarska skrb najmanje su što možemo učiniti za naše četveronožne prijatelje.
        </p>
        <h6 className="mt-6 text-lg font-medium text-green-800">Otkad postojimo?</h6>
        <p className="mt-4 text-gray-600">
          Udruga je osnovana 2009. godine, vjerovali ili ne, u Marseilleu u Francuskoj. Baš kao Hajduk, udrugu su osnovali studenti-vizionari, i baš
          kao Hajduk, i ADC će biti uspješna hrvatska priča.
        </p>
        <h6 className="mt-6 text-lg font-medium text-green-800">Zašto ADC? Što je ADC?</h6>
        <p className="mt-4 text-gray-600">
          ADC je akronim francuskog idioma za kućnog ljubimca: <span className="font-bold">a</span>nimal <span className="font-bold">d</span>e{" "}
          <span className="font-bold">c</span>ompagnie.
        </p>

        <Footer />
      </div>
    </div>
  );
}

export default AboutUs;
