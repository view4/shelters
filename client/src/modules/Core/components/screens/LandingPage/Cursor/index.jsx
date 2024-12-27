import useMouseLocation from "./useMouseLocation";
import styles from "./styles.module.scss"

const Cursor = () => {
  const { x, y } = useMouseLocation();
  return (
    <>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        className={styles.ring}
      ></div>
      <div
        className={styles.dot}
        style={{ left: `${x}px`, top: `${y}px` }}
      ></div>
    </>
  );
};

export default Cursor;