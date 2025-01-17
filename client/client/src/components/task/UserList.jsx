import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { BsChevronExpand } from "react-icons/bs";
import { MdCheck } from "react-icons/md";

const UserList = ({ setTeam, team }) => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Fetching users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data); // Set the users data to the state
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (el) => {
    setSelectedUsers(el);
    setTeam(el?.map((u) => u._id)); // Map the selected users to _id
  };

  useEffect(() => {
    if (team?.length < 1 && users?.length > 0) {
      setSelectedUsers([users[0]]); // Default to the first user if none selected
    } else {
      setSelectedUsers(team);
    }
  }, [team, users]);

  return (
    <div>
      <p className="text-gray-700">Assign Task To: </p>
      <Listbox
        value={selectedUsers}
        onChange={(el) => handleChange(el)}
        multiple
      >
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded bg-white pl-3 pr-10 text-left px-3 py-2.5 2xl:py-3 border border-gray-300 sm:text-sm">
            <span className="block truncate">
              {selectedUsers?.map((user) => user.name).join(", ")}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <BsChevronExpand
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {users?.map((user, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                    }`
                  }
                  value={user}
                >
                  {({ selected }) => (
                    <>
                      <div
                        className={`flex items-center gap-2 truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        <span>{user.name}</span> {/* Display only the user's name */}
                      </div>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <MdCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default UserList;
