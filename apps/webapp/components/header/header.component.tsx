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
    <header className="sticky top-0 z-10 bg-transparent navbar shadow-sm">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Jeldikk
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <ThemeSwitcher />
          </li>
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
