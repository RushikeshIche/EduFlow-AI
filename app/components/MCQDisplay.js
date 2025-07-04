"use client";

export default function MCQDisplay({ mcqs = [] }) {
  console.log("Rendering MCQDisplay with mcqs:", mcqs); // Debug log

  if (!mcqs || mcqs.length === 0) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg my-4">
        <p className="text-yellow-800">
          No questions generated yet. Try generating with more detailed text.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Practice Questions ({mcqs.length})
      </h2>
      <div className="space-y-6">
        {mcqs.map((mcq, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg p-4 bg-white"
          >
            <h3 className="font-medium text-gray-800 mb-3">
              {index + 1}. {mcq.question}
            </h3>
            <ul className="space-y-2">
              {mcq.options.map((option, i) => (
                <li
                  key={i}
                  className={`pl-3 py-1 rounded ${
                    i === mcq.answer
                      ? "bg-green-50 text-green-700 font-medium border-l-4 border-green-500"
                      : "text-gray-700"
                  }`}
                >
                  {String.fromCharCode(97 + i)}. {option}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}