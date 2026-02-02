import React from "react";
import Header from "./Components/Header.jsx";
import Guitar from "./Components/Guitar.jsx";
import { db } from "./data/db.js";

export default function App() {
  const [data, setData] = React.useState(db);
  const [cart, setCart] = React.useState([]);

  function addToCart(item) {
    const alreadyInCart = cart.find((product) => product.id === item.id);

    if (alreadyInCart) {
      const updatedCart = cart.map((product) => {
        if (product.id === item.id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  function updateQuantity(id, newQuantity) {
    setCart((prevCart) => {
      if (newQuantity < 1) {
        return prevCart.filter((item) => item.id !== id);
      }
      return prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      );
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  React.useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  React.useEffect(() => {
    saveToLocalStorage();
  }, [cart]);

  return (
    <>
      <Header cart={cart} setCart={setCart} updateQuantity={updateQuantity} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {/* Aquí irán las guitarras */}
          {data.map((guitar) => (
            <Guitar key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
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
