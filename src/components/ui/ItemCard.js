import ItemProgressBar from "./ItemProgressBar";
import ListsContext from "../../context/lists-context";
import { useContext } from "react";

export default function ItemCard(props) {
  const listsContext = useContext(ListsContext);

  const setSelectedItem = (listItem) => {
    if (listItem.itemType == "condition") {
      listsContext.selectCondition(listItem.id);
    } else if (listItem.itemType == "solution") {
      listsContext.selectSolution(listItem.id);
    }
  };

  const updateCheckbox = (listItem) => {
    const checkboxState = listItem.progress_percentage == 1 ? 0 : 1;
    listsContext.updateItem(listItem.id, "progress_percentage", checkboxState);
    listsContext.updateProgress(listItem);
  };

  const displayProgressBar = props.listItem.progress_percentage !== undefined && props.listItem.itemType !== "task";
  const includeCheckbox = props.listItem.itemType === "task";

  return (
    <div
      className={`bg-white rounded shadow my-2 hover:bg-purple-50 ${
        props.listItem.id ==
        (props.listItem.itemType == "condition" ? listsContext.selectedCondition : listsContext.selectedSolution)
          ? "bg-purple-50"
          : ""
      }`}
      onClick={() => {
        if (props.listItem.itemType != "task") {
          setSelectedItem(props.listItem);
        }
      }}
    >
      <div className="px-4 py-2 relative flex items-start">
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
        {props.children}
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
