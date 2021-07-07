import Image from "next/image";
import styles from "../../styles/MainDescription.module.css";
export const MainDescription = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.title}>Wmns Air Force 1 Crater</div>
      <div className={styles.description}>
        <p>
          Una nueva propuesta para el ícono, la Nike Air Force 1 Crater combina
          el estilo clásico del básquetbol con nuevos materiales recuperados.
        </p>
      </div>
      <div className={styles["actions-wrapper"]}>
        <div className={styles["see-more-wrapper"]}>
          <div>
            <Image
              src={"/images/ui/arrow-see-more.svg"}
              alt="Nike header logo"
              // layout="fill"
              width={70}
              height={10}
            />
          </div>
          <span>VER MÀS</span>
        </div>
        <div className={styles["buy-wrapper"]}>
          <div>
            <Image
              src={"/images/ui/arrow-buy.svg"}
              alt="Nike header logo"
              // layout="fill"
              width={55}
              height={10}
            />
          </div>
          <span className={styles.buy}>COMPRAR</span>
        </div>
      </div>
    </section>
  );
};
