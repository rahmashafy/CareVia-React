import Navbar from "./Navbar";
import "./Home.css"; 
function Home() {
  return (
    <div className="home-page">

     
      {/* Navigation Bar */}
<Navbar />

      {/* Hero Section */}
      <section className="hero" id="home">

        <div className="hero-content">
          <span className="hero-label">YOUR HEALTH, OUR PRIORITY</span>

          <h1>
            Care That <br />
            <span>Comes First.</span>
          </h1>

          <p>
            Your journey to better healthcare starts here.
            Discover a simpler way to connect with healthcare
            professionals and manage your appointments.
          </p>

          <button className="primary-button">
            Book an Appointment →
          </button>
        </div>

        <div className="hero-image">
          <img
  src="doctors.png"
  alt="CareVia Female and Male Doctors"
/>
        
        </div>
    

      </section>

      {/* Services Section */}
      <section className="services" id="services">

        <div className="section-heading">
          <span>OUR SERVICES</span>
          <h2>Healthcare Made Simple</h2>
          <p>Everything you need for a better healthcare experience.</p>
        </div>

        <div className="service-cards">

          <div className="service-card">
            <h3>🩺 Doctor Consultation</h3>
            <p>Connect with healthcare professionals for your needs.</p>
          </div>

          <div className="service-card">
            <h3>📅 Easy Appointments</h3>
            <p>Request appointments with a simple booking experience.</p>
          </div>

          <div className="service-card">
            <h3>💙 Patient Care</h3>
            <p>Make your healthcare journey easier and more convenient.</p>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <h2>Why Choose CareVia?</h2>
        <p>
          We believe healthcare should be simple, accessible,
          and centred around you.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <h2>CareVia</h2>
        <p>Your health. Our priority.</p>
        <p>© 2026 CareVia. All Rights Reserved.</p>
      </footer>

    </div>
    
  );
}

export default Home;