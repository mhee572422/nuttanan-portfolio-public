const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

if (code.includes('VoiceAssistant')) {
    code = code.replace("import VoiceAssistant from './components/VoiceAssistant';", "import Chatbot from './components/Chatbot';");
    code = code.replace("<VoiceAssistant />", "<Chatbot />");
}

fs.writeFileSync('src/App.tsx', code);
