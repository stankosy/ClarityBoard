export default function Card(props) {
  return (
    <div className={`bg-white rounded shadow my-1 ${props.className}`}>
      <div className="px-4 py-2 relative flex items-start">{props.children}</div>
    </div>
  );
}
