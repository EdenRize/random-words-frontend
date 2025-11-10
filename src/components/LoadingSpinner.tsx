interface LoadingSpinnerProps {
  message?: string;
}

function LoadingSpinner({ message = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-5" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

export default LoadingSpinner;