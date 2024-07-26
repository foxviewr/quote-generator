import React from 'react'

interface Props {
    name: string
    title: string
    type: string
    placeholder?: string
    autoComplete?: string
    required?: boolean
}

export default function Input({
                                  name,
                                  title,
                                  type,
                                  placeholder,
                                  autoComplete,
                                  required = false,
                              }: Props): React.JSX.Element {
    return (
        <label htmlFor={`${name}-input`}>
            <span className="sr-only">${title}</span>
            <input
                className="focus:ring-primary-600 w-72 rounded-md px-4 focus:border-transparent focus:outline-none focus:ring-2 dark:bg-black"
                id={`${name}-input`}
                name={name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
            />
        </label>
    )
}