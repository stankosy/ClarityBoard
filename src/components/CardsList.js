import { useState } from "react";
import NewCard from "./NewCard";
import { PlusSmIcon as PlusSmIconSolid } from '@heroicons/react/solid'


const messages = [
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
];

export default function CardsList(props) {
  const [title, setTitle] = useState(props.title);

  const updateTitle = () => {
    setTitle("updated");
  };

  return (
    <div className="bg-white shadow-xl rounded-md">
      <div className=" px-4 py-2 border-b border-gray-200 sm:px-6 ">
        <div className="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
          <div className="ml-4 mt-4">
            <h3 className="font-bold text-lg leading-6 font-medium text-gray-900">
              {props.title + "s"}
            </h3>
          </div>
          <div className="ml-4 mt-4 flex-shrink-0">
            <button
              type="button"
              onClick={updateTitle}
              className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="shadow overflow-hidden ">
        <ul role="list" className="divide-y divide-gray-200">
          {messages.map((message) => (
            <li
              key={message.id}
              className="relative bg-white py-2 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600"
            >
              <div>
                <p className="line-clamp-2 text-sm text-gray-600">
                  {message.preview}
                </p>
              </div>
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  {/* <a href="#" className="block focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {message.sender}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {message.subject}
                    </p>
                  </a> */}
                </div>
                <time
                  dateTime={message.datetime}
                  className="flex-shrink-0 whitespace-nowrap text-sm text-gray-400"
                >
                  {message.time}
                </time>
              </div>
            </li>
          ))}
        </ul>
        <div className="px-4 py-2">
          <NewCard listName={props.title}/>
        </div>
      </div>
    </div>
  );
}
