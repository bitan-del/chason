/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./App.tsx"
    ],
    theme: {
        extend: {
            colors: {
                background: '#050505',
                primary: '#ffffff',
                secondary: '#888888',
            },
            fontFamily: {
                serif: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
                sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
                ogg: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
                poppins: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
            },
            animation: {
                'bounce-slow': 'bounce 3s infinite',
                'width': 'width 1s ease-in-out forwards',
                'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'glow-pulse': 'glow-pulse 4s ease-in-out infinite',
            },
            keyframes: {
                width: {
                    '0%': { width: '0%' },
                    '100%': { width: '100%' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                'glow-pulse': {
                    '0%, 100%': {
                        boxShadow: '0 0 100px rgba(255, 255, 255, 0.15), 0 0 150px rgba(255, 255, 255, 0.08), inset 0 0 100px rgba(0,0,0,0.98), inset 0 -20px 60px rgba(0,0,0,0.85), inset 0 20px 60px rgba(0,0,0,0.7)'
                    },
                    '50%': {
                        boxShadow: '0 0 120px rgba(255, 255, 255, 0.25), 0 0 180px rgba(255, 255, 255, 0.15), inset 0 0 100px rgba(0,0,0,0.98), inset 0 -20px 60px rgba(0,0,0,0.85), inset 0 20px 60px rgba(0,0,0,0.7)'
                    },
                }
            }
        },
    },
    plugins: [],
}
