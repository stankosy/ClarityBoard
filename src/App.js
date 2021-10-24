import NavigationBar from "./components/NavigationBar";
import ItemsList from "./components/ItemsList";
import DashboardTitle from "./components/DashboardTitle";
import { useState } from "react/cjs/react.development";
import ListsContext from "./context/lists-context";

const getLocalStorageList = (listType) => {
  return JSON.parse(localStorage.getItem(listType));
};

export default function App() {
  const [conditionsList, setConditionsList] = useState(
    getLocalStorageList("conditions")
  );

  const addNewListItem = (newListItem, itemType) => {
    const addItemFunction = (oldItemsList) => {
      return [...oldItemsList, newListItem];
    };
    if (itemType === "condition") {
      setConditionsList(addItemFunction);
      // add new conditions to local storage
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="py-4">
        <header>
          <DashboardTitle title="Hire a new Frontend Developer" />
        </header>

        <main>
          <ListsContext.Provider
            value={{
              conditionsList: conditionsList,
              onAddNewListItem: addNewListItem,
            }}
          >
            <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
              <ItemsList title="Conditions" itemsList={conditionsList} />
              <ItemsList title="Solutions" itemsList={[]} cardAddOn="" />
              <ItemsList title="Tasks" itemsList={[]} cardAddOn="checkbox" />
            </div>
          </ListsContext.Provider>
        </main>
      </div>
    </div>
  );
}
