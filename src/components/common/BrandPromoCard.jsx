import Icon from "./Icon";
import "./BrandPromoCard.css";

// Small brand-presence card (sidebar footer / dashboard corner) — matches
// the reference design's tricolor-accented promo blocks. Decorative only,
// no external link (this prototype makes no claim to represent Indian
// Railways or any real operator).
export default function BrandPromoCard({ icon = "train", title, subtitle, arrow = false }) {
  return (
    <div className="rk-brand-promo">
      <span className="rk-brand-promo-icon">
        <Icon name={icon} size={18} />
      </span>
      <div className="rk-brand-promo-body">
        <p className="rk-brand-promo-title">{title}</p>
        {subtitle && <p className="rk-brand-promo-subtitle">{subtitle}</p>}
      </div>
      {arrow && <Icon name="chevronRight" size={16} className="rk-brand-promo-arrow" />}
      <span className="rk-brand-promo-accent" aria-hidden="true" />
    </div>
  );
}
