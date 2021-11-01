import Card from "./ui/Card";
import ItemCard from "./ui/ItemCard";

export default function ItemsList(props) {
  return (
    <div className="py-2">
      <Card>
        <h3 className="capitalize font-bold text-lg leading-6 font-medium text-gray-900">{props.listType + "s"}</h3>
      </Card>

      <div className="text-sm text-gray-600">
        {props.itemsList.map((listItem) => (
          <ItemCard listItem={listItem}>
            <div>{listItem.title}</div>
          </ItemCard>
        ))}
      </div>
    </div>
  );
}
