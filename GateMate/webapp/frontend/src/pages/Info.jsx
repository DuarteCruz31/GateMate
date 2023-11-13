import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

function Info() {
    return(
        <div className="flex flex-col min-h-screen">
            <div>
                <Navbar />
            </div>
            <div className="flex-1">
                <Card />
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}


export default Info;
