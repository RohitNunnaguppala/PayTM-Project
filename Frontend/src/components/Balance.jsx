export const Balance = ({ value }) => {
    return (
        <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg shadow-sm">
            <div className="text-gray-700 font-semibold text-lg">
                Your Balance
            </div>
            <div className="text-green-600 font-bold text-xl">
                ₹ {value}
            </div>
        </div>
    );
};
