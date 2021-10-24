import NavigationBar from "./components/NavigationBar";
import ItemsList from "./components/ItemsList";
import DashboardTitle from "./components/DashboardTitle";
import { useState } from "react/cjs/react.development";

const CONDITIONS_LIST = [
  {
    key: 1,
    description:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
  {
    key: 2,
    description:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
];

export default function App() {
  const [conditionsList, setConditionsList] = useState(
    CONDITIONS_LIST
  );

  const addNewListItem = (newListItem) => {
    setConditionsList((oldConditionsList) => {
      return [...oldConditionsList, { description: newListItem }];
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
            <div className="px-4 py-5 sm:px-0">
              <ItemsList
                title="Condition"
                itemsList={conditionsList}
                onAddListItem={addNewListItem}
                cardAddOn=""
              />
            </div>
            <div className="px-4 py-5 sm:px-0">
              <ItemsList
                title="Solution"
                itemsList={[]}
                cardAddOn=""
              />
            </div>
            <div className="px-4 py-5 sm:px-0">
              <ItemsList title="Task" itemsList={[]} cardAddOn="checkbox" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
