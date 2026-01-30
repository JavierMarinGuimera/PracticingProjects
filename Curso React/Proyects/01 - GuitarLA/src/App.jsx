import React from "react";
import Header from "./Components/Header.jsx";
import Guitar from "./Components/Guitar.jsx";

export default function App() {

  // States
  const [auth, setAuth] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [cart, setCart] = React.useState([]);

  return (
    <>
      <Header />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Aquí irán las guitarras */}
          <Guitar />
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}