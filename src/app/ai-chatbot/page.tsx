"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, User, Sparkles, RotateCcw, Copy, Check } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const quickQuestions = [
  "How much loan can I get for USA?",
  "What documents are required?",
  "Is collateral mandatory?",
  "What's the interest rate?",
  "How long does approval take?",
  "Can I get a loan without co-applicant?",
];

async function callAI(messages: { role: string; content: string }[]): Promise<string> {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 1000,
        system: `You are KlassFin's AI education loan assistant. KlassFin is India's leading education loan marketplace for students going abroad to study. 

Your role is to help Indian students understand education loans for studying abroad. You know:
- Loan amounts: up to ₹2 Crore (secured), up to ₹50-75 Lakh (unsecured/no collateral)
- Interest rates: 8.5%-14% per annum depending on lender and collateral
- Partner banks: HDFC Credila, IDFC First Bank, Axis Bank, Yes Bank, Union Bank, Bank of Baroda, InCred, Avanse, Prodigy Finance, MPower Financing
- Countries covered: USA, UK, Canada, Germany, Australia, Ireland, France, Italy, New Zealand, Singapore and more
- KlassFin service is 100% free for students
- Documents needed: Admission letter, mark sheets, income proof, bank statements, property docs (if collateral)
- Tax benefit: Interest deductible under Section 80E
- Repayment typically starts 6-12 months after course completion (moratorium period)

Be helpful, friendly, and concise. Always encourage students to contact KlassFin for personalized assistance. 
Phone: +91-76782-50373, Email: contact@klassfin.com`,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || "I couldn't process that. Please try again.";
  } catch (error) {
    return "I'm having trouble connecting right now. Please contact us directly at +91-76782-50373 or contact@klassfin.com";
  }
}

function MessageBubble({ message }: { message: Message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const copyText = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"} group`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${
          isUser
            ? "bg-gradient-to-br from-sky-400 to-purple-500"
            : "glass border border-sky-400/20"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-white" />
        ) : (
          <Bot className="w-4 h-4 text-sky-400" />
        )}
      </div>

      {/* Message */}
      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed relative ${
            isUser
              ? "bg-gradient-to-br from-sky-400 to-sky-500 text-white"
              : "glass border border-sky-400/10 text-slate-200"
          }`}
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          {message.content}

          {/* Copy button */}
          {!isUser && (
            <button
              onClick={copyText}
              className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 glass rounded-lg flex items-center justify-center"
            >
              {copied ? (
                <Check className="w-3 h-3 text-green-400" />
              ) : (
                <Copy className="w-3 h-3 text-slate-400" />
              )}
            </button>
          )}
        </div>
        <span
          className="text-slate-600 text-xs px-1"
          style={{ fontFamily: "JetBrains Mono, monospace" }}
        >
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex gap-3"
    >
      <div className="w-9 h-9 rounded-xl glass border border-sky-400/20 flex items-center justify-center">
        <Bot className="w-4 h-4 text-sky-400" />
      </div>
      <div className="glass rounded-2xl px-4 py-3 border border-sky-400/10 flex items-center gap-1.5">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-sky-400"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function AIChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "👋 Hi! I'm KlassFin's AI Assistant. I can help you with:\n\n• Education loan eligibility & amounts\n• Interest rates from our bank partners\n• Document requirements\n• Country-specific loan options\n\nWhat would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendMessage = async (text?: string) => {
    const content = text || input.trim();
    if (!content || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    const history = [...messages, userMessage]
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    const response = await callAI(history.length ? history : [{ role: "user", content }]);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "👋 Hi! I'm KlassFin's AI Assistant. How can I help you today?",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col">
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 glass rounded-2xl px-6 py-3 mb-4 border border-sky-400/20">
            <div className="relative">
              <Bot className="w-6 h-6 text-sky-400" />
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border border-[#0A0F1E]" />
            </div>
            <span className="font-semibold text-white" style={{ fontFamily: "Syne, sans-serif" }}>
              KlassFin AI Assistant
            </span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <p
            className="text-slate-400 text-sm"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Powered by Claude AI · Available 24/7 · Ask anything about education loans
          </p>
        </motion.div>

        {/* Chat window */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex-1 glass rounded-3xl flex flex-col overflow-hidden border border-sky-400/10"
          style={{ minHeight: "500px" }}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300" style={{ fontFamily: "DM Sans, sans-serif" }}>
                Online · Usually replies instantly
              </span>
            </div>
            <button
              onClick={resetChat}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-slate-400 hover:text-sky-400 glass transition-all"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isLoading && <TypingIndicator />}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Quick questions */}
          <div className="px-6 pb-3 flex flex-wrap gap-2">
            {quickQuestions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={isLoading}
                className="px-3 py-1.5 rounded-full text-xs glass border border-sky-400/15 text-sky-400 hover:bg-sky-400/10 transition-all disabled:opacity-50"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 pb-6">
            <div className="flex gap-3 items-end">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about education loans, eligibility, interest rates..."
                  rows={1}
                  className="input-brand resize-none pr-12 min-h-[50px] max-h-[120px]"
                  style={{ fontFamily: "DM Sans, sans-serif" }}
                />
              </div>
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-400 to-purple-500 flex items-center justify-center disabled:opacity-40 flex-shrink-0"
              >
                <Send className="w-5 h-5 text-white" />
              </motion.button>
            </div>
            <p
              className="text-slate-600 text-xs mt-2 text-center"
              style={{ fontFamily: "JetBrains Mono, monospace" }}
            >
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
