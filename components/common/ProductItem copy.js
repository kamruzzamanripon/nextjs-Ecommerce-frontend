import { ArrowRightIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import carouselOne from "../../public/images/product-1.png";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  selectItems
} from "../../store_slices/cartSlice";

const ProductItem = ({ setModal, id, displayStyle, key }) => {
  const dispatch = useDispatch();
  const [cartQuantity, setCartQuantity] = useState(0);
  const cartItems = useSelector(selectItems);
  console.log("state cart",cartQuantity )
  //console.log(cartItems )

  const addItemToCart = () => {
    const productInfo = {
      id: id,
      title: "Product Name",
      price: "300",
      detail: "lorem",
      image: carouselOne,
    };

    dispatch(addToCart(productInfo));
  };

  const increaseProduct = () => {
    dispatch(incrementQuantity(id));
  };

  const decrementProduct = () => {
    setCartQuantity(cartQuantity - 1);
    dispatch(decrementQuantity(id));
  };

  useEffect(() => {

    cartItems.map((item, index) => {
      if (id === item.id) {
        setCartQuantity(item.quantity);
      }
   
    });

    cartItems.map((item, index) => {
      if (id !== item.id) {
        setCartQuantity(0);
      }
    },[cartItems]);
   
    
  });

  return (
    <div>
      <div className="mb-14 sm:mb-5" key={key}>
        <div className="category-carousel mb-16 text-center mr-5 group">
          <div className="single-bs-product">
            <div
              className={`${
                displayStyle === "grid"
                  ? "h-72 product-img group relative"
                  : "h-80 product-img group relative flex items-center space-x-5 justify-between"
              }`}
            >
              {/* <div className="h-80 flex items-center space-x-5 justify-between"> */}
              <div className="h-auto p-4">
                <Image src={carouselOne} height="310" width="310" />
              </div>

              <div className="mb-10">
                <h4 className="text-xl mb-3">Product Name</h4>
                <p>
                  <span className="font-medium bs-dark-orange-color">
                    $200.00
                  </span>
                  <del className="text-gray-400">$300</del>
                </p>
              </div>

              {displayStyle === "menu" && (
                <div className="hidden md:block w-1/4 text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
                  neque, laudantium, sapiente, ipsam ratione dicta atque
                  doloribus officia quas architecto saepe explicabo voluptates
                  mollitia. Sequi.
                </div>
              )}

              {/* Hover Component */}
              <div className="product-img-hover absolute h-full w-full top-0 left-0 flex justify-center items-center hidden transition duration-20000 ease-in group-hover:flex">
                <div className="bg-black absolute h-full w-full opacity-60"></div>

                <a
                  className="absolute left-0 bottom-0 bg-gray-200 p-2 w-full flex items-center justify-center cursor-pointer"
                  onClick={() => setModal(true)}
                >
                  Details
                  <ArrowRightIcon className="h-5 ml-3 transition group-first:hover:ml-5" />
                </a>

                <div className="relative z-10">
                  <div className="flex justify-center items-center text-4xl text-white mb-8">
                    <button
                      className={`${
                        cartQuantity && cartQuantity !== 0 ? "" : "hidden"
                      } h-12 w-12 border border-white rounded-full`}
                      onClick={decrementProduct}
                    >
                      -
                    </button>
                    <span className="px-6"> {cartQuantity} </span>
                    <button
                      className={`${
                        cartQuantity && cartQuantity !== 0 ? "" : "hidden"
                      } h-12 w-12 border border-white rounded-full`}
                      onClick={increaseProduct}
                    >
                     +
                    </button>
                  </div>

                  <button
                    className="bs-dark-green-bg text-white px-8 py-2 rounded-full inline-block"
                    onClick={addItemToCart}
                  >
                    Add to card
                  </button>
                </div>
              </div>
              {/* End Hover Component */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
