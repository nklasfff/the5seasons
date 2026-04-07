import heroImg from '../../assets/hero.jpeg';
import styles from './SeasonHero.module.css';

export default function SeasonHero() {
  return (
    <section className={`${styles.hero} animate-fade-up`}>
      <h1 className={styles.title}>De Fem Sæsoner</h1>
      <div className={styles.imageWrap}>
        <img src={heroImg} alt="De fem sæsoner — Træ, Ild, Jord, Metal, Vand" />
      </div>
    </section>
  );
}
