import ItemProgressBar from "./ItemProgressBar";
import ListsContext from "../../context/lists-context";
import { useContext, useState } from "react";
import CardOption from "./CardOption";
import EdiText from "react-editext";

export default function ItemCard(props) {
  const listsContext = useContext(ListsContext);
  const [inputIsEditing, setInputIsEditing] = useState(false);

  const updateCheckbox = (listItem) => {
    const checkboxState = listItem.progress_percentage == 1 ? 0 : 1;
    listsContext.updateItem(listItem.id, "progress_percentage", checkboxState);
    listsContext.updateProgress(listItem);
  };

  const updateCardTitle = (newValue) => {
    listsContext.updateItem(props.listItem.id, "title", newValue);
    setInputIsEditing((v) => !v); // need to manually disable editing since enter does not work
  };

  const editCardTitle = () => {
    setInputIsEditing((v) => !v);
  };

  const displayProgressBar = props.listItem.progress_percentage !== undefined && props.listItem.itemType !== "task";
  const includeCheckbox = props.listItem.itemType === "task";

  return (
    <div
      className={`bg-white rounded shadow my-2 hover:bg-purple-50 ${
        listsContext.itemIsSelected(props.listItem) ? "bg-purple-50" : ""
      }`}
      onClick={() => {
        if (props.listItem.itemType != "task") {
          listsContext.setSelectedItem(props.listItem);
        }
      }}
    >
      <div className="px-4 py-2 relative flex justify-between">
        {/* Checkbox */}
        {includeCheckbox && (
          <div className="flex items-center h-6 mr-4">
            <input
              type="checkbox"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              defaultChecked={props.listItem.progress_percentage == 1 ? true : false}
              onChange={() => {
                updateCheckbox(props.listItem);
              }}
            />
          </div>
        )}

        {/* Card Content */}
        <div
          // onClick={() => {
          //   if (props.listItem.itemType != "task") {
          //     listsContext.setSelectedItem(props.listItem);
          //   }
          // }}
        >
          <EdiText
            type="text"
            value={props.listItem.title}
            editing={inputIsEditing}
            submitOnUnfocus={true}
            saveButtonClassName="invisible"
            cancelButtonClassName="invisible"
            editButtonClassName="invisible"
            cancelOnEscape={true}
            submitOnEnter={true}
            onSave={updateCardTitle}
            containerProps={{
              style: { width: "100%" },
            }}
          />
        </div>

        {/* Card Options */}
        <div className="z-10">

        <CardOption listItem={props.listItem} editCardTitle={editCardTitle} />
        </div>
      </div>

      {/* Progress Bar */}
      {displayProgressBar && (
        <div>
          <ItemProgressBar percent={props.listItem.progress_percentage * 100} />
        </div>
      )}
    </div>
  );
}
