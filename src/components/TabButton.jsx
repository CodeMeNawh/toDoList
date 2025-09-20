export default function TabButton({ children, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-all duration-150 text-xs ${className}`}
    >
      {children}
    </button>
  );
}
