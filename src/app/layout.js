import { Inter } from 'next/font/google'
import AuthProvider from './AuthProvider'
import ThemeRegistry from './components/ThemeRegistry'
import NavBar from './components/NavBar'

const inter = Inter({ subsets: ['latin'] })
const COMPANY_NAME = 'CodeNotes'
const DOMAIN = 'http://localhost:3000'

/*export const metadata = {
    title: COMPANY_NAME,
}*/

export default function RootLayout(props) {
    const { children } = props
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <ThemeRegistry options={{ key: 'mui' }}>
                        {children}
                    </ThemeRegistry>
                </AuthProvider>
            </body>
        </html>
    )
}
