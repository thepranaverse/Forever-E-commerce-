import React, { useContext } from "react";
import { shopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currancy, delivery_fees, getCardAmt } = useContext(shopContext);

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          {" "}
          <p>Subtotal</p>
          <p>
            {currancy}
            {getCardAmt()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          {" "}
          <p>Shipping Fee</p>
          <p>
            {currancy}
            {delivery_fees}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          {" "}
          <b>Total</b>
          <b>
            {currancy}
            {getCardAmt() === 0 ? 0 : getCardAmt() + delivery_fees}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
