import "./States.css";

export function LoadingState({ label = "Loading…" }) {
  return (
    <div className="rk-state" role="status">
      <div className="rk-spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ title, detail }) {
  return (
    <div className="rk-state">
      <p className="rk-state-title">{title}</p>
      {detail && <p className="rk-state-detail">{detail}</p>}
    </div>
  );
}

export function ErrorState({ title = "Something went wrong", detail, onRetry }) {
  return (
    <div className="rk-state rk-state-error">
      <p className="rk-state-title">! {title}</p>
      {detail && <p className="rk-state-detail">{detail}</p>}
      {onRetry && (
        <button type="button" className="rk-btn" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export function DegradedNotice({ text }) {
  return <p className="rk-degraded-notice">ⓘ {text}</p>;
}
