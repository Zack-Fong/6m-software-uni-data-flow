import styles from "./Product.module.css";

import { useState } from "react";
import Card from "./Card";
import ViewList from "./ViewList";

function Product() {
  const [count, setCount] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [name, setName] = useState("Banana");
  const [price, setPrice] = useState(2.99);
  const [list, setList] = useState([]);
  const [itemsTotal, setItemsTotal] = useState(0);

  const handlerPlus = () => {
    setCount((prevCount) => {
      let count = prevCount + 1;
      if (count >= 5) {
        setDiscount(20);
      }
      return count;
    });
  };

  const handlerMinus = () => {
    setCount((prevCount) => {
      let count = prevCount - 1;
      if (count < 5) {
        setDiscount(0);
      }
      if (count < 0) return 0;
      return count;
    });
  };

  const handlerChangeName = (value) => {
    setName(value);
  };

  const handlerChangePrice = (value) => {
    if (/^[0-9]*(\.[0-9]{0,2})?$/.test(value)) {
      setPrice(value);
    } else if (value === "") {
      setPrice(0);
    }
    return;
  };

  const calculateAllItemsTotal = (items) => {
    const itemsTotal = items.reduce((acc, item) => {
      if (item.discountedTotal === "-")
        return acc + Number.parseFloat(item.total);
      return acc + Number.parseFloat(item.discountedTotal);
    }, 0);

    setItemsTotal(itemsTotal.toFixed(2));
  };

  const calculateDiscountedTotal = (formattedPrice) => {
    if (discount === +0) return "-";
    const total = (count * formattedPrice * (100 - discount)) / 100;
    return total.toFixed(2);
  };

  const calculateTotal = (formattedPrice) => {
    const total = count * formattedPrice;
    return total.toFixed(2);
  };

  const handlerAddProduct = () => {
    const formattedPrice = Number.parseFloat(price).toFixed(2);
    setPrice(formattedPrice);

    const newList = [
      ...list,
      {
        name,
        price: Number.parseFloat(price).toFixed(2),
        quantity: count,
        discount,
        discountedTotal: calculateDiscountedTotal(formattedPrice),
        total: calculateTotal(formattedPrice),
      },
    ];

    setList(newList);
    calculateAllItemsTotal(newList);
  };

  return (
    <div className={styles.container}>
      <Card
        name={name}
        count={count}
        price={price}
        discount={discount}
        handlerMinus={handlerMinus}
        handlerPlus={handlerPlus}
        handlerChangeName={handlerChangeName}
        handlerChangePrice={handlerChangePrice}
        handlerAddProduct={handlerAddProduct}
      />
      <ViewList list={list} totalSum={itemsTotal} />
    </div>
  );
}
export default Product;
