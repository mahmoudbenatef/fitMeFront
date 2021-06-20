import React from "react";
import videoBackground from "../../assets/video.mp4";
import "../../styles/video.css";
export default function Video({ children }) {
  return (
    <div id="videoContainer">
      <div className="overlay"></div>
      <video autoPlay loop muted>
        <source src={videoBackground} type="video/mp4" />
      </video>
      <div className="container h-100">
        <div className="row h-100 text-center align-items-center  ">
          <div className="w-100 text-white">
            <p className="paragraph">
              A well-built physique is a status symbol. It reflects you worked
              hard for it, no money can buy it, You cannot borrow it, you cannot
              inherit it, you cannot steal it, AND You cannot hold on to it
              without constant work. It shows discipline, self-respect,
              patience, work ethic, and passion.
              <br /> -Arnold Schwarzenegger
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
