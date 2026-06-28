import React from "react";

export default function Header({ cart, setCart, updateQuantity }) {
  const isEmpty = React.useMemo(() => cart.length === 0, [cart]);

  const totalItems = React.useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  const totalPrice = React.useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  );

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="index.html">
              <img
                className="img-fluid"
                src="./img/logo.svg"
                alt="imagen logo"
              />
            </a>
          </div>
          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito">
              <img
                className="img-fluid"
                src="./img/carrito.png"
                alt="imagen carrito"
              />

              <div id="carrito" className="bg-white p-3">
                {isEmpty ? (
                  <p className="text-center">El carrito esta vacio</p>
                ) : (
                  <div>
                    <p className="text-center">
                      Carrito con {totalItems} productos
                    </p>
                    <table className="w-100 table">
                      <thead>
                        <tr>
                          <th>Imagen</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                          <th>Cantidad</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                className="img-fluid"
                                src={`/img/${item.image}.jpg`}
                                alt={`imagen ${item.name}`}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td className="fw-bold">${item.price}</td>
                            <td className="flex align-items-center gap-4">
                              <button
                                type="button"
                                className="btn btn-dark px-4"
                                disabled={item.quantity <= 1}
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                -
                              </button>
                              {item.quantity}
                              <button
                                type="button"
                                className="btn btn-dark px-3"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() =>  updateQuantity(item.id, 0)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <p className="text-end">
                      Total pagar:
                      {<span className="fw-bold">${totalPrice}</span>}
                    </p>

                    {/* Botón para vaciar el carrito */}
                    <div className="text-center mt-3">
                      <button
                        type="button"
                        className="btn btn-dark bg-danger p-2"
                        onClick={() => setCart([])}
                      >
                        Vaciar Carrito
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
