import Logo from '@/app/components/Logo';
import Link from 'next/link';
import { auth, signIn } from '@/auth';
import {
  CircleStackIcon,
  Cog8ToothIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
} from '@heroicons/react/24/solid';

export default async function Sidebar() {
  const session = await auth();

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen bg-indigo-600 dark:bg-gray-1000 transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="flex flex-col h-full">
          <Link href={'/dashboard'} className="mt-5 h-16 p-3 flex text-white">
            <Logo />
          </Link>
          <nav className="h-full px-3 py-4 overflow-y-auto">
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"
                >
                  <HomeIcon className="w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />

                  <span className="ms-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"
                >
                  <CircleStackIcon className="w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Models</span>
                  {/*<span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">*/}
                  {/*  Pro*/}
                  {/*</span>*/}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"
                >
                  <InboxIcon className="w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                  <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                    3
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"
                >
                  <UsersIcon className="w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                  <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex gap-x-3 w-full p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"
                >
                  <svg
                    className="flex-shrink-0 w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 20"
                  >
                    <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                  </svg>
                  Products
                </a>
              </li>
              {!session && (
                <form
                  action={async () => {
                    'use server';
                    await signIn('keycloak');
                  }}
                >
                  <button
                    type="submit"
                    className="flex gap-x-3 w-full p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"
                  >
                    <svg
                      className="flex-shrink-0 w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                      />
                    </svg>
                    Sign In
                  </button>
                </form>
              )}
              {/*{!!session && (*/}
              {/*  <form*/}
              {/*    action={async () => {*/}
              {/*      'use server';*/}
              {/*      await signOut();*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    <button*/}
              {/*      type="submit"*/}
              {/*      className="flex gap-x-3 w-full p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"*/}
              {/*    >*/}
              {/*      <svg*/}
              {/*        className="flex-shrink-0 w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"*/}
              {/*        aria-hidden="true"*/}
              {/*        xmlns="http://www.w3.org/2000/svg"*/}
              {/*        fill="none"*/}
              {/*        viewBox="0 0 18 16"*/}
              {/*      >*/}
              {/*        <path*/}
              {/*          stroke="currentColor"*/}
              {/*          strokeLinecap="round"*/}
              {/*          strokeLinejoin="round"*/}
              {/*          strokeWidth="2"*/}
              {/*          d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"*/}
              {/*        />*/}
              {/*      </svg>*/}
              {/*      Log out*/}
              {/*    </button>*/}
              {/*  </form>*/}
              {/*)}*/}
              <li>
                <a
                  href="#"
                  className="flex items-center p-2 text-indigo-200 rounded-lg dark:text-white hover:bg-indigo-700 dark:hover:bg-gray-700 group"
                >
                  <Cog8ToothIcon className="w-5 h-5 text-indigo-200 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white" />
                  <span className="ms-3">Settings</span>
                </a>
              </li>
            </ul>
            <div>
              <ul></ul>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
