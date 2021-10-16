export default function NewCard() {
  const titleChangeHandler = (event) => {
    // console.log(event.target.value)
  };

  return (
    <div>
      <textarea
        id="about"
        name="about"
        rows={3}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
        placeholder="new val"
        defaultValue={"This is new value"}
        onChange={titleChangeHandler}
      />
    </div>
  );
}
