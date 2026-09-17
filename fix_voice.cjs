const fs = require('fs');

let content = fs.readFileSync('src/components/VoiceAssistant.tsx', 'utf8');

content = content.replace(
  "setIsListening(true);\n        showFeedback(language === 'en' ? 'Listening...' : 'กำลังฟัง...');\n      } catch (e) {",
  `setIsListening(true);
        showFeedback(language === 'en' ? 'Listening...' : 'กำลังฟัง...');
      } catch (e: any) {
        if (e.name === 'InvalidStateError') {
          // Already listening, ignore
          setIsListening(true);
        }`
);

fs.writeFileSync('src/components/VoiceAssistant.tsx', content, 'utf8');

