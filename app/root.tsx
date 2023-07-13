import type {
  LinksFunction,
  LoaderArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import { getUser } from "./session.server";
import { useUser } from "./utils";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return { title: "Smash Night" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export async function loader({ request }: LoaderArgs) {
  return json({
    user: await getUser(request),
  });
}

function Header() {
  const [showSidebar, setShowSidebar] = useState(false)

  const user = useUser();
  return (
    <>
      <div className={`transform top-0 left-0 w-64 bg-slate-700 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30 p-6 ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}>
        <div
          className="CROSS-ICON z-50 absolute"
          onClick={() => setShowSidebar(!showSidebar)} // change isNavOpen state to false to close the menu
        >
          <svg
            className="h-8 w-8 text-gray-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
        <h2 className="mt-20 text-4xl font-semibold text-white">I am a sidebar</h2>
      </div>
      <header className=" bg-slate-800 p-4 text-white">
        {/* <div className="z-50 w-[40px] h-[40px]"> */}
        {/* {showSidebar ? (
            <div
              className="CROSS-ICON z-50 absolute"
              onClick={() => setShowSidebar(!showSidebar)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          ) : ( */}
        <div>
          <div
            className="HAMBURGER-ICON space-y-2 w-8 block"
            onClick={() => setShowSidebar(!showSidebar)} // toggle isNavOpen state on click
          >
            <span className="block h-1 w-8 animate-pulse bg-gray-300"></span>
            <span className="block h-1 w-8 animate-pulse bg-gray-300"></span>
            <span className="block h-1 w-8 animate-pulse bg-gray-300"></span>
          </div>

          {/*// <svg
            //   onClick={() => setShowSidebar(!showSidebar)}
            //   className="z-30 items-center cursor-pointer"
            //   fill="#2563EB"
            //   viewBox="0 0 100 80"
            //   width="40"
            //   height="40"
            // >
            //   <rect width="100" height="10"></rect>
            //   <rect y="30" width="100" height="10"></rect>
            //   <rect y="60" width="100" height="10"></rect>
            // </svg>
          // )}
        // </div>*/}
          <div className="flex items-center justify-between ml-10">
            <h1 className="text-3xl font-bold">
              <Link to=".">Smash Night</Link>
            </h1>
            <p>{user.email}</p>
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600"
              >
                Logout
              </button>
            </Form>
          </div>
        </div>
      </header>
    </>
  );
}


export default function App() {


  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

