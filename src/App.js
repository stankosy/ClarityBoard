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
  deleteSelectedRelationship,
} from "./utils/helper-functions";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import ObjectivesList from "./pages/ObjectivesList";

export default function App() {
  let localStorageItemsList = getLocalStorageList("items");
  let localStorageSelectedItems = getLocalStorageDict("selectedItems");

  const [itemsList, setItemsList] = useState(localStorageItemsList);
  const [selectedSection, setSelectedSection] = useState(localStorageSelectedItems["none"]);
  const [selectedObjective, setSelectedObjective] = useState(null);
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
      let itemsToCheck = [item];
      let itemsToDelete = [item];

      while (itemsToCheck.length !== 0) {
        // get the children of that item
        let childrenItems = filterListItems(oldItemsList, "parentId", itemsToCheck[0].id);

        itemsToCheck.push(...childrenItems);
        itemsToDelete.push(...childrenItems);

        // remove the checked item from the list
        itemsToCheck.shift();
      }
      // Removing all the items from the list
      for (var itemToDelete of itemsToDelete) {
        // removing item from items list
        let itemIndex = oldItemsList.findIndex((obj) => obj.id == itemToDelete.id);
        oldItemsList.splice(itemIndex, 1);

        // removing selection relationships
        console.log("Deleting relationship", itemToDelete);
        deleteSelectedRelationship(itemToDelete.id, localStorageSelectedItems);
      }
      saveLocalStorageList("items", oldItemsList);
      return [...oldItemsList];
    });
  };

  const updateProgress = (item) => {
    while (item.parentId !== undefined && item.parentId !== null && item.parentId !== "none") {
      // console.log("__________");
      // console.log("item", item);
      // console.log("itemsList", itemsList);

      // get the children of the item's parent
      let childrenItems = filterListItems(itemsList, "parentId", item.parentId);
      if (!childrenItems) {
        break;
      }
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

  const setSelectedItem = (listItem) => {
    switch (listItem.itemType) {
      case "section":
        setSelectedSection(listItem.id);
        updateSelectedRelationship("none", listItem.id, localStorageSelectedItems);
        break;
      case "objective":
        setSelectedObjective(listItem.id);
        updateSelectedRelationship(selectedSection, listItem.id, localStorageSelectedItems);

        // for the auto selection of the solution and tasks when selecting the objective
        const selectedConditionTemp = localStorageSelectedItems[listItem.id]
        const selectedSolutionTemp = localStorageSelectedItems[selectedConditionTemp]
        setSelectedCondition(selectedConditionTemp)
        setSelectedSolution(selectedSolutionTemp)
        break;
      case "condition":
        setSelectedCondition(listItem.id);
        updateSelectedRelationship(selectedObjective, listItem.id, localStorageSelectedItems);
        setSelectedSolution(localStorageSelectedItems[listItem.id])  // for the autoselect of the solution when selecting the condition
        break;
      case "solution":
        setSelectedSolution(listItem.id);
        updateSelectedRelationship(selectedCondition, listItem.id, localStorageSelectedItems);
        break;
    }
  };

  const itemIsSelected = (listItem) => {
    switch (listItem.itemType) {
      case "section":
        return listItem.id === selectedSection;
      case "objective":
        return listItem.id === selectedObjective;
      case "condition":
        return listItem.id === selectedCondition;
      case "solution":
        return listItem.id === selectedSolution;
    }
  };

  const getObjectiveTitle = () =>{
    const item = filterListItems(itemsList, "id", selectedObjective)[0]
    if (item) {
      return item.title
    } else {
      return "Title not found"
    }
  }

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/dashboard" />
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
            setSelectedItem: setSelectedItem,
            itemIsSelected: itemIsSelected,
          }}
        >
          <NavigationBar
            listType="section"
            listName="HEADSPACES"
            parentId="none"
            itemsList={filterListItems(itemsList, "listType", "section")}
          />
          <Route path="/dashboard">
            <ObjectivesList title="Upcoming Objectives">
              <ItemsList
                listType="objective"
                listName="I chose to..."
                parentId={selectedSection}
                itemsList={filterListItems(itemsList, "parentId", selectedSection)}
              />
            </ObjectivesList>
          </Route>
          <Route path="/objective">
            <ObjectiveView title={getObjectiveTitle()}>
              <ItemsList
                listType="condition"
                listName="States to be reached"
                parentId={selectedObjective}
                itemsList={filterListItems(itemsList, "parentId", selectedObjective)}
              />
              <ItemsList
                listType="solution"
                listName="Potential solutions"
                parentId={selectedCondition}
                itemsList={filterListItems(itemsList, "parentId", selectedCondition)}
              />
              <ItemsList
                listType="task"
                listName="Actions to take"
                parentId={selectedSolution}
                itemsList={filterListItems(itemsList, "parentId", selectedSolution, "task")}
                includeCheckbox={true}
              />
              <ItemsList
                listType="risk"
                listName="Potential risks"
                parentId={selectedSolution}
                itemsList={filterListItems(itemsList, "parentId", selectedSolution, "risk")}
                includeCheckbox={true}
              />
            </ObjectiveView>
          </Route>
        </ListsContext.Provider>
      </Switch>
    </Router>
  );
}
