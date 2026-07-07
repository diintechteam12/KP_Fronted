import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataJsPath = path.join(__dirname, 'src', 'data', 'data.js');
let content = fs.readFileSync(dataJsPath, 'utf-8');

// Add titleHi and categoryHi
content = content.replace(/title: "Free Books & Uniforms",/g, 'title: "Free Books & Uniforms", titleHi: "मुफ्त किताबें और ड्रेस",');
content = content.replace(/category: "Education",/g, 'category: "Education", categoryHi: "शिक्षा",');

content = content.replace(/title: "Skill India — Local Chapter",/g, 'title: "Skill India — Local Chapter", titleHi: "स्किल इंडिया — स्थानीय केंद्र",');
content = content.replace(/category: "Youth",/g, 'category: "Youth", categoryHi: "युवा",');

content = content.replace(/title: "Women Forward",/g, 'title: "Women Forward", titleHi: "महिला विकास",');
content = content.replace(/category: "Women",/g, 'category: "Women", categoryHi: "महिलाएं",');

content = content.replace(/title: "Free Medical Camps",/g, 'title: "Free Medical Camps", titleHi: "मुफ्त चिकित्सा शिविर",');
content = content.replace(/category: "Healthcare",/g, 'category: "Healthcare", categoryHi: "स्वास्थ्य सेवा",');

content = content.replace(/title: "Roads & Clean Water",/g, 'title: "Roads & Clean Water", titleHi: "सड़कें और साफ पानी",');
content = content.replace(/category: "Development",/g, 'category: "Development", categoryHi: "विकास",');

content = content.replace(/title: "Our Culture, Our Identity",/g, 'title: "Our Culture, Our Identity", titleHi: "हमारी संस्कृति, हमारी पहचान",');
content = content.replace(/category: "Culture",/g, 'category: "Culture", categoryHi: "संस्कृति",');

// Add shortDescHi which we can use in the UI instead of parsing the long desc
// The UI only shows a short snippet, let's just use shortDescHi for the translated text.
content = content.replace(
    /category: "Education", categoryHi: "शिक्षा",/g,
    'category: "Education", categoryHi: "शिक्षा",\n    descHi: "किसी भी बच्चे को स्कूल इसलिए नहीं छोड़ना चाहिए क्योंकि उसका परिवार किताबें या यूनिफॉर्म नहीं खरीद सकता। हम यह सुनिश्चित करते हैं कि ऐसा कभी न हो।",'
);
content = content.replace(
    /category: "Youth", categoryHi: "युवा",/g,
    'category: "Youth", categoryHi: "युवा",\n    descHi: "एक बेहतर कल बनाने के लिए युवाओं को कौशल, ज्ञान और अवसरों के साथ सशक्त बनाना।",'
);
content = content.replace(
    /category: "Women", categoryHi: "महिलाएं",/g,
    'category: "Women", categoryHi: "महिलाएं",\n    descHi: "माइक्रोफाइनेंस, व्यवसाय प्रशिक्षण और सामुदायिक समर्थन। दान नहीं — क्षमता। क्योंकि सक्षम महिलाएं ही सक्षम परिवारों का निर्माण करती हैं।",'
);
content = content.replace(
    /category: "Healthcare", categoryHi: "स्वास्थ्य सेवा",/g,
    'category: "Healthcare", categoryHi: "स्वास्थ्य सेवा",\n    descHi: "डॉक्टर, दवा, जांच — सब मुफ्त। क्योंकि हमारे समुदाय में स्वास्थ्य सेवा किसी के लिए भी लग्ज़री नहीं होनी चाहिए।",'
);
content = content.replace(
    /category: "Development", categoryHi: "विकास",/g,
    'category: "Development", categoryHi: "विकास",\n    descHi: "पक्की सड़कें, पीने के पानी की पाइपलाइन, उचित स्वच्छता। बुनियादी चीजें जिनका हर इंसान हकदार है।",'
);
content = content.replace(
    /category: "Culture", categoryHi: "संस्कृति",/g,
    'category: "Culture", categoryHi: "संस्कृति",\n    descHi: "त्यौहार, लोक परंपराएं, हमारे पूर्वजों की कहानियां — इन्हें जीवित रखना कोई विकल्प नहीं है। यही हमारी पहचान है।",'
);

fs.writeFileSync(dataJsPath, content);
console.log('Modified data.js successfully');
