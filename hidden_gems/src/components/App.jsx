import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// -------- COMPONENTS --------
import Home from "./Home/Home";
import About from "./About/About";
import ContactUs from "./ContactUs/ContactUs";
import LogIn from "./LogIn/LogIn";
import Dashboard from "./Dashboard/Dashboard";
import NavbarComp from "./Navbar/Navbar";
import { AuthProvider } from "./auth";
import { RequireAuth } from "./RequireAuth";
// -------- CSS --------
import "./App.css";

function App() {
    return (
        <AuthProvider>
            <Router>
                <NavbarComp />
                <Routes>
                    <Route exact path="/" element={<Home />}></Route>
                    <Route exact path="/about" element={<About />}></Route>
                    <Route
                        exact
                        path="/contactus"
                        element={<ContactUs />}
                    ></Route>
                    <Route exact path="/login" element={<LogIn />}></Route>
                    <Route
                        exact
                        path="/dashboard"
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    ></Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
