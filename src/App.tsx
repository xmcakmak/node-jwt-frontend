import Login from "./Login"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from "./Signup"
import Home from "./Home"
import { GlobalProvider } from "./GlobalState"


function App() {
	return (
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/home' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
	)
}

export default App
