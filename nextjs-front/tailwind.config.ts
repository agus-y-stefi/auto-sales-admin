import type {Config} from "tailwindcss";
import {heroui} from "@heroui/react";
// import {nextui} from "@heroui/react";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
        },
    },
    plugins: [
        heroui({})],
} satisfies Config;