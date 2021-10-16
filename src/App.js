import NavigationBar from "./components/NavigationBar";
import CardsList from "./components/CardsList";
import DashboardTitle from "./components/DashboardTitle";

export default function App() {
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
              <CardsList title="State" />
            </div>
            <div className="px-4 py-5 sm:px-0">
              <CardsList title="Potential Solution" />
            </div>
            <div className="px-4 py-5 sm:px-0">
              <CardsList title="Actionable" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
