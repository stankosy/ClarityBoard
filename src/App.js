import NavigationBar from "./components/NavigationBar";
import ItemsList from "./components/ItemsList";
import DashboardTitle from "./components/DashboardTitle";
import ListsContext from "./context/lists-context";
import { useState } from "react";
import {
  getLocalStorageList,
  getLocalStorageDict,
  saveLocalStorageList,
  updateSelectedRelationship,
  filterListItems,
} from "./utils/helper-functions";

export default function App() {
  let localStorageItemsList = getLocalStorageList("items");
  let localStorageSelectedItems = getLocalStorageDict("selectedItems");

  const [itemsList, setItemsList] = useState(localStorageItemsList);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState(null);

  // MANIPULATION FUNCTIONS 
  const addNewListItem = (newListItem) => {
    setItemsList((oldItemsList) => {
      return [...oldItemsList, newListItem];
    });
    saveLocalStorageList("items", [...localStorageItemsList, newListItem]);
  };

  const updateItem = (itemId, param, value) => {
    console.log("updating item", itemId, param, value);
    const itemIndex = itemsList.findIndex((obj) => obj.id == itemId);
    itemsList[itemIndex][param] = value;
    setItemsList((oldItemsList) => {
      // oldItemsList[itemIndex][param] = value;
      return [...oldItemsList];
    });
    // saveLocalStorageList("items", itemsList);
    // console.log("itemsList", itemsList);
  };

  const updateProgress = (item) => {
    while (item.parentId !== undefined) {
      console.log("item", item);
      console.log("itemsList", itemsList);

      // get the children of the item's parent
      let childrenItems = filterListItems(itemsList, "parentId", item.parentId);
      console.log("childrenItems", childrenItems);

      // calculate the avr progress
      let progressItemsList = childrenItems.map(
        (item) => item.progress_percent
      );
      progressItemsList = progressItemsList.filter((x) => x !== undefined);
      console.log("progressItemsList", progressItemsList);

      if (progressItemsList.length) {
        let avr_progress =
          progressItemsList.reduce((prev, curr) => prev + curr) /
          progressItemsList.length;
        console.log("avr_progress", avr_progress);

        // update this parent and get it's parent
        updateItem(item.parentId, "progress_percent", avr_progress);
        item = filterListItems(itemsList, "id", item.parentId)[0];
      }
    }
  };

  // SELECTION FUNCTIONS
  const selectCondition = (id) => {
    setSelectedCondition(id);
    updateSelectedRelationship(
      "index",
      id,
      localStorageSelectedItems
    );
    setSelectedSolution(localStorageSelectedItems[id]);
  };

  const selectSolution = (id) => {
    setSelectedSolution(id);
    updateSelectedRelationship(
      selectedCondition,
      id,
      localStorageSelectedItems
    );
  };

  return (
    <div>
      <NavigationBar />
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1">
          <div className="py-6">
            <DashboardTitle title="Hire a new Frontend Developer" />
            <ListsContext.Provider
              value={{
                itemsList: itemsList,
                addNewListItem: addNewListItem,
                updateItem: updateItem,
                updateProgress: updateProgress,
                selectCondition: selectCondition,
                selectSolution: selectSolution,
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
