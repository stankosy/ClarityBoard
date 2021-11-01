import { useRef, useContext } from "react/cjs/react.development";
import ListsContext from "../context/lists-context";

export default function NewListItem(props) {
  const listItemContent = useRef(null);
  const listsContext = useContext(ListsContext);

  const saveFormContent = (event) => {
    event.preventDefault();
    if (listItemContent.current.value.trim() === "") {
      return;
    }

    const itemId = Date.now();
    listsContext.addNewListItem({
      id: itemId,
      parentId: props.parentId,
      itemType: props.listType,
      title: listItemContent.current.value,
      progress_percentage: props.listType == "task" ? 0 : undefined
    });

    // Select the created list item
    if (props.listType == "condition") {
      listsContext.selectCondition(itemId);
    } else if (props.listType == "solution") {
      listsContext.selectSolution(itemId);
    }

    listItemContent.current.value = "";
  };

  return (
    <li className="relative py-2 px-4 hover:bg-gray-50 focus-within:ring-inset focus-within:ring-indigo-600">
      <form onSubmit={saveFormContent}>
        <div>
          <textarea
            name="item-content"
            rows={2}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
            placeholder={'Add a new, "Ctrl + Enter" to save'}
            ref={listItemContent}
            required
          />
        </div>
        <div className="flex justify-end py-2">
          <div className="pl-2">
            <button
              type="button"
              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={props.onDeactivateCardInput}
            >
              Cancel
            </button>
          </div>
          <div className="pl-2">
            <button
              type="submit"
              className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </li>
  );
}
