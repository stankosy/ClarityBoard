import Card from "./ui/Card";
import ItemCard from "./ui/ItemCard";
import { useContext, useState, useEffect } from "react";
import ListsContext from "../context/lists-context";
// import { EditText } from "react-edit-text";
import EdiText from "react-editext";

export default function ItemsList(props) {
  const listsContext = useContext(ListsContext);
  const inputDefaultText = "+ ADD NEW";
  const [itemText, setItemText] = useState(inputDefaultText);

  // Set focus on recently added list
  useEffect(() => {
    // if newItem's type is matching this list's type, set the focus to the input field
    if (listsContext.newItem !== null && listsContext.newItem.itemType === props.listType) {
      const list_dom = document.getElementById(`${props.listType}_list`);
      list_dom.querySelector('[editext="view"]').click(); 
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

      // Select the created list item
      if (newListItem.itemType == "condition") {
        listsContext.selectCondition(newListItem.id);
      } else if (newListItem.itemType == "solution") {
        listsContext.selectSolution(newListItem.id);
      }
    }
    // setting back to default text
    setItemText(inputDefaultText);
  };

  return (
    <div id={`${props.listType}_list`} className="py-2">
      <Card>
        <h3 className="capitalize font-bold text-lg leading-6 font-medium text-gray-900">{props.listType + "s"}</h3>
      </Card>

      <div className="text-sm text-gray-600">
        {props.itemsList.map((listItem) => (
          <ItemCard key={listItem.id} listItem={listItem}>
            <div>{listItem.title}</div>
          </ItemCard>
        ))}
      </div>

      <div>
        <EdiText
          id={`${props.listType}_inputField`}
          type="text"
          value={itemText}
          editOnViewClick={true}
          // startEditingOnFocus={true}
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
          inputProps={{
            style: { width: "100%" },
          }}

        />
      </div>
    </div>
  );
}
