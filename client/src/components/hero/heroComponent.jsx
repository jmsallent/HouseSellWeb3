import React from "react";
import "./heroComponent.css";
export const HeroComponent = () => {
  return (
    <section>
      <header id="header">
        <section className="px-5 py-6 py-xxl-10 hcf-bp-center hcf-bs-cover hcf-overlay hcf-transform">
          <div className="container">
            <div className="row justify-content-md-center">
              <div className="col-12 col-md-11 col-lg-9 col-xl-7 col-xxl-6 text-center text-white">
                <h1 className="display-3 fw-bold mb-3">
                  Search it. Explore it. Buy it.
                </h1>

                <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </section>
  );
};
