# Resume Analyzer - Setup Guide

A professional resume analyzer with AI-powered ATS optimization, built with React frontend and Node.js backend.

## 🌟 Features

- **AI-Powered Analysis**: Uses Google Gemini AI for intelligent resume scoring
- **ATS Optimization**: Identifies missing keywords and provides actionable suggestions
- **File Support**: PDF and DOCX resume uploads with drag-and-drop interface
- **Job Matching**: Optional job description input for targeted analysis
- **Beautiful UI**: Modern design with blue-green color scheme
- **Real-time Results**: Instant analysis with detailed scoring and recommendations

## 🚀 Backend Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

### Installation

1. **Create backend directory and setup**
```bash
mkdir resume-analyzer-backend
cd resume-analyzer-backend
npm init -y
```

2. **Install dependencies**
```bash
npm install express cors multer pdf-parse mammoth dotenv @google/generative-ai
```

3. **Create the backend server**
Create `server.js` with the provided backend code.

4. **Environment Setup**
Create `.env` file:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
PORT=5001
```

5. **Get Google Gemini API Key**
- Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a new API key
- Add it to your `.env` file

6. **Start the backend**
```bash
node server.js
```

The backend will run on `http://127.0.0.1:5001`

## 🎨 Frontend Setup (Already Done)

The frontend is already built and configured in this Lovable project with:

- **React + TypeScript**: Modern web development stack
- **Tailwind CSS**: Utility-first styling with custom design system
- **shadcn/ui**: High-quality UI components
- **Responsive Design**: Works on all devices
- **Error Handling**: Comprehensive error boundaries and user feedback

## 🔧 Backend Code

Create `server.js` in your backend directory:

```javascript
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
require('dotenv').config(); 
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 5001;

// Middlewares
app.use(cors());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Google Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// Text Extraction Logic
async function extractText(file) {
    const buffer = file.buffer;
    const extension = file.originalname.split('.').pop().toLowerCase();

    if (extension === 'pdf') {
        const data = await pdfParse(buffer);
        return data.text;
    } else if (extension === 'docx') {
        const data = await mammoth.extractRawText({ buffer });
        return data.value;
    } else {
        throw new Error('Unsupported file format. Please use .pdf or .docx');
    }
}

// Main API Endpoint
app.post('/analyze', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file provided.' });
        }

        const jobDescription = req.body.job_description || '';
        const resumeText = await extractText(req.file);

        let prompt;

        if (jobDescription) {
            prompt = \`
                Act as an ATS (Applicant Tracking System) and professional resume analyst. You will compare my resume against the provided Job Description and critically evaluate Application Tracking System alignment, keyword optimization, and hiring impact.

                Your output must be ONLY a valid JSON object in this format:
                {
                "score": "string", 
                "missing_keywords": ["string"], 
                "suggestions": ["string", "string"]
                }

                Instructions:
                1. **score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider formatting, keyword richness, sectioning, and clarity.
                2. **missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or underemphasized.
                3. **suggestions** → Provide actionable improvements to make my resume more ATS-friendly.

                
                --- JOB DESCRIPTION ---
                \${jobDescription}

                --- RESUME TEXT ---
                \${resumeText}
            \`;
        } else {
            prompt = \`
                Act as an ATS (Applicant Tracking System) and professional resume analyst. You will critically evaluate my resume for ATS compatibility, formatting, keyword optimization, and overall hiring impact even without a specific job description.  

                Your output must be ONLY a valid JSON object in this format:
                {
                "score": "string", 
                "missing_keywords": ["string"], 
                "suggestions": ["string", "string"]
                }

                Instructions:
                1. **Score** → Provide an ATS Score (0–100%) based on how well my resume is optimized for applicant tracking systems and recruiter readability. Consider keyword density, formatting, sectioning, readability, and overall relevance for general software/engineering roles.
                2. **Missing_keywords** → Identify critical technical and professional keywords that are generally expected in competitive resumes for my field but are missing or not emphasized enough.
                3. **Suggestions** → Provide actionable suggestions on how to improve my resume to make it more ATS-friendly and recruiter-ready.

                ---

                --- RESUME TEXT ---
                \${resumeText}
            \`;
        }

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponseText = response.text();
        
        let analysisResult;
        try {
            const cleanedText = aiResponseText.replace(/\`\`\`json/g, "").replace(/\`\`\`/g, "").trim();
            analysisResult = JSON.parse(cleanedText);
        } catch(e) {
            console.error("Error parsing AI response:", aiResponseText);
            throw new Error("The AI response was not in the expected JSON format.");
        }

        res.json({
            score: analysisResult.score,
            missing_keywords: analysisResult.missing_keywords,
            suggestions: analysisResult.suggestions,
            parsed: {
                extracted_text_length: resumeText.length,
            }
        });

    } catch (error) {
        console.error("Error during API analysis:", error);
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'Resume Analyzer API is running!', version: '1.0.0' });
});

// Start The Server
app.listen(port, () => {
    console.log(\`✅ Resume Analyzer API is running on http://127.0.0.1:\${port}\`);
});
```

## 🎯 How to Use

1. **Start the backend server** (see Backend Setup above)
2. **Open the frontend** (already running in Lovable)
3. **Upload a resume** (PDF or DOCX format)
4. **Optionally add job description** for targeted analysis
5. **Click "Analyze Resume"** to get AI-powered insights
6. **Review results**: ATS score, missing keywords, and improvement suggestions

## 🎨 Design System

The frontend uses a beautiful blue-green color palette:
- **Primary Blue**: #0EA5E9 (vibrant blue)
- **Secondary Green**: #10B981 (teal green)  
- **Accent Cyan**: #06B6D4 (cyan accent)
- **Background**: Clean white with subtle gradients
- **Responsive**: Works perfectly on mobile and desktop

## 🔧 Technical Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** with custom design system
- **shadcn/ui** components
- **Lucide React** icons
- **React Query** for API state management

### Backend
- **Node.js** with Express
- **Multer** for file uploads
- **PDF-Parse** for PDF text extraction
- **Mammoth** for DOCX processing
- **Google Gemini AI** for intelligent analysis
- **CORS** enabled for cross-origin requests

## 🚀 Deployment Tips

1. **Backend**: Deploy to services like Railway, Render, or Heroku
2. **Frontend**: Already deployable via Lovable's publish feature
3. **Environment Variables**: Make sure to set GEMINI_API_KEY in production
4. **CORS**: Update CORS settings for your production domain

## 📝 API Endpoints

- `POST /analyze` - Main resume analysis endpoint
- `GET /` - Health check endpoint

## 🔒 Security Notes

- API keys are properly secured via environment variables
- File uploads are validated for type and size
- Error handling prevents sensitive information leakage
- CORS is configured for secure cross-origin requests