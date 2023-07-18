import { Container } from "react-bootstrap";

import "./Dashboard.css";

import ActiveUsers from "./ActiveUsers";
import TopHunters from "./TopHunters";
import ActiveTreasures from "./ActiveTreasures";
import Map from "./Map";

function Dashboard() {
    return (
        <>
            <main>
                <Container>
                    <Map />
                    <ActiveUsers />
                    <TopHunters />
                    <ActiveTreasures />
                </Container>
            </main>
        </>
    );
}
export default Dashboard;
