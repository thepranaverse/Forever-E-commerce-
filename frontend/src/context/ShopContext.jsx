// in context file we save all the common variables and state variables

import { createContext, useState, useEffect  } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



// shopContext = Context Object
// console.log(shopContext);
// Output: { Provider: Component, Consumer: Component, _currentValue: undefined }
export const shopContext = createContext(); // This just creates an empty context "box"

//this fills data in the container
const ShopContextProvider = (props) => {
  const currancy = "$";
  const delivery_fees = 10; // delivery fees 10$
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();

  // size -> shirt size(S,M,L etc )
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Kindely Select Your Size First");
      return;
    }

    let cartData = structuredClone(cartItems); // cpy of cart items
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1; // update existing entry
      } else {
        cartData[itemId][size] = 1; // create new entry
      }
    } else {
      cartData[itemId] = {}; // new entry
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCardCnt = () => {
    let totalCnt = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCnt += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCnt;
  };

  const updateQty = async (itemId, size, qty) => {
    let cartDataCpy = structuredClone(cartItems);
    cartDataCpy[itemId][size] = qty;
    setCartItems(cartDataCpy);
  };

 const getCardAmt = () => {
   let totalAmt = 0;

   for (const productId in cartItems) {
     // Find product info by id
     const itemInfo = products.find((product) => product._id === productId);
     if (!itemInfo) continue; // if product not found, skip

     // Now loop over sizes for this product
     for (const size in cartItems[productId]) {
       const qty = cartItems[productId][size];
       if (qty > 0) {
         totalAmt += itemInfo.price * qty;
       }
     }
   }

   return totalAmt;
 };


  // useEffect(() => {
  //   console.log(cartItems);
  // }, [cartItems]);

  const value = {
    products,
    currancy,
    delivery_fees,
    search,
    showSearch,
    setSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCardCnt,
    updateQty,
    getCardAmt,
    navigate,
  };

  return (
    <shopContext.Provider value={value}>
      {props.children}{" "}
      {/* This becomes: <Header /><ProductList /><Cart /><Footer /> */}
    </shopContext.Provider>
  );
};

export default ShopContextProvider;

{
  /* <shopContext.Provider> = Creates a data-sharing zone
    value={value} = The data being shared
    {children} = All components that can access that data
    Any child can use useContext(shopContext) to get the data! */
}
