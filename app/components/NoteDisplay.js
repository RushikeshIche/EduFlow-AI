"use client";

export default function NoteDisplay({ notes }) {
  if (!notes) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Study Notes</h2>
      <div 
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: notes }} 
      />
    </div>
  );
}