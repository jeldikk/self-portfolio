"use client";

import { selectAuthDetails, selectIsAdmin } from "@/redux/auth/auth.selectors";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { logOutUser } from "@/redux/auth/auth.slice";
import Link from "next/link";

export default function Header() {
  const authDetails = useAppSelector(selectAuthDetails);
  const isAdmin = useAppSelector(selectIsAdmin);
  const dispatch = useAppDispatch();
  console.log({ authDetails, isAdmin });
  return (
    <header className="navbar shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Jeldikk</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/admin"}>Admin</Link>
          </li>
          {authDetails && isAdmin ? (
            <button
              className="btn btn-secondary btn-sm"
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
