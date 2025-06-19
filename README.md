

# 📚 EduFlow AI+

**AI-powered learning assistant** for students and educators — generate clean notes and MCQs from PDFs or plain text.

Built with **Next.js App Router**, **Tailwind CSS**, and **OpenRouter AI (DeepSeek model)**.

---

## ✨ Features

- 📄 Upload PDFs or paste plain text
- 📝 AI-generated clean and concise notes
- ❓ Multiple Choice Questions (MCQs) with answer selection
- ✅ Answer correctness feedback
- 📤 Export notes and questions to PDF
- 🔐 User authentication (via NextAuth or Clerk – coming soon)

---

## 🧠 Powered By

- [Next.js (App Router)](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenRouter AI](https://openrouter.ai/) – using DeepSeek R1 0528 model
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) for text extraction
- [html2pdf.js](https://www.npmjs.com/package/html2pdf.js) for PDF export

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/eduflow-ai.git
cd eduflow-ai
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Get your API key from [OpenRouter.ai](https://openrouter.ai/).

### 4. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` to start using EduFlow AI+.

---

## 🗂️ Project Structure

```
/app
  /api
    /generateNotes
    /generateMCQ
    /parsePdf
  /components
    UploadPDF.js
    TextInput.js
    NoteDisplay.js
    MCQDisplay.js
    ExportPDF.js
  /dashboard (optional future route)
  page.js
/utils
  pdfParser.js
```

---

## 📦 Upcoming Features

* 🔐 Authentication with NextAuth or Clerk
* 💾 Save history to user dashboard
* 📊 Quiz scoring and analytics
* 🌍 Multi-language support

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

[MIT](LICENSE)

---

## 🙌 Acknowledgements

Thanks to:

* OpenAI & OpenRouter for powerful LLM APIs
* Vercel & Next.js for the web platform
* Tailwind Labs for amazing UI tools

---

## 🌐 Live Demo (Coming Soon)

Stay tuned!

