import styles from "./ViewList.module.css";

function ViewList({ list, totalSum }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price $</th>
            <th>Quantity</th>
            <th>Discount %</th>
            <th>Discounted Total $</th>
            <th>Total $</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.discount}</td>
              <td>{item.discountedTotal}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.containerTotalSum}>
        Total Price (with discounts): $ {totalSum}
      </div>
    </div>
  );
}
export default ViewList;
