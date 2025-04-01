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
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [
        heroui({
            themes: {
                light: {
                    colors: {
                        default: {
                            DEFAULT: "#f1f5f9", // Fondo neutro claro
                            foreground: "#1e293b", // Texto oscuro
                        },
                        primary: {
                            DEFAULT: "#004b8d", // Azul marino
                            foreground: "#ffffff", // Texto sobre azul
                        },
                        secondary: {
                            DEFAULT: "#4caf50", // Verde más elegante
                            foreground: "#ffffff", // Texto sobre verde
                        },
                        success: {
                            DEFAULT: "#16a34a", // Verde éxito
                            foreground: "#ffffff", // Texto sobre verde éxito
                        },
                        warning: {
                            DEFAULT: "#eab308", // Amarillo dorado
                            foreground: "#ffffff", // Texto sobre amarillo
                        },
                        danger: {
                            DEFAULT: "#dc2626", // Rojo peligro
                            foreground: "#ffffff", // Texto sobre rojo
                        },
                    },
                },
                dark: {
                    colors: {
                        default: {
                            DEFAULT: "#1e293b", // Fondo oscuro
                            foreground: "#f1f5f9", // Texto claro
                        },
                        primary: {
                            DEFAULT: "#4f83cc", // Azul claro
                            foreground: "#ffffff", // Texto sobre azul claro
                        },
                        secondary: {
                            DEFAULT: "#6bbf59", // Verde neutral
                            foreground: "#ffffff", // Texto sobre verde
                        },
                        success: {
                            DEFAULT: "#16a34a", // Verde éxito
                            foreground: "#ffffff", // Texto sobre verde éxito
                        },
                        warning: {
                            DEFAULT: "#fbbf24", // Amarillo alerta
                            foreground: "#000000", // Texto sobre amarillo
                        },
                        danger: {
                            DEFAULT: "#b91c1c", // Rojo peligro
                            foreground: "#ffffff", // Texto sobre rojo
                        },
                    },
                },

            },
        })],
} satisfies Config;