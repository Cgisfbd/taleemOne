import styles from "./backdrop.module.css";

export function SilkBackdrop() {
  return (
    <div className={styles.backdrop} aria-hidden="true">
      <div className={styles.amberLight} />
      <div className={styles.emeraldLight} />
      <div className={styles.centerGlow} />
      <svg className={styles.silk} viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <linearGradient id="silk-emerald" x1="0" y1="900" x2="1000" y2="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#093833" stopOpacity=".38" />
            <stop offset="50%" stopColor="#0D3B38" stopOpacity=".22" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="silk-gold" x1="1440" y1="0" x2="620" y2="700" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#D97706" stopOpacity=".28" />
            <stop offset="45%" stopColor="#F59E0B" stopOpacity=".16" />
            <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M-180 310C40 540 190 1090 760 910s480-560 910-400" stroke="url(#silk-emerald)" strokeWidth="140" />
        <path d="M-180 310C40 540 190 1090 760 910s480-560 910-400" stroke="#FFFFFF" strokeOpacity=".65" strokeWidth="1.5" />
        <path d="M-210 390C20 620 200 1170 820 950s460-490 900-310" stroke="url(#silk-emerald)" strokeWidth="80" />
        <path d="M360-210C670 70 710 380 1120 290s320-270 570-20" stroke="url(#silk-gold)" strokeWidth="180" />
        <path d="M350-260C660 50 720 330 1110 250s330-270 580-20" stroke="#F59E0B" strokeOpacity=".35" strokeWidth="1.5" />
      </svg>
      <div className={styles.vignette} />
    </div>
  );
}
