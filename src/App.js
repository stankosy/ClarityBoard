import NavigationBar from "./components/NavigationBar";
import CardsList from "./components/CardsList";
import DashboardTitle from "./components/DashboardTitle";
import { useState } from "react/cjs/react.development";

const INIT_DATA = [
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-27T16:35",
    preview:
      "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere.",
  },
];

export default function App() {

  const [statesList, setStatesList] = useState(INIT_DATA)

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="py-4">
        <header>
          <DashboardTitle title="Find new Frontend Developer" />
        </header>

        <main>
          <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
            <div className="px-4 py-5 sm:px-0">
              <CardsList title="State" statesList={statesList}/>
            </div>
            <div className="px-4 py-5 sm:px-0">
              <CardsList title="Potential Solution" statesList={[]}/>
            </div>
            <div className="px-4 py-5 sm:px-0">
              <CardsList title="Actionable" statesList={[]}/>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
