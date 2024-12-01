import { useEffect } from "react";
import Header from "./component/header/Header";
import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./component/footer/Footer";
import BasicModal from "./component/modal/Modal";
function App() {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((postion) => {
      console.log(postion);
    });
  }, []);

  return (
    <>
      <BasicModal />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
