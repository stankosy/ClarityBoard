import DashboardTitle from "../components/DashboardTitle";
import ItemsList from "../components/ItemsList";
import { useContext } from "react";
import { filterListItems } from "../utils/helper-functions";
import ListsContext from "../context/lists-context";

export default function ObjectiveView() {
  const listsContext = useContext(ListsContext);
  return (
    <div className="md:pl-64 flex flex-col flex-1">
      <main className="flex-1">
        <div className="py-6">
          <DashboardTitle title="Hire a new Frontend Developer" />

          <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
            <ItemsList
              listType="condition"
              itemsList={filterListItems(listsContext.itemsList, "listType", "condition")}
            />
            <ItemsList
              listType="solution"
              parentId={listsContext.selectedCondition}
              itemsList={filterListItems(
                listsContext.itemsList,
                "parentId",
                listsContext.selectedCondition
              )}
            />
            <ItemsList
              listType="task"
              parentId={listsContext.selectedSolution}
              itemsList={filterListItems(
                listsContext.itemsList,
                "parentId",
                listsContext.selectedSolution
              )}
              includeCheckbox={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
