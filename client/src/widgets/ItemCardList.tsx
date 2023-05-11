import ItemCard from "../components/ItemCard";
import OrderCard from "../components/OrderCard";

const ItemCardList = () => {
  return (
    <>
      <div className="p-5">
        <ItemCard
          itemName="Tegel Southern Toasted Nibbles"
          amount={2}
          totalPrice={7.69}
        ></ItemCard>
        <ItemCard
          itemName="Anchor Blue Milk 2L"
          amount={1}
          totalPrice={6.09}
        ></ItemCard>
        <ItemCard
          itemName="Countdown Cage Free Eggs 12pk"
          amount={1}
          totalPrice={9.87}
        ></ItemCard>
      </div>
    </>
  );
};

export default ItemCardList;
