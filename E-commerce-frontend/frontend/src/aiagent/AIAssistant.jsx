import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mic, Send, ShoppingBag, Bot, User } from "lucide-react";

export default function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const chatEndRef = useRef(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;

  const scrollToBottom = () =>
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = async (msg) => {
    if (!msg.trim()) return;
    const userMsg = { role: "user", content: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    try {
      const res = await axios.post("http://localhost:5454/api/ai/assistant", {
        message: msg,
      });
      const aiReply =
        res.data.reply || "Your smart shopping partner is on it! 🛍️";
      const aiMsg = { role: "assistant", content: aiReply };
      setMessages((prev) => [...prev, aiMsg]);

      const utter = new SpeechSynthesisUtterance(aiReply);
      utter.pitch = 1.05;
      synth.speak(utter);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! Something went wrong. Try again later.",
        },
      ]);
    }
  };

  const handleVoice = () => {
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recog = new SpeechRecognition();
    recog.lang = "en-IN";
    recog.onstart = () => setListening(true);
    recog.onresult = (event) => {
      const text = event.results[0][0].transcript;
      handleSend(text);
      setListening(false);
    };
    recog.onerror = () => setListening(false);
    recog.start();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden text-gray-800">
      {/* 🌌 Background Layer 1 — AI abstract image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-[0.85] contrast-[1.05]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1633419461186-7d41a4e31c9d?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      {/* 🪞 Background Layer 2 — Soft overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-300/60 via-pink-200/50 to-white/60 backdrop-blur-[3px]" />

      {/* 💫 Floating gradient lights */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-400/25 rounded-full blur-3xl animate-pulse delay-300"></div>

      {/* 🛍️ Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mt-12 z-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-pink-600 to-purple-700 rounded-2xl text-white shadow-lg">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 text-transparent bg-clip-text">
            AI Shopping Assistant
          </h1>
        </div>

        <p className="text-center text-gray-700 text-sm italic">
          “In the age of AI — being lazy is totally allowed 🛋️”
        </p>
        <p className="text-center text-gray-600 text-sm mb-4">
          Sit back, relax, and let me find your perfect style ✨
        </p>
      </motion.div>

      {/* 💬 Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-lg bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-5 flex flex-col"
      >
        <div className="h-[60vh] overflow-y-auto px-2 space-y-4 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-transparent">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.role === "assistant" && (
                <div className="p-2 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full text-white shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow-sm ${
                  m.role === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="p-2 bg-blue-500 rounded-full text-white shadow-md">
                  <User className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* 🗣️ Input Section */}
        <div className="mt-4 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask me to shop something for you..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleSend(input)}
            className="p-3 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600"
          >
            <Send className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleVoice}
            className={`p-3 rounded-full shadow-md transition-all ${
              listening
                ? "bg-pink-600 text-white animate-pulse"
                : "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
            }`}
          >
            <Mic className="w-5 h-5" />
          </motion.button>
        </div>

        {listening && (
          <p className="text-center text-sm text-gray-500 mt-2">
            🎙️ Listening... speak your style!
          </p>
        )}
      </motion.div>

      {/* ⚙️ Footer */}
      <footer className="text-xs text-gray-500 mt-6 z-10">
        Powered by{" "}
        <span className="font-semibold text-pink-600">Forever AI</span> 🤖
        &nbsp;|&nbsp;
        <span className="italic">Let your couch do the shopping.</span>
      </footer>
    </div>
  );
}
