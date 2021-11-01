export default function ItemProgressBar(props) {
  return (
    <div className="h-1 flex bg-purple-300 rounded-b">
      <div
        style={{ width: `${props.percent}%` }}
        className={`bg-purple-500 ${props.percent == 100 ? "rounded-b" : "rounded-bl"}`}
      ></div>
    </div>
  );
}