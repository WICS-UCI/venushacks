import "./globals.css";
import styles from "./not-found.module.css";

const NotFound = () => (
  <div className={styles["not-found"]}>
    <div className={styles["not-found-message"]}>
      <h1>404</h1>
      <h2>Not Found</h2>
      <span>Just empty space over here.</span>
    </div>
  </div>
);

export default NotFound;
