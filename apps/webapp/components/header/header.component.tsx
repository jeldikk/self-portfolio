"use client";

import { selectAuthDetails, selectIsAdmin } from "@/redux/auth/auth.selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logOutUser } from "@/redux/auth/auth.slice";
import Link from "next/link";
import ThemeSwitcher from "../theme-switcher/theme-switcher.component";

export default function Header() {
  const authDetails = useAppSelector(selectAuthDetails);
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();

  return (
    <header className="drawer">
      <input
        id="navbar-drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="navbar-drawer-toggle"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <Link className="btn btn-ghost text-xl" href="/">
              Jeldikk
            </Link>
          </div>
          <div className="flex-none">
            {/* Here is the Navbar Items */}
            <ul className="menu menu-horizontal">
              <li>
                <ThemeSwitcher />
              </li>
              <li className="hidden lg:block">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="hidden lg:block">
                <Link href={"/admin"}>Admin</Link>
              </li>

              {authDetails && isAdmin ? (
                <button
                  className="btn btn-sm btn-link font-bold hidden lg:block"
                  onClick={() => dispatch(logOutUser())}
                >
                  Logout
                </button>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="navbar-drawer-toggle"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/admin"}>Admin</Link>
          </li>

          {authDetails && isAdmin ? (
            <button
              className="btn btn-sm btn-link font-bold"
              onClick={() => dispatch(logOutUser())}
            >
              Logout
            </button>
          ) : null}
        </ul>
      </div>
    </header>
  );
}
