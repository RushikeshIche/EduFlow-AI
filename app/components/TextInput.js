"use client";

export default function TextInput({ setText, disabled }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Or paste text directly
      </label>
      <textarea
        rows={6}
        className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          disabled ? "bg-gray-100" : "bg-white"
        }`}
        placeholder="Paste your text content here..."
        onChange={(e) => setText(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}