import React, { useContext, useState } from "react";
import { CartContext } from "../context/contextApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, deleteItem } from "../utils/cartSlice";
import toast from "react-hot-toast";
import { toggleLogin } from "../utils/toogleSlice";

let veg =
  "https://www.pngkey.com/png/detail/261-2619381_chitr-veg-symbol-svg-veg-and-non-veg.png";
let nonVeg =
  "https://www.kindpng.com/picc/m/151-1515155_veg-icon-png-non-veg-symbol-png-transparent.png";

function Cart() {
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cartSlice.cartItems);
  const resInfo = useSelector((state) => state.cartSlice.resInfo);

  const dispatch = useDispatch();

  let totalPrice = cartData.reduce(
    (acc, curVal) => acc + curVal.price / 100 || curVal.defaultPrice / 100,
    0
  );

  function handleRemoveFromCart(i) {
    if (cartData.length > 1) {
      let newArr = [...cartData];
      newArr.splice(i, 1);

      dispatch(deleteItem(newArr));
      toast.success("Food removed");
    } else {
      handleClearCart();
      toast.success("cart is cleared");
    }
  }

  const userData = useSelector((state) => state.authSlice.userData);

  function handleClearCart() {
    dispatch(clearCart());
  }
  function handlePlaceOrder() {
    if (!userData) {
      toast.error("login krle bhai");
      dispatch(toggleLogin());
      return;
    }
    toast.success("order placed");
  }

  if (cartData.length === 0) {
    return (
      <div className="w-full bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mx-auto text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Feeling hungry? Let’s fix that!
          </h1>
          <p className="text-gray-600 mb-6">
            Order your favorite food now and satisfy your cravings.
          </p>
          <Link
            to="/"
            className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full text-lg transition-all duration-300 ease-in-out shadow-md"
          >
            Order Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-[95%] md:w-[800px]  mx-auto">
        <Link to={`/restaurantMenu/${resInfo.id}`}>
          <div className="my-10 flex gap-5">
            <img
              className="rounded-xl w-40 aspect-square"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                resInfo.cloudinaryImageId
              }
              alt=""
            />
            <div>
              <p className="text-5xl border-b-2 border-black pb-3 ">
                {resInfo.name}
              </p>
              <p className="mt-3 text-xl ">{resInfo.areaName}</p>
            </div>
          </div>
        </Link>
        <hr className="my-5 border-2" />
        <div>
          {cartData.map(
            ({
              name,
              defaultPrice,
              price,
              itemAttribute,
              ratings: {
                aggregatedRating: { rating, ratingCountV2 },
              },
              description = "",
              imageId,
            }) => {
              let trimDes = description.substring(0, 138) + "...";
              return (
                <>
                  <div
                    key={imageId}
                    className="flex w-full my-5 justify-between min-h-[182px]"
                  >
                    <div className="w-[55%] md:w-[70%]">
                      <img
                        className="w-5 rounded-sm"
                        src={
                          itemAttribute && itemAttribute.vegClassifier == "VEG"
                            ? veg
                            : nonVeg
                        }
                        alt=""
                        srcset=""
                      />
                      <h2 className="font-bold text-lg">{name}</h2>
                      <p className="font-bold text-lg">
                        ${defaultPrice / 100 || price / 100}{" "}
                      </p>

                      <div className="flex items-center gap-1">
                        {" "}
                        <i className={"fi mt-1 text-xl fi-ss-star"}></i>{" "}
                        <span>
                          {rating} ({ratingCountV2})
                        </span>
                      </div>

                      <div className="line-clamp-2">{description}</div>
                    </div>
                    <div className="w-[40%] md:w-[20%] relative h-full">
                      <img
                        className="rounded-xl aspect-square"
                        src={
                          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" +
                          imageId
                        }
                        alt=""
                      />
                      <button
                        onClick={handleRemoveFromCart}
                        className="bg-white absolute bottom-[-20px] left-1/2 -translate-x-1/2 text-base text-red-500 font-bold rounded-xl border px-5 py-2 drop-shadow"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <hr className="my-10" />
                </>
              );
            }
          )}
        </div>

        <h1 className="text-2xl">
          Total - <span className="font-bold">${totalPrice}</span>
        </h1>
        <div className="flex justify-between">
          <button
            onClick={handlePlaceOrder}
            className="p-3 bg-green-600 rounded-lg my-7"
          >
            Place order
          </button>
          <button
            onClick={handleClearCart}
            className="p-3 bg-green-600 rounded-lg my-7"
          >
            clear cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
