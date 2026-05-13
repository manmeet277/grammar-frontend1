import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const correctText = async () => {

    if (!text.trim()) {
      alert("Please enter some text!");
      return;
    }

    setLoading(true);

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

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      setResult(data.corrected);

      if (data.notification) {
        alert(data.notification);
      }

    } catch (error) {

      console.error(error);

      alert(
        "Backend is starting or unavailable. Please wait a few seconds and try again."
      );

    } finally {
      setLoading(false);
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

      <button onClick={correctText} disabled={loading}>
        {loading ? "Correcting..." : "Correct"}
      </button>

      <h3>Output:</h3>

      <p>{result}</p>
    </div>
  );
}

export default App;
