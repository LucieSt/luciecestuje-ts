import "./App.sass";
// import CloudinarySetup from "./cloudinarySetup";
// import FirebaseSetup from "./firebaseSetup";
import Navigation from "./components/navigation";
import Footer from "./components/footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./scrollToTop";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      {/* <CloudinarySetup /> */}
      <Navigation />
      <div className="wrap-container">
        <Outlet />
      </div>
      {/* <FirebaseSetup /> */}
      <Footer />
    </div>
  );
}

export default App;
