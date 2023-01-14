import React from "react";
import logo from "../../assets/logo.svg";
import "./headerComponent.css";
export const HeaderComponent = () => {
  return (
    <div className="header-dark">
      <nav className="navbar navbar-dark navbar-expand-md navigation-clean-search">
        <div className="container">
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navcol-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navcol-1">
            <ul className="nav navbar-nav">
              <li className="nav-item" role="presentation">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
            </ul>
            <a className="navbar-brand" href="#">
              <img src={logo} className="img-fluid" alt="" />
            </a>
            <form className="form-inline mr-auto" target="_self">
              <div className="form-group">
                <label htmlFor="search-field">
                  <i className="fa fa-search"></i>
                </label>
                <input
                  className="form-control search-field"
                  type="search"
                  name="search"
                  id="search-field"
                />
              </div>
            </form>
            <div className="mr-auto">
              <a
                className="btn btn-primary action-button"
                role="button"
                href="#"
              >
                Connect Wallet
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
