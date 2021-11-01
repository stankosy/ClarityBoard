import Card from "./ui/Card";
import ItemCard from "./ui/ItemCard";
import { useContext, useState } from "react";
import ListsContext from "../context/lists-context";
import { EditText } from "react-edit-text";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ItemsList(props) {
  const listsContext = useContext(ListsContext);

  const [itemText, setItemText] = useState("");

  const updateMenuInput = ({ name, value, previousValue }) => {
    // Create new item
    if (previousValue === "") {
      const newItemId = Date.now();
      listsContext.addNewListItem({
        id: newItemId,
        parentId: props.parentId,
        itemType: props.listType,
        title: value,
        // progress_percentage: ,
      });

      // Select the created list item
      if (props.listType == "condition") {
        listsContext.selectCondition(newItemId);
      } else if (props.listType == "solution") {
        listsContext.selectSolution(newItemId);
      }

      setItemText("");
    }
  };

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

      <div>
        <EditText
          name={props.listType}
          type="text"
          style={{ width: "100%" }}
          placeholder="+ ADD NEW"
          inline
          className={classNames(
            true ? "bg-gray-100 text-gray-500" : "text-gray-300 hover:bg-gray-50 hover:text-gray-900",
            "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
          )}
          value={itemText}
          onChange={setItemText}
          onSave={updateMenuInput}
        />
      </div>
    </div>
  );
}
