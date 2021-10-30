export default function ItemProgressBar(props) {
    return (
        <div class="relative">
        <div class="overflow-hidden h-1 text-xs flex   bg-purple-200">
          <div
            style={{width: `${props.percent}%`}}
            class="
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