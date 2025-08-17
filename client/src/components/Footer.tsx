import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div
        style={{
          width: "100%",
          padding: 20,
          minHeight: "20vh",
          maxHeight: "30vh",
          marginTop: 50,
        }}
      >
        <p style={{ fontSize: "30px", textAlign: "center" }}>
          Built With All Dessired
          <span>
            <Link
              className="nav-link"
              to={"https://my-portfolio-rho-jet-25.vercel.app/"}
            >
              Nghia Tin
            </Link>
          </span>
          Intern Full Stack
        </p>
      </div>
    </footer>
  );
}

export default Footer;
