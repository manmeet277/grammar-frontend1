import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const getCorrection = async () => {
    if (!text.trim()) {
      alert("Please provide some text to analyze.");
      return;
    }

    setResult("Processing...");

    try {
      const response = await fetch(
        "https://4b21-34-143-243-99.ngrok-free.app/", // 🔴 CHANGE THIS
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: text }),
        }
      );

      const data = await response.json();
      setResult(data.corrected);
    } catch (error) {
      setResult("Backend not reachable");
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">

        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-900 mb-2">
            LingoCorrect Engine
          </h1>
          <p className="text-gray-600 italic">
            Elevate your syntax with AI-driven precision.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">

          <div className="p-8 rounded-2xl shadow-xl bg-white">
            <h2 className="text-xl font-bold mb-4">Draft</h2>

            <textarea
              className="w-full h-64 p-4 border rounded-xl"
              placeholder="Enter your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <button
              onClick={getCorrection}
              className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl"
            >
              ANALYZE & REFINE
            </button>
          </div>

          <div className="p-8 rounded-2xl shadow-xl bg-white">
            <h2 className="text-xl font-bold mb-4">Refined Output</h2>

            <div className="h-64 p-4 bg-gray-100 rounded-xl">
              {result || "Waiting for input..."}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
