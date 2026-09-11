// Small hand-picked inline icon set (stroke-based, 24x24) so the app doesn't
// pull in an icon library just for ~20 glyphs. Add new names here only.
const PATHS = {
  home: "M3 11.5 12 4l9 7.5M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9",
  radar: "M12 12 20 6M12 3a9 9 0 1 0 9 9M12 3v9m0-6a6 6 0 1 0 6 6h-6",
  train: "M6 3h12a2 2 0 0 1 2 2v9a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2ZM4 17l-2 4m18-4 2 4M8 21h8M4 9h16M9 13h0m6 0h0",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9ZM13.7 21a2 2 0 0 1-3.4 0",
  mappin: "M12 21s7-6.4 7-12a7 7 0 1 0-14 0c0 5.6 7 12 7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3a7.9 7.9 0 0 0-.2-1.8l2-1.6-2-3.4-2.4 1a8 8 0 0 0-3-1.8L14 2h-4l-.4 2.4a8 8 0 0 0-3 1.8l-2.4-1-2 3.4 2 1.6A7.9 7.9 0 0 0 4 12c0 .6.1 1.2.2 1.8l-2 1.6 2 3.4 2.4-1a8 8 0 0 0 3 1.8L10 22h4l.4-2.4a8 8 0 0 0 3-1.8l2.4 1 2-3.4-2-1.6c.1-.6.2-1.2.2-1.8Z",
  search: "m21 21-4.3-4.3M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
  moon: "M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z",
  sun: "M12 3v2m0 14v2M4.2 4.2l1.4 1.4m12.8 12.8 1.4 1.4M3 12h2m14 0h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  chevronRight: "m9 18 6-6-6-6",
  chevronDown: "m6 9 6 6 6-6",
  refresh: "M21 12a9 9 0 1 1-3-6.7M21 3v5h-5",
  alertTriangle: "M10.3 3.9 1.8 18a1.5 1.5 0 0 0 1.3 2.3h17.8a1.5 1.5 0 0 0 1.3-2.3L13.7 3.9a1.5 1.5 0 0 0-2.6 0ZM12 9v4m0 4h.01",
  checkCircle: "M22 11.1V12a10 10 0 1 1-6-9.2M22 4 12 14.1l-3-3",
  xCircle: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM15 9l-6 6m0-6 6 6",
  zap: "M13 2 3 14h7l-1 8 10-12h-7l1-8Z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v5l3 3",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2m19 0v-2a4 4 0 0 0-3-3.9M15 3.1a4 4 0 0 1 0 7.8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  barChart: "M3 3v18h18M8 17V10m5 7V6m5 11v-4",
  layers: "m12 2 9 5-9 5-9-5 9-5Zm9 10-9 5-9-5m18 5-9 5-9-5",
  lifeBuoy: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM6.3 6.3l3.2 3.2m4.9 4.9 3.3 3.3M17.7 6.3l-3.2 3.2M9.5 14.5l-3.2 3.2",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  locate: "M12 2v3m0 14v3M2 12h3m14 0h3M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  gauge: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-6 4-6M4.9 19.1 8 16M19.1 19.1 16 16",
  route: "M4 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm16-14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 17c6 0 4-12 10-12M4 17h6M14 5h6",
  flag: "M5 21V4m0 0h11l-2 4 2 4H5",
  ticket: "M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z",
};

export default function Icon({ name, size = 18, strokeWidth = 2, className = "" }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}
