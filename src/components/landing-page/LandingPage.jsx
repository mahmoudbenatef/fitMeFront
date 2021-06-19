import React from "react";
import "../../styles/landing-page.css";
import FooterComponent from "./Footer";
import NavBarComponent from "./NavBar";
export default function LandingPage() {
  return (
    <div id="parent">
      {" "}
      <NavBarComponent />
      <section className="row video align-content-center text-center">
        <p>This will be the video</p>
      </section>
      <section className="first-section  row text-center align-content-center">
        <p>This will be the first section with some information</p>
      </section>
      <section className="second-section">
        <p>
          This will be the second section with no idea about the details right
          now
        </p>
      </section>
      <FooterComponent />
    </div>
  );
}
