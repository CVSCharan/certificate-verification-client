import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import "../styles/ViewCertificatesModal.css";
import { ThemeContext } from "../context/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

export default function ViewCertificatesModal({ open, handleClose }) {
  const [currentCertificatesList, setCertificatesList] = useState([]);
  const { themeValue } = useContext(ThemeContext);

  const fetchCertificatesFun = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/certificates`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const certList = await response.json();
      console.log(certList);
      setCertificatesList(certList);
    } catch (err) {
      console.error("Error fetching Certificates:", err);
    }
  };

  useEffect(() => {
    fetchCertificatesFun();
  }, [open]);

  // Function to check if the certificate is valid or expired
  const getCertificateStatus = (validTill) => {
    const currentDate = new Date();
    const validTillDate = new Date(validTill);
    return currentDate <= validTillDate ? "Valid" : "Expired";
  };

  return (
    <Modal open={open} aria-labelledby="view-certificates-modal-title">
      <div className="view-certificates-main-container">
        <div className={`view-certificates-container ${themeValue}`}>
          <CloseIcon
            onClick={handleClose}
            className="view-certificates-close-icon"
          />
          <h2
            id="view-certificates-modal-title"
            className="playwrite-gb-s-text view-certificates-title"
          >
            Certificates!!
          </h2>
          <Divider
            sx={{
              width: "95%",
              borderColor: themeValue === "dark" ? "whitesmoke" : "#333",
              borderWidth: "1px",
              marginTop: "10px",
            }}
          />
          <div className="view-certificates-container-one">
            {currentCertificatesList.map((item) => (
              <div
                key={item.certificate_id}
                className={`view-certificates-card ${themeValue}`}
              >
                <h3 className="playwrite-gb-s-text view-certificates-card-title">
                  {item.certificate_name}
                </h3>
                <Divider
                  sx={{
                    width: "95%",
                    borderColor: themeValue === "dark" ? "whitesmoke" : "#333",
                    borderWidth: "0.3px",
                    marginTop: "7px",
                  }}
                />
                <div className="view-certificates-card-sub">
                  <div className="view-certificates-card-sub-group">
                    <h3 className="quicksand-text view-certificates-card-label">
                      Certificate Id
                    </h3>
                    <h3 className="quicksand-text view-certificates-card-value">
                      {item.certificate_id}
                    </h3>
                  </div>
                  <div className="view-certificates-card-sub-group">
                    <h3 className="quicksand-text view-certificates-card-label">
                      Holder's Name
                    </h3>
                    <h3 className="quicksand-text view-certificates-card-value">
                      {item.holder_name}
                    </h3>
                  </div>
                  <div className="view-certificates-card-sub-group">
                    <h3 className="quicksand-text view-certificates-card-label">
                      Valid Till
                    </h3>
                    <h3 className="quicksand-text view-certificates-card-value">
                      {item.valid_till}{" "}
                      <span
                        className={`certificate-status ${
                          getCertificateStatus(item.valid_till) === "Valid"
                            ? "valid-status"
                            : "expired-status"
                        }`}
                      >
                        ({getCertificateStatus(item.valid_till)})
                      </span>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}
