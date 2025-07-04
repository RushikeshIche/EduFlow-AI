"use client";
import { useRef } from "react";
import { toast } from "sonner";

export default function ExportPDF({ notes, mcqs }) {
  const contentRef = useRef(null);

  const handleExport = async () => {
    if (!contentRef.current) {
      toast.error("No content to export");
      return;
    }

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      
      // Create a sanitized clone for PDF export
      const element = contentRef.current.cloneNode(true);
      
      // Remove all interactive elements
      element.querySelectorAll('button, [onclick]').forEach(el => el.remove());
      
      // Convert all colors to hex explicitly
      element.querySelectorAll('*').forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.color.includes('oklch')) {
          el.style.color = '#374151'; // Fallback to gray-700
        }
        if (styles.backgroundColor.includes('oklch')) {
          el.style.backgroundColor = '#ffffff'; // Fallback to white
        }
      });

      const opt = {
        margin: 10,
        filename: "eduflow-notes.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
          scale: 2,
          logging: true,
          useCORS: true
        },
        jsPDF: { 
          unit: "mm", 
          format: "a4", 
          orientation: "portrait" 
        }
      };

      toast.promise(
        html2pdf().set(opt).from(element).save(),
        {
          loading: 'Generating PDF...',
          success: 'PDF exported successfully!',
          error: 'Failed to export PDF'
        }
      );
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleExport}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Export to PDF
      </button>
      
      {/* Hidden printable content */}
      <div className="hidden">
        <div 
          ref={contentRef}
          id="pdf-content"
          className="p-8"
          style={{
            color: '#1f2937', // text-gray-800
            backgroundColor: '#ffffff' // bg-white
          }}
        >
          {notes && (
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4">Study Notes</h1>
              <div dangerouslySetInnerHTML={{ __html: notes }} />
            </div>
          )}
          
          {mcqs && mcqs.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Practice Questions</h2>
              <div className="space-y-4">
                {mcqs.map((mcq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-medium">{index + 1}. {mcq.question}</h3>
                    <ul className="mt-2 ml-4 space-y-1">
                      {mcq.options.map((option, i) => (
                        <li 
                          key={i} 
                          className={i === mcq.answer ? "text-green-600 font-medium" : ""}
                        >
                          {i === mcq.answer ? "✓ " : "• "}{option}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}