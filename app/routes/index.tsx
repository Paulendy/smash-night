import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();
  return (
    <main className="relative min-h-screen bg-violet-200 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-white relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            {/* <div className="absolute inset-0"> */}
            <img
              className="h-full w-full p-6"
              src="https://upload.wikimedia.org/wikipedia/commons/9/96/Super_Smash_Bros._Ultimate_logo.svg"
              alt="Smesh"
            />
            {/* <div className="absolute inset-0 bg-[color:rgba(139,92,246,0.5)] mix-blend-multiply" /> */}
            {/* </div> */}
            <div className="lg:pb-8 relative px-4 pt-4 pb-4">
              <div className="mx-auto max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {user ? (
                  <Link
                    to="/sessions"
                    className="flex items-center justify-center rounded-md border border-transparent bg-violet-700 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-violet-500 sm:px-8"
                  >
                    Enter Smash as {user.email}
                  </Link>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    {/* <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-violet-700 shadow-sm hover:bg-violet-50 sm:px-8"
                    >
                      Sign up
                    </Link> */}
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-violet-500 px-4 py-3 font-medium text-white hover:bg-violet-600  "
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
