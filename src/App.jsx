import { useEffect, useState } from "react";

function App() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [isPrime, setIsPrime] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const checkEvenOdd = (value) => {
    const num = parseInt(value);
    if (isNaN(num)) {
      setResult("");
      setIsPrime("");
      setExtraInfo("");
      return;
    }

    // Even or Odd
    setResult(num % 2 === 0 ? "Even" : "Odd");

    // Prime or Composite
    if (num < 2) {
      setIsPrime("Neither Prime nor Composite");
    } else {
      let prime = true;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          prime = false;
          break;
        }
      }
      setIsPrime(prime ? "Prime" : "Composite");
    }

    // Extra Info
    const info = [];
    if (num === 0) info.push("Zero");
    if (num < 0) info.push("Negative");
    if (num > 0) info.push("Positive");
    if (Math.sqrt(num) % 1 === 0) info.push("Perfect Square");
    setExtraInfo(info.join(", "));
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    checkEvenOdd(value);
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        theme === "light"
          ? "bg-gradient-to-br from-blue-100 to-purple-200"
          : "bg-gray-900"
      } p-4`}
    >
      <div
        className={`shadow-lg rounded-2xl p-8 max-w-md w-full text-center transition duration-300 ${
          theme === "light"
            ? "bg-white text-gray-800"
            : "bg-gray-800 text-white"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">🔢 Number Analyzer</h1>
          <button
            onClick={toggleTheme}
            className="px-3 py-1 text-sm rounded-md font-medium transition-all bg-purple-500 text-white hover:bg-purple-600"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </div>

        <input
          type="number"
          value={number}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          placeholder="Enter a number"
        />

        {result && (
          <div className="text-left space-y-3">
            <p>
              ✅ <span className="font-semibold">Even/Odd:</span>{" "}
              <span
                className={`font-bold ${
                  result === "Even" ? "text-green-500" : "text-red-500"
                }`}
              >
                {result}
              </span>
            </p>
            <p>
              🔍 <span className="font-semibold">Prime Check:</span>{" "}
              <span className="font-bold text-blue-500">{isPrime}</span>
            </p>
            {extraInfo && (
              <p>
                ℹ️ <span className="font-semibold">Other Info:</span>{" "}
                <span className="italic">{extraInfo}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
