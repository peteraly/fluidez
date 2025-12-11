import { getDayData, getDayJson, getDayVocabulary, getAllCurriculum } from './curriculumLoader';
import MariaGreeting from "./components/MariaGreeting";
import React, { useState, useEffect, useCallback } from 'react';
import AIPractice from './AIPractice';
import VoicePractice from './VoicePractice';
import PracticeHub from './PracticeHub';
import PracticeTab from './PracticeTab';
import Onboarding from './Onboarding';
import RoleplayMode from './RoleplayMode';
import GrammarDrills from './GrammarDrills';
import PronunciationPractice from './PronunciationPractice';
import ContentVault from './ContentVault';
import QuickReview from './QuickReview';
import Achievements from './Achievements';
import StreakCalendar from './StreakCalendar';
import DailyChallenge from './DailyChallenge';
import StoriesMode from './StoriesMode';
import Settings from './Settings';
import FocusMode from './FocusMode';

import MultimodalVoiceChat from './MultimodalVoiceChat';
import ImmersiveRoleplay from './ImmersiveRoleplay';
import InteractiveCurriculum from './InteractiveCurriculum';
import VoiceChatMode from './modes/VoiceChatMode';

// API Key Banner Component
import RealWorldMissions from "./components/RealWorldMissions";
import StoryJourney from "./modes/StoryJourney";
import GentleStreaks, { recordPractice, StreakNotification, getStreakData } from "./components/GentleStreaks";
import DailyLessons from "./components/DailyLessons";
import CulturalDeepDives from "./components/CulturalDeepDives";
import ProgressDashboard from "./components/ProgressDashboard";
import PatternDiscovery from "./modes/PatternDiscovery";
import CommunicationAchievements from "./components/CommunicationAchievements";
function ApiKeyBanner() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [editing, setEditing] = useState(!localStorage.getItem('gemini_api_key'));
  const [tempKey, setTempKey] = useState(apiKey);
  
  const saveKey = () => {
    localStorage.setItem('gemini_api_key', tempKey);
    setApiKey(tempKey);
    setEditing(false);
  };
  
  if (!editing && apiKey) {
    return (
      <div style={{ background: '#E8F5E9', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
        <span>✅ Gemini API Key saved</span>
        <button onClick={() => setEditing(true)} style={{ background: 'none', border: 'none', color: '#2D5A27', cursor: 'pointer', fontWeight: 600 }}>Edit</button>
      </div>
    );
  }
  
  return (
    <div style={{ background: '#FEF3C7', padding: '12px 16px' }}>
      <div style={{ fontSize: 13, marginBottom: 8, fontWeight: 500 }}>🔑 Add Gemini API Key for AI features</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="password"
          value={tempKey}
          onChange={(e) => setTempKey(e.target.value)}
          placeholder="Paste your API key here..."
          style={{ flex: 1, padding: '10px 12px', border: '1px solid #DDD', borderRadius: 8, fontSize: 14 }}
        />
        <button 
          onClick={saveKey}
          disabled={!tempKey.trim()}
          style={{ 
            background: tempKey.trim() ? '#2D5A27' : '#CCC', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 16px', 
            borderRadius: 8, 
            cursor: tempKey.trim() ? 'pointer' : 'default',
            fontWeight: 600
          }}
        >
          Save
        </button>
      </div>
      <div style={{ fontSize: 11, color: '#666', marginTop: 6 }}>
        Get free key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer" style={{ color: '#2D5A27' }}>aistudio.google.com/apikey</a>
      </div>
    </div>
  );
}



const theme = {
  primary: '#2D5A27', primaryLight: '#4A7C43', success: '#228B22',
  warning: '#DAA520', error: '#CD5C5C', bg: '#FAFAFA', surface: '#FFF',
  text: '#1A1A1A', textLight: '#666', border: '#E8E8E8'
};

const TOTAL_DAYS = 30;

// ============================================
// 1000+ VOCABULARY DATABASE (Practice Anytime)
// ============================================
const VOCAB = {
  greetings: { title: "Greetings", icon: "👋", words: [
    ["hola","hello"],["buenos días","good morning"],["buenas tardes","good afternoon"],["buenas noches","good night"],["¿cómo estás?","how are you?"],["muy bien","very well"],["gracias","thank you"],["de nada","you're welcome"],["por favor","please"],["perdón","sorry"],["lo siento","I'm sorry"],["adiós","goodbye"],["hasta luego","see you later"],["hasta mañana","see you tomorrow"],["mucho gusto","nice to meet you"],["¿cómo te llamas?","what's your name?"],["me llamo...","my name is..."],["encantado","pleased to meet you"],["bienvenido","welcome"],["¿qué tal?","what's up?"],["más o menos","so-so"],["con permiso","excuse me"],["claro","of course"],["por supuesto","of course"],["¡salud!","cheers/bless you"]
  ]},
  numbers: { title: "Numbers", icon: "🔢", words: [
    ["cero","0"],["uno","1"],["dos","2"],["tres","3"],["cuatro","4"],["cinco","5"],["seis","6"],["siete","7"],["ocho","8"],["nueve","9"],["diez","10"],["once","11"],["doce","12"],["trece","13"],["catorce","14"],["quince","15"],["dieciséis","16"],["diecisiete","17"],["dieciocho","18"],["diecinueve","19"],["veinte","20"],["veintiuno","21"],["treinta","30"],["cuarenta","40"],["cincuenta","50"],["sesenta","60"],["setenta","70"],["ochenta","80"],["noventa","90"],["cien","100"],["doscientos","200"],["quinientos","500"],["mil","1000"],["un millón","1 million"],["primero","first"],["segundo","second"],["tercero","third"],["cuarto","fourth"],["quinto","fifth"],["décimo","tenth"]
  ]},
  time: { title: "Time & Calendar", icon: "📅", words: [
    ["el segundo","second"],["el minuto","minute"],["la hora","hour"],["el día","day"],["la semana","week"],["el mes","month"],["el año","year"],["hoy","today"],["ayer","yesterday"],["mañana","tomorrow"],["ahora","now"],["luego","later"],["siempre","always"],["nunca","never"],["a veces","sometimes"],["lunes","Monday"],["martes","Tuesday"],["miércoles","Wednesday"],["jueves","Thursday"],["viernes","Friday"],["sábado","Saturday"],["domingo","Sunday"],["enero","January"],["febrero","February"],["marzo","March"],["abril","April"],["mayo","May"],["junio","June"],["julio","July"],["agosto","August"],["septiembre","September"],["octubre","October"],["noviembre","November"],["diciembre","December"],["la primavera","spring"],["el verano","summer"],["el otoño","fall"],["el invierno","winter"]
  ]},
  family: { title: "Family", icon: "👨‍👩‍👧‍👦", words: [
    ["la familia","family"],["la madre","mother"],["el padre","father"],["los padres","parents"],["la mamá","mom"],["el papá","dad"],["la hermana","sister"],["el hermano","brother"],["la hija","daughter"],["el hijo","son"],["los hijos","children"],["la abuela","grandmother"],["el abuelo","grandfather"],["la tía","aunt"],["el tío","uncle"],["la prima","cousin (f)"],["el primo","cousin (m)"],["la sobrina","niece"],["el sobrino","nephew"],["la esposa","wife"],["el esposo","husband"],["la novia","girlfriend"],["el novio","boyfriend"],["el bebé","baby"],["los parientes","relatives"]
  ]},
  food: { title: "Food & Drinks", icon: "🍽️", words: [
    ["el agua","water"],["el café","coffee"],["el té","tea"],["la leche","milk"],["el jugo","juice"],["el vino","wine"],["la cerveza","beer"],["el pan","bread"],["el arroz","rice"],["la pasta","pasta"],["la carne","meat"],["el pollo","chicken"],["el pescado","fish"],["el huevo","egg"],["el queso","cheese"],["la fruta","fruit"],["la manzana","apple"],["la naranja","orange"],["el plátano","banana"],["la fresa","strawberry"],["la verdura","vegetable"],["la lechuga","lettuce"],["el tomate","tomato"],["la cebolla","onion"],["la zanahoria","carrot"],["la ensalada","salad"],["la sopa","soup"],["el postre","dessert"],["el helado","ice cream"],["el desayuno","breakfast"],["el almuerzo","lunch"],["la cena","dinner"],["delicioso","delicious"],["la sal","salt"],["el azúcar","sugar"]
  ]},
  body: { title: "Body Parts", icon: "🫀", words: [
    ["la cabeza","head"],["el pelo","hair"],["la cara","face"],["los ojos","eyes"],["la nariz","nose"],["la boca","mouth"],["los dientes","teeth"],["las orejas","ears"],["el cuello","neck"],["el hombro","shoulder"],["el brazo","arm"],["la mano","hand"],["los dedos","fingers"],["el pecho","chest"],["la espalda","back"],["el estómago","stomach"],["la pierna","leg"],["la rodilla","knee"],["el pie","foot"],["el corazón","heart"],["los pulmones","lungs"],["el cerebro","brain"],["la piel","skin"],["los huesos","bones"]
  ]},
  clothing: { title: "Clothing", icon: "👕", words: [
    ["la ropa","clothes"],["la camisa","shirt"],["la camiseta","t-shirt"],["los pantalones","pants"],["los jeans","jeans"],["la falda","skirt"],["el vestido","dress"],["la chaqueta","jacket"],["el abrigo","coat"],["el suéter","sweater"],["los zapatos","shoes"],["las botas","boots"],["los calcetines","socks"],["el sombrero","hat"],["el cinturón","belt"],["la corbata","tie"],["la bufanda","scarf"],["los guantes","gloves"],["el bolso","bag"],["el reloj","watch"],["los lentes","glasses"],["el anillo","ring"]
  ]},
  house: { title: "House & Home", icon: "🏠", words: [
    ["la casa","house"],["el apartamento","apartment"],["la habitación","room"],["el dormitorio","bedroom"],["la cocina","kitchen"],["el baño","bathroom"],["la sala","living room"],["el comedor","dining room"],["el jardín","garden"],["la puerta","door"],["la ventana","window"],["el techo","roof"],["el piso","floor"],["la pared","wall"],["las escaleras","stairs"],["la cama","bed"],["la mesa","table"],["la silla","chair"],["el sofá","sofa"],["el escritorio","desk"],["la lámpara","lamp"],["el espejo","mirror"],["el refrigerador","refrigerator"],["la estufa","stove"],["la ducha","shower"]
  ]},
  weather: { title: "Weather", icon: "🌤️", words: [
    ["el tiempo","weather"],["el sol","sun"],["la lluvia","rain"],["la nieve","snow"],["el viento","wind"],["la nube","cloud"],["la tormenta","storm"],["hace calor","it's hot"],["hace frío","it's cold"],["hace sol","it's sunny"],["hace viento","it's windy"],["está lloviendo","it's raining"],["está nevando","it's snowing"],["la temperatura","temperature"],["húmedo","humid"],["seco","dry"]
  ]},
  professions: { title: "Professions", icon: "💼", words: [
    ["el médico","doctor"],["la enfermera","nurse"],["el abogado","lawyer"],["el profesor","teacher"],["el ingeniero","engineer"],["el arquitecto","architect"],["el policía","police officer"],["el bombero","firefighter"],["el cocinero","cook"],["el mesero","waiter"],["el vendedor","salesperson"],["el periodista","journalist"],["el escritor","writer"],["el artista","artist"],["el músico","musician"],["el programador","programmer"],["el dentista","dentist"],["el piloto","pilot"],["el estudiante","student"],["el gerente","manager"]
  ]},
  animals: { title: "Animals", icon: "🐾", words: [
    ["el perro","dog"],["el gato","cat"],["el pájaro","bird"],["el pez","fish"],["el caballo","horse"],["la vaca","cow"],["el cerdo","pig"],["la gallina","chicken"],["el conejo","rabbit"],["el ratón","mouse"],["el león","lion"],["el tigre","tiger"],["el elefante","elephant"],["el mono","monkey"],["el oso","bear"],["la serpiente","snake"],["la tortuga","turtle"],["la mariposa","butterfly"],["el tiburón","shark"],["el delfín","dolphin"]
  ]},
  transport: { title: "Transportation", icon: "🚗", words: [
    ["el coche","car"],["el autobús","bus"],["el tren","train"],["el metro","subway"],["el avión","airplane"],["el barco","boat"],["la bicicleta","bicycle"],["la moto","motorcycle"],["el taxi","taxi"],["el camión","truck"],["la parada","stop"],["la estación","station"],["el aeropuerto","airport"],["el boleto","ticket"],["el pasaporte","passport"],["manejar","to drive"]
  ]},
  places: { title: "Places", icon: "📍", words: [
    ["la ciudad","city"],["el pueblo","town"],["el país","country"],["la calle","street"],["el centro","downtown"],["el parque","park"],["el mercado","market"],["la tienda","store"],["el banco","bank"],["el hospital","hospital"],["la farmacia","pharmacy"],["la escuela","school"],["la universidad","university"],["la biblioteca","library"],["el museo","museum"],["el cine","movie theater"],["el restaurante","restaurant"],["el hotel","hotel"],["la playa","beach"],["la montaña","mountain"]
  ]},
  adjectives: { title: "Adjectives", icon: "📝", words: [
    ["grande","big"],["pequeño","small"],["alto","tall"],["bajo","short"],["largo","long"],["corto","short"],["nuevo","new"],["viejo","old"],["joven","young"],["bonito","pretty"],["feo","ugly"],["bueno","good"],["malo","bad"],["fácil","easy"],["difícil","difficult"],["rápido","fast"],["lento","slow"],["caliente","hot"],["frío","cold"],["feliz","happy"],["triste","sad"],["cansado","tired"],["enfermo","sick"],["limpio","clean"],["sucio","dirty"],["lleno","full"],["vacío","empty"],["abierto","open"],["cerrado","closed"],["importante","important"]
  ]},
  verbs: { title: "Common Verbs", icon: "🏃", words: [
    ["ser","to be (permanent)"],["estar","to be (temporary)"],["tener","to have"],["hacer","to do/make"],["ir","to go"],["venir","to come"],["poder","can"],["querer","to want"],["saber","to know (facts)"],["conocer","to know (people)"],["decir","to say"],["hablar","to speak"],["comer","to eat"],["beber","to drink"],["vivir","to live"],["trabajar","to work"],["estudiar","to study"],["aprender","to learn"],["escribir","to write"],["leer","to read"],["escuchar","to listen"],["ver","to see"],["mirar","to watch"],["dormir","to sleep"],["caminar","to walk"],["correr","to run"],["jugar","to play"],["comprar","to buy"],["vender","to sell"],["abrir","to open"],["cerrar","to close"],["empezar","to start"],["terminar","to finish"],["llegar","to arrive"],["salir","to leave"],["buscar","to look for"],["encontrar","to find"],["dar","to give"],["pensar","to think"],["gustar","to like"]
  ]},
  phrases: { title: "Essential Phrases", icon: "💬", words: [
    ["¿cómo se dice...?","how do you say...?"],["¿qué significa...?","what does...mean?"],["no entiendo","I don't understand"],["¿puede repetir?","can you repeat?"],["más despacio","slower"],["¿cuánto cuesta?","how much?"],["la cuenta, por favor","the check, please"],["¿dónde está...?","where is...?"],["a la derecha","to the right"],["a la izquierda","to the left"],["todo recto","straight ahead"],["tengo hambre","I'm hungry"],["tengo sed","I'm thirsty"],["tengo frío","I'm cold"],["tengo calor","I'm hot"],["tengo sueño","I'm sleepy"],["me gusta","I like"],["no me gusta","I don't like"],["me encanta","I love it"],["¡qué bien!","how nice!"],["¡qué lástima!","what a pity!"],["estoy de acuerdo","I agree"],["no importa","it doesn't matter"],["depende","it depends"],["te quiero","I love you"]
  ]}
};

// ============================================
// 30-DAY CURRICULUM
// ============================================
// Dynamic curriculum loader - loads from JSON files
const curriculum = {};
const dayFiles = require.context('./content/days', false, /day\d+\.json$/);
dayFiles.keys().forEach(key => {
  const dayNum = parseInt(key.match(/day(\d+)/)[1]);
  const dayData = dayFiles(key);
  const vocabWords = [];
  if (dayData.vocabulary?.screens) {
    dayData.vocabulary.screens.forEach(screen => {
      if (screen.words) screen.words.forEach(w => vocabWords.push(w.spanish));
    });
  }
  const grammarScreen = dayData.grammar?.screens?.[0] || {};
  let exercise = { q: "Practice", opts: ["A","B","C"], a: 0 };
  dayData.grammar?.screens?.forEach(s => {
    if (s.exerciseType === 'multiple_choice') exercise = { q: s.instruction, opts: s.options, a: s.correctAnswer };
  });
  curriculum[dayNum] = {
    title: dayData.title || `Day ${dayNum}`,
    subtitle: dayData.subtitle || '',
    level: dayData.level || 'A1',
    grammar: { content: grammarScreen.content || '', examples: (grammarScreen.examples || []).map(e => e.spanish || e), tip: grammarScreen.tip || '' },
    vocabulary: vocabWords.length ? vocabWords : ['palabra'],
    exercise,
    listening: dayData.listening?.screens?.[0]?.transcript || '',
    reading: dayData.reading?.screens?.[0]?.passage || '',
    _raw: dayData
  };
});

// ============================================
// ASSESSMENTS
// ============================================
const assessments = {
  week1: { title: "Week 1", available: 7, questions: [
    { q: "Yo ___ de México. (origin)", opts: ["estoy","soy","tengo"], a: 1 },
    { q: "Ella ___ cansada. (condition)", opts: ["es","está","tiene"], a: 1 },
    { q: "'I am hungry':", opts: ["Estoy hambre","Tengo hambre","Soy hambre"], a: 1 },
    { q: "Nosotros ___ al cine. (going)", opts: ["vamos","voy","van"], a: 0 }
  ]},
  week2: { title: "Week 2", available: 15, questions: [
    { q: "Ayer yo ___ al parque. (completed)", opts: ["iba","fui","voy"], a: 1 },
    { q: "Cuando era niño, ___ mucho. (habitual)", opts: ["jugué","jugaba","juego"], a: 1 },
    { q: "El libro. ___ leo.", opts: ["Le","Lo","La"], a: 1 },
    { q: "'I wake up':", opts: ["Despierto","Me despierto","Se despierto"], a: 1 }
  ]},
  week3: { title: "Week 3", available: 21, questions: [
    { q: "Me ___ las películas. (plural)", opts: ["gusta","gustan","gusto"], a: 1 },
    { q: "Juan es más alto ___ Pedro.", opts: ["de","que","como"], a: 1 },
    { q: "Gracias ___ tu ayuda.", opts: ["para","por"], a: 1 },
    { q: "This book (el libro):", opts: ["Este libro","Esta libro","Ese libro"], a: 0 }
  ]},
  week4: { title: "Week 4", available: 28, questions: [
    { q: "Mañana yo ___ a Madrid. (future)", opts: ["voy","iré","iría"], a: 1 },
    { q: "'I would like':", opts: ["Me gusta","Me gustaría","Me gustará"], a: 1 },
    { q: "Quiero que tú ___ (venir):", opts: ["vienes","vengas","vendrás"], a: 1 },
    { q: "¡___ aquí! (Come! tú)", opts: ["Vienes","Ven","Vengas"], a: 1 }
  ]},
  final: { title: "Final", available: 30, questions: [
    { q: "Yo ___ estudiante. (identity)", opts: ["estoy","soy","tengo"], a: 1 },
    { q: "Ayer ___ al cine.", opts: ["iba","fui","iré"], a: 1 },
    { q: "Mientras ___, llegó.", opts: ["comí","comía"], a: 1 },
    { q: "Me gustaría ___ a España.", opts: ["viajar","viajo","viajé"], a: 0 },
    { q: "Espero que ___ bien.", opts: ["estás","estés","estar"], a: 1 }
  ]}
};

// VERB CONJUGATIONS
const VERBS = {
  present: { hablar:{yo:"hablo",tú:"hablas",él:"habla",nosotros:"hablamos",ellos:"hablan"}, comer:{yo:"como",tú:"comes",él:"come",nosotros:"comemos",ellos:"comen"}, vivir:{yo:"vivo",tú:"vives",él:"vive",nosotros:"vivimos",ellos:"viven"}, ser:{yo:"soy",tú:"eres",él:"es",nosotros:"somos",ellos:"son"}, estar:{yo:"estoy",tú:"estás",él:"está",nosotros:"estamos",ellos:"están"}, ir:{yo:"voy",tú:"vas",él:"va",nosotros:"vamos",ellos:"van"}, tener:{yo:"tengo",tú:"tienes",él:"tiene",nosotros:"tenemos",ellos:"tienen"}, hacer:{yo:"hago",tú:"haces",él:"hace",nosotros:"hacemos",ellos:"hacen"} },
  preterite: { hablar:{yo:"hablé",tú:"hablaste",él:"habló",nosotros:"hablamos",ellos:"hablaron"}, comer:{yo:"comí",tú:"comiste",él:"comió",nosotros:"comimos",ellos:"comieron"}, ser:{yo:"fui",tú:"fuiste",él:"fue",nosotros:"fuimos",ellos:"fueron"}, ir:{yo:"fui",tú:"fuiste",él:"fue",nosotros:"fuimos",ellos:"fueron"}, estar:{yo:"estuve",tú:"estuviste",él:"estuvo",nosotros:"estuvimos",ellos:"estuvieron"}, tener:{yo:"tuve",tú:"tuviste",él:"tuvo",nosotros:"tuvimos",ellos:"tuvieron"}, hacer:{yo:"hice",tú:"hiciste",él:"hizo",nosotros:"hicimos",ellos:"hicieron"} },
  imperfect: { hablar:{yo:"hablaba",tú:"hablabas",él:"hablaba",nosotros:"hablábamos",ellos:"hablaban"}, comer:{yo:"comía",tú:"comías",él:"comía",nosotros:"comíamos",ellos:"comían"}, ser:{yo:"era",tú:"eras",él:"era",nosotros:"éramos",ellos:"eran"}, ir:{yo:"iba",tú:"ibas",él:"iba",nosotros:"íbamos",ellos:"iban"} },
  future: { hablar:{yo:"hablaré",tú:"hablarás",él:"hablará",nosotros:"hablaremos",ellos:"hablarán"}, tener:{yo:"tendré",tú:"tendrás",él:"tendrá",nosotros:"tendremos",ellos:"tendrán"}, hacer:{yo:"haré",tú:"harás",él:"hará",nosotros:"haremos",ellos:"harán"} },
  subjunctive: { hablar:{yo:"hable",tú:"hables",él:"hable",nosotros:"hablemos",ellos:"hablen"}, comer:{yo:"coma",tú:"comas",él:"coma",nosotros:"comamos",ellos:"coman"}, ser:{yo:"sea",tú:"seas",él:"sea",nosotros:"seamos",ellos:"sean"}, estar:{yo:"esté",tú:"estés",él:"esté",nosotros:"estemos",ellos:"estén"}, ir:{yo:"vaya",tú:"vayas",él:"vaya",nosotros:"vayamos",ellos:"vayan"} }
};

// STYLES
const s = {
  container: { maxWidth: 480, margin: '0 auto', minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui' },
  header: { background: theme.primary, color: '#fff', padding: '16px 20px', textAlign: 'center' },
  content: { padding: 20 },
  card: { background: theme.surface, borderRadius: 16, padding: 20, marginBottom: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: `1px solid ${theme.border}` },
  btn: { background: theme.primary, color: '#fff', border: 'none', padding: 16, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 12 },
  btnSec: { background: 'transparent', color: theme.primary, border: `2px solid ${theme.primary}`, padding: 14, borderRadius: 12, fontSize: 16, cursor: 'pointer', width: '100%', marginTop: 8 },
  progress: { height: 6, background: theme.border, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', background: theme.success, transition: 'width 0.3s' },
  opt: { display: 'block', width: '100%', padding: 14, marginBottom: 10, border: `2px solid ${theme.border}`, borderRadius: 12, background: '#fff', cursor: 'pointer', textAlign: 'left', fontSize: 15, transition: 'all 0.2s' },
  flash: { background: theme.primary, color: '#fff', padding: 40, borderRadius: 20, textAlign: 'center', cursor: 'pointer', minHeight: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 600 },
  tab: { flex: 1, padding: '12px 8px', textAlign: 'center', cursor: 'pointer', fontSize: 14, fontWeight: 500, borderBottom: '2px solid transparent' },
  tabActive: { borderBottomColor: theme.primary, color: theme.primary },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 },
  deckCard: { background: '#fff', borderRadius: 16, padding: 16, textAlign: 'center', cursor: 'pointer', border: `1px solid ${theme.border}` },
  tip: { background: '#FFF9E6', padding: 12, borderRadius: 12, marginTop: 12, borderLeft: `4px solid ${theme.warning}`, fontSize: 14 },
  input: { width: '100%', padding: 14, fontSize: 16, borderRadius: 12, border: `2px solid ${theme.border}`, boxSizing: 'border-box' }
};

// ============================================
// MAIN APP COMPONENT
// ============================================
function App() {
  const [screen, setScreen] = useState('splash');
  const [mainTab, setMainTab] = useState('learn');
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState({});
  const [moduleProgress, setModuleProgress] = useState({});
  const [currentModule, setCurrentModule] = useState(null);
  const [, setModuleStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  // Practice state
  const [practiceTab, setPracticeTab] = useState('vocab');
  const [practiceMode, setPracticeMode] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showDailyChallenge, setShowDailyChallenge] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [currentDeck, setCurrentDeck] = useState(null);
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState({});
  
  // Verb drill state
  const [verbTense, setVerbTense] = useState('present');
  const [verbName, setVerbName] = useState('hablar');
  const [pronoun, setPronoun] = useState('yo');
  const [verbInput, setVerbInput] = useState('');
  const [verbResult, setVerbResult] = useState(null);
  
  // Assessment state
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [showAIPractice, setShowAIPractice] = useState(false);
  const [aiPracticeDay, setAiPracticeDay] = useState(null);
  const [showVoicePractice, setShowVoicePractice] = useState(false);
  const [showVoiceChatMode, setShowVoiceChatMode] = useState(false);
  const [showMultimodalVoice, setShowMultimodalVoice] = useState(false);
  const [showImmersiveRoleplay, setShowImmersiveRoleplay] = useState(false);
  const [showCurriculumDay, setShowCurriculumDay] = useState(null);
  const [showPracticeTab, setShowPracticeTab] = useState(false);
  const [showMissions, setShowMissions] = useState(false);
  const [showStoryJourney, setShowStoryJourney] = useState(false);
  const [showStreaks, setShowStreaks] = useState(false);
  const [showCulture, setShowCulture] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showPatternDiscovery, setShowPatternDiscovery] = useState(false);
  const [showCommunicationAchievements, setShowCommunicationAchievements] = useState(false);
  const [showDailyLessons, setShowDailyLessons] = useState(false);
  const [streakNotification, setStreakNotification] = useState(null);
  const [showPracticeHub, setShowPracticeHub] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(() => !localStorage.getItem('fluidez_onboarded'));
  const [assessmentIdx, setAssessmentIdx] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState([]);
  const [assessmentComplete, setAssessmentComplete] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem('fluidez_30day_v2');
    if (saved) {
      const data = JSON.parse(saved);
      setProgress(data.progress || {});
      setModuleProgress(data.moduleProgress || {});
      setCurrentDay(data.currentDay || 1);
      setMasteredCards(data.masteredCards || {});
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem('fluidez_30day_v2', JSON.stringify({ progress, moduleProgress, currentDay, masteredCards }));
  }, [progress, moduleProgress, currentDay, masteredCards]);

  // Splash timer
  useEffect(() => {
    if (screen === 'splash') setTimeout(() => setScreen('home'), 1500);
  }, [screen]);

  // Text-to-speech
  const speak = useCallback((text) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES';
      u.rate = 0.85;
      speechSynthesis.speak(u);
    }
  }, []);

  // Stats
  const getCompletedDays = () => Object.keys(progress).filter(d => progress[d]?.completed).length;
  const getTotalVocab = () => Object.values(VOCAB).reduce((sum, cat) => sum + cat.words.length, 0);
  const getMastered = () => Object.keys(masteredCards).filter(k => masteredCards[k] >= 3).length;

  // Complete module
  const completeModule = (mod) => {
    const mp = { ...moduleProgress, [`${currentDay}-${mod}`]: true };
    setModuleProgress(mp);
    const mods = ['grammar', 'vocabulary', 'listening', 'reading'];
    if (mods.filter(m => mp[`${currentDay}-${m}`]).length === 4) {
      setProgress(p => ({ ...p, [currentDay]: { completed: true } }));
      if (currentDay < TOTAL_DAYS) setCurrentDay(d => d + 1);
    }
    setScreen('day');
    setCurrentModule(null);
    setModuleStep(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Mark flashcard
  const markCard = (deckId, idx, correct) => {
    const key = `${deckId}-${idx}`;
    setMasteredCards(prev => ({ ...prev, [key]: Math.max(0, (prev[key] || 0) + (correct ? 1 : -1)) }));
  };

  // ============================================
  // RENDER SCREENS
  // ============================================

  // SPLASH
  if (screen === 'splash') {
    return (
      <div style={{ ...s.container, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: theme.primary }}>
        <div style={{ fontSize: 56 }}>🇪🇸</div>
        <h1 style={{ color: '#fff', fontSize: 32, margin: '8px 0' }}>Fluidez</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)' }}>30-Day Spanish Course</p>
      </div>
    );
  }

  // HOME
  if (screen === 'home') {
    const completed = getCompletedDays();
  // ============ FEATURE SCREENS ============
  if (showFocusMode) return <FocusMode onBack={() => setShowFocusMode(false)} onSelectFeature={(f) => {
    setShowFocusMode(false);
    if (f === 'voice') setShowVoiceChatMode(true);
    else if (f === 'roleplay') setPracticeMode('roleplay');
    else if (f === 'grammar') setPracticeMode('grammar');
  }} />;
  if (showSettings) return <Settings onBack={() => setShowSettings(false)} />;
  if (showStories) return <StoriesMode onBack={() => setShowStories(false)} />;
  if (showAchievements) return <Achievements onBack={() => setShowAchievements(false)} />;
  if (showCalendar) return <StreakCalendar onBack={() => setShowCalendar(false)} />;
  if (showDailyChallenge) return <DailyChallenge onBack={() => setShowDailyChallenge(false)} />;
  if (practiceMode === 'roleplay') return <RoleplayMode onBack={() => setPracticeMode(null)} />;
  if (practiceMode === 'grammar') return <GrammarDrills onBack={() => setPracticeMode(null)} />;
  if (practiceMode === 'pronunciation') return <PronunciationPractice onBack={() => setPracticeMode(null)} />;
  if (practiceMode === 'vault') return <ContentVault onBack={() => setPracticeMode(null)} />;
  if (practiceMode === 'review') return <QuickReview onBack={() => setPracticeMode(null)} />;
  // ============ END FEATURE SCREENS ============
  if (showVoiceChatMode) return <VoiceChatMode onBack={() => setShowVoiceChatMode(false)} />;

  if (showMissions) return <RealWorldMissions onBack={() => setShowMissions(false)} onStartConversation={() => { setShowMissions(false); setShowVoiceChatMode(true); }} />;
  if (showStoryJourney) return <StoryJourney onBack={() => setShowStoryJourney(false)} />;
  if (showStreaks) return <GentleStreaks onClose={() => setShowStreaks(false)} />;
  if (showCulture) return <CulturalDeepDives onBack={() => setShowCulture(false)} />;
  if (showProgress) return <ProgressDashboard onBack={() => setShowProgress(false)} />;
  if (showPatternDiscovery) return <PatternDiscovery onBack={() => setShowPatternDiscovery(false)} onPracticeInConversation={() => { setShowPatternDiscovery(false); setShowVoiceChatMode(true); }} />;
  if (showDailyLessons) return <DailyLessons onBack={() => setShowDailyLessons(false)} currentDay={currentDay} onStartDay={(day) => { setCurrentDay(day); setShowDailyLessons(false); }} />;
  if (showCommunicationAchievements) return <CommunicationAchievements onBack={() => setShowCommunicationAchievements(false)} />;
    return (
      <div style={s.container}>
        <div style={s.header}>
          <h1 style={{ margin: 0, fontSize: 22 }}>🇪🇸 Fluidez</h1><button onClick={() => setShowSettings(true)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', marginLeft: 'auto' }}>⚙️</button>
          <p style={{ margin: '4px 0 0', opacity: 0.9, fontSize: 13 }}>30-Day Spanish Course</p>
        </div>
        <ApiKeyBanner />
        
        {/* Main Tabs */}
        <div style={{ display: 'flex', borderBottom: `1px solid ${theme.border}` }}>
          <div style={{ ...s.tab, ...(mainTab === 'learn' ? s.tabActive : {}) }} onClick={() => setMainTab('learn')}>📚 Learn</div>
          <div style={{ ...s.tab, ...(mainTab === 'practice' ? s.tabActive : {}) }} onClick={() => setMainTab('practice')}>🎯 Practice</div>
        </div>

        <div style={s.content}>
          {/* LEARN TAB */}
          {mainTab === 'learn' && (
            <>
              {/* Progress Card */}
              <div style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>Your Progress</span>
                  <span style={{ color: theme.primary, fontWeight: 600 }}>{completed}/{TOTAL_DAYS} days</span>
                </div>
                <div style={s.progress}>
                  <div style={{ ...s.progressFill, width: `${(completed / TOTAL_DAYS) * 100}%` }} />
                </div>
                <p style={{ fontSize: 12, color: theme.textLight, marginTop: 8 }}>
                  {completed === 0 ? 'Start your journey!' : completed === TOTAL_DAYS ? '🎉 Course complete!' : `${TOTAL_DAYS - completed} days remaining`}
                </p>
              </div>

              {/* Quick Actions */}
              <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
                <button onClick={() => setShowDailyChallenge(true)} style={{ ...s.card, flex: 1, padding: 12, textAlign: 'center', cursor: 'pointer', border: '2px solid #FFD700', background: '#FFFBEB' }}>
                  <span style={{ fontSize: 20 }}>⚡</span>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>Daily Challenge</div>
                </button>
                <button onClick={() => setShowCalendar(true)} style={{ ...s.card, flex: 1, padding: 12, textAlign: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 20 }}>📅</span>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>Calendar</div>
                </button>
                <button onClick={() => setShowAchievements(true)} style={{ ...s.card, flex: 1, padding: 12, textAlign: 'center', cursor: 'pointer' }}>
                  <span style={{ fontSize: 20 }}>🏆</span>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 4 }}>Achievements</div>
                </button>
              </div>

              {/* Daily Lessons */}
              <h3 style={{ marginBottom: 12 }}>Daily Lessons</h3>
              {Array.from({ length: TOTAL_DAYS }, (_, i) => i + 1).map(day => {
                const dayData = curriculum[day];
                const done = progress[day]?.completed;
                const locked = false; // UNLOCKED ALL DAYS
                const isCurrent = day === currentDay;
                return (
                  <div
                    key={day}
                    onClick={() => !locked && (setCurrentDay(day), setScreen('day'))}
                    style={{
                      ...s.card,
                      opacity: locked ? 0.5 : 1,
                      cursor: locked ? 'not-allowed' : 'pointer',
                      borderLeft: `4px solid ${done ? theme.success : isCurrent ? theme.primary : theme.border}`,
                      marginBottom: 10,
                      padding: 14
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 15 }}>Day {day}: {dayData.title}</div>
                        <div style={{ fontSize: 12, color: theme.textLight, marginTop: 2 }}>{dayData.subtitle}</div>
                      </div>
                      <span style={{ fontSize: 18 }}>{done ? '✓' : locked ? '🔒' : '→'}</span>
                    </div>
                  </div>
                );
              })}

              {/* Assessments */}
              <h3 style={{ marginTop: 24, marginBottom: 12 }}>Assessments</h3>
              {Object.entries(assessments).map(([key, assess]) => {
                const available = completed >= assess.available;
                return (
                  <div
                    key={key}
                    onClick={() => available && (setCurrentAssessment(key), setAssessmentIdx(0), setAssessmentAnswers([]), setAssessmentComplete(false), setScreen('assessment'))}
                    style={{
                      ...s.card,
                      opacity: available ? 1 : 0.5,
                      cursor: available ? 'pointer' : 'not-allowed',
                      marginBottom: 10,
                      padding: 14
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600 }}>📝 {assess.title} Assessment</div>
                        <div style={{ fontSize: 12, color: theme.textLight }}>Available after Day {assess.available}</div>
                      </div>
                      <span>{available ? '→' : '🔒'}</span>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* PRACTICE TAB */}
          {mainTab === 'practice' && (
            <>
              {/* Stats */}
              <div style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600 }}>Vocabulary Mastery</span>
                  <span style={{ color: theme.primary, fontWeight: 600 }}>{getMastered()}/{getTotalVocab()}</span>
                </div>
                <div style={s.progress}>
                  <div style={{ ...s.progressFill, width: `${(getMastered() / getTotalVocab()) * 100}%` }} />
                </div>
                <p style={{ fontSize: 12, color: theme.textLight, marginTop: 8 }}>Review cards 3+ times to master</p>
              </div>

              {/* Practice Modes */}
              <div style={{ marginBottom: 16 }}>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, paddingLeft: 4 }}>🎯 Practice Modes</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  <button onClick={() => setPracticeMode("roleplay")} style={{ ...s.card, padding: 12, textAlign: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>🎭</span>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Roleplay</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>Scenarios</div>
                  </button>
                  <button onClick={() => setPracticeMode("grammar")} style={{ ...s.card, padding: 12, textAlign: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>📝</span>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Grammar</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>Drills</div>
                  </button>
                  <button onClick={() => setPracticeMode("pronunciation")} style={{ ...s.card, padding: 12, textAlign: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>🎤</span>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Speak</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>Practice</div>
                  </button>
                  <button onClick={() => setPracticeMode("review")} style={{ ...s.card, padding: 12, textAlign: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>🔄</span>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Review</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>Flashcards</div>
                  </button>
                  <button onClick={() => setPracticeMode("vault")} style={{ ...s.card, padding: 12, textAlign: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>📚</span>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Vault</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>My Content</div>
                  </button>
                  <button onClick={() => setShowStoryJourney(true)} style={{ ...s.card, padding: 12, textAlign: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>📖</span>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Stories</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>Reading</div>
                  </button>
                  <button onClick={() => { console.log("Voice clicked"); setShowVoiceChatMode(true); }} style={{ ...s.card, padding: 12, textAlign: "center", cursor: "pointer" }}>
                    <span style={{ fontSize: 24 }}>🎙️</span>
                    <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>Voice</div>
                    <div style={{ fontSize: 11, color: theme.textLight }}>Chat</div>
                  </button>
                </div>
              </div>

              {/* Practice Sub-tabs */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button onClick={() => setPracticeTab('vocab')} style={{ ...s.btnSec, flex: 1, marginTop: 0, ...(practiceTab === 'vocab' ? { background: theme.primary, color: '#fff' } : {}) }}>📚 Vocab</button>
                <button onClick={() => setPracticeTab('verbs')} style={{ ...s.btnSec, flex: 1, marginTop: 0, ...(practiceTab === 'verbs' ? { background: theme.primary, color: '#fff' } : {}) }}>📖 Verbs</button>
              </div>

              {/* Vocabulary Decks */}
              {practiceTab === 'vocab' && (
                <div style={s.grid}>
                  {Object.entries(VOCAB).map(([id, cat]) => {
                    const mastered = cat.words.filter((_, i) => (masteredCards[`${id}-${i}`] || 0) >= 3).length;
                    return (
                      <div
                        key={id}
                        style={s.deckCard}
                        onClick={() => { setCurrentDeck(id); setCardIdx(0); setFlipped(false); setScreen('flashcards'); }}
                      >
                        <div style={{ fontSize: 28, marginBottom: 6 }}>{cat.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{cat.title}</div>
                        <div style={{ fontSize: 11, color: theme.textLight }}>{mastered}/{cat.words.length}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Verb Drills */}
              {practiceTab === 'verbs' && (
                <div style={s.grid}>
                  {Object.entries(VERBS).map(([tense, verbs]) => (
                    <div
                      key={tense}
                      style={s.deckCard}
                      onClick={() => { setVerbTense(tense); setVerbName(Object.keys(verbs)[0]); setScreen('verbs'); }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 6 }}>📖</div>
                      <div style={{ fontWeight: 600, fontSize: 13, textTransform: 'capitalize' }}>{tense}</div>
                      <div style={{ fontSize: 11, color: theme.textLight }}>{Object.keys(verbs).length} verbs</div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  // ONBOARDING
  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  // VOICE CHAT MODE
  if (showVoiceChatMode) {
    return <VoiceChatMode onBack={() => setShowVoiceChatMode(false)} />;
  }

  // PRACTICE HUB
  if (showPracticeHub) {
    return <PracticeHub onBack={() => setShowPracticeHub(false)} onVoiceChat={() => { setShowPracticeHub(false); setShowVoiceChatMode(true); }} />;
  }

  // PRACTICE TAB FULL
  if (showPracticeTab) {
    return (
      <div style={{ maxWidth: 500, margin: '0 auto', minHeight: '100vh', background: '#FAFAFA' }}>
        <div style={{ background: 'linear-gradient(135deg, #2D5A27 0%, #4A7C43 100%)', color: '#fff', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setShowPracticeTab(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }}>←</button>
          <h2 style={{ margin: 0, fontSize: 18 }}>Practice</h2>
          <div style={{ width: 40 }} />
        </div>
        <PracticeTab onVoiceChat={() => { setShowPracticeTab(false); setShowVoiceChatMode(true); }} />
      </div>
    );
  }

  // VOICE PRACTICE
    if (showVoicePractice) {
    return <VoicePractice curriculum={curriculum} onBack={() => setShowVoicePractice(false)} />;
  }

  // AI PRACTICE


  if (showAIPractice && aiPracticeDay) {


    return <AIPractice dayData={aiPracticeDay} onBack={() => { setShowAIPractice(false); setAiPracticeDay(null); }} />;


  }



  // DAY DETAIL
  // NEW: Use InteractiveCurriculum for day lessons (replaces old day/module screens)
  if (screen === 'day' || screen === 'module') {
    return (
      <InteractiveCurriculum 
        day={currentDay} 
        onBack={() => setScreen('home')}
        onComplete={() => {
          // Mark all modules complete for this day
          const newProgress = { ...progress };
          if (!newProgress[currentDay]) newProgress[currentDay] = {};
          newProgress[currentDay].grammar = true;
          newProgress[currentDay].vocabulary = true;
          newProgress[currentDay].listening = true;
          newProgress[currentDay].reading = true;
          newProgress[currentDay].completed = true;
          setProgress(newProgress);
          localStorage.setItem('fluidez_progress', JSON.stringify(newProgress));
          setScreen('home');
        }}
      />
    );
  }

  // OLD DAY HANDLER (now bypassed by above):
  if (screen === 'day') {
    const day = curriculum[currentDay];
    const mods = ['grammar', 'vocabulary', 'listening', 'reading'];
    const icons = { grammar: '📖', vocabulary: '📚', listening: '🎧', reading: '📰' };
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ margin: 0, fontSize: 18 }}>Day {currentDay}</h2>
              <p style={{ margin: 0, fontSize: 13, opacity: 0.9 }}>{day.title}</p>
            </div>
            <div style={{ width: 28 }} />
          </div>
        </div>
        <div style={s.content}>
          <div style={{ ...s.card, background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.primaryLight} 100%)`, color: '#fff' }}>
            <div style={{ fontSize: 12, opacity: 0.9, marginBottom: 4 }}>Level {day.level}</div>
            <h3 style={{ margin: 0, fontSize: 20 }}>{day.title}</h3>
            <p style={{ margin: '8px 0 0', opacity: 0.9 }}>{day.subtitle}</p>
          </div>

          <h3 style={{ marginBottom: 12 }}>Today's Modules</h3>
          {mods.map(mod => {
            const done = moduleProgress[`${currentDay}-${mod}`];
            return (
              <div
                key={mod}
                onClick={() => { setCurrentModule(mod); setModuleStep(0); setSelectedAnswer(null); setShowResult(false); setScreen('module'); }}
                style={{ ...s.card, cursor: 'pointer', marginBottom: 10, padding: 14 }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ textTransform: 'capitalize', fontWeight: 500 }}>{icons[mod]} {mod}</span>
                  <span style={{ color: done ? theme.success : theme.textLight }}>{done ? '✓ Done' : 'Start →'}</span>
                </div>
              </div>
            );
          })}

          {/* AI Practice - Unlimited exercises */}
          <div
            onClick={() => { setAiPracticeDay(curriculum[currentDay]); setShowAIPractice(true); }}
            style={{ ...s.card, cursor: 'pointer', marginBottom: 10, padding: 14, background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', color: '#fff' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 500 }}>🤖 AI Practice</span>
              <span style={{ opacity: 0.9 }}>Unlimited →</span>
            </div>

          {/* Voice Practice */}
          <div
            onClick={() => { console.log("Voice clicked"); setShowVoiceChatMode(true); }}
            style={{ ...s.card, cursor: 'pointer', marginBottom: 10, padding: 14, background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)', color: '#fff' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 500 }}>🎙️ Voice Practice</span>
              <span style={{ opacity: 0.9 }}>Conversation →</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }

  // MODULE
  if (screen === 'module' && currentModule) {
    const day = curriculum[currentDay];
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setScreen('day')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{currentModule}</span>
            <div style={{ width: 28 }} />
          </div>
        </div>
        <div style={s.content}>
          {currentModule === 'grammar' && (
            <>
              <div style={s.card}>
                <h3 style={{ marginBottom: 12 }}>{day.title}</h3>
                <p style={{ lineHeight: 1.6, color: theme.text }}>{day.grammar.content}</p>
                <div style={{ marginTop: 16 }}>
                  <strong>Examples:</strong>
                  {day.grammar.examples.map((ex, i) => (
                    <div key={i} onClick={() => speak(ex.split('(')[0])} style={{ padding: '8px 0', borderBottom: i < day.grammar.examples.length - 1 ? `1px solid ${theme.border}` : 'none', cursor: 'pointer' }}>
                      🔊 {ex}
                    </div>
                  ))}
                </div>
                <div style={s.tip}>💡 {day.grammar.tip}</div>
              </div>
              <div style={s.card}>
                <h4>Quick Check</h4>
                <p style={{ marginBottom: 12 }}>{day.exercise.q}</p>
                {day.exercise.opts.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelectedAnswer(i); setShowResult(true); }}
                    disabled={showResult}
                    style={{
                      ...s.opt,
                      background: showResult ? (i === day.exercise.a ? '#E8F5E9' : i === selectedAnswer ? '#FFEBEE' : '#fff') : '#fff',
                      borderColor: showResult ? (i === day.exercise.a ? theme.success : i === selectedAnswer ? theme.error : theme.border) : theme.border
                    }}
                  >
                    {opt}
                  </button>
                ))}
                {showResult && (
                  <div style={{ ...s.tip, background: selectedAnswer === day.exercise.a ? '#E8F5E9' : '#FFEBEE' }}>
                    {selectedAnswer === day.exercise.a ? '✓ Correct!' : `✗ The answer is: ${day.exercise.opts[day.exercise.a]}`}
                  </div>
                )}
              </div>
              <button onClick={() => completeModule('grammar')} style={s.btn}>Complete Grammar ✓</button>
            </>
          )}
          
          {currentModule === 'vocabulary' && (
            <>
              <div style={s.card}>
                <h3 style={{ marginBottom: 12 }}>Today's Vocabulary</h3>
                {day.vocabulary.map((word, i) => (
                  <div key={i} onClick={() => speak(word)} style={{ padding: '10px 0', borderBottom: i < day.vocabulary.length - 1 ? `1px solid ${theme.border}` : 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span>🔊</span>
                    <span style={{ fontWeight: 500 }}>{word}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => completeModule('vocabulary')} style={s.btn}>Complete Vocabulary ✓</button>
            </>
          )}
          
          {currentModule === 'listening' && (
            <>
              <div style={s.card}>
                <h3 style={{ marginBottom: 12 }}>🎧 Listening Practice</h3>
                <p style={{ color: theme.textLight, marginBottom: 16 }}>Listen and understand:</p>
                <div
                  onClick={() => speak(day.listening)}
                  style={{ ...s.flash, minHeight: 120, fontSize: 18, cursor: 'pointer' }}
                >
                  🔊 Tap to Listen
                </div>
                <p style={{ marginTop: 16, fontSize: 14, color: theme.textLight, fontStyle: 'italic' }}>"{day.listening}"</p>
              </div>
              <button onClick={() => completeModule('listening')} style={s.btn}>Complete Listening ✓</button>
            </>
          )}
          
          {currentModule === 'reading' && (
            <>
              <div style={s.card}>
                <h3 style={{ marginBottom: 12 }}>📰 Reading Practice</h3>
                <div style={{ background: '#F5F5F5', padding: 16, borderRadius: 12, marginBottom: 16 }}>
                  <p style={{ fontSize: 16, lineHeight: 1.8 }}>{day.reading}</p>
                </div>
                <button onClick={() => speak(day.reading)} style={s.btnSec}>🔊 Listen to Text</button>
              </div>
              <button onClick={() => completeModule('reading')} style={s.btn}>Complete Reading ✓</button>
            </>
          )}
        </div>
      </div>
    );
  }

  // FLASHCARDS
  if (screen === 'flashcards' && currentDeck) {
    const deck = VOCAB[currentDeck];
    const [spanish, english] = deck.words[cardIdx];
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => { setScreen('home'); setCurrentDeck(null); }} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <span style={{ fontWeight: 600 }}>{deck.title}</span>
            <span style={{ fontSize: 13 }}>{cardIdx + 1}/{deck.words.length}</span>
          </div>
        </div>
        <div style={s.content}>
          <div style={s.progress}><div style={{ ...s.progressFill, width: `${((cardIdx + 1) / deck.words.length) * 100}%` }} /></div>
          <div
            style={{ ...s.flash, marginTop: 20, background: flipped ? theme.primaryLight : theme.primary }}
            onClick={() => { speak(spanish); setFlipped(!flipped); }}
          >
            <div>
              <div style={{ fontSize: flipped ? 18 : 26 }}>{flipped ? english : spanish}</div>
              {flipped && <div style={{ fontSize: 14, marginTop: 8, opacity: 0.8 }}>{spanish}</div>}
            </div>
          </div>
          <p style={{ textAlign: 'center', color: theme.textLight, margin: '12px 0', fontSize: 13 }}>Tap to flip • 🔊 plays audio</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button onClick={() => { markCard(currentDeck, cardIdx, false); setFlipped(false); setCardIdx(i => Math.min(i + 1, deck.words.length - 1)); }} style={{ ...s.btnSec, background: '#FFEBEE', color: theme.error, borderColor: theme.error }}>✗ Learning</button>
            <button onClick={() => { markCard(currentDeck, cardIdx, true); setFlipped(false); setCardIdx(i => Math.min(i + 1, deck.words.length - 1)); }} style={{ ...s.btn, background: theme.success }}>✓ Got It</button>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
            <button onClick={() => { setCardIdx(i => Math.max(0, i - 1)); setFlipped(false); }} disabled={cardIdx === 0} style={{ ...s.btnSec, opacity: cardIdx === 0 ? 0.5 : 1 }}>← Prev</button>
            <button onClick={() => { if (cardIdx === deck.words.length - 1) { setScreen('home'); setCurrentDeck(null); } else { setCardIdx(i => i + 1); setFlipped(false); } }} style={s.btn}>{cardIdx === deck.words.length - 1 ? 'Done ✓' : 'Next →'}</button>
          </div>
        </div>
      </div>
    );
  }

  // VERB DRILLS
  if (screen === 'verbs') {
    const verbs = VERBS[verbTense];
    const verbList = Object.keys(verbs);
    const forms = verbs[verbName];
    const pronouns = ['yo', 'tú', 'él', 'nosotros', 'ellos'];
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{verbTense} Tense</span>
            <div style={{ width: 28 }} />
          </div>
        </div>
        <div style={s.content}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {verbList.map(v => (
              <button key={v} onClick={() => { setVerbName(v); setVerbInput(''); setVerbResult(null); }} style={{ padding: '8px 14px', borderRadius: 20, border: verbName === v ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`, background: verbName === v ? '#E8F5E9' : '#fff', cursor: 'pointer', fontWeight: verbName === v ? 600 : 400, fontSize: 14 }}>{v}</button>
            ))}
          </div>
          <div style={s.card}>
            <h2 style={{ textAlign: 'center', marginBottom: 4 }}>{verbName}</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, margin: '16px 0' }}>
              {pronouns.map(p => (
                <button key={p} onClick={() => { setPronoun(p); setVerbInput(''); setVerbResult(null); }} style={{ padding: '8px 12px', borderRadius: 8, border: pronoun === p ? `2px solid ${theme.primary}` : `1px solid ${theme.border}`, background: pronoun === p ? '#E8F5E9' : '#fff', cursor: 'pointer', fontWeight: pronoun === p ? 600 : 400 }}>{p}</button>
              ))}
            </div>
            <p style={{ textAlign: 'center', fontWeight: 600, marginBottom: 12 }}>Conjugate for "{pronoun}"</p>
            <input type="text" value={verbInput} onChange={e => setVerbInput(e.target.value)} placeholder="Type conjugation..." style={s.input} onKeyPress={e => { if (e.key === 'Enter') setVerbResult(verbInput.toLowerCase().trim() === forms[pronoun].toLowerCase() ? 'correct' : 'wrong'); }} />
            <button onClick={() => setVerbResult(verbInput.toLowerCase().trim() === forms[pronoun].toLowerCase() ? 'correct' : 'wrong')} style={s.btn}>Check</button>
            {verbResult && (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: verbResult === 'correct' ? '#E8F5E9' : '#FFEBEE', textAlign: 'center' }}>
                <strong>{verbResult === 'correct' ? '✓ Correct!' : '✗ Incorrect'}</strong>
                <p style={{ margin: '4px 0 0' }}>Answer: <strong>{forms[pronoun]}</strong></p>
              </div>
            )}
          </div>
          <div style={{ ...s.card, marginTop: 16 }}>
            <h4 style={{ marginBottom: 12 }}>Full Conjugation</h4>
            {pronouns.map(p => (
              <div key={p} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${theme.border}` }}>
                <span style={{ color: theme.textLight }}>{p}</span>
                <span style={{ fontWeight: 600 }}>{forms[p]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ASSESSMENT
  if (screen === 'assessment' && currentAssessment) {
    const assess = assessments[currentAssessment];
    const q = assess.questions[assessmentIdx];
    
    if (assessmentComplete) {
      const score = assessmentAnswers.filter((a, i) => a === assess.questions[i].a).length;
      const percent = Math.round((score / assess.questions.length) * 100);
      const passed = percent >= 70;
      return (
        <div style={s.container}>
          <div style={s.header}>
            <h2 style={{ margin: 0 }}>{assess.title} Results</h2>
          </div>
          <div style={s.content}>
            <div style={{ ...s.card, textAlign: 'center' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{passed ? '🎉' : '📚'}</div>
              <h2 style={{ marginBottom: 8 }}>{passed ? 'Passed!' : 'Keep Practicing'}</h2>
              <p style={{ fontSize: 32, fontWeight: 700, color: passed ? theme.success : theme.warning }}>{percent}%</p>
              <p style={{ color: theme.textLight }}>{score}/{assess.questions.length} correct</p>
            </div>
            <button onClick={() => setScreen('home')} style={s.btn}>Back to Home</button>
          </div>
        </div>
      );
    }
    
    return (
      <div style={s.container}>
        <div style={s.header}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}>←</button>
            <span style={{ fontWeight: 600 }}>{assess.title} Assessment</span>
            <span style={{ fontSize: 13 }}>{assessmentIdx + 1}/{assess.questions.length}</span>
          </div>
        </div>
        <div style={s.content}>
          <div style={s.progress}><div style={{ ...s.progressFill, width: `${((assessmentIdx + 1) / assess.questions.length) * 100}%` }} /></div>
          <div style={s.card}>
            <h3 style={{ marginBottom: 16 }}>{q.q}</h3>
            {q.opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => {
                  const newAnswers = [...assessmentAnswers, i];
                  setAssessmentAnswers(newAnswers);
                  if (assessmentIdx < assess.questions.length - 1) {
                    setAssessmentIdx(assessmentIdx + 1);
                  } else {
                    setAssessmentComplete(true);
                  }
                }}
                style={s.opt}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
