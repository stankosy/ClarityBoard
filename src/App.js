import NavigationBar from "./components/NavigationBar";
import ItemsList from "./components/ItemsList";
import DashboardTitle from "./components/DashboardTitle";
import ListsContext from "./context/lists-context";

import { useState } from "react";
import { MenuIcon } from "@heroicons/react/outline";

const getLocalStorageList = (listType) => {
  return JSON.parse(localStorage.getItem(listType)) || [];
};
const getLocalStorageDict = (listType) => {
  return JSON.parse(localStorage.getItem(listType)) || {};
};

const saveLocalStorageList = (listType, newList) => {
  localStorage.setItem(listType, JSON.stringify(newList));
};

const updateSelectedRelationship = (parentId, childId, selectedItemsDict) => {
  selectedItemsDict[`${parentId}`] = childId;
  localStorage.setItem("selectedItems", JSON.stringify(selectedItemsDict));
};

const filterListItems = (itemsList, filterType, filterValue) => {
  switch (filterType) {
    case "parentId":
      return itemsList.filter((i) => [filterValue].includes(i.parentId));
    case "listType":
      return itemsList.filter((i) => [filterValue].includes(i.itemType));
  }
};

export default function App() {
  let localStorageItemsList = getLocalStorageList("items");
  let localStorageSelectedItems = getLocalStorageDict("selectedItems");

  const [itemsList, setItemsList] = useState(localStorageItemsList);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState(null);

  const updateItem = (itemId, param, value) => {
    const itemIndex = itemsList.findIndex((obj) => obj.id == itemId);
    itemsList[itemIndex][param] = value;
    setItemsList((oldItemsList) => {
      oldItemsList[itemIndex][param] = value;
      return oldItemsList;
    });
    saveLocalStorageList("items", itemsList);
  };

  const addNewListItem = (newListItem) => {
    setItemsList((oldItemsList) => {
      return [...oldItemsList, newListItem];
    });
    saveLocalStorageList("items", [...localStorageItemsList, newListItem]);
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      <NavigationBar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <DashboardTitle title="# Hire a new Frontend Developer" />
            <ListsContext.Provider
              value={{
                itemsList: itemsList,
                addNewListItem: addNewListItem,
                updateItem: updateItem,
                selectCondition: (id) => {
                  setSelectedCondition(id);
                  updateSelectedRelationship(
                    "index",
                    id,
                    localStorageSelectedItems
                  );
                  setSelectedSolution(localStorageSelectedItems[id]);
                },
                selectSolution: (id) => {
                  setSelectedSolution(id);
                  updateSelectedRelationship(
                    selectedCondition,
                    id,
                    localStorageSelectedItems
                  );
                },
                selectedCondition: selectedCondition,
                selectedSolution: selectedSolution,
              }}
            >
              <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
                <ItemsList
                  listType="condition"
                  itemsList={filterListItems(
                    itemsList,
                    "listType",
                    "condition"
                  )}
                />
                <ItemsList
                  listType="solution"
                  parentId={selectedCondition}
                  itemsList={filterListItems(
                    itemsList,
                    "parentId",
                    selectedCondition
                  )}
                />
                <ItemsList
                  listType="task"
                  parentId={selectedSolution}
                  itemsList={filterListItems(
                    itemsList,
                    "parentId",
                    selectedSolution
                  )}
                  includeCheckbox={true}
                />
              </div>
            </ListsContext.Provider>
          </div>
        </main>
      </div>
    </div>
  );
}
