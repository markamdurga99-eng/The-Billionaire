import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Server-side Gemini initialization
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Business Guru Custom Roadmap Generator
app.post('/api/ai/guru', async (req, res) => {
  try {
    const {
      dailyIncome,
      currentJob,
      education,
      location,
      capital,
      timePerDay,
      skills,
      businessTypeInterest,
    } = req.body;

    const prompt = `
आप "Zero to Crorepati" के विश्वस्तरीय बिजनेस गुरु और वित्तीय सलाहकार हैं।
उपयोगकर्ता की प्रोफाइल:
- वर्तमान दैनिक कमाई: ₹${dailyIncome || '200'}
- वर्तमान कार्य: ${currentJob || 'दैनिक मजदूर / छोटा काम'}
- शिक्षा: ${education || 'बुनियादी / 8वीं / 10वीं'}
- राज्य/शहर/गांव: ${location || 'भारत का ग्रामीण / अर्ध-शहरी क्षेत्र'}
- उपलब्ध शुरुआती पूंजी: ₹${capital || '500-1000'}
- प्रतिदिन उपलब्ध समय: ${timePerDay || '2-4 घंटे'}
- मौजूदा कौशल/हुनर: ${skills || 'मेहनत, बुनियादी हिसाब, बात करना'}
- किस प्रकार का व्यापार करना चाहते हैं: ${businessTypeInterest || 'कम लागत वाला लाभकारी व्यापार'}

कृपया इस सामान्य व्यक्ति के लिए एक अत्यंत व्यावहारिक, वास्तविक (no false promises or get-rich-quick scams), चरणबद्ध हिंदी बिजनेस एक्शन प्लान तैयार करें। 
लक्ष्य: अपनी वर्तमान मजदूरी को सुरक्षित रखते हुए, खाली समय में पहला ₹500 - ₹2,000 का अतिरिक्त बिजनेस खड़ा करना, फिर उसे ₹10,000, ₹50,000 और आगे चलकर ₹1 करोड़ की कुल संपत्ति (Net Worth) बनाने के रास्ते पर ले जाना।

उत्तर नीचे दिए गए JSON प्रारूप में ही दें:
{
  "title": "योजना का शीर्षक (उदा. 'मजदूरी से किराना व थोक आपूर्ति का 7-चरणीय रोडमैप')",
  "summary": "2-3 वाक्यों में इस प्लान की मुख्य दिशा और हौसला अफजाई",
  "realisticEstimate": {
    "startCost": "अनुमानित लागत (उदा. ₹500 - ₹1,500)",
    "monthlyExpectedProfitFirstQuarter": "पहले 3 माह का मासिक लाभ (उदा. ₹3,000 - ₹7,000)",
    "timeToFirstProfit": "पहले लाभ में लगने वाला समय (उदा. 7 से 14 दिन)",
    "primaryRisk": "मुख्य जोखिम और उससे बचने का तरीका"
  },
  "phases": [
    {
      "phaseNumber": 1,
      "title": "चरण 1: वित्तीय बुनियाद और सुरक्षा",
      "actionItems": ["बिंदु 1", "बिंदु 2", "बिंदु 3"],
      "rule": "इस चरण का मुख्य वित्तीय नियम"
    },
    {
      "phaseNumber": 2,
      "title": "चरण 2: पहला सूक्ष्म व्यापार शुरू करना",
      "actionItems": ["बिंदु 1", "बिंदु 2", "बिंदु 3"],
      "rule": "इस चरण का मुख्य नियम"
    },
    {
      "phaseNumber": 3,
      "title": "चरण 3: पहले 10 पक्के ग्राहक बनाना व बिक्री",
      "actionItems": ["बिंदु 1", "बिंदु 2", "बिंदु 3"],
      "rule": "मार्केटिंग का नियम"
    },
    {
      "phaseNumber": 4,
      "title": "चरण 4: हिसाब-किताब व मुनाफे का पुनर्निवेश",
      "actionItems": ["बिंदु 1", "बिंदु 2", "बिंदु 3"],
      "rule": "पैसे के पुनर्निवेश का नियम"
    },
    {
      "phaseNumber": 5,
      "title": "चरण 5: टीम, ऑटोमेशन व स्केल",
      "actionItems": ["बिंदु 1", "बिंदु 2", "बिंदु 3"],
      "rule": "सिस्टम का नियम"
    },
    {
      "phaseNumber": 6,
      "title": "चरण 6: दीर्घकालिक निवेश व ₹1 करोड़ संपत्ति का रास्ता",
      "actionItems": ["बिंदु 1", "बिंदु 2", "बिंदु 3"],
      "rule": "कंपाउंडिंग का रहस्य"
    }
  ],
  "dailyHabit": "प्रतिदिन 15 मिनट में करने योग्य एक अनिवार्य नियम",
  "warning": "क्या कतई नहीं करना है (उदा. जुआ, कर्ज लेकर सट्टा, बिना हिसाब उधारी)"
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are the Master Business Guru of Zero to Crorepati. Your mission is to provide deeply empathetic, mathematically sound, ground-level practical business advice in clear, respectful, easy-to-understand Hindi for hardworking Indian citizens. Output strictly valid JSON without code block ticks if possible, or standard JSON format.',
        responseMimeType: 'application/json',
      },
    });

    const jsonStr = (response.text ?? '{}').trim();
    const data = JSON.parse(jsonStr);
    res.json({ success: true, data });
  } catch (err: any) {
    console.error('Guru API error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'AI गुरु से सलाह प्राप्त करने में त्रुटि हुई।',
    });
  }
});

// AI Business Guru Interactive Chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { messages, userContext } = req.body;

    const contents = (messages || []).map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const systemInstruction = `
आप "Zero to Crorepati" के एआई बिजनेस गुरु (AI Business Guru) हैं।
आपका उद्देश्य भारत के मजदूर, किसान, छोटे दुकानदार, बेरोजगार युवाओं को सरल और शुद्ध हिंदी में बिजनेस, बचत, ग्राहक बनाने, बिक्री, हिसाब-किताब और निवेश की शिक्षा देना है।
उपयोगकर्ता की जानकारी: ${JSON.stringify(userContext || {})}
नियम:
1. हमेशा सरल, आदरणीय और प्रेरणादायक हिंदी में उत्तर दें।
2. किसी को रातोंरात अमीर बनने का झांसा न दें। सच्चाई, मेहनत और चक्रवृद्धि (Compounding) पर जोर दें।
3. ₹200-₹500 रोज कमाने वाले व्यक्ति की व्यावहारिक स्थिति को समझकर समाधान बताएं।
4. उत्तर स्पष्ट, छोटे-छोटे पैराग्राफ या बुलेट पॉइंट्स में दें ताकि मोबाइल पर पढ़ना आसान हो।
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents.length > 0 ? contents : [{ role: 'user', parts: [{ text: 'नमस्ते गुरुजी, मैं ₹200 रोज कमाता हूँ, क्या मैं भी बिजनेस कर सकता हूँ?' }] }],
      config: {
        systemInstruction,
      },
    });

    res.json({
      success: true,
      reply: response.text || 'माफ़ कीजिये, कृपया अपना सवाल दोबारा पूछें।',
    });
  } catch (err: any) {
    console.error('Chat API error:', err);
    res.status(500).json({
      success: false,
      error: err.message || 'उत्तर प्राप्त करने में असमर्थ।',
    });
  }
});

// Bootstrapping Server with Vite
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Zero to Crorepati server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
