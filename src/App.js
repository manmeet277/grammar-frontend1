import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const correctText = async () => {
    const response = await fetch("https://1abb-8-229-232-174.ngrok-free.app/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    const data = await response.json();
    setResult(data.corrected);
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

      <br /><br />

      <button onClick={correctText}>Correct</button>

      <h3>Output:</h3>
      <p>{result}</p>
    </div>
  );
}

export default App;
