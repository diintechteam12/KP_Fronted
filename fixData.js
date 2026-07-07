import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataJsPath = path.join(__dirname, 'src', 'data', 'data.js');
let content = fs.readFileSync(dataJsPath, 'utf-8');

// Find the index of `id: 5,` and cut everything after it.
const id5Index = content.indexOf('    id: 5,\n    title: "Roads & Clean Water"');
if (id5Index !== -1) {
    const fixedContent = content.substring(0, id5Index) + `    id: 5,
    title: "Roads & Clean Water", titleHi: "सड़कें और साफ पानी",
    category: "Development", categoryHi: "विकास",
    descHi: "पक्की सड़कें, पीने के पानी की पाइपलाइन, उचित स्वच्छता। बुनियादी चीजें जिनका हर इंसान हकदार है।",
    desc: \`Paved roads, drinking water pipelines, proper sanitation. Basic things that every human being simply deserves.

INFRASTRUCTURE FOR A DIGNIFIED LIFE
A community cannot progress if its basic infrastructure is broken. Muddy roads that become impassable during monsoons, and a lack of clean, accessible drinking water are harsh realities that hold back economic and social development. This initiative focuses on the physical development of our villages to ensure a safe, hygienic, and dignified living environment for all.

CLEAN DRINKING WATER PROJECTS
Waterborne diseases are entirely preventable, yet they account for a massive percentage of illnesses in rural areas. We have taken on the mission to install deep borewells, overhead water tanks, and RO filtration plants in central village locations. We ensure that every household has access to safe, clean drinking water year-round, significantly reducing medical expenses for local families.

PAVED ROADS & SANITATION
Connectivity brings opportunity. We have funded and facilitated the construction of paved roads connecting remote villages to the main highways. This allows farmers to transport their produce easily, children to reach school safely, and ambulances to access villages during emergencies.\`,
    image: "/Initiatives img5.png",
    color: "#FF6B00",
    objPos: "top center",
  },
  {
    id: 6,
    title: "Our Culture, Our Identity", titleHi: "हमारी संस्कृति, हमारी पहचान",
    category: "Culture", categoryHi: "संस्कृति",
    descHi: "त्यौहार, लोक परंपराएं, हमारे पूर्वजों की कहानियां — इन्हें जीवित रखना कोई विकल्प नहीं है। यही हमारी पहचान है।",
    desc: \`Festivals, folk traditions, stories of our ancestors — keeping them alive is not optional. It is who we are.\`,
    image: "/Initiatives img6.png",
    color: "#FFD700",
    objPos: "top center",
  },
];

export const mediaNews = [
  {
    id: 1,
    title: "K. P. Kasana Creates Jobs for 10,000 Young People",
    titleHi: "के पी कसाना ने 10,000 युवाओं के लिए रोज़गार पैदा किए",
    date: "December 15, 2024",
    dateHi: "15 दिसंबर, 2024",
    source: "Dainik Jagran",
    desc: "Skill program directly connected over ten thousand youth with training and employment opportunities across the region.",
    descHi: "कौशल कार्यक्रम ने पूरे क्षेत्र में दस हज़ार से अधिक युवाओं को सीधे प्रशिक्षण और रोज़गार के अवसरों से जोड़ा।",
    image: "/Event2.png",
  },
  {
    id: 2,
    title: "National Honor for 38 Years of Community Service",
    titleHi: "38 वर्षों की समाज सेवा के लिए राष्ट्रीय सम्मान",
    date: "November 28, 2024",
    dateHi: "28 नवंबर, 2024",
    source: "Amar Ujala",
    desc: "Recognized in Delhi at the national level for three decades of uninterrupted grassroots welfare work.",
    descHi: "तीन दशकों के निर्बाध जमीनी कल्याण कार्यों के लिए दिल्ली में राष्ट्रीय स्तर पर सम्मानित।",
    image: "/Event3.png",
  },
  {
    id: 3,
    title: "10,000 Women Achieve Financial Independence",
    titleHi: "10,000 महिलाओं ने वित्तीय स्वतंत्रता प्राप्त की",
    date: "October 10, 2024",
    dateHi: "10 अक्टूबर, 2024",
    source: "Navbharat Times",
    desc: "The women self-help group initiative has given over ten thousand women their own income and sense of dignity.",
    descHi: "महिला स्वयं सहायता समूह की पहल ने दस हजार से अधिक महिलाओं को उनकी अपनी आय और सम्मान का एहसास दिया है।",
    image: "/Event1.png",
  },
  {
    id: 4,
    title: "Vision 2030 — A Real Plan, Not a Manifesto",
    titleHi: "विज़न 2030 — एक वास्तविक योजना, कोई घोषणापत्र नहीं",
    date: "September 5, 2024",
    dateHi: "5 सितंबर, 2024",
    source: "Hindustan Times",
    desc: "A detailed development roadmap covering every ward and village — with timelines, budgets, and accountability built in.",
    descHi: "हर वार्ड और गांव को कवर करने वाला एक विस्तृत विकास रोडमैप — जिसमें समय सीमा, बजट और जवाबदेही शामिल है।",
    image: "/Event1.png",
  },
];

export const galleryImages = [
  { id: 1, src: "/img1.jpeg", category: "Public Meetings", title: "People Gathered, Voices Heard" },
  { id: 2, src: "/img2.jpeg", category: "Community Events", title: "Among Our Own People" },
  { id: 3, src: "/img3.jpeg", category: "Social Service", title: "Another Day of Showing Up" },
  { id: 4, src: "/IMG4.png", category: "Public Meetings", title: "Standing With the People" },
  { id: 5, src: "/IMG5.png", category: "Community Events", title: "Community Comes First" },
  { id: 6, src: "/IMG6.png", category: "Social Service", title: "Serving on the Ground" },
  { id: 7, src: "/IMG7.png", category: "Education Programs", title: "Investing in the Future" },
];

export const videos = [
  {
    id: 1,
    title: "From the Villages — Real Stories",
    thumb: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "12:45",
  },
  {
    id: 2,
    title: "Talking Straight with the Youth",
    thumb: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "8:30",
  },
  {
    id: 3,
    title: "Women Empowerment Summit",
    thumb: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "15:20",
  },
  {
    id: 4,
    title: "New School Inauguration — A New Beginning",
    thumb: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    duration: "10:15",
  },
];

export const socialStats = [
  { platform: "Facebook", handle: "@kpsinghkasana", followers: "34K+", color: "#1877F2", icon: "FaFacebook" },
  { platform: "Instagram", handle: "@kpkasanait", followers: "12K+", color: "#E4405F", icon: "FaInstagram" },
  { platform: "YouTube", handle: "@KPKasana-o8o", followers: "8K+", color: "#FF0000", icon: "FaYoutube" },
  { platform: "LinkedIn", handle: "K. P. Kasana", followers: "5K+", color: "#0A66C2", icon: "FaLinkedin" },
];
`;
    fs.writeFileSync(dataJsPath, fixedContent);
    console.log('Fixed data.js perfectly!');
} else {
    console.log('Could not find id: 5');
}
