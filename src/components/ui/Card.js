
export default function Card(props) {
  return (
    <div key={props.key} className="col-span-1 bg-white rounded shadow p-4">
      {props.children}
    </div>
  );
}
