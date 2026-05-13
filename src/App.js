import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const correctText = async () => {
    try {
      const response = await fetch(
        "https://meet227-grammar-corrector.hf.space/correct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );

      const data = await response.json();

      // Set corrected text
      setResult(data.corrected);

      // Show popup notification
      if (data.notification) {
        alert(data.notification);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server connection failed!");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Grammar Correction Engine</h1>

      <textarea
        rows="5"
        cols="50"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />
      <br />

      <button onClick={correctText}>Correct</button>

      <h3>Output:</h3>
      <p>{result}</p>
    </div>
  );
}

export default App;
