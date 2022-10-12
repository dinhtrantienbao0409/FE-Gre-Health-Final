import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Dialog from "components/HomePage/Dialog";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CustomDropdown() {
  const navigate = useNavigate();
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });
  const loggedInUser = useSelector((state) => state.auth.email);
  const userId = useSelector((state) => state.auth.id);
  console.log(
    "🚀 ~ file: CustomDropdown.js ~ line 14 ~ CustomDropdown ~ userId",
    userId
  );

  const handleNavigate = () => {
    navigate("/profile");
  };

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleLogout = () => {
    handleDialog(
      `You are going to Logout of your account ${loggedInUser}! Do you like to continue?`,
      true
    );
  };

  const confirmLogout = (choose) => {
    if (choose) {
      localStorage.removeItem("access_token");
      navigate("/login");
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  return (
    <div className="flex flex-row">
      <img
        className="inline-block h-8 w-8 rounded-full ring-2 ring-white"
        src="https://static.vecteezy.com/system/resources/previews/001/840/618/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
        alt=""
      />
      <Menu as="div" className="relative  text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium text-white shadow-sm  focus:outline-none ">
            {loggedInUser}
            <ChevronDownIcon
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to="profile"
                    onClick={() => handleNavigate()}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                    data-id={userId}
                  >
                    Profile
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to=""
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Health Record
                  </Link>
                )}
              </Menu.Item>

              {/* <form method="POST" action="#"> */}
              <Menu.Item>
                {({ active }) => (
                  <button
                    // type="submit"
                    onClick={handleLogout}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
              {/* </form> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {dialog.isLoading && (
        <Dialog
          //Update
          onDialog={confirmLogout}
          message={dialog.message}
        />
      )}
    </div>
  );
}
