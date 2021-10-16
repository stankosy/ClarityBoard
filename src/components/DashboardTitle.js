export default function DashboardTitle(props) {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold leading-tight text-gray-900">
        {props.title}
      </h1>
    </div>
  );
}
