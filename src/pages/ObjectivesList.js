import Card from "../components/ui/Card";

export default function ObjectivesList(props) {
  return (
    <div className="md:pl-64 flex flex-col flex-1 md:container md:mx-auto">
      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto sm:px-6 lg:px-8 grid grid-cols-1">
            {props.children}
            <Card>
              Content
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
