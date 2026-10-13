"use client";

import Image from "next/image";
import { BRAND } from "@/shared/config/brand";
import styles from "./splash.module.css";

export function BrandReveal() {
  return (
    <section className={styles.brand} aria-labelledby="brand-title">
      <div className={styles.brandContent}>
        <div className={styles.emblem}>
          {/* Subtle breathing golden halo behind crest */}
          <div className={styles.haloGlow} aria-hidden="true" />

          {/* Stationary SVG: Groups rotate cleanly in-place around center (180px 180px) */}
          <svg className={styles.orbits} viewBox="0 0 360 360" fill="none" aria-hidden="true">
            {/* Outer Slow Clockwise Rotating Ring with Traces and Diamonds */}
            <g className={styles.outerOrbitGroup}>
              <circle className={styles.outerOrbit} cx="180" cy="180" r="170" />
              <path className={styles.orbitTrace} d="M180 10a170 170 0 0 1 170 170" />
              <path className={styles.orbitTrace} d="M180 350A170 170 0 0 1 10 180" />
              <path className={styles.orbitDiamond} d="m180 4 6 6-6 6-6-6zM174 350l6-6 6 6-6 6z" />
              <circle cx="10" cy="180" r="2.5" fill="currentColor" />
              <circle cx="350" cy="180" r="2.5" fill="currentColor" />
            </g>

            {/* Inner Counter-Rotating Dashed Orbit */}
            <g className={styles.innerOrbitGroup}>
              <circle className={styles.innerOrbit} cx="180" cy="180" r="148" />
            </g>
          </svg>

          {/* Centerpiece Crest (Locked Dead Center, untouched background) */}
          <div className={styles.crestReveal}>
            <Image
              src={BRAND.crest}
              alt="taleemOne emerald and gold crest"
              width={1254}
              height={1254}
              className={styles.crest}
              sizes="(max-width: 600px) 174px, 214px"
              priority
            />
            <span className={styles.crestSheen} aria-hidden="true">
              <Image
                src={BRAND.crest}
                alt=""
                width={1254}
                height={1254}
                className={styles.crest}
                sizes="(max-width: 600px) 174px, 214px"
              />
            </span>
          </div>

          <span className={styles.sparkOne} aria-hidden="true" />
          <span className={styles.sparkTwo} aria-hidden="true" />
        </div>

        <div className={styles.wordmark}>
          <h1 id="brand-title" className={styles.title} aria-label={BRAND.fullName}>
            <span className={styles.titleTaleem}>taleem</span>
            <span className={styles.titleOne}>One</span>
          </h1>
          <div className={styles.product} aria-hidden="true">
            <span /><p>{BRAND.product}</p><span />
          </div>
        </div>

        <div className={styles.signatureLine} aria-hidden="true">
          <span />
        </div>
      </div>
    </section>
  );
}
