import NewListItem from "./NewListItem";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";
import { useState } from "react/cjs/react.development";

export default function ItemsList(props) {
  const [cardInputVisible, setCardInputVisible] = useState(false);

  const toggleCardInputVisible = () => {
    setCardInputVisible(cardInputVisible ? false : true);
  };

  const addNewListItem = (newListItem) => {
    props.onAddListItem(newListItem);
    return newListItem;
  };

  let cardAddOnItem = {};
  if (props.cardAddOn === "checkbox") {
    cardAddOnItem = (
      <div className="flex items-center h-6 mr-4">
        <input
          id="comments"
          aria-describedby="comments-description"
          name="comments"
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
        />
      </div>
    );
  } else if (props.cardAddOn === "progressBar") {
    cardAddOnItem = <></>;
  } else {
    cardAddOnItem = <></>;
  }

  return (
    <div className="px-4 py-5 sm:px-0">
      <div className="bg-white shadow-xl rounded-md">
        <div className=" px-4 py-2 border-b border-gray-200 sm:px-6 ">
          <div className="-ml-6 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
            <div className="ml-4 mt-4">
              <h3 className="font-bold text-lg leading-6 font-medium text-gray-900">
                {props.title + "s"}
              </h3>
            </div>
            <div className="ml-4 mt-4 flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center p-1 border border-transparent rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={toggleCardInputVisible}
              >
                <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="shadow overflow-hidden ">
          <ul role="list" className="divide-y divide-gray-200">
            {props.itemsList.map((listItem) => (
              <li
                key={listItem.id}
                className="relative flex items-start py-2 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
              >
                {cardAddOnItem}
                <div>
                  <p className="line-clamp-2 text-sm text-gray-600">
                    {listItem.description}
                  </p>
                </div>
                <div className="flex justify-between space-x-3">
                  <div className="min-w-0 flex-1"></div>
                </div>
              </li>
            ))}
            <NewListItem
              isVisible={cardInputVisible}
              listName={props.title}
              onAddListItem={addNewListItem}
              onDeactivateCardInput={toggleCardInputVisible}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}
