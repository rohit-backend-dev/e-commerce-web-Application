import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const CHATBOT_ICON = "/chatbot.png";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (message = null) => {
    const trimmedInput = (message || input).trim();
    if (!trimmedInput) return;

    const newMessages = [...messages, { role: "user", content: trimmedInput }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/chat",
        { message: trimmedInput },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;
      setIsTyping(false);

      if (data.quickActions && data.quickActions.length > 0) {
        setMessages([...newMessages, { role: "bot", content: data.reply, actions: data.quickActions }]);
      } else {
        setMessages([...newMessages, { role: "bot", content: data.reply }]);
      }
    } catch (err) {
      console.error(err);
      setIsTyping(false);
      setMessages([...newMessages, { role: "bot", content: "Error: Could not get response." }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!open) {
    return (
      <div
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
          zIndex: 1000,
          cursor: "pointer",
          borderRadius: "50%",
          background: "#fff",
          padding: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}
        onClick={() => setOpen(true)}
        title="Open Assistant"
      >
        <img src={CHATBOT_ICON} alt="Chatbot" style={{ width: "56px", height: "56px" }} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        width: "380px",
        fontFamily: "Arial, sans-serif",
        zIndex: 1000,
        borderRadius: "16px",
        boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#4f46e5",
          color: "white",
          padding: "16px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={CHATBOT_ICON} alt="Assistant" style={{ width: "34px", height: "34px", marginRight: "12px" }} />
          <span style={{ fontWeight: "bold" }}>Shop Assistant</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          style={{ background: "transparent", border: "none", color: "white", fontSize: "1.25rem", cursor: "pointer" }}
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: "12px", overflowY: "auto", maxHeight: "380px", background: "#f9f9f9" }}>
        {messages.length === 0 && (
          <div style={{ textAlign: "center", color: "#aaa", marginTop: "80px" }}>
            Hi! I am your Shop Assistant. How can I help you today?
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left", margin: "10px 0" }}>
            {msg.actions ? (
              <div>
                <div style={{ padding: "8px 12px", borderRadius: "16px", backgroundColor: "#e5e7eb", display: "inline-block" }}>
                  {msg.content}
                </div>
                <div style={{ marginTop: "6px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {msg.actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => sendMessage(action)} // send action immediately
                      style={{
                        padding: "6px 10px",
                        borderRadius: "12px",
                        border: "none",
                        background: "#4f46e5",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: "16px",
                  display: "inline-block",
                  backgroundColor: msg.role === "user" ? "#4f46e5" : "#e5e7eb",
                  color: msg.role === "user" ? "#fff" : "#000",
                  maxWidth: "80%",
                }}
              >
                {msg.content}
              </div>
            )}
          </div>
        ))}
        {isTyping && <div style={{ color: "#888", fontStyle: "italic" }}>Assistant is typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", padding: "10px", background: "#fff", borderTop: "1px solid #ddd" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your query..."
          style={{ flex: 1, padding: "10px", borderRadius: "18px", border: "1px solid #ccc", outline: "none" }}
        />
        <button
          onClick={() => sendMessage()}
          disabled={!input.trim()}
          style={{
            marginLeft: "8px",
            borderRadius: "18px",
            border: "none",
            background: "#4f46e5",
            color: "#fff",
            padding: "10px 16px",
            cursor: input.trim() ? "pointer" : "not-allowed",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
