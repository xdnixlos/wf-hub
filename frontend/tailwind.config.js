/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'wf-bg': '#0f172a',
                'wf-cyan': '#008B8B',
                'wf-purple': '#4B0082',
                'wf-red': '#FF4500',
            },
        },
    },
    plugins: [],
}
