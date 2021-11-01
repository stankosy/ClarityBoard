import ObjectiveView from "./pages/ObjectiveView";
import ItemsList from "./components/ItemsList";
import LandingPageView from "./pages/LandingPageView";
import NavigationBar from "./components/NavigationBar";
import ListsContext from "./context/lists-context";
import { useState } from "react";
import {
  getLocalStorageList,
  getLocalStorageDict,
  saveLocalStorageList,
  updateSelectedRelationship,
  filterListItems,
} from "./utils/helper-functions";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ObjectivesList from "./pages/ObjectivesList";

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
    updateSelectedRelationship("index", id, localStorageSelectedItems);
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

  const navbar_itemsList = [
    {
      id: "1",
      title: "title 1",
      href: "objective"
    },
    {
      id: "1",
      title: "title 1",
      href: "objective"
    }
  ]

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
            addNewListItem: addNewListItem,
            updateItem: updateItem,
            updateProgress: updateProgress,
            selectCondition: selectCondition,
            selectSolution: selectSolution,
            selectedCondition: selectedCondition,
            selectedSolution: selectedSolution,
          }}
        >
          <NavigationBar listType="space" itemsList={navbar_itemsList} />
          <Route path="/dashboard">
            <ObjectivesList />
          </Route>
          <Route path="/objective">
            {/* <NavigationBar /> */}
            <ObjectiveView title="Hire a new Frontend Developer">
              <ItemsList
                listType="condition"
                itemsList={filterListItems(itemsList, "listType", "condition")}
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
            </ObjectiveView>
          </Route>
        </ListsContext.Provider>
      </Switch>
    </Router>
  );
}
