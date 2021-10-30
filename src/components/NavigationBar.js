
import {
  CashIcon,
  CloudIcon,
  EmojiHappyIcon,
  UserCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/outline'

const navigation = [
  { name: 'Mental', href: '#', icon: CloudIcon, current: true },
  { name: 'Body', href: '#', icon: UserCircleIcon, current: false },
  { name: 'Finance', href: '#', icon: CashIcon, current: false },
  { name: 'Social', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Mom', href: '#', icon: EmojiHappyIcon, current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavigationBar() {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
          <h1>ClarityBoard</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                )}
              >
                <item.icon
                  className={classNames(
                    item.current
                      ? "text-gray-500"
                      : "text-gray-400 group-hover:text-gray-500",
                    "mr-3 flex-shrink-0 h-6 w-6"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
