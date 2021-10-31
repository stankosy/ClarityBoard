export default function ItemProgressBar(props) {
    return (
        <div className="relative">
        <div className="overflow-hidden h-1 text-xs flex   bg-purple-200">
          <div
            style={{width: `${props.percent}%`}}
            className="
              shadow-none
              flex flex-col
              text-center
              whitespace-nowrap
              text-white
              justify-center
              bg-purple-500
            "
          ></div>
        </div>
      </div>
    )
}