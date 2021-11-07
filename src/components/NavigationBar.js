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
                parentId={props.parentId}
                itemsList={props.itemsList}
              />
          </nav>
        </div>
      </div>
    </div>
  );
}
