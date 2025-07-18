import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className={styles.errorMessage}>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Попробовать ещё раз</button>}
    </div>
  );
};

export default ErrorMessage;
