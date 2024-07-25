'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'

const UserIcon = () => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="group:hover:text-gray-100 h-6 w-6">
        <circle cx="12" cy="8" r="4"></circle>
        <path d="M20 19v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6Z"></path>
    </svg>
)

const UserHeaderButton = () => {
    const session = useSession()

    return (
        <div className="mr-5 flex items-center">
            <Menu as="div" className="relative inline-block text-left">
                <div className="flex items-center justify-center hover:text-primary-500 dark:hover:text-primary-400">
                <Menu.Button>
                        <UserIcon />
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
                    <Menu.Items
                        className="absolute right-0 z-50 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
                        <div className="p-3">
                            <Menu.Item>
                                <div
                                    className="group flex flex-col w-full items-left px-2 py-2 text-sm border-b border-gray-100 mb-2">
                                    <div className="flex-auto">
                                        <strong>{session.data?.user?.name}</strong>
                                    </div>
                                    <div className="flex-auto">
                                        <small>{session.data?.user?.email}</small>
                                    </div>
                                </div>
                            </Menu.Item>
                            <Menu.Item>
                            {({ focus }) => (
                                    <button
                                        onClick={() => signOut()}
                                        className={`${
                                            focus && 'bg-primary-600 text-white'
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                    >
                                        Logout
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}

export default UserHeaderButton
