import ObjectiveView from "./pages/ObjectiveView";
import ItemsList from "./components/ItemsList";
import LandingPageView from "./pages/LandingPageView";
import NavigationBar from "./components/NavigationBar";
import ListsContext from "./context/lists-context";
import { useState, useEffect } from "react";
import {
  getLocalStorageList,
  getLocalStorageDict,
  saveLocalStorageList,
  updateSelectedRelationship,
  filterListItems,
} from "./utils/helper-functions";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ObjectivesList from "./pages/ObjectivesList";

export default function App() {
  let localStorageItemsList = getLocalStorageList("items");
  let localStorageSelectedItems = getLocalStorageDict("selectedItems");

  const [itemsList, setItemsList] = useState(localStorageItemsList);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [newItem, setNewItem] = useState(null);

  // MANIPULATION FUNCTIONS
  const addNewListItem = (newListItem) => {
    setItemsList((oldItemsList) => {
      return [...oldItemsList, newListItem];
    });
    saveLocalStorageList("items", [...localStorageItemsList, newListItem]);
    setNewItem(newListItem); // Setting new item state to trigger updateProgress
  };

  // Updates the progress when new task has been added to the list
  useEffect(() => {
    if (newItem != null && newItem.itemType === "task") {
      updateProgress(newItem);
    }
  }, [newItem]);

  const updateItem = (itemId, param, value) => {
    // console.log("updating item", itemId, param, value);
    const itemIndex = itemsList.findIndex((obj) => obj.id == itemId);
    itemsList[itemIndex][param] = value;
    setItemsList((oldItemsList) => {
      // oldItemsList[itemIndex][param] = value;
      return [...oldItemsList];
    });
    saveLocalStorageList("items", itemsList);
    // console.log("itemsList", itemsList);
  };

  const deleteItemAndChildren = (item) => {

    setItemsList((oldItemsList) => {
      let itemsToCheck = [item]
      let itemsToDelete = [item]

      while (itemsToCheck.length !== 0) {
        // get the children of that item 
        let childrenItems = filterListItems(oldItemsList, "parentId", itemsToCheck[0].id);

        itemsToCheck.push(...childrenItems)
        itemsToDelete.push(...childrenItems)

        // remove the checked item from the list 
        itemsToCheck.shift()
      }
      // Removing all the items from the list
      for (var itemToDelete of itemsToDelete) {
        let itemIndex = oldItemsList.findIndex((obj) => obj.id == itemToDelete.id);
        oldItemsList.splice(itemIndex, 1)
      }
      saveLocalStorageList("items", oldItemsList);
      return [...oldItemsList];
    });
  };

  const updateProgress = (item) => {
    while (item.parentId !== undefined) {
      // console.log("__________");
      // console.log("item", item);
      // console.log("itemsList", itemsList);

      // get the children of the item's parent
      let childrenItems = filterListItems(itemsList, "parentId", item.parentId);
      // console.log("childrenItems", childrenItems);

      // calculate the avr progress
      let progressItemsList = childrenItems.map((item) => item.progress_percentage);
      progressItemsList = progressItemsList.filter((x) => x !== undefined);
      // console.log("progressItemsList", progressItemsList);

      if (progressItemsList.length) {
        let avr_progress = progressItemsList.reduce((prev, curr) => prev + curr) / progressItemsList.length;
        // console.log("avr_progress", avr_progress);

        // update this parent and get it's parent
        updateItem(item.parentId, "progress_percentage", avr_progress);
        item = filterListItems(itemsList, "id", item.parentId)[0];
        // console.log("^^^^^^^^^^^^");
      }
    }
  };

  // SELECTION FUNCTIONS
  const selectCondition = (id) => {
    setSelectedCondition(id);
    updateSelectedRelationship("index", id, localStorageSelectedItems);
    setSelectedSolution(localStorageSelectedItems[id]);
  };

  const selectSolution = (id) => {
    setSelectedSolution(id);
    updateSelectedRelationship(selectedCondition, id, localStorageSelectedItems);
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/objective" />
          <LandingPageView title="Welcome page!" />
        </Route>
        <ListsContext.Provider
          value={{
            itemsList: itemsList,
            newItem: newItem,
            addNewListItem: addNewListItem,
            updateItem: updateItem,
            deleteItemAndChildren: deleteItemAndChildren,
            updateProgress: updateProgress,
            selectCondition: selectCondition,
            selectSolution: selectSolution,
            selectedCondition: selectedCondition,
            selectedSolution: selectedSolution,
          }}
        >
          <NavigationBar listType="space" itemsList={filterListItems(itemsList, "listType", "space")} />
          <Route path="/dashboard">
            <ObjectivesList title="Upcoming Objectives">
              <ItemsList listType="objective" itemsList={filterListItems(itemsList, "listType", "objective")} />
            </ObjectivesList>
          </Route>
          <Route path="/objective">
            {/* <NavigationBar /> */}
            <ObjectiveView title="Hire a new Frontend Developer">
              <ItemsList listType="condition" itemsList={filterListItems(itemsList, "listType", "condition")} />
              <ItemsList
                listType="solution"
                parentId={selectedCondition}
                itemsList={filterListItems(itemsList, "parentId", selectedCondition)}
              />
              <ItemsList
                listType="task"
                parentId={selectedSolution}
                itemsList={filterListItems(itemsList, "parentId", selectedSolution)}
                includeCheckbox={true}
              />
            </ObjectiveView>
          </Route>
        </ListsContext.Provider>
      </Switch>
    </Router>
  );
}
