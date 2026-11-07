import Navbar from "./Navbar";
import "./About.css";

function About() {
  return (
    <div className="about-page">
<Navbar />
      <section className="about-hero">
        <span>ABOUT CAREVIA</span>
        <h1>Caring For You, <br />Every Step of the Way.</h1>
        <p>
          We believe everyone deserves simple, accessible
          and reliable healthcare.
        </p>
      </section>

      <section className="about-content">

        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make healthcare services easier
            to access through a simple and user-friendly platform.
          </p>
        </div>

        <div className="about-card">
          <h2>Our Vision</h2>
          <p>
            We aim to create a future where everyone can
            connect with healthcare professionals conveniently.
          </p>
        </div>

      </section>

      <section className="about-values">
        <h2>Why CareVia?</h2>
        <p>
          Your health matters to us. We focus on convenience,
          simplicity and patient-centred care.
        </p>
      </section>

    </div>
  );
}

export default About;