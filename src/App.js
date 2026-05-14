import { useState } from "react";
function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const correctText = async () => {
 
    // Frontend empty check
    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }
    // Frontend character limit
    if (text.length > 2000) {
      alert("Input exceeds 2000 character limit!");
      return;
    }
    setLoading(true);
    alert("Button clicked!");
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
      console.log(data);
      // Show corrected output
      setResult(data.corrected);
      // ALWAYS show popup
      if (data.notification) {
        alert(data.notification);
      }
    } catch (error) {
      console.error(error);
      alert(
        "Backend is unavailable or still starting."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: "40px" }}>
      <h1>Grammar Correction Engine</h1>
      <textarea
        rows="7"
        cols="60"
        placeholder="Enter text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <br />
      <button
        onClick={correctText}
        disabled={loading}
      >
        {loading ? "Correcting..." : "Correct"}
      </button>
      <h3>Output:</h3>
      <p>{result}</p>
    </div>
  );
}

export default App;
