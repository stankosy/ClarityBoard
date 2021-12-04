import Card from "./ui/Card";
import ItemCard from "./ui/ItemCard";
import { useContext, useState, useEffect } from "react";
import ListsContext from "../context/lists-context";
// import { EditText } from "react-edit-text";
import EdiText from "react-editext";
import { Link } from "react-router-dom";

export default function ItemsList(props) {
  const listsContext = useContext(ListsContext);
  const inputDefaultText = "+ ADD NEW";
  const [itemText, setItemText] = useState(inputDefaultText);

  const getItemCard = (listItem) => {
    if (listItem.itemType === "objective") {
      return (
        <Link to="/objective">
          <ItemCard key={listItem.id} listItem={listItem} />
        </Link>
      );
    } else if (listItem.itemType === "section") {
      return (
        <Link to="/dashboard">
          <ItemCard key={listItem.id} listItem={listItem} />
        </Link>
      );
    } else {
      return <ItemCard key={listItem.id} listItem={listItem} />;
    }
  };

  // Set focus on recently added list
  useEffect(() => {
    // if newItem's type is matching this list's type, set the focus to the input field
    if (listsContext.newItem !== null && listsContext.newItem.itemType === props.listType) {
      document.getElementById(`${props.listType}_inputField`).click();
    }
  }, [listsContext.newItem]);

  const saveInput = (newValue) => {
    // Create new item
    if (newValue !== "" && newValue !== inputDefaultText) {
      const newListItem = {
        id: Date.now(),
        parentId: props.parentId,
        itemType: props.listType,
        title: newValue,
      };
      if (newListItem.itemType == "task") {
        newListItem["progress_percentage"] = 0;
      }
      listsContext.addNewListItem(newListItem);
      listsContext.setSelectedItem(newListItem);
    }
    // setting back to default text
    setItemText(inputDefaultText);
  };

  return (
    <div id={`${props.listType}_list`} className="py-2">
      <Card>
        <h3 className="font-bold text-lg leading-6 font-medium text-gray-900">{props.listName}</h3>
      </Card>

      <div className="text-sm text-gray-600">{props.itemsList.map((listItem) => getItemCard(listItem))}</div>

      <div>
        <EdiText
          type="text"
          value={itemText}
          editOnViewClick={true}
          submitOnUnfocus={true}
          saveButtonClassName="invisible"
          cancelButtonClassName="invisible"
          editButtonClassName="invisible"
          onEditingStart={() => {
            setItemText("");
          }}
          onCancel={() => {
            setItemText(inputDefaultText);
          }}
          cancelOnEscape={true}
          submitOnEnter={true}
          onSave={saveInput}
          viewProps={{
            id: `${props.listType}_inputField`,
            style: { width: "100%" },
          }}
        />
      </div>
    </div>
  );
}
