import React from "react";
import "../../styles/footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="row justify-justify-content-between">
        <div className="col footer_about">
          <h3>Fit Me</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            aliquid, inventore veritatis, a beatae asperiores eveniet ex
            repudiandae voluptatibus tempora, optio nam harum temporibus
            tempore. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Nisi recusandae dolore molestiae quis iste.
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
