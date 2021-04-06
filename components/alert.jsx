import styles from './alert.module.css';

export default function Alert({ children, type }) {
  return (
    <div
      className={`styles.${type}`}
    >
      {children}
    </div>
  );
}
