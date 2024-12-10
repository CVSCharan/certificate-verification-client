import React, { useContext, useEffect, useState } from "react";
import "../styles/Landing.css";
import { ThemeContext } from "../context/ThemeContext";
import { ThemeSwitch } from "./ThemeSwitch";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import ViewCertificatesModal from "./ViewCertificatesModal";
import VerifyCertificatesModal from "./VerifyCertificateModal";

const Landing = () => {
  const { themeValue, handleThemeValue } = useContext(ThemeContext);
  const [placeholderIds, setPlaceholderIds] = useState("");
  const [viewCertModal, setViewCertModal] = useState(false);
  const [verifyCertId, setVerifyCertId] = useState("");
  const handleViewCertModalOpen = () => setViewCertModal(true);
  const handleViewCertModalClose = () => setViewCertModal(false);
  const [verifyCertModal, setVerifyCertModal] = useState(false);
  const handleVerifyCertModalOpen = (e) => {
    e.preventDefault();
    if (verifyCertId !== "") {
      setVerifyCertModal(true);
    }
  };
  const handleVerifyCertModalClose = () => {
    setVerifyCertModal(false);
    setVerifyCertId("");
  };

  const handleVerifyCertId = (e) => {
    if (e.target.value !== "") {
      setVerifyCertId(e.target.value);
    }
  };

  // Toggle theme handler
  const handleToggleTheme = () => {
    handleThemeValue(themeValue === "light" ? "dark" : "light");
  };

  const fetchCertificatesIdsFun = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/certificates/id-list`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const certList = await response.json(); // Await the JSON conversion
      console.log(certList);

      let tempArr = "";
      for (let i = 0; i < certList?.length; i++) {
        tempArr += certList[i]?.certificate_id;
        if (i < certList.length - 1) {
          tempArr += ", "; // Add comma only if it's not the last element
        }
      }

      console.log(tempArr);
      setPlaceholderIds(tempArr);
    } catch (err) {
      console.error("Error fetching Certificates:", err);
    }
  };

  useEffect(() => {
    fetchCertificatesIdsFun();
  }, []);

  return (
    <main id="Landing" className={`landing-main-container ${themeValue}`}>
      <h2 className="playwrite-gb-s-text landing-title">
        Welcome to Digital Certificate Platform!!
      </h2>
      <section id="Theme Switch" className="landing-theme-container">
        <ThemeSwitch
          checked={themeValue === "dark"}
          onChange={handleToggleTheme}
        />
      </section>
      <section
        id="Certificates"
        className="landing-certificates-main-container"
      >
        <div className="landing-certificates-sub-container">
          <button className={`quicksand-text classic-button ${themeValue}`}>
            <Link
              className={`quicksand-text ${themeValue}`}
              style={{ textDecoration: "none", color: "inherit" }}
              to="/add-certificate"
            >
              Add Certificate
            </Link>
          </button>
          <button
            onClick={handleViewCertModalOpen}
            className={`quicksand-text classic-button ${themeValue}`}
          >
            View Certificates
          </button>
        </div>
      </section>
      <section
        id="Verify Certificates"
        className="landing-verify-certificates-main-container"
      >
        <h2 className="playwrite-gb-s-text landing-title">
          Verify Certificates
        </h2>
        <form className="landing-verify-certificates-container">
          <label
            htmlFor="Certificate Number Label"
            className="quicksand-text landing-label"
          >
            Enter a Certificate Number
          </label>
          <input
            value={verifyCertId}
            id="Certificate Number Label"
            onChange={handleVerifyCertId}
            placeholder={`Eg: ${placeholderIds}`}
            type="text"
            required
            className={`quicksand-text landing-certificate-input ${themeValue}`}
          />
          <button
            type="submit"
            onClick={handleVerifyCertModalOpen}
            className={`cinzel-text landing-verify-btn ${themeValue}`}
          >
            Verify
          </button>
        </form>
      </section>
      {viewCertModal && (
        <ViewCertificatesModal
          open={viewCertModal}
          handleClose={handleViewCertModalClose}
        />
      )}
      {verifyCertModal && (
        <VerifyCertificatesModal
          open={verifyCertModal}
          handleClose={handleVerifyCertModalClose}
          certId={verifyCertId}
        />
      )}
      <Footer />
    </main>
  );
};

export default Landing;
