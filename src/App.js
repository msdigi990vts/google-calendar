import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CookiesProvider } from 'react-cookie'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <CookiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/events" element={<Home />} />
                        <Route path="/" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </CookiesProvider>
        </QueryClientProvider>
    )
}

export default App
