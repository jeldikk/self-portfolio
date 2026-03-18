"use client";

import Link from "next/link";

export default function Header() {
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
        </ul>
      </div>
    </header>
  );
}
