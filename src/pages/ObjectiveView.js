import Card from "../components/ui/Card";

export default function ObjectiveView(props) {
  return (
    <div className="md:pl-64 flex flex-col flex-1">
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <h1 className="text-3xl font-bold leading-tight text-gray-900">
                {props.title}
              </h1>
            </Card>
          </div>
          <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-3 gap-4">
        {props.children}
          </div>
        </div>
      </main>
    </div>
  );
}
