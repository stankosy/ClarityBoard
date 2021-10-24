import NavigationBar from "./components/NavigationBar";
import ItemsList from "./components/ItemsList";
import DashboardTitle from "./components/DashboardTitle";
import { useState } from "react/cjs/react.development";
import ListsContext from "./context/lists-context";

const getLocalStorageList = (listType) => {
  return JSON.parse(localStorage.getItem(listType)) || [];
};

const saveLocalStorageList = (listType, newList) => {
  localStorage.setItem(listType, JSON.stringify(newList));
};

export default function App() {
  let localStorageConditionsList = getLocalStorageList("condition");
  let localStorageSolutionsList = getLocalStorageList("solution");

  const [conditionsList, setConditionsList] = useState(
    localStorageConditionsList
  );
  const [solutionsList, setSolutionsList] = useState(localStorageSolutionsList);

  const [selectedCondition, setSelectedCondition] = useState(null);

  const addNewListItem = (newListItem, itemType) => {
    const addItemFunction = (oldItemsList) => {
      return [...oldItemsList, newListItem];
    };
    if (itemType === "condition") {
      setConditionsList(addItemFunction);
      saveLocalStorageList(itemType, [
        ...localStorageConditionsList,
        newListItem,
      ]);
    } else if (itemType === "solution") {
      setSolutionsList(addItemFunction);
      saveLocalStorageList(itemType, [
        ...localStorageSolutionsList,
        newListItem,
      ]);
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
              addNewListItem: addNewListItem,
              selectCondition: (id) => {
                setSelectedCondition(id);
              },
              selectedCondition: selectedCondition,
            }}
          >
            <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
              <ItemsList listType="condition" itemsList={conditionsList} />
              <ItemsList listType="solution" itemsList={solutionsList} />
              <ItemsList listType="task" itemsList={[]} cardAddOn="checkbox" />
            </div>
          </ListsContext.Provider>
        </main>
      </div>
    </div>
  );
}
