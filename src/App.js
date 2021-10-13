import NavigationBar from "./components/NavigationBar";
import CardsList from "./components/CardsList";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationBar />
      <div className="py-5">
        <header>
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Find a new Frontend Developer
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
            <div className="px-4 py-8 sm:px-0">
              <CardsList title="States" />
            </div>
            <div className="px-4 py-8 sm:px-0">
              <CardsList title="Potential Solutions" />
            </div>
            <div className="px-4 py-8 sm:px-0">
              <CardsList title="Actionables" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
