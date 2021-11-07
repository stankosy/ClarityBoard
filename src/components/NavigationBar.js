import { NavLink } from "react-router-dom";
import { EditText } from "react-edit-text";
import { useState, useContext } from "react";
import ListsContext from "../context/lists-context";
import { list } from "postcss";
import ItemsList from "./ItemsList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationBar(props) {
  const listsContext = useContext(ListsContext);

  const [itemText, setItemText] = useState("");

  const updateMenuInput = ({ name, value, previousValue }) => {
    // Create new item
    if (previousValue === "") {
      const newItem = {
        id: Date.now(),
        // href: `${itemId}`,
        parentId: null,
        itemType: props.listType,
        title: value,
        // progress_percentage: ,
      };
      listsContext.addNewListItem(newItem);
      listsContext.setSelectedItem(newItem);
      setItemText("");
    }
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">ClarityBoard</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            <h2 className="px-2">HEADSPACES</h2>

            <ItemsList
                listType={props.listType}
                parentId={null}
                itemsList={props.itemsList}
              />


            {/* {props.itemsList.map((item) => (
              <div
                key={item.id}
                // to={item.href}
                className={classNames(
                  true ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                {item.title}
              </div>
            ))}
            <div style={{ whiteSpace: "nowrap" }}>
              <EditText
                name="new-space"
                type="text"
                // style={{ width: "200px" }}
                placeholder="+ ADD NEW HEADSPACE"
                inline
                className={classNames(
                  true ? "bg-gray-100 text-gray-500" : "text-gray-300 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
                value={itemText}
                onChange={setItemText}
                onSave={updateMenuInput}
              />
            </div> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
