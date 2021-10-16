import { useState } from "react/cjs/react.development";

export default function NewCard(props) {
  const [stateContent, setStateContent] = useState("");

  const titleChangeHandler = (event) => {
    setStateContent(event.target.value);
  };

  const saveFormContent = (event) => {
    event.preventDefault();
    if (stateContent.trim() === "") {
      return;
    }
    props.onAddStateItem(stateContent);
    setStateContent("");
  };

  if (props.isVisible === false) {
    return <></>;
  }

  return (
    <li className="relative py-2 px-4 hover:bg-gray-50 focus-within:ring-inset focus-within:ring-indigo-600">
      <form onSubmit={saveFormContent}>
        <div>
          <textarea
            name="item-content"
            rows={2 }
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
            placeholder={
              "Add a new " +
              props.listName.toLowerCase() +
              '\n"Ctrl + Enter" to save'
            }
            // defaultValue={stateContent}
            value={stateContent}
            onChange={titleChangeHandler}
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
