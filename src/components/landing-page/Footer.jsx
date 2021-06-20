import React from "react";
import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="row justify-justify-content-between">
        <div className="col footer_about">
          <h3>Fit Me</h3>
          <p>
            a radical journey of transformation in the first military themed
            residential boot camp in Egypt and the Middle East, where
            discipline, fun and adventure go hand in hand; where your excuses
            are handed over at the door and giving up is the only luxury we
            can’t afford. We will nourish your change plans, both short and long
            term, towards a different version of you. We train minds as well as
            bodies to walk the road to absolute self-mastery
          </p>
        </div>
        <div className="col justify-content-end footer_right">
          <h3>About Us</h3>
          <p>
            We are a team of software engineering students at ITI intake 41,
            Smart Village branch, Open-sourcetrack.
          </p>
        </div>
      </div>
      <div className="copyright ">Copyright © 2021 All Rights Reserved.</div>
    </footer>
  );
}
