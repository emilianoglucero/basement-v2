import styles from "../../styles/Layout.module.css";
export const Layout = ({ children }) => {
  return <main className={styles.wrapper}>{children}</main>;
};
