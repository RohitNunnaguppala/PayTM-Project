export function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 
                 focus:outline-none focus:ring-2 focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 transition-all"
    >
      {label}
    </button>
  );
}
