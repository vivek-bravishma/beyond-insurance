import React from "react";

const About = () => {
  return (
    <>
      <section className="feature-one">
        <img
          src="assets/images/shapes/feature-shape-1-1.png"
          alt=""
          className="feature-one__shape-1"
        />
        <img
          src="assets/images/shapes/feature-shape-1-2.png"
          alt=""
          className="feature-one__shape-2"
        />
        <img
          src="assets/images/shapes/feature-shape-1-3.png"
          alt=""
          className="feature-one__shape-3"
        />
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="block-title text-left">
                <p>Get to Know About</p>
                <h2>Flexible and Quick Insurance Policies</h2>
              </div>
            </div>
            <div className="col-lg-6">
              {/* <p className="block-text">
                There are many variations of passages of available but the
                majority have suffered alteration in some form, by injected
                humou or randomised words which don't look even slightly
                believable.
              </p> */}
              <p className="block-text">
              Explore our website to learn more about our flexible and quick insurance policies. We provide detailed information about our coverage options, including features, benefits, and pricing. You can also request a personalized quote online or contact us directly for further assistance. Protecting what matters most to you has never been easier with our flexible and quick insurance solutions.


              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="feature-one__box">
                <i className="pylon-icon-assets"></i>
                <p>Insure Your Family and Property</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-one__box">
                <i className="pylon-icon-verification"></i>
                <p>100% Reliable</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature-one__box">
                <i className="pylon-icon-finance"></i>
                <p>Fast Claim Processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
