"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function UploadPDF({ setText, disabled }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  setIsProcessing(true);
  const toastId = toast.loading("Processing PDF...");

  try {
    console.log("Selected file:", file.name, file.type, file.size); // Debug log

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/parsePdf", {
      method: "POST",
      body: formData,
    });

    console.log("Response status:", response.status); // Debug log

    // First check response status
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error("Error response:", errorData); // Debug log
      } catch (jsonError) {
        console.error("Failed to parse error response:", jsonError);
        const text = await response.text();
        throw new Error(`Server error: ${response.status} - ${text}`);
      }
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Parsed data:", data); // Debug log

    if (!data.success) {
      throw new Error(data.error || "PDF processing failed (success=false)");
    }

    setText(data.text);
    toast.success("PDF processed successfully!", { id: toastId });
  } catch (error) {
    console.error("Full error details:", {
      error: error.message,
      stack: error.stack,
      name: error.name
    });
    toast.error(error.message || "Failed to process PDF", { id: toastId });
  } finally {
    setIsProcessing(false);
    e.target.value = "";
  }
};

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Upload PDF
      </label>
      <input
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileUpload}
        disabled={disabled || isProcessing}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
}