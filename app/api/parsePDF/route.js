import pdfParse from 'pdf-parse';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return Response.json({
        error: "No file uploaded",
        success: false
      }, {
        status: 400
      });
    }

    // More robust file type checking
    const allowedTypes = ['application/pdf', 'application/octet-stream'];
    if (!allowedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.pdf')) {
      return Response.json({
        error: "Only PDF files are allowed",
        success: false
      }, {
        status: 400
      });
    }

    // File size limit (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({
        error: "File size exceeds 5MB limit",
        success: false
      }, {
        status: 400
      });
    }

    const arrayBuffer = await file.arrayBuffer();
    const data = await pdfParse(arrayBuffer).catch(error => {
      throw new Error(`PDF parsing failed: ${error.message}`);
    });

    if (!data.text || data.text.trim().length < 10) {
      return Response.json({
        error: "PDF contains no extractable text",
        success: false
      }, {
        status: 400
      });
    }

    return Response.json({
      success: true,
      text: data.text
    }, {
      status: 200
    });

  } catch (error) {
    console.error("PDF parsing error:", error);
    return Response.json({
      success: false,
      error: error.message || "Failed to process PDF"
    }, {
      status: 500
    });
  }
}