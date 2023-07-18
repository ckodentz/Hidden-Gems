import { Button } from "react-bootstrap";
import "./Home.css";

import Footer from "../Footer/Footer";

function Home() {
    return (
        <main className="home">
            <div className="master-banner d-flex flex-column justify-content-center align-items-center">
                <h1 className="banner-text text-center text-white col-6">
                    Welcome to Hidden Gems
                </h1>
                <h2 className="text-center col-6 text-center text-white">
                    This is the perfect way to have fun, bond with loved ones,
                    and explore new places.
                </h2>
                <div className="d-flex gap-5 mt-3 ">
                    <Button>
                        <a
                            href="https://expo.dev/@incognizuu/hidden_gems_mobile?serviceType=classic&distribution=expo-go"
                            className="text-white text-decoration-none"
                        >
                            Download for Android
                        </a>
                    </Button>
                    <Button>
                        <a
                            href="https://expo.dev/@incognizuu/hidden_gems_mobile?serviceType=classic&distribution=expo-go"
                            className="text-white text-decoration-none"
                        >
                            Download for iOS
                        </a>
                    </Button>
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default Home;
