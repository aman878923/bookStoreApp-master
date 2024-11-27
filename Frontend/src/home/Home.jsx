import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
// import Freebook from "../components/Freebook";
import Footer from "../components/Footer";
import Course from "../components/Course";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      {/* <Freebook /> */}
      <div className=" min-h-screen">
        <Course/>
      </div>
      <Footer />
      
    </>
  );
}

export default Home;
