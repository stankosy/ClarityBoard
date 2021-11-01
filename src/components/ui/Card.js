import ItemProgressBar from "./ItemProgressBar";

export default function Card(props) {
  return (
    <div key={props.key} className="bg-white rounded shadow">
      <div className="px-4 py-2">{props.children}</div>
      {props.progress_percentage && (
        <div>
          <ItemProgressBar percent={props.progress_percentage * 100} />
        </div>
      )}
    </div>
  );
}
