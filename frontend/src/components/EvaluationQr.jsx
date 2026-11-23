import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function EvaluationQr() {
  const qrRef = useRef(null);
  const [status, setStatus] = useState("");
  const evaluationUrl = new URL("/evaluation", window.location.origin).href;

  const downloadQr = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (!canvas) {
      setStatus("The QR image couldn't be generated. Please reload the page and try again.");
      return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "centram-session-evaluation-qr.png";
    downloadLink.click();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(evaluationUrl);
      setStatus("Evaluation link copied.");
    } catch {
      setStatus("Copy isn't available in this browser. You can select and copy the link above.");
    }
  };

  return (
    <div className="evaluation-qr-card">
      <div className="evaluation-qr-code" ref={qrRef}>
        <QRCodeCanvas
          value={evaluationUrl}
          size={220}
          level="H"
          includeMargin
          title="QR code to open the Centram session evaluation form"
        />
      </div>
      <div className="evaluation-qr-details">
        <span className="eyebrow">SHARE THE FORM</span>
        <h3>Scan to leave feedback</h3>
        <p>Download this QR image to add to event slides, printed materials, email, or social media.</p>
        <label className="evaluation-url-label" htmlFor="evaluation-share-url">Evaluation form link</label>
        <input id="evaluation-share-url" className="evaluation-share-url" readOnly value={evaluationUrl} onFocus={(event) => event.target.select()} />
        <div className="evaluation-qr-actions">
          <button className="button primary" type="button" onClick={downloadQr}>Download QR image</button>
          <button className="button evaluation-copy-button" type="button" onClick={copyLink}>Copy link</button>
        </div>
        {status && <p className="evaluation-qr-status" role="status">{status}</p>}
      </div>
    </div>
  );
}
