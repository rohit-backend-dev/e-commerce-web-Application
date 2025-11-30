import React, { useState } from "react";
import axios from "axios";

const FashionRecommendPage = () => {
  const [image, setImage] = useState(null);
  const [color, setColor] = useState("red");
  const [type, setType] = useState("t-shirt");
  const [skinTone, setSkinTone] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("color", color);
    formData.append("type", type);
    formData.append("skinTone", skinTone);

    setLoading(true);
    setError("");
    setResults([]);

    try {
      // ⚡ Use full backend URL
      const { data } = await axios.post("http://localhost:8080/api/recommendation/clothes", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data && data.results) {
        setResults(data.results);
      } else {
        setError("No results returned from backend.");
      }
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err.response?.data || "Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fashion Recommendation</h1>

      <div className="mb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="flex gap-4 mb-4">
        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
          <option value="black">Black</option>
          <option value="white">White</option>
        </select>

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="t-shirt">T-Shirt</option>
          <option value="shirt">Shirt</option>
          <option value="dress">Dress</option>
          <option value="pants">Pants</option>
        </select>

        <select value={skinTone} onChange={(e) => setSkinTone(e.target.value)}>
          <option value="">Any Skin Tone</option>
          <option value="fair">Fair</option>
          <option value="medium">Medium</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        disabled={loading}
      >
        {loading ? "Loading..." : "Get Recommendations"}
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {results.map((item, index) => (
          <div key={index} className="border p-2 rounded">
            <img
              src={item.urls?.small}
              alt={item.alt_description || "Cloth"}
              className="w-full h-48 object-cover rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FashionRecommendPage;
