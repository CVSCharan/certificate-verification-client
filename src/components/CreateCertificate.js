import React, { useState, useContext } from "react";
import "../styles/CreateCertificate.css";
import { ThemeContext } from "../context/ThemeContext";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Link } from "react-router-dom";

const AddCertificate = () => {
  const { themeValue } = useContext(ThemeContext);

  // State for form inputs
  const [certificateName, setCertificateName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [createdOn, setCreatedOn] = useState("");
  const [validTill, setValidTill] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to control Snackbar visibility
  const [severity, setSeverity] = useState("success"); // State for Snackbar severity

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message

    const certificateData = {
      certificate_name: certificateName,
      holder_name: holderName,
      created_on: createdOn,
      valid_till: validTill,
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/certificates`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(certificateData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSeverity("success");
        setMessage(
          `Success: ${data.message}, Certificate ID: ${data.certificate_id}`
        );
        // Clear form fields
        setCertificateName("");
        setHolderName("");
        setCreatedOn("");
        setValidTill("");
      } else {
        setSeverity("error");
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setSeverity("error");
      setMessage("Failed to submit the certificate. Please try again.");
    }

    setSnackbarOpen(true); // Show the Snackbar
  };

  // Handle Snackbar close
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <section className={`add-certificates-main-container ${themeValue}`}>
      <h2 className="playwrite-gb-s-text add-certificates-title">
        New Certificate!!
      </h2>

      <Link to="/" className="add-certificates-back-btn">
        Back to Home
      </Link>

      <form className="add-certificates-form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label
            className="quicksand-text form-label"
            htmlFor="Certificate Name"
          >
            Certificate Name
          </label>
          <input
            placeholder="Enter Certificate Name"
            id="Certificate Name"
            className={`quicksand-text form-input ${themeValue}`}
            type="text"
            value={certificateName}
            onChange={(e) => setCertificateName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="quicksand-text form-label" htmlFor="Holder Name">
            Holder Name
          </label>
          <input
            placeholder="Enter Certificate Holder's Name"
            id="Holder Name"
            className={`quicksand-text form-input ${themeValue}`}
            type="text"
            value={holderName}
            onChange={(e) => setHolderName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="quicksand-text form-label" htmlFor="Created On">
            Created On
          </label>
          <input
            placeholder="dd/mm/yy"
            id="Created On"
            className={`quicksand-text form-input ${themeValue}`}
            type="date"
            value={createdOn}
            onChange={(e) => setCreatedOn(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="quicksand-text form-label" htmlFor="Valid Till">
            Valid Till
          </label>
          <input
            placeholder="dd/mm/yy"
            id="Valid Till"
            className={`quicksand-text form-input ${themeValue}`}
            type="date"
            value={validTill}
            onChange={(e) => setValidTill(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`classic-button add-certificate-btn ${themeValue}`}
        >
          Add Certificate
        </button>
      </form>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000} // Auto-close after 5 seconds
        onClose={handleSnackbarClose}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={severity} // 'success' or 'error'
        >
          {message}
        </MuiAlert>
      </Snackbar>
    </section>
  );
};

export default AddCertificate;
