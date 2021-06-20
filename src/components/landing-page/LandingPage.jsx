import React from "react";
import "../../styles/landing-page.css";
import FooterComponent from "./Footer";
import NavBarComponent from "./NavBar";
import VideoComponent from "./Video";

export default function LandingPage() {
  return (
    <div id="parent">
      {" "}
      <NavBarComponent />
      <VideoComponent />
      <section className="first-section  row text-center align-content-center">
        <p className="paragraph1">
          {" "}
          <p className="paragraph2">
            We promise ruthlessness, sweat, tears and hard-earned
            transformation.
          </p>{" "}
          <p className="paragraph2">
            Here, you don’t throw in your sweaty towel; you don’t settle for
            medium;
          </p>
          <p className="paragraph2">
            {" "}
            you toughen up; you power through it; you endure, and eventually,
            you change.
          </p>
        </p>
      </section>
      <section
        className="second-section row align-items-center text-center
      "
      >
        <p className="paragraph1">
          “We’re not telling you it is going to be easy,
          <br /> we’re telling you it is going to be worth it.”
        </p>
      </section>
      <FooterComponent />
    </div>
  );
}
