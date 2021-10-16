import NewCard from "./NewCard";
import { PlusSmIcon as PlusSmIconSolid } from "@heroicons/react/solid";

export default function CardsList(props) {
  const addNewState = (newState) => {
    props.onAddStateItem(newState);
    return newState;
  };

  return (
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
            >
              <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="shadow overflow-hidden ">
        <ul role="list" className="divide-y divide-gray-200">
          {props.statesList.map((stateItem) => (
            <li
              key={stateItem.id}
              className="relative py-2 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            >
              <div>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {stateItem.preview}
                </p>
              </div>
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1"></div>
              </div>
            </li>
          ))}
          <li className="relative py-2 px-4 hover:bg-gray-50 focus-within:ring-inset focus-within:ring-indigo-600">
            <NewCard listName={props.title} onAddStateItem={addNewState} />
          </li>
        </ul>
      </div>
    </div>
  );
}
