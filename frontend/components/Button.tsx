import React, { MouseEventHandler, ReactNode, useState } from 'react'

interface Props {
    loading: boolean
    text: string
    onClick?: () => void
}

export default function Button({ loading, text, onClick }: Props): React.JSX.Element {
    return (
        <button
            className="bg-primary-500 w-72 h-10 rounded-md py-2 px-4 font-medium text-white hover:bg-primary-700 dark:hover:bg-primary-400 focus:ring-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-black"
            type="submit"
            disabled={loading}
            onClick={onClick}
        >
            {!loading && text}
            {(loading) && (
                <div className="flex space-x-2 justify-center items-center">
                    <span className="sr-only">Loading...</span>
                    <div
                        className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div
                        className="h-2 w-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
                </div>
            )}
        </button>
    )
}