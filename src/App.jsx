import { Routes, Route } from "react-router-dom";
import { CartContext, Coordinates, Visibility } from "./context/contextApi";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SigninPage from "./components/SigninBtn";
import LoaderLayout from "./components/Loader";

const Head = lazy(() => import("./components/Head"));
const Body = lazy(() => import("./components/Body"));
const Search = lazy(() => import("./components/Search"));
const Cart = lazy(() => import("./components/Cart"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));

function App() {
  const [coord, setCoord] = useState({ lat: 28.5355161, lng: 77.3910265 });

  const visible = useSelector((state) => state.toogleSlice.searchBarToogle);
  const loginVisible = useSelector((state) => state.toogleSlice.loginToggle);

  return (
    <Coordinates.Provider value={{ coord, setCoord }}>
      {/* <Visibility.Provider value={{visible, setVisible}}> */}
      <div
        className={
          " " + (visible || loginVisible ? "max-h-screen overflow-hidden" : " ")
        }
      >
        <Suspense fallback={<LoaderLayout />}>
          <Routes>
            <Route path="/" element={<Head />}>
              <Route path="/" element={<Body />} />
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/search" element={<Search />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
      {/* </Visibility.Provider> */}
    </Coordinates.Provider>
    // </CartContext.Provider>
  );
}

export default App;
