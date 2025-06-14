'use client';

import {useEffect} from 'react';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);

    }, [error]);

    return (
        <main className="flex flex-1 h-full flex-col items-center justify-center">
            <h2 className="text-center">Something Went Wrong</h2>
            <h3 className="text-center text-default-500">{error.message}</h3>
            <button
                className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                onClick={
                    // Attempt to recover by trying to re-render the invoices route
                    () => reset()
                }
            >
                Try again
            </button>
        </main>
    );
}