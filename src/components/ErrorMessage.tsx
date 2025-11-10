interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="text-center text-red-600">
      {message && <p className="mb-4">{message}</p>}
      <button
        onClick={onRetry}
        className="px-5 py-2.5 bg-blue-500 text-white border-none rounded cursor-pointer hover:bg-blue-600 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;
