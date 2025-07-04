"use client";

import { useState } from "react";
import UploadPDF from "./components/UploadPDF";
import TextInput from "./components/TextInput";
import NoteDisplay from "./components/NoteDisplay";
import MCQDisplay from "./components/MCQDisplay";
import PDFDocument from "./components/PDFDocument";
import { Toaster, toast } from "sonner";

export default function Home() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [mcqs, setMcqs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
  if (!text.trim()) {
    toast.error("Please enter or upload text content first");
    return;
  }

  setIsLoading(true);
  const toastId = toast.loading("Generating content...");

  try {
    // Debug: Log before API call
    console.log("Starting generation with text:", text);

    const [notesRes, mcqsRes] = await Promise.all([
      fetch("/api/generateNotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }),
      fetch("/api/generateMCQ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      }),
    ]);

    // Debug: Log raw responses
    console.log("Notes response:", notesRes);
    console.log("MCQs response:", mcqsRes);

    if (!notesRes.ok || !mcqsRes.ok) {
      const notesErr = await notesRes.json().catch(() => ({}));
      const mcqsErr = await mcqsRes.json().catch(() => ({}));
      throw new Error(notesErr.error || mcqsErr.error || "Generation failed");
    }

    const [notesData, mcqsData] = await Promise.all([
      notesRes.json(),
      mcqsRes.json(),
    ]);

    // Debug: Log parsed data
    console.log("Notes data:", notesData);
    console.log("MCQs data:", mcqsData);

    setNotes(notesData.result || "");
    setMcqs(mcqsData.result || []);

    // Debug: Log state after update
    console.log("State after update - notes:", notesData.result);
    console.log("State after update - mcqs:", mcqsData.result);

    toast.success("Content generated successfully!", { id: toastId });
  } catch (error) {
    console.error("Generation error:", error);
    toast.error(error.message || "Failed to generate content", { id: toastId });
    setNotes("");
    setMcqs([]);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <main className="min-h-screen max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">EduFlow AI+</h1>
      
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <UploadPDF setText={setText} disabled={isLoading} />
        <TextInput setText={setText} disabled={isLoading} />
        
        <button
          onClick={handleGenerate}
          disabled={isLoading || !text.trim()}
          className={`w-full mt-4 py-2 px-4 rounded-md text-white font-medium ${
            isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } ${!text.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Generating..." : "Generate Notes & MCQs"}
        </button>
      </div>

      {(notes || mcqs.length > 0) && (
        <div className="bg-white rounded-xl shadow p-6">
          <NoteDisplay notes={notes} />
          <MCQDisplay mcqs={mcqs} />
          <PDFDocument notes={notes} mcqs={mcqs} />
        </div>
      )}

      <Toaster position="top-center" />
    </main>
  );
}