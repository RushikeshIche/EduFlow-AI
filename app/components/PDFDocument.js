"use client";
import { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica"
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    fontWeight: "bold",
    color: "#1a365d",
    textAlign: "center"
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 15,
    fontWeight: "bold",
    color: "#2d3748",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: 5
  },
  question: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "semibold"
  },
  option: {
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 5
  },
  correctOption: {
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 5,
    color: "#38a169",
    fontWeight: "bold"
  },
  notesContent: {
    fontSize: 12,
    lineHeight: 1.5,
    marginBottom: 20,
    whiteSpace: "pre-wrap"
  },
  qnaContainer: {
    marginBottom: 20,
    border: "1px solid #e2e8f0",
    padding: 15,
    borderRadius: 5
  }
});

const MyDocument = ({ notes, mcqs }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>EduFlow Study Materials</Text>
      
      {notes && (
        <View>
          <Text style={styles.sectionTitle}>Study Notes</Text>
          <Text style={styles.notesContent}>{notes.replace(/<[^>]*>/g, "")}</Text>
        </View>
      )}
      
      {mcqs && mcqs.length > 0 && (
        <View>
          <Text style={styles.sectionTitle}>Practice Questions ({mcqs.length})</Text>
          {mcqs.map((mcq, index) => (
            <View key={index} style={styles.qnaContainer} wrap={false}>
              <Text style={styles.question}>
                Question {index + 1}: {mcq.question}
              </Text>
              {mcq.options.map((option, i) => (
                <Text 
                  key={i} 
                  style={i === mcq.answer ? styles.correctOption : styles.option}
                >
                  {String.fromCharCode(97 + i)}. {option}
                  {i === mcq.answer && " (Correct Answer)"}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

export default function PDFDocument({ notes, mcqs }) {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="mt-6">
      <PDFDownloadLink
        document={<MyDocument notes={notes} mcqs={mcqs} />}
        fileName="eduflow-study-materials.pdf"
        onClick={() => setIsGenerating(true)}
      >
        {({ loading }) => (
          <button
            disabled={loading || isGenerating || (!notes && (!mcqs || mcqs.length === 0))}
            className={`px-4 py-2 rounded-md font-medium ${
              loading || isGenerating
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading || isGenerating ? "Generating PDF..." : "Export to PDF"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
}