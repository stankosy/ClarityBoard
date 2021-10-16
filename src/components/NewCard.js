export default function NewCard(props) {
  const titleChangeHandler = (event) => {
    // console.log(event.target.value)
  };

  return (
    <div>
      <div>
        <textarea
          id="about"
          name="about"
          rows={3}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border rounded-md"
          placeholder={"Add a new " + props.listName.toLowerCase() + "\n\"Ctrl + Enter\" to save"}
          defaultValue={""}
          onChange={titleChangeHandler}
        />
      </div>
      <div>
        <div>
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
