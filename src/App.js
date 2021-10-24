import NavigationBar from "./components/NavigationBar";
import ItemsList from "./components/ItemsList";
import DashboardTitle from "./components/DashboardTitle";
import { useState } from "react/cjs/react.development";

const CONDITIONS_LIST = [
  {
    id: 1,
    content:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
  {
    id: 2,
    content:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
];

export default function App() {
  const [conditionsList, setConditionsList] = useState(CONDITIONS_LIST);

  const addNewListItem = (newListItem) => {
    setConditionsList((oldConditionsList) => {
      return [...oldConditionsList, { id: Date.now(), content: newListItem }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="py-4">
        <header>
          <DashboardTitle title="Hire a new Frontend Developer" />
        </header>

        <main>
          <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
            <ItemsList
              title="Condition"
              itemsList={conditionsList}
              onAddListItem={addNewListItem}
              cardAddOn=""
            />
            <ItemsList title="Solution" itemsList={[]} cardAddOn="" />
            <ItemsList title="Task" itemsList={[]} cardAddOn="checkbox" />
          </div>
        </main>
      </div>
    </div>
  );
}
