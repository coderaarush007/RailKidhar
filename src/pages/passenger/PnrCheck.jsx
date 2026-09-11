import { useState } from "react";
import Icon from "../../components/common/Icon";
import StatusBadge from "../../components/common/StatusBadge";
import { DegradedNotice } from "../../components/common/States";
import mockTrains from "../../data/mockTrains";
import "./PnrCheck.css";

// No real PNR service is connected in this prototype — submitting any
// 10-digit number returns one illustrative mock result, clearly labelled,
// rather than pretending to look anything up.
function mockResultFor(pnr) {
  const train = mockTrains[Number(pnr[pnr.length - 1] || 0) % mockTrains.length];
  return {
    pnr,
    train,
    class: "3A",
    quota: "GENERAL",
    coach: "B4",
    seat: "34, Middle",
    bookingStatus: "CNF",
    currentStatus: "CNF",
    chartStatus: "Chart not prepared",
  };
}

export default function PnrCheck() {
  const [pnr, setPnr] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const trimmed = pnr.trim();
    if (!/^\d{10}$/.test(trimmed)) {
      setError("Enter a 10-digit PNR number.");
      setResult(null);
      return;
    }
    setError("");
    setResult(mockResultFor(trimmed));
  };

  return (
    <div className="rk-pnr-page">
      <div className="rk-card rk-pnr-card">
        <p className="rk-section-title">PNR Check</p>
        <p className="rk-section-subtitle">Illustrative demo only — not connected to a real PNR service.</p>

        <form className="rk-pnr-form" onSubmit={submit}>
          <Icon name="ticket" size={16} />
          <input
            value={pnr}
            onChange={(e) => setPnr(e.target.value)}
            placeholder="Enter 10-digit PNR"
            inputMode="numeric"
            maxLength={10}
            aria-label="PNR number"
          />
          <button type="submit" className="rk-btn rk-btn-primary">
            Check Status
          </button>
        </form>
        {error && <p className="rk-pnr-error">{error}</p>}
      </div>

      {result && (
        <div className="rk-card rk-pnr-result">
          <DegradedNotice text="Demo data — not a real booking lookup." />
          <div className="rk-pnr-result-head">
            <div>
              <p className="rk-pnr-train">
                {result.train.number} {result.train.name}
              </p>
              <p className="rk-pnr-route">
                {result.train.origin} → {result.train.destination}
              </p>
            </div>
            <StatusBadge status="on-time" label={result.bookingStatus} />
          </div>
          <dl className="rk-pnr-grid">
            <div><dt>PNR</dt><dd>{result.pnr}</dd></div>
            <div><dt>Class</dt><dd>{result.class}</dd></div>
            <div><dt>Quota</dt><dd>{result.quota}</dd></div>
            <div><dt>Coach / Seat</dt><dd>{result.coach} / {result.seat}</dd></div>
            <div><dt>Current Status</dt><dd>{result.currentStatus}</dd></div>
            <div><dt>Chart Status</dt><dd>{result.chartStatus}</dd></div>
          </dl>
        </div>
      )}
    </div>
  );
}
