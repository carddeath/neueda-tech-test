import styles from "./page.module.css";
import PriceDisplay from "./components/priceDisplay/priceDisplay";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}></main>
      <PriceDisplay />
    </div>
  );
}
