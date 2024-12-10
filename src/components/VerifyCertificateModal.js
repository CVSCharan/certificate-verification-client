import React, { useContext, useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import "../styles/VerifyCertificatesModal.css";
import { ThemeContext } from "../context/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import Alert from "@mui/material/Alert";

export default function VerifyCertificatesModal({ open, handleClose, certId }) {
  const { themeValue } = useContext(ThemeContext);

  const [verifiedCertificate, setVerifiedCertificate] = useState(null);
  const [certificateStatus, setCertificateStatus] = useState(null); // "valid", "expired", "invalid"

  const fetchCertIdFun = async () => {
    if (certId) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BASE_URL}/certificates/verify/${certId}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const cert = await response.json();
        setVerifiedCertificate(cert.certificate);

        // Check the valid till date
        const currentDate = new Date();
        const validTillDate = new Date(cert.certificate.valid_till);

        if (currentDate <= validTillDate) {
          setCertificateStatus("valid");
        } else {
          setCertificateStatus("expired");
        }
      } catch (err) {
        console.error("Error fetching Certificates:", err);
        setCertificateStatus("invalid");
        setVerifiedCertificate(null);
      }
    }
  };

  useEffect(() => {
    fetchCertIdFun();
  }, [certId]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="verify-certificates-modal-title"
    >
      <div className="verify-certificates-main-container">
        <div className={`verify-certificates-container ${themeValue}`}>
          <CloseIcon
            onClick={handleClose}
            className="verify-certificates-close-icon"
          />
          <h2 className="playwrite-gb-s-text verify-certificates-title">
            Certificates Verification!!
          </h2>
          <Divider
            sx={{
              width: "95%",
              borderColor: themeValue === "dark" ? "whitesmoke" : "#333",
              borderWidth: "1px",
              marginTop: "10px",
            }}
          />

          {certificateStatus === "invalid" ? (
            <Alert
              severity="error"
              className="playwrite-gb-s-text verify-alert"
            >
              Invalid Certificate! Please check the ID and try again.
            </Alert>
          ) : verifiedCertificate ? (
            <>
              <div className="verify-certificates-container-one">
                <div className={`verify-certificates-card ${themeValue}`}>
                  <h3 className="playwrite-gb-s-text verify-certificates-card-title">
                    {verifiedCertificate.certificate_name}
                  </h3>
                  <Divider
                    sx={{
                      width: "95%",
                      borderColor:
                        themeValue === "dark" ? "whitesmoke" : "#333",
                      borderWidth: "0.3px",
                      marginTop: "7px",
                    }}
                  />
                  <div className="verify-certificates-card-sub">
                    <div className="verify-certificates-card-sub-group">
                      <h3 className="quicksand-text verify-certificates-card-label">
                        Certificate Id
                      </h3>
                      <h3 className="quicksand-text verify-certificates-card-value">
                        {verifiedCertificate.certificate_id}
                      </h3>
                    </div>
                    <div className="verify-certificates-card-sub-group">
                      <h3 className="quicksand-text verify-certificates-card-label">
                        Holder's Name
                      </h3>
                      <h3 className="quicksand-text verify-certificates-card-value">
                        {verifiedCertificate.holder_name}
                      </h3>
                    </div>
                    <div className="verify-certificates-card-sub-group">
                      <h3 className="quicksand-text verify-certificates-card-label">
                        Valid Till
                      </h3>
                      <h3 className="quicksand-text verify-certificates-card-value">
                        {verifiedCertificate.valid_till}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="verify-message-container">
                  {certificateStatus === "valid" && (
                    <Alert
                      severity="success"
                      className="playwrite-gb-s-text verify-alert"
                    >
                      Certificate is <strong>Valid</strong>.
                    </Alert>
                  )}
                  {certificateStatus === "expired" && (
                    <Alert
                      severity="warning"
                      className="playwrite-gb-s-text verify-alert"
                    >
                      Certificate has <strong>Expired</strong>.
                    </Alert>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </Modal>
  );
}
