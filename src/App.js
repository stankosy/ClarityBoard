import NavigationBar from "./components/NavigationBar";
import ItemsList from "./components/ItemsList";
import DashboardTitle from "./components/DashboardTitle";
import { useState } from "react/cjs/react.development";

const INIT_OBJECTIVE = {
  key: 1,
  title: "Hire a new Frontend Developer",
  selectedItemIds: {
    keyResults: 1,
    solutions: 1,
    tasks: 2,
  },
  keyResults: [
    {
      key: 1,
      description:
        "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
      solutions: [
        {
          key: 1,
          description: "this is a new text",
          isSelected: true,
          tasks: [
            { key: 1, description: "Blabla" },
            { key: 2, description: "Blabla" },
            { key: 3, description: "Blabla" },
          ],
        },
        { key: 2, description: "this is a new text" },
      ],
    },
  ],
};

export default function App() {
  const [keyResultsList, setKeyResultsList] = useState(
    INIT_OBJECTIVE["keyResults"]
  );

  const addNewListItem = (newListItem) => {
    setKeyResultsList((oldKeyResultsList) => {
      return [...oldKeyResultsList, { description: newListItem }];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="py-4">
        <header>
          <DashboardTitle title={INIT_OBJECTIVE["title"]} />
        </header>

        <main>
          <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
            <div className="px-4 py-5 sm:px-0">
              <ItemsList
                title="Key Result"
                itemsList={keyResultsList}
                onAddListItem={addNewListItem}
                cardAddOn=""
              />
            </div>
            <div className="px-4 py-5 sm:px-0">
              <ItemsList
                title="Potential Solution"
                itemsList={keyResultsList[0]["solutions"]}
                cardAddOn=""
              />
            </div>
            <div className="px-4 py-5 sm:px-0">
              <ItemsList
                title="Task"
                itemsList={keyResultsList[0]["solutions"][0]["tasks"]}
                cardAddOn="checkbox"
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
