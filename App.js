import React, { useState, useEffect } from 'react';

const theme = {
  colors: {
    primary: '#2D5A27',
    primaryLight: '#4A7C43',
    success: '#228B22',
    warning: '#DAA520',
    error: '#CD5C5C',
    background: '#FAF9F6',
    surface: '#FFFFFF',
    text: '#2C2C2C',
    textLight: '#666666',
    border: '#E0E0E0',
  },
};

const TOTAL_DAYS = 30;

const curriculum = {
  1: {
    title: "Spanish Sounds & The Alphabet",
    subtitle: "Foundation of pronunciation",
    grammar: {
      title: "Pronunciation Fundamentals",
      screens: [
        { type: 'lesson', heading: "Welcome to Spanish!", content: "Spanish is a phonetic language—once you learn the sounds, you can pronounce any word correctly just by reading it.", tip: "Spanish has only 5 vowel sounds (English has 14+)!" },
        { type: 'lesson', heading: "The 5 Spanish Vowels", content: "Each vowel has ONE sound, always:", examples: [
          { spanish: "A = 'ah'", pronunciation: "like 'father'", word: "casa", meaning: "house" },
          { spanish: "E = 'eh'", pronunciation: "like 'pet'", word: "este", meaning: "this" },
          { spanish: "I = 'ee'", pronunciation: "like 'feet'", word: "sí", meaning: "yes" },
          { spanish: "O = 'oh'", pronunciation: "like 'hope'", word: "hola", meaning: "hello" },
          { spanish: "U = 'oo'", pronunciation: "like 'food'", word: "uno", meaning: "one" },
        ]},
        { type: 'lesson', heading: "Key Consonants", content: "These sound different from English:", examples: [
          { spanish: "H", pronunciation: "Always SILENT", word: "hola = 'oh-la'", meaning: "hello" },
          { spanish: "J", pronunciation: "Like English 'h'", word: "Juan", meaning: "John" },
          { spanish: "LL", pronunciation: "Like 'y'", word: "llamar", meaning: "to call" },
          { spanish: "Ñ", pronunciation: "Like 'ny'", word: "mañana", meaning: "tomorrow" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How is 'H' pronounced in Spanish?", options: ["Like English 'h'", "It's silent", "Like 'ch'"], correctAnswer: 1, explanation: "H is always silent in Spanish." },
      ]
    },
    vocabulary: {
      title: "Essential First Words",
      screens: [
        { type: 'vocab', category: "Greetings", words: [
          { spanish: "¡Hola!", english: "Hello!", example: "¡Hola! ¿Cómo estás?" },
          { spanish: "Buenos días", english: "Good morning", example: "Buenos días, señor." },
          { spanish: "Buenas tardes", english: "Good afternoon", example: "Buenas tardes." },
          { spanish: "Buenas noches", english: "Good evening", example: "Buenas noches." },
        ]},
        { type: 'vocab', category: "Courtesy", words: [
          { spanish: "Gracias", english: "Thank you", example: "Muchas gracias." },
          { spanish: "De nada", english: "You're welcome", example: "De nada." },
          { spanish: "Por favor", english: "Please", example: "Un café, por favor." },
          { spanish: "Adiós", english: "Goodbye", example: "Adiós, hasta luego." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "How do you say 'Good morning'?", options: ["Buenas noches", "Buenos días", "Hola"], correctAnswer: 1, explanation: "'Buenos días' = Good morning" },
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen and select:", transcript: "Buenos días", options: ["Buenas noches", "Buenos días", "Buenas tardes"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: First Conversation",
      screens: [
        { type: 'reading', title: "En el café", passage: "—¡Hola! Buenos días.\n—Buenos días. ¿Cómo estás?\n—Muy bien, gracias.\n—Un café, por favor.\n—Aquí tiene.\n—Gracias.\n—De nada.", translation: "—Hello! Good morning.\n—Good morning. How are you?\n—Very well, thanks.\n—A coffee, please.\n—Here you go.\n—Thanks.\n—You're welcome.", wordCount: 25 },
      ]
    }
  },
  2: {
    title: "Introducing Yourself",
    subtitle: "Subject pronouns & SER",
    grammar: {
      title: "Subject Pronouns & SER",
      screens: [
        { type: 'lesson', heading: "Subject Pronouns", content: "Subject pronouns tell us WHO does the action:", examples: [
          { spanish: "yo", pronunciation: "I", word: "Yo soy María.", meaning: "I am María." },
          { spanish: "tú", pronunciation: "you (informal)", word: "Tú eres mi amigo.", meaning: "You are my friend." },
          { spanish: "él/ella", pronunciation: "he/she", word: "Él es alto.", meaning: "He is tall." },
          { spanish: "nosotros", pronunciation: "we", word: "Nosotros somos estudiantes.", meaning: "We are students." },
          { spanish: "ellos", pronunciation: "they", word: "Ellos son amigos.", meaning: "They are friends." },
        ]},
        { type: 'lesson', heading: "SER Conjugation", content: "SER = to be (permanent):", examples: [
          { spanish: "yo soy", pronunciation: "I am", word: "Soy americano.", meaning: "I am American." },
          { spanish: "tú eres", pronunciation: "you are", word: "Eres inteligente.", meaning: "You are intelligent." },
          { spanish: "él/ella es", pronunciation: "he/she is", word: "Es alta.", meaning: "She is tall." },
          { spanish: "nosotros somos", pronunciation: "we are", word: "Somos amigos.", meaning: "We are friends." },
          { spanish: "ellos son", pronunciation: "they are", word: "Son estudiantes.", meaning: "They are students." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ estudiante.", options: ["soy", "eres", "es", "somos"], correctAnswer: 0, explanation: "Yo soy = I am" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ella ___ doctora.", options: ["soy", "eres", "es", "son"], correctAnswer: 2, explanation: "Ella es = She is" },
      ]
    },
    vocabulary: {
      title: "Personal Information",
      screens: [
        { type: 'vocab', category: "Introductions", words: [
          { spanish: "¿Cómo te llamas?", english: "What's your name?", example: "¡Hola! ¿Cómo te llamas?" },
          { spanish: "Me llamo...", english: "My name is...", example: "Me llamo Juan." },
          { spanish: "Mucho gusto", english: "Nice to meet you", example: "Mucho gusto." },
          { spanish: "¿De dónde eres?", english: "Where are you from?", example: "Soy de México." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen:", transcript: "Me llamo Carlos", options: ["My friend is Carlos", "My name is Carlos", "I call Carlos"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Meeting Someone",
      screens: [
        { type: 'reading', title: "Nueva estudiante", passage: "Hoy hay una estudiante nueva. Se llama Ana y es de Colombia. Es muy simpática.", translation: "Today there is a new student. Her name is Ana and she is from Colombia. She is very nice.", wordCount: 20 },
      ]
    }
  },
  3: {
    title: "Being & Describing",
    subtitle: "SER vs ESTAR",
    grammar: {
      title: "SER vs ESTAR",
      screens: [
        { type: 'lesson', heading: "Two Verbs for 'To Be'", content: "SER = permanent. ESTAR = temporary/location.", tip: "This is the most important distinction in Spanish!" },
        { type: 'lesson', heading: "ESTAR Conjugation", content: "ESTAR = to be (temporary):", examples: [
          { spanish: "yo estoy", pronunciation: "I am", word: "Estoy cansado.", meaning: "I am tired." },
          { spanish: "tú estás", pronunciation: "you are", word: "¿Estás bien?", meaning: "Are you okay?" },
          { spanish: "él/ella está", pronunciation: "he/she is", word: "Está en casa.", meaning: "He is at home." },
          { spanish: "nosotros estamos", pronunciation: "we are", word: "Estamos contentos.", meaning: "We are happy." },
          { spanish: "ellos están", pronunciation: "they are", word: "Están aquí.", meaning: "They are here." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "María ___ en la oficina. (location)", options: ["es", "está"], correctAnswer: 1, explanation: "Use ESTAR for location." },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ella ___ doctora. (profession)", options: ["es", "está"], correctAnswer: 0, explanation: "Use SER for profession." },
      ]
    },
    vocabulary: {
      title: "Descriptions",
      screens: [
        { type: 'vocab', category: "Physical (SER)", words: [
          { spanish: "alto/a", english: "tall", example: "Mi padre es alto." },
          { spanish: "bajo/a", english: "short", example: "Mi madre es baja." },
          { spanish: "grande", english: "big", example: "La casa es grande." },
        ]},
        { type: 'vocab', category: "Emotions (ESTAR)", words: [
          { spanish: "contento/a", english: "happy", example: "Estoy contento." },
          { spanish: "triste", english: "sad", example: "Está triste." },
          { spanish: "cansado/a", english: "tired", example: "Estoy cansado." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Listen:", transcript: "Estoy muy cansado", options: ["I'm happy", "I'm tired", "I'm tall"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Descriptions",
      screens: [
        { type: 'reading', title: "Mi familia", passage: "Mi padre es alto. Mi madre es baja. Hoy estoy cansado pero estoy feliz.", translation: "My father is tall. My mother is short. Today I am tired but I am happy.", wordCount: 20 },
      ]
    }
  },
  4: {
    title: "Present Tense Regular Verbs",
    subtitle: "-AR, -ER, -IR conjugations",
    grammar: {
      title: "Regular Verb Conjugation",
      screens: [
        { type: 'lesson', heading: "The Three Verb Families", content: "Spanish verbs end in -AR, -ER, or -IR.", tip: "Learn these patterns—they apply to hundreds of verbs!" },
        { type: 'lesson', heading: "-AR Verbs: HABLAR", content: "Remove -AR and add:", examples: [
          { spanish: "yo hablo", pronunciation: "I speak", word: "Hablo español.", meaning: "I speak Spanish." },
          { spanish: "tú hablas", pronunciation: "you speak", word: "¿Hablas inglés?", meaning: "Do you speak English?" },
          { spanish: "él habla", pronunciation: "he speaks", word: "Habla rápido.", meaning: "He speaks fast." },
          { spanish: "nosotros hablamos", pronunciation: "we speak", word: "Hablamos español.", meaning: "We speak Spanish." },
          { spanish: "ellos hablan", pronunciation: "they speak", word: "Hablan mucho.", meaning: "They speak a lot." },
        ]},
        { type: 'lesson', heading: "-ER/-IR Verbs", content: "Similar pattern:", examples: [
          { spanish: "comer: como, comes, come, comemos, comen", pronunciation: "to eat", word: "Como a las doce.", meaning: "I eat at twelve." },
          { spanish: "vivir: vivo, vives, vive, vivimos, viven", pronunciation: "to live", word: "Vivo en Madrid.", meaning: "I live in Madrid." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ español. (hablar)", options: ["hablo", "hablas", "habla"], correctAnswer: 0, explanation: "Yo hablo = I speak" },
      ]
    },
    vocabulary: {
      title: "Daily Activities",
      screens: [
        { type: 'vocab', category: "Common Verbs", words: [
          { spanish: "trabajar", english: "to work", example: "Trabajo mucho." },
          { spanish: "estudiar", english: "to study", example: "Estudio español." },
          { spanish: "comer", english: "to eat", example: "Como a la una." },
          { spanish: "vivir", english: "to live", example: "Vivo en Madrid." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What does the person do?", transcript: "Trabajo en una oficina", options: ["Studies", "Works in an office", "Lives"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Daily Routine",
      screens: [
        { type: 'reading', title: "Un día típico", passage: "Me llamo Roberto. Trabajo en una oficina. Como a la una. Vivo en Madrid.", translation: "My name is Roberto. I work in an office. I eat at one. I live in Madrid.", wordCount: 20 },
      ]
    }
  },
  5: {
    title: "Essential Irregular Verbs",
    subtitle: "IR, TENER, HACER",
    grammar: {
      title: "Key Irregular Verbs",
      screens: [
        { type: 'lesson', heading: "IR (to go)", content: "Completely irregular:", examples: [
          { spanish: "yo voy", pronunciation: "I go", word: "Voy al trabajo.", meaning: "I go to work." },
          { spanish: "tú vas", pronunciation: "you go", word: "¿Adónde vas?", meaning: "Where are you going?" },
          { spanish: "él va", pronunciation: "he goes", word: "Va al cine.", meaning: "He goes to the movies." },
          { spanish: "nosotros vamos", pronunciation: "we go", word: "Vamos a la playa.", meaning: "We go to the beach." },
          { spanish: "ellos van", pronunciation: "they go", word: "Van de vacaciones.", meaning: "They go on vacation." },
        ]},
        { type: 'lesson', heading: "TENER (to have)", content: "Irregular yo + stem change:", examples: [
          { spanish: "yo tengo", pronunciation: "I have", word: "Tengo dos hermanos.", meaning: "I have two siblings." },
          { spanish: "tú tienes", pronunciation: "you have", word: "¿Tienes hambre?", meaning: "Are you hungry?" },
          { spanish: "él tiene", pronunciation: "he has", word: "Tiene mucho trabajo.", meaning: "He has a lot of work." },
        ]},
        { type: 'lesson', heading: "TENER Expressions", content: "Used where English uses 'to be':", examples: [
          { spanish: "tener hambre", pronunciation: "to be hungry", word: "Tengo hambre.", meaning: "I am hungry." },
          { spanish: "tener sed", pronunciation: "to be thirsty", word: "Tengo sed.", meaning: "I am thirsty." },
          { spanish: "tener...años", pronunciation: "to be...years old", word: "Tengo 25 años.", meaning: "I am 25." },
          { spanish: "tener que", pronunciation: "to have to", word: "Tengo que estudiar.", meaning: "I have to study." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I am hungry' is:", options: ["Estoy hambre", "Soy hambre", "Tengo hambre"], correctAnswer: 2, explanation: "Tengo hambre (use TENER)" },
      ]
    },
    vocabulary: {
      title: "Places",
      screens: [
        { type: 'vocab', category: "Common Places", words: [
          { spanish: "la casa", english: "house/home", example: "Voy a casa." },
          { spanish: "el trabajo", english: "work", example: "Voy al trabajo." },
          { spanish: "el supermercado", english: "supermarket", example: "Voy al supermercado." },
          { spanish: "el cine", english: "movie theater", example: "Vamos al cine." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Where?", transcript: "Voy al supermercado", options: ["Bank", "Supermarket", "Restaurant"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Weekend Plans",
      screens: [
        { type: 'reading', title: "El fin de semana", passage: "El sábado voy al gimnasio. Tengo que ir al supermercado. Quiero ir al cine con mis amigos.", translation: "On Saturday I go to the gym. I have to go to the supermarket. I want to go to the movies with my friends.", wordCount: 25 },
      ]
    }
  },
  6: {
    title: "Questions & Negation",
    subtitle: "Forming questions and saying no",
    grammar: {
      title: "Question Formation",
      screens: [
        { type: 'lesson', heading: "Question Words", content: "All have accents:", examples: [
          { spanish: "¿Qué?", pronunciation: "What?", word: "¿Qué quieres?", meaning: "What do you want?" },
          { spanish: "¿Quién?", pronunciation: "Who?", word: "¿Quién es?", meaning: "Who is it?" },
          { spanish: "¿Dónde?", pronunciation: "Where?", word: "¿Dónde vives?", meaning: "Where do you live?" },
          { spanish: "¿Cuándo?", pronunciation: "When?", word: "¿Cuándo llegas?", meaning: "When do you arrive?" },
          { spanish: "¿Por qué?", pronunciation: "Why?", word: "¿Por qué?", meaning: "Why?" },
          { spanish: "¿Cómo?", pronunciation: "How?", word: "¿Cómo estás?", meaning: "How are you?" },
        ]},
        { type: 'lesson', heading: "Negation", content: "Put 'no' before the verb:", examples: [
          { spanish: "No hablo francés.", pronunciation: "I don't speak French", word: "", meaning: "" },
          { spanish: "No tengo tiempo.", pronunciation: "I don't have time", word: "", meaning: "" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Where do you live?'", options: ["¿Qué vives?", "¿Dónde vives?", "¿Cómo vives?"], correctAnswer: 1, explanation: "¿Dónde? = Where?" },
      ]
    },
    vocabulary: {
      title: "Conversation",
      screens: [
        { type: 'vocab', category: "Opinions", words: [
          { spanish: "me gusta", english: "I like", example: "Me gusta el chocolate." },
          { spanish: "no me gusta", english: "I don't like", example: "No me gusta el café." },
          { spanish: "me encanta", english: "I love", example: "Me encanta la música." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What is asked?", transcript: "¿Dónde está el banco?", options: ["What is the bank?", "Where is the bank?", "When?"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Conversation",
      screens: [
        { type: 'reading', title: "En la calle", passage: "—¿Dónde está el banco?\n—No sé. No soy de aquí.\n—Gracias.", translation: "—Where is the bank?\n—I don't know. I'm not from here.\n—Thanks.", wordCount: 15 },
      ]
    }
  },
  7: {
    title: "Week 1 Review",
    subtitle: "Consolidating your foundation",
    grammar: {
      title: "Comprehensive Review",
      screens: [
        { type: 'lesson', heading: "Week 1 Summary", content: "You've learned essential Spanish!", examples: [
          { spanish: "Day 1-2", pronunciation: "SER + pronouns", word: "Soy estudiante.", meaning: "I am a student." },
          { spanish: "Day 3", pronunciation: "SER vs ESTAR", word: "Estoy cansado.", meaning: "I am tired." },
          { spanish: "Day 4-5", pronunciation: "Verbs", word: "Voy al trabajo.", meaning: "I go to work." },
          { spanish: "Day 6", pronunciation: "Questions", word: "¿Dónde vives?", meaning: "Where do you live?" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ella ___ de México. (origin)", options: ["es", "está"], correctAnswer: 0, explanation: "Origin uses SER" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Él ___ en la oficina. (location)", options: ["es", "está"], correctAnswer: 1, explanation: "Location uses ESTAR" },
      ]
    },
    vocabulary: {
      title: "Review Vocabulary",
      screens: [
        { type: 'vocab', category: "Essential Verbs", words: [
          { spanish: "ser", english: "to be (permanent)", example: "Soy estudiante." },
          { spanish: "estar", english: "to be (temporary)", example: "Estoy bien." },
          { spanish: "ir", english: "to go", example: "Voy a casa." },
          { spanish: "tener", english: "to have", example: "Tengo hambre." },
        ]},
      ]
    },
    listening: {
      title: "Listening Review",
      screens: [
        { type: 'listening', instruction: "🔊 Listen:", transcript: "Soy de Colombia y vivo en Madrid", options: ["From Madrid, lives in Colombia", "From Colombia, lives in Madrid"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Introduction",
      screens: [
        { type: 'reading', title: "Mi presentación", passage: "Me llamo Carlos. Soy de Argentina pero vivo en Madrid. Tengo treinta años. Soy ingeniero.", translation: "My name is Carlos. I'm from Argentina but I live in Madrid. I'm thirty years old. I'm an engineer.", wordCount: 22 },
      ]
    }
  },
  8: {
    title: "Preterite Tense: -AR Verbs",
    subtitle: "Completed past actions",
    grammar: {
      title: "Preterite -AR",
      screens: [
        { type: 'lesson', heading: "The Preterite", content: "For completed past actions.", tip: "English: 'I spoke', 'I ate'" },
        { type: 'lesson', heading: "-AR Preterite Endings", content: "Remove -AR and add:", examples: [
          { spanish: "yo hablé", pronunciation: "I spoke", word: "Hablé con María.", meaning: "I spoke with María." },
          { spanish: "tú hablaste", pronunciation: "you spoke", word: "¿Hablaste con él?", meaning: "Did you speak with him?" },
          { spanish: "él habló", pronunciation: "he spoke", word: "Habló muy bien.", meaning: "He spoke very well." },
          { spanish: "nosotros hablamos", pronunciation: "we spoke", word: "Hablamos ayer.", meaning: "We spoke yesterday." },
          { spanish: "ellos hablaron", pronunciation: "they spoke", word: "Hablaron mucho.", meaning: "They spoke a lot." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ con María ayer. (hablar)", options: ["hablo", "hablé", "habló"], correctAnswer: 1, explanation: "Yo hablé = I spoke" },
      ]
    },
    vocabulary: {
      title: "Time Expressions",
      screens: [
        { type: 'vocab', category: "Past Time", words: [
          { spanish: "ayer", english: "yesterday", example: "Ayer trabajé." },
          { spanish: "anoche", english: "last night", example: "Anoche cené tarde." },
          { spanish: "la semana pasada", english: "last week", example: "La semana pasada estudié." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 When?", transcript: "Ayer trabajé mucho", options: ["Today", "Yesterday", "Tomorrow"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Yesterday",
      screens: [
        { type: 'reading', title: "Mi día ayer", passage: "Ayer trabajé mucho. Llegué a casa a las ocho. Cené y llamé a mi madre.", translation: "Yesterday I worked a lot. I arrived home at eight. I had dinner and called my mother.", wordCount: 20 },
      ]
    }
  },
  9: {
    title: "Preterite: -ER/-IR & Irregulars",
    subtitle: "More past tense patterns",
    grammar: {
      title: "Preterite -ER/-IR & Irregulars",
      screens: [
        { type: 'lesson', heading: "-ER/-IR Preterite", content: "Same endings for both:", examples: [
          { spanish: "yo comí / viví", pronunciation: "I ate / lived", word: "Comí pizza.", meaning: "I ate pizza." },
          { spanish: "tú comiste", pronunciation: "you ate", word: "¿Comiste bien?", meaning: "Did you eat well?" },
          { spanish: "él comió", pronunciation: "he ate", word: "Comió mucho.", meaning: "He ate a lot." },
        ]},
        { type: 'lesson', heading: "IR & SER (Same!)", content: "Identical in preterite:", examples: [
          { spanish: "fui", pronunciation: "I went / was", word: "Fui al cine.", meaning: "I went to movies." },
          { spanish: "fue", pronunciation: "he went / was", word: "Fue increíble.", meaning: "It was incredible." },
          { spanish: "fuimos", pronunciation: "we went / were", word: "Fuimos a España.", meaning: "We went to Spain." },
        ]},
        { type: 'lesson', heading: "HACER", content: "Key irregular:", examples: [
          { spanish: "hice", pronunciation: "I did", word: "Hice la tarea.", meaning: "I did homework." },
          { spanish: "hizo", pronunciation: "he did", word: "Hizo ejercicio.", meaning: "He exercised." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Yo ___ a la fiesta. (ir)", options: ["fui", "fue", "fueron"], correctAnswer: 0, explanation: "Yo fui = I went" },
      ]
    },
    vocabulary: {
      title: "Travel",
      screens: [
        { type: 'vocab', category: "Travel Verbs", words: [
          { spanish: "viajar", english: "to travel", example: "Viajé a México." },
          { spanish: "llegar", english: "to arrive", example: "Llegué tarde." },
          { spanish: "visitar", english: "to visit", example: "Visité el museo." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Where?", transcript: "Fui a Barcelona", options: ["Madrid", "Barcelona", "Seville"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: A Trip",
      screens: [
        { type: 'reading', title: "Mi viaje", passage: "El año pasado fui a Barcelona. Visité la Sagrada Familia. ¡Fue increíble!", translation: "Last year I went to Barcelona. I visited the Sagrada Familia. It was incredible!", wordCount: 18 },
      ]
    }
  },
  10: {
    title: "The Imperfect Tense",
    subtitle: "Habitual past actions",
    grammar: {
      title: "Imperfect Tense",
      screens: [
        { type: 'lesson', heading: "Imperfect vs Preterite", content: "IMPERFECT = ongoing, habitual past.", tip: "Think: 'used to', 'was doing'" },
        { type: 'lesson', heading: "-AR Imperfect", content: "Remove -AR and add:", examples: [
          { spanish: "yo hablaba", pronunciation: "I used to speak", word: "Hablaba español.", meaning: "I used to speak Spanish." },
          { spanish: "tú hablabas", pronunciation: "you used to speak", word: "Hablabas mucho.", meaning: "You used to talk a lot." },
          { spanish: "él hablaba", pronunciation: "he used to speak", word: "Hablaba rápido.", meaning: "He used to speak fast." },
        ]},
        { type: 'lesson', heading: "Only 3 Irregulars!", content: "SER, IR, VER:", examples: [
          { spanish: "era", pronunciation: "I was (ser)", word: "Era estudiante.", meaning: "I was a student." },
          { spanish: "iba", pronunciation: "I used to go", word: "Iba al cine.", meaning: "I used to go to movies." },
          { spanish: "veía", pronunciation: "I used to see", word: "Veía televisión.", meaning: "I used to watch TV." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Cuando era niño, ___ al parque. (ir)", options: ["fui", "iba", "voy"], correctAnswer: 1, explanation: "Habitual → imperfect: iba" },
      ]
    },
    vocabulary: {
      title: "Childhood",
      screens: [
        { type: 'vocab', category: "Childhood", words: [
          { spanish: "cuando era niño", english: "when I was a child", example: "Cuando era niño, jugaba mucho." },
          { spanish: "siempre", english: "always", example: "Siempre íbamos a la playa." },
          { spanish: "todos los días", english: "every day", example: "Todos los días comía helado." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Habitual or single event?", transcript: "Cuando era joven, iba al gimnasio todos los días", options: ["Single event", "Habitual action"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Childhood",
      screens: [
        { type: 'reading', title: "Mi infancia", passage: "Cuando era niño, vivía en un pueblo pequeño. Todos los días jugaba con mis hermanos. La vida era más simple.", translation: "When I was a child, I lived in a small town. Every day I played with my siblings. Life was simpler.", wordCount: 25 },
      ]
    }
  },
  11: {
    title: "Preterite vs Imperfect",
    subtitle: "Using both tenses together",
    grammar: {
      title: "Combining Tenses",
      screens: [
        { type: 'lesson', heading: "The Key Distinction", content: "Preterite = completed. Imperfect = ongoing/habitual.", tip: "Imperfect sets scene, preterite advances action." },
        { type: 'lesson', heading: "Together in Stories", content: "Imperfect for background, preterite for action:", examples: [
          { spanish: "Era de noche...", pronunciation: "Setting scene", word: "It was nighttime...", meaning: "(imperfect)" },
          { spanish: "...cuando oí un ruido.", pronunciation: "Action", word: "...when I heard a noise.", meaning: "(preterite)" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Mientras yo ___ (estudiar), mi hermano llegó.", options: ["estudié", "estudiaba"], correctAnswer: 1, explanation: "Ongoing action → imperfect" },
      ]
    },
    vocabulary: {
      title: "Story Connectors",
      screens: [
        { type: 'vocab', category: "Connectors", words: [
          { spanish: "mientras", english: "while", example: "Mientras comía, leía." },
          { spanish: "de repente", english: "suddenly", example: "De repente, oí un ruido." },
          { spanish: "entonces", english: "then", example: "Entonces decidí salir." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What was happening?", transcript: "Mientras dormía, sonó el teléfono", options: ["Eating", "Sleeping", "Reading"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: A Story",
      screens: [
        { type: 'reading', title: "El accidente", passage: "Era un día normal. Hacía sol. Caminaba por el parque. De repente, oí un ruido fuerte.", translation: "It was a normal day. It was sunny. I was walking through the park. Suddenly, I heard a loud noise.", wordCount: 25 },
      ]
    }
  },
  12: {
    title: "Direct Object Pronouns",
    subtitle: "Me, te, lo, la, nos, los, las",
    grammar: {
      title: "Direct Object Pronouns",
      screens: [
        { type: 'lesson', heading: "What are Direct Objects?", content: "Direct objects receive the action directly. 'I see THE BOOK' → 'I see IT'", tip: "Pronouns replace nouns to avoid repetition." },
        { type: 'lesson', heading: "The Pronouns", content: "Direct object pronouns:", examples: [
          { spanish: "me", pronunciation: "me", word: "Me ves.", meaning: "You see me." },
          { spanish: "te", pronunciation: "you", word: "Te llamo.", meaning: "I call you." },
          { spanish: "lo", pronunciation: "him/it (masc)", word: "Lo tengo.", meaning: "I have it." },
          { spanish: "la", pronunciation: "her/it (fem)", word: "La veo.", meaning: "I see her." },
          { spanish: "nos", pronunciation: "us", word: "Nos conocen.", meaning: "They know us." },
          { spanish: "los/las", pronunciation: "them", word: "Los compro.", meaning: "I buy them." },
        ]},
        { type: 'lesson', heading: "Placement", content: "Before conjugated verb OR attached to infinitive:", examples: [
          { spanish: "Lo veo.", pronunciation: "I see it.", word: "Before verb", meaning: "" },
          { spanish: "Quiero verlo.", pronunciation: "I want to see it.", word: "Attached to infinitive", meaning: "" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "I have it (el libro): ___ tengo.", options: ["Le", "Lo", "La"], correctAnswer: 1, explanation: "Lo = it (masculine)" },
      ]
    },
    vocabulary: {
      title: "Common Verbs with Objects",
      screens: [
        { type: 'vocab', category: "Transitive Verbs", words: [
          { spanish: "ver", english: "to see", example: "Lo veo todos los días." },
          { spanish: "llamar", english: "to call", example: "Te llamo mañana." },
          { spanish: "comprar", english: "to buy", example: "La compré ayer." },
          { spanish: "conocer", english: "to know (person)", example: "Lo conozco bien." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What does 'Lo' refer to?", transcript: "El libro es interesante. Lo leo cada día.", options: ["The person", "The book", "The day"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Using Pronouns",
      screens: [
        { type: 'reading', title: "Mi rutina", passage: "Tengo un coche nuevo. Lo uso todos los días. También tengo una bicicleta. La uso los fines de semana.", translation: "I have a new car. I use it every day. I also have a bicycle. I use it on weekends.", wordCount: 25 },
      ]
    }
  },
  13: {
    title: "Indirect Object Pronouns",
    subtitle: "Me, te, le, nos, les",
    grammar: {
      title: "Indirect Object Pronouns",
      screens: [
        { type: 'lesson', heading: "What are Indirect Objects?", content: "Indirect objects receive the action indirectly. 'I give THE BOOK to HIM' → 'I give it TO HIM'", tip: "Usually answers 'to whom?' or 'for whom?'" },
        { type: 'lesson', heading: "The Pronouns", content: "Indirect object pronouns:", examples: [
          { spanish: "me", pronunciation: "to me", word: "Me da el libro.", meaning: "He gives me the book." },
          { spanish: "te", pronunciation: "to you", word: "Te escribo.", meaning: "I write to you." },
          { spanish: "le", pronunciation: "to him/her/you", word: "Le digo la verdad.", meaning: "I tell him the truth." },
          { spanish: "nos", pronunciation: "to us", word: "Nos explica.", meaning: "He explains to us." },
          { spanish: "les", pronunciation: "to them", word: "Les hablo.", meaning: "I speak to them." },
        ]},
        { type: 'lesson', heading: "Double Pronouns", content: "When both appear, indirect comes first:", examples: [
          { spanish: "Me lo da.", pronunciation: "He gives it to me.", word: "IO + DO", meaning: "" },
          { spanish: "Te la compro.", pronunciation: "I buy it for you.", word: "IO + DO", meaning: "" },
          { spanish: "Se lo digo.", pronunciation: "I tell it to him.", word: "le/les → se before lo/la", meaning: "" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'He gives me the book': ___ da el libro.", options: ["Lo me", "Me", "Le"], correctAnswer: 1, explanation: "Me = to me (indirect)" },
      ]
    },
    vocabulary: {
      title: "Giving & Receiving",
      screens: [
        { type: 'vocab', category: "Common Verbs", words: [
          { spanish: "dar", english: "to give", example: "Me da un regalo." },
          { spanish: "decir", english: "to tell/say", example: "Te digo la verdad." },
          { spanish: "escribir", english: "to write", example: "Le escribo una carta." },
          { spanish: "enviar", english: "to send", example: "Les envío un mensaje." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Who receives?", transcript: "Mi madre me da dinero", options: ["Mother receives", "I receive", "Both receive"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Communication",
      screens: [
        { type: 'reading', title: "La comunicación", passage: "Mi amigo me escribe todos los días. Le respondo por la noche. Nos contamos todo.", translation: "My friend writes to me every day. I respond to him at night. We tell each other everything.", wordCount: 22 },
      ]
    }
  },
  14: {
    title: "Reflexive Verbs",
    subtitle: "Actions done to oneself",
    grammar: {
      title: "Reflexive Verbs",
      screens: [
        { type: 'lesson', heading: "What are Reflexive Verbs?", content: "When the subject does the action to themselves. 'I wash MYSELF'", tip: "Very common in Spanish daily routines!" },
        { type: 'lesson', heading: "Reflexive Pronouns", content: "Match the subject:", examples: [
          { spanish: "me", pronunciation: "myself", word: "Me lavo.", meaning: "I wash myself." },
          { spanish: "te", pronunciation: "yourself", word: "Te despiertas.", meaning: "You wake up." },
          { spanish: "se", pronunciation: "himself/herself", word: "Se ducha.", meaning: "He showers." },
          { spanish: "nos", pronunciation: "ourselves", word: "Nos vestimos.", meaning: "We get dressed." },
          { spanish: "se", pronunciation: "themselves", word: "Se acuestan.", meaning: "They go to bed." },
        ]},
        { type: 'lesson', heading: "Common Reflexive Verbs", content: "Daily routine verbs:", examples: [
          { spanish: "levantarse", pronunciation: "to get up", word: "Me levanto a las 7.", meaning: "I get up at 7." },
          { spanish: "ducharse", pronunciation: "to shower", word: "Me ducho.", meaning: "I shower." },
          { spanish: "vestirse", pronunciation: "to get dressed", word: "Me visto.", meaning: "I get dressed." },
          { spanish: "acostarse", pronunciation: "to go to bed", word: "Me acuesto tarde.", meaning: "I go to bed late." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I wake up': ___ despierto.", options: ["Se", "Me", "Te"], correctAnswer: 1, explanation: "Me = myself" },
      ]
    },
    vocabulary: {
      title: "Daily Routine",
      screens: [
        { type: 'vocab', category: "Morning Routine", words: [
          { spanish: "despertarse", english: "to wake up", example: "Me despierto temprano." },
          { spanish: "levantarse", english: "to get up", example: "Me levanto a las siete." },
          { spanish: "ducharse", english: "to shower", example: "Me ducho con agua fría." },
          { spanish: "peinarse", english: "to comb hair", example: "Me peino rápido." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What time?", transcript: "Me levanto a las seis de la mañana", options: ["5 AM", "6 AM", "7 AM"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Morning Routine",
      screens: [
        { type: 'reading', title: "Mi mañana", passage: "Me despierto a las seis. Me levanto y me ducho. Después me visto y desayuno. Me voy de casa a las siete.", translation: "I wake up at six. I get up and shower. Then I get dressed and have breakfast. I leave home at seven.", wordCount: 28 },
      ]
    }
  },
  15: {
    title: "Week 2 Review",
    subtitle: "Past tenses & pronouns",
    grammar: {
      title: "Week 2 Review",
      screens: [
        { type: 'lesson', heading: "What We've Learned", content: "Week 2 covered past tenses and pronouns!", examples: [
          { spanish: "Preterite", pronunciation: "completed actions", word: "Hablé ayer.", meaning: "I spoke yesterday." },
          { spanish: "Imperfect", pronunciation: "habitual/ongoing", word: "Hablaba mucho.", meaning: "I used to speak a lot." },
          { spanish: "Direct Objects", pronunciation: "lo, la, los, las", word: "Lo veo.", meaning: "I see it." },
          { spanish: "Indirect Objects", pronunciation: "me, te, le, nos, les", word: "Me da.", meaning: "He gives me." },
          { spanish: "Reflexives", pronunciation: "me, te, se, nos, se", word: "Me levanto.", meaning: "I get up." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Ayer ___ al cine. (ir - completed)", options: ["iba", "fui"], correctAnswer: 1, explanation: "Completed action → preterite" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I see him': ___ veo.", options: ["Le", "Lo", "Se"], correctAnswer: 1, explanation: "Lo = him (direct object)" },
      ]
    },
    vocabulary: {
      title: "Review Vocabulary",
      screens: [
        { type: 'vocab', category: "Key Verbs", words: [
          { spanish: "levantarse", english: "to get up", example: "Me levanto temprano." },
          { spanish: "dar", english: "to give", example: "Le doy un regalo." },
          { spanish: "ver", english: "to see", example: "Lo veo." },
        ]},
      ]
    },
    listening: {
      title: "Listening Review",
      screens: [
        { type: 'listening', instruction: "🔊 Preterite or Imperfect?", transcript: "Cuando era niño, jugaba en el parque", options: ["Preterite", "Imperfect"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Review",
      screens: [
        { type: 'reading', title: "Mi día ayer", passage: "Ayer me desperté temprano. Me duché y desayuné. Fui al trabajo. Mi jefe me dio un proyecto nuevo.", translation: "Yesterday I woke up early. I showered and had breakfast. I went to work. My boss gave me a new project.", wordCount: 25 },
      ]
    }
  },
  16: {
    title: "Gustar & Similar Verbs",
    subtitle: "Expressing likes and interests",
    grammar: {
      title: "Gustar Construction",
      screens: [
        { type: 'lesson', heading: "How Gustar Works", content: "Gustar literally means 'to please'. The thing liked is the SUBJECT.", tip: "'Me gusta el café' = 'Coffee pleases me'" },
        { type: 'lesson', heading: "The Pattern", content: "Indirect object + gusta/gustan + subject:", examples: [
          { spanish: "Me gusta el café.", pronunciation: "I like coffee.", word: "gusta = singular", meaning: "" },
          { spanish: "Me gustan los libros.", pronunciation: "I like books.", word: "gustan = plural", meaning: "" },
          { spanish: "Te gusta bailar.", pronunciation: "You like to dance.", word: "gusta + infinitive", meaning: "" },
        ]},
        { type: 'lesson', heading: "Similar Verbs", content: "Same pattern:", examples: [
          { spanish: "encantar", pronunciation: "to love", word: "Me encanta la música.", meaning: "I love music." },
          { spanish: "interesar", pronunciation: "to interest", word: "Me interesa el arte.", meaning: "Art interests me." },
          { spanish: "molestar", pronunciation: "to bother", word: "Me molesta el ruido.", meaning: "Noise bothers me." },
          { spanish: "faltar", pronunciation: "to lack/need", word: "Me falta tiempo.", meaning: "I need time." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I like books': Me ___ los libros.", options: ["gusta", "gustan", "gusto"], correctAnswer: 1, explanation: "Gustan = plural (los libros)" },
      ]
    },
    vocabulary: {
      title: "Likes & Dislikes",
      screens: [
        { type: 'vocab', category: "Expressing Preferences", words: [
          { spanish: "me encanta", english: "I love", example: "Me encanta viajar." },
          { spanish: "me interesa", english: "I'm interested in", example: "Me interesa la historia." },
          { spanish: "no me gusta", english: "I don't like", example: "No me gusta madrugar." },
          { spanish: "me fascina", english: "I'm fascinated by", example: "Me fascina el espacio." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What does the person like?", transcript: "Me encanta la comida mexicana", options: ["Italian food", "Mexican food", "Spanish food"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Preferences",
      screens: [
        { type: 'reading', title: "Mis gustos", passage: "Me encanta la música pero no me gusta bailar. Me interesan los deportes. Me fascinan las películas de ciencia ficción.", translation: "I love music but I don't like to dance. I'm interested in sports. I'm fascinated by science fiction movies.", wordCount: 25 },
      ]
    }
  },
  17: {
    title: "Comparatives & Superlatives",
    subtitle: "Making comparisons",
    grammar: {
      title: "Comparisons",
      screens: [
        { type: 'lesson', heading: "Comparatives", content: "Comparing two things:", examples: [
          { spanish: "más...que", pronunciation: "more...than", word: "Soy más alto que tú.", meaning: "I'm taller than you." },
          { spanish: "menos...que", pronunciation: "less...than", word: "Es menos caro que ese.", meaning: "It's cheaper than that one." },
          { spanish: "tan...como", pronunciation: "as...as", word: "Soy tan alto como él.", meaning: "I'm as tall as him." },
        ]},
        { type: 'lesson', heading: "Irregular Comparatives", content: "Some have special forms:", examples: [
          { spanish: "bueno → mejor", pronunciation: "good → better", word: "Este es mejor.", meaning: "This one is better." },
          { spanish: "malo → peor", pronunciation: "bad → worse", word: "Es peor que antes.", meaning: "It's worse than before." },
          { spanish: "grande → mayor", pronunciation: "big → bigger/older", word: "Soy mayor que mi hermano.", meaning: "I'm older than my brother." },
          { spanish: "pequeño → menor", pronunciation: "small → smaller/younger", word: "Es menor que yo.", meaning: "He's younger than me." },
        ]},
        { type: 'lesson', heading: "Superlatives", content: "The most/least:", examples: [
          { spanish: "el/la más + adj", pronunciation: "the most", word: "Es el más alto.", meaning: "He's the tallest." },
          { spanish: "el/la menos + adj", pronunciation: "the least", word: "Es la menos cara.", meaning: "It's the least expensive." },
          { spanish: "el mejor", pronunciation: "the best", word: "Es el mejor restaurante.", meaning: "It's the best restaurant." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'She is taller than me': Es más alta ___ yo.", options: ["de", "que", "como"], correctAnswer: 1, explanation: "más...que = more...than" },
      ]
    },
    vocabulary: {
      title: "Comparison Words",
      screens: [
        { type: 'vocab', category: "Useful Phrases", words: [
          { spanish: "mejor que", english: "better than", example: "Este es mejor que ese." },
          { spanish: "peor que", english: "worse than", example: "Es peor que ayer." },
          { spanish: "igual que", english: "same as", example: "Es igual que antes." },
          { spanish: "diferente de", english: "different from", example: "Es diferente de los otros." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Who is taller?", transcript: "Juan es más alto que Pedro", options: ["Pedro", "Juan", "Same height"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Comparisons",
      screens: [
        { type: 'reading', title: "Mis hermanos", passage: "Tengo dos hermanos. Mi hermano mayor es más alto que yo. Mi hermana menor es la más inteligente de la familia.", translation: "I have two siblings. My older brother is taller than me. My younger sister is the smartest in the family.", wordCount: 28 },
      ]
    }
  },
  18: {
    title: "Por vs Para",
    subtitle: "Two words for 'for'",
    grammar: {
      title: "Por vs Para",
      screens: [
        { type: 'lesson', heading: "PARA", content: "Destination, purpose, deadline:", examples: [
          { spanish: "Destination", pronunciation: "toward", word: "Voy para Madrid.", meaning: "I'm heading to Madrid." },
          { spanish: "Purpose", pronunciation: "in order to", word: "Estudio para aprender.", meaning: "I study to learn." },
          { spanish: "Deadline", pronunciation: "by/for", word: "Para el lunes.", meaning: "By Monday." },
          { spanish: "Recipient", pronunciation: "for someone", word: "Es para ti.", meaning: "It's for you." },
        ]},
        { type: 'lesson', heading: "POR", content: "Cause, exchange, duration, through:", examples: [
          { spanish: "Cause", pronunciation: "because of", word: "Por la lluvia.", meaning: "Because of the rain." },
          { spanish: "Exchange", pronunciation: "in exchange for", word: "Gracias por todo.", meaning: "Thanks for everything." },
          { spanish: "Duration", pronunciation: "for (time)", word: "Por dos horas.", meaning: "For two hours." },
          { spanish: "Through", pronunciation: "through/along", word: "Camino por el parque.", meaning: "I walk through the park." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Thanks for the gift': Gracias ___ el regalo.", options: ["para", "por"], correctAnswer: 1, explanation: "Por = thanks FOR (exchange/gratitude)" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'This is for you': Esto es ___ ti.", options: ["para", "por"], correctAnswer: 0, explanation: "Para = FOR you (recipient)" },
      ]
    },
    vocabulary: {
      title: "Common Expressions",
      screens: [
        { type: 'vocab', category: "With Por", words: [
          { spanish: "por favor", english: "please", example: "Un café, por favor." },
          { spanish: "por supuesto", english: "of course", example: "¡Por supuesto!" },
          { spanish: "por eso", english: "that's why", example: "Por eso no vine." },
          { spanish: "por fin", english: "finally", example: "¡Por fin llegaste!" },
        ]},
        { type: 'vocab', category: "With Para", words: [
          { spanish: "para siempre", english: "forever", example: "Te amaré para siempre." },
          { spanish: "para nada", english: "not at all", example: "No me molesta para nada." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Why?", transcript: "No fui a trabajar por la lluvia", options: ["For the rain", "Despite the rain", "Because of the rain"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "Reading: Travel",
      screens: [
        { type: 'reading', title: "Mi viaje", passage: "Salgo para México mañana. Voy por dos semanas. El viaje es para visitar a mi familia. Gracias por tu ayuda.", translation: "I leave for Mexico tomorrow. I'm going for two weeks. The trip is to visit my family. Thanks for your help.", wordCount: 28 },
      ]
    }
  },
  19: {
    title: "Demonstratives",
    subtitle: "This, that, these, those",
    grammar: {
      title: "Demonstrative Adjectives",
      screens: [
        { type: 'lesson', heading: "Three Levels of Distance", content: "Spanish has three levels:", examples: [
          { spanish: "este/esta/estos/estas", pronunciation: "this/these (near me)", word: "Este libro es mío.", meaning: "This book is mine." },
          { spanish: "ese/esa/esos/esas", pronunciation: "that/those (near you)", word: "Ese libro es tuyo.", meaning: "That book is yours." },
          { spanish: "aquel/aquella/aquellos/aquellas", pronunciation: "that/those (far)", word: "Aquel libro es viejo.", meaning: "That book (over there) is old." },
        ]},
        { type: 'lesson', heading: "Agreement", content: "Must match gender and number:", examples: [
          { spanish: "este chico / esta chica", pronunciation: "this boy / this girl", word: "masculine / feminine", meaning: "" },
          { spanish: "estos libros / estas casas", pronunciation: "these books / these houses", word: "plural forms", meaning: "" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'This house' (la casa):", options: ["Este casa", "Esta casa", "Esto casa"], correctAnswer: 1, explanation: "Esta = feminine singular" },
      ]
    },
    vocabulary: {
      title: "Location Words",
      screens: [
        { type: 'vocab', category: "Here & There", words: [
          { spanish: "aquí", english: "here", example: "Estoy aquí." },
          { spanish: "ahí", english: "there (near you)", example: "Está ahí." },
          { spanish: "allí/allá", english: "over there", example: "Está allí." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Which one?", transcript: "Quiero este libro, no ese", options: ["The far one", "The near one", "Both"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Shopping",
      screens: [
        { type: 'reading', title: "En la tienda", passage: "—¿Cuánto cuesta este vestido?\n—Este cuesta cincuenta euros. Ese cuesta treinta.\n—Prefiero ese azul de allí.\n—¿Aquel? Son cuarenta euros.", translation: "—How much is this dress?\n—This one costs fifty euros. That one costs thirty.\n—I prefer that blue one over there.\n—That one? It's forty euros.", wordCount: 30 },
      ]
    }
  },
  20: {
    title: "Possessives",
    subtitle: "My, your, his, her, our, their",
    grammar: {
      title: "Possessive Adjectives",
      screens: [
        { type: 'lesson', heading: "Short Form (Before Noun)", content: "Unstressed possessives:", examples: [
          { spanish: "mi/mis", pronunciation: "my", word: "mi libro, mis libros", meaning: "my book, my books" },
          { spanish: "tu/tus", pronunciation: "your (informal)", word: "tu casa, tus casas", meaning: "your house, your houses" },
          { spanish: "su/sus", pronunciation: "his/her/your/their", word: "su coche, sus coches", meaning: "his/her car, his/her cars" },
          { spanish: "nuestro/a/os/as", pronunciation: "our", word: "nuestro padre", meaning: "our father" },
        ]},
        { type: 'lesson', heading: "Long Form (After Noun)", content: "Stressed possessives:", examples: [
          { spanish: "mío/mía/míos/mías", pronunciation: "mine", word: "Es mío.", meaning: "It's mine." },
          { spanish: "tuyo/tuya/tuyos/tuyas", pronunciation: "yours", word: "Es tuyo.", meaning: "It's yours." },
          { spanish: "suyo/suya/suyos/suyas", pronunciation: "his/hers/theirs", word: "Es suyo.", meaning: "It's his/hers." },
          { spanish: "nuestro/nuestra", pronunciation: "ours", word: "Es nuestro.", meaning: "It's ours." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'My house' (la casa):", options: ["mío casa", "mi casa", "mis casa"], correctAnswer: 1, explanation: "Mi = my (singular)" },
      ]
    },
    vocabulary: {
      title: "Family & Belongings",
      screens: [
        { type: 'vocab', category: "Possessions", words: [
          { spanish: "el mío", english: "mine", example: "El coche azul es el mío." },
          { spanish: "el tuyo", english: "yours", example: "¿Este es el tuyo?" },
          { spanish: "el suyo", english: "his/hers/theirs", example: "El suyo es más grande." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Whose?", transcript: "Este libro es mío, ese es tuyo", options: ["Both mine", "Both yours", "One each"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "Reading: Family",
      screens: [
        { type: 'reading', title: "Nuestra familia", passage: "Mi hermana y yo vivimos con nuestros padres. Mi habitación es pequeña pero la suya es grande. Nuestro perro duerme en mi cuarto.", translation: "My sister and I live with our parents. My room is small but hers is big. Our dog sleeps in my room.", wordCount: 30 },
      ]
    }
  },
  21: {
    title: "Week 3 Review",
    subtitle: "Grammar consolidation",
    grammar: {
      title: "Week 3 Review",
      screens: [
        { type: 'lesson', heading: "What We've Learned", content: "Week 3 covered important structures!", examples: [
          { spanish: "Gustar", pronunciation: "Me gusta + noun", word: "Me gusta el café.", meaning: "I like coffee." },
          { spanish: "Comparatives", pronunciation: "más/menos...que", word: "Soy más alto que tú.", meaning: "I'm taller than you." },
          { spanish: "Por vs Para", pronunciation: "different uses of 'for'", word: "Es para ti. / Gracias por todo.", meaning: "" },
          { spanish: "Demonstratives", pronunciation: "este, ese, aquel", word: "Este libro es bueno.", meaning: "This book is good." },
          { spanish: "Possessives", pronunciation: "mi, tu, su, nuestro", word: "Mi casa es tu casa.", meaning: "My house is your house." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I like movies': Me ___ las películas.", options: ["gusta", "gustan"], correctAnswer: 1, explanation: "Gustan = plural" },
      ]
    },
    vocabulary: {
      title: "Review Vocabulary",
      screens: [
        { type: 'vocab', category: "Key Expressions", words: [
          { spanish: "me encanta", english: "I love (it)", example: "Me encanta bailar." },
          { spanish: "mejor que", english: "better than", example: "Es mejor que antes." },
          { spanish: "por supuesto", english: "of course", example: "¡Por supuesto!" },
        ]},
      ]
    },
    listening: {
      title: "Listening Review",
      screens: [
        { type: 'listening', instruction: "🔊 What does the person prefer?", transcript: "Me gusta más este que ese", options: ["That one", "This one", "Neither"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Review",
      screens: [
        { type: 'reading', title: "Mis preferencias", passage: "Me encantan los libros. Este libro es mejor que ese. Es un regalo para mi hermano. Gracias por recomendarlo.", translation: "I love books. This book is better than that one. It's a gift for my brother. Thanks for recommending it.", wordCount: 26 },
      ]
    }
  },
  22: {
    title: "Future Tense",
    subtitle: "Talking about future plans",
    grammar: {
      title: "Future Tense",
      screens: [
        { type: 'lesson', heading: "Future Formation", content: "Add endings to the FULL infinitive:", examples: [
          { spanish: "yo hablaré", pronunciation: "I will speak", word: "Hablaré con él.", meaning: "I will speak with him." },
          { spanish: "tú hablarás", pronunciation: "you will speak", word: "Hablarás mañana.", meaning: "You will speak tomorrow." },
          { spanish: "él hablará", pronunciation: "he will speak", word: "Hablará en la reunión.", meaning: "He will speak at the meeting." },
          { spanish: "nosotros hablaremos", pronunciation: "we will speak", word: "Hablaremos después.", meaning: "We will speak later." },
          { spanish: "ellos hablarán", pronunciation: "they will speak", word: "Hablarán español.", meaning: "They will speak Spanish." },
        ]},
        { type: 'lesson', heading: "Irregular Stems", content: "Some verbs have irregular stems:", examples: [
          { spanish: "tener → tendr-", pronunciation: "will have", word: "Tendré tiempo.", meaning: "I will have time." },
          { spanish: "poder → podr-", pronunciation: "will be able", word: "Podré ir.", meaning: "I will be able to go." },
          { spanish: "hacer → har-", pronunciation: "will do/make", word: "Haré la tarea.", meaning: "I will do homework." },
          { spanish: "decir → dir-", pronunciation: "will say", word: "Diré la verdad.", meaning: "I will tell the truth." },
          { spanish: "salir → saldr-", pronunciation: "will leave", word: "Saldré temprano.", meaning: "I will leave early." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I will eat' (comer):", options: ["comeré", "comerá", "comerás"], correctAnswer: 0, explanation: "Yo comeré = I will eat" },
      ]
    },
    vocabulary: {
      title: "Future Time",
      screens: [
        { type: 'vocab', category: "Time Expressions", words: [
          { spanish: "mañana", english: "tomorrow", example: "Mañana estudiaré." },
          { spanish: "la semana que viene", english: "next week", example: "Viajaré la semana que viene." },
          { spanish: "el próximo año", english: "next year", example: "El próximo año iré a España." },
          { spanish: "pronto", english: "soon", example: "Llegaré pronto." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 When?", transcript: "Mañana iré al médico", options: ["Yesterday", "Today", "Tomorrow"], correctAnswer: 2 },
      ]
    },
    reading: {
      title: "Reading: Future Plans",
      screens: [
        { type: 'reading', title: "Mis planes", passage: "El próximo verano viajaré a España. Visitaré Madrid y Barcelona. Comeré tapas y practicaré español. Será un viaje increíble.", translation: "Next summer I will travel to Spain. I will visit Madrid and Barcelona. I will eat tapas and practice Spanish. It will be an incredible trip.", wordCount: 30 },
      ]
    }
  },
  23: {
    title: "Conditional Tense",
    subtitle: "Would, could, should",
    grammar: {
      title: "Conditional Tense",
      screens: [
        { type: 'lesson', heading: "Conditional Formation", content: "Same stems as future + different endings:", examples: [
          { spanish: "yo hablaría", pronunciation: "I would speak", word: "Hablaría con él.", meaning: "I would speak with him." },
          { spanish: "tú hablarías", pronunciation: "you would speak", word: "¿Hablarías con ella?", meaning: "Would you speak with her?" },
          { spanish: "él hablaría", pronunciation: "he would speak", word: "Hablaría si pudiera.", meaning: "He would speak if he could." },
          { spanish: "nosotros hablaríamos", pronunciation: "we would speak", word: "Hablaríamos español.", meaning: "We would speak Spanish." },
          { spanish: "ellos hablarían", pronunciation: "they would speak", word: "Hablarían más.", meaning: "They would speak more." },
        ]},
        { type: 'lesson', heading: "Uses", content: "Common uses of conditional:", examples: [
          { spanish: "Hypothetical", pronunciation: "would", word: "Iría si tuviera dinero.", meaning: "I would go if I had money." },
          { spanish: "Polite requests", pronunciation: "could you", word: "¿Podría ayudarme?", meaning: "Could you help me?" },
          { spanish: "Advice", pronunciation: "should", word: "Deberías estudiar.", meaning: "You should study." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I would like' (gustar):", options: ["me gustaría", "me gustará", "me gustaba"], correctAnswer: 0, explanation: "Me gustaría = I would like" },
      ]
    },
    vocabulary: {
      title: "Polite Expressions",
      screens: [
        { type: 'vocab', category: "Polite Requests", words: [
          { spanish: "me gustaría", english: "I would like", example: "Me gustaría un café." },
          { spanish: "podría", english: "could (I/you)", example: "¿Podría repetir?" },
          { spanish: "debería", english: "should", example: "Debería irme." },
          { spanish: "sería", english: "it would be", example: "Sería perfecto." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What does the person want?", transcript: "Me gustaría un café con leche", options: ["Tea", "Coffee with milk", "Water"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Wishes",
      screens: [
        { type: 'reading', title: "Sueños", passage: "Si tuviera más dinero, viajaría por el mundo. Visitaría muchos países. Aprendería nuevos idiomas. Sería una vida increíble.", translation: "If I had more money, I would travel the world. I would visit many countries. I would learn new languages. It would be an incredible life.", wordCount: 30 },
      ]
    }
  },
  24: {
    title: "Present Subjunctive Intro",
    subtitle: "A new mood",
    grammar: {
      title: "Subjunctive Mood",
      screens: [
        { type: 'lesson', heading: "What is the Subjunctive?", content: "A mood for wishes, doubts, emotions, and non-facts.", tip: "If it's uncertain, emotional, or desired → subjunctive" },
        { type: 'lesson', heading: "Formation", content: "Opposite vowels: -AR verbs use -e, -ER/-IR use -a:", examples: [
          { spanish: "hablar → hable, hables, hable, hablemos, hablen", pronunciation: "-AR verb", word: "Quiero que hables.", meaning: "I want you to speak." },
          { spanish: "comer → coma, comas, coma, comamos, coman", pronunciation: "-ER verb", word: "Espero que coma.", meaning: "I hope he eats." },
          { spanish: "vivir → viva, vivas, viva, vivamos, vivan", pronunciation: "-IR verb", word: "Ojalá que viva.", meaning: "I hope he lives." },
        ]},
        { type: 'lesson', heading: "Key Irregulars", content: "Important irregular forms:", examples: [
          { spanish: "ser → sea", pronunciation: "be", word: "Quiero que sea feliz.", meaning: "I want him to be happy." },
          { spanish: "estar → esté", pronunciation: "be", word: "Espero que esté bien.", meaning: "I hope he's okay." },
          { spanish: "ir → vaya", pronunciation: "go", word: "Quiero que vaya.", meaning: "I want him to go." },
          { spanish: "tener → tenga", pronunciation: "have", word: "Espero que tenga tiempo.", meaning: "I hope he has time." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I want you to speak': Quiero que ___.", options: ["hablas", "hables", "hablar"], correctAnswer: 1, explanation: "Subjunctive after 'quiero que'" },
      ]
    },
    vocabulary: {
      title: "Subjunctive Triggers",
      screens: [
        { type: 'vocab', category: "Expressions", words: [
          { spanish: "quiero que", english: "I want (someone to)", example: "Quiero que vengas." },
          { spanish: "espero que", english: "I hope that", example: "Espero que estés bien." },
          { spanish: "ojalá que", english: "hopefully/I wish", example: "Ojalá que llueva." },
          { spanish: "es importante que", english: "it's important that", example: "Es importante que estudies." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What does the person want?", transcript: "Quiero que vengas a mi fiesta", options: ["To come to party", "To leave", "To stay home"], correctAnswer: 0 },
      ]
    },
    reading: {
      title: "Reading: Wishes",
      screens: [
        { type: 'reading', title: "Deseos", passage: "Quiero que mi familia esté feliz. Espero que mis hijos tengan éxito. Ojalá que el mundo sea mejor. Es importante que trabajemos juntos.", translation: "I want my family to be happy. I hope my children are successful. I hope the world is better. It's important that we work together.", wordCount: 32 },
      ]
    }
  },
  25: {
    title: "Subjunctive: Wishes & Desires",
    subtitle: "Expressing what you want",
    grammar: {
      title: "Subjunctive with Wishes",
      screens: [
        { type: 'lesson', heading: "Wishes Require Subjunctive", content: "When you want someone ELSE to do something:", examples: [
          { spanish: "Quiero que estudies.", pronunciation: "I want you to study.", word: "Different subjects", meaning: "" },
          { spanish: "Quiero estudiar.", pronunciation: "I want to study.", word: "Same subject = infinitive", meaning: "" },
        ]},
        { type: 'lesson', heading: "Common Wish Verbs", content: "Verbs that trigger subjunctive:", examples: [
          { spanish: "querer que", pronunciation: "to want that", word: "Quiero que vengas.", meaning: "I want you to come." },
          { spanish: "desear que", pronunciation: "to wish that", word: "Deseo que seas feliz.", meaning: "I wish you to be happy." },
          { spanish: "preferir que", pronunciation: "to prefer that", word: "Prefiero que te quedes.", meaning: "I prefer you to stay." },
          { spanish: "necesitar que", pronunciation: "to need that", word: "Necesito que me ayudes.", meaning: "I need you to help me." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I prefer that you stay': Prefiero que ___.", options: ["quedas", "quedes", "quedar"], correctAnswer: 1, explanation: "Subjunctive after 'prefiero que'" },
      ]
    },
    vocabulary: {
      title: "Making Requests",
      screens: [
        { type: 'vocab', category: "Polite Requests", words: [
          { spanish: "quiero que", english: "I want (you to)", example: "Quiero que me escuches." },
          { spanish: "necesito que", english: "I need (you to)", example: "Necesito que lo hagas." },
          { spanish: "te pido que", english: "I ask you to", example: "Te pido que tengas paciencia." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What is needed?", transcript: "Necesito que llegues temprano", options: ["Arrive late", "Arrive early", "Stay home"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Parents' Wishes",
      screens: [
        { type: 'reading', title: "Padres", passage: "Mis padres quieren que estudie medicina. Prefieren que viva cerca de ellos. Necesitan que los visite más. Desean que sea feliz.", translation: "My parents want me to study medicine. They prefer that I live near them. They need me to visit them more. They wish for me to be happy.", wordCount: 32 },
      ]
    }
  },
  26: {
    title: "Subjunctive: Doubt & Emotion",
    subtitle: "Expressing feelings",
    grammar: {
      title: "Subjunctive with Doubt/Emotion",
      screens: [
        { type: 'lesson', heading: "Doubt Expressions", content: "Uncertainty triggers subjunctive:", examples: [
          { spanish: "dudo que", pronunciation: "I doubt that", word: "Dudo que venga.", meaning: "I doubt he'll come." },
          { spanish: "no creo que", pronunciation: "I don't think that", word: "No creo que sea verdad.", meaning: "I don't think it's true." },
          { spanish: "es posible que", pronunciation: "it's possible that", word: "Es posible que llueva.", meaning: "It might rain." },
          { spanish: "no es seguro que", pronunciation: "it's not certain that", word: "No es seguro que venga.", meaning: "It's not certain he'll come." },
        ]},
        { type: 'lesson', heading: "Emotion Expressions", content: "Feelings trigger subjunctive:", examples: [
          { spanish: "me alegra que", pronunciation: "I'm glad that", word: "Me alegra que estés aquí.", meaning: "I'm glad you're here." },
          { spanish: "me sorprende que", pronunciation: "it surprises me that", word: "Me sorprende que digas eso.", meaning: "It surprises me you say that." },
          { spanish: "tengo miedo de que", pronunciation: "I'm afraid that", word: "Tengo miedo de que pase.", meaning: "I'm afraid it will happen." },
          { spanish: "es triste que", pronunciation: "it's sad that", word: "Es triste que se vaya.", meaning: "It's sad that he's leaving." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I doubt he'll come': Dudo que ___.", options: ["viene", "venga", "venir"], correctAnswer: 1, explanation: "Subjunctive after 'dudo que'" },
      ]
    },
    vocabulary: {
      title: "Emotions",
      screens: [
        { type: 'vocab', category: "Feelings", words: [
          { spanish: "me alegra que", english: "I'm happy that", example: "Me alegra que estés bien." },
          { spanish: "me molesta que", english: "it bothers me that", example: "Me molesta que llegues tarde." },
          { spanish: "me preocupa que", english: "it worries me that", example: "Me preocupa que no comas." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 How does the person feel?", transcript: "Me alegra que estés aquí conmigo", options: ["Sad", "Happy", "Worried"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Feelings",
      screens: [
        { type: 'reading', title: "Emociones", passage: "Me alegra que mi hermano esté mejor. No creo que necesite más tratamiento. Es posible que salga del hospital mañana. Tengo miedo de que vuelva a enfermarse.", translation: "I'm glad my brother is better. I don't think he needs more treatment. It's possible he'll leave the hospital tomorrow. I'm afraid he'll get sick again.", wordCount: 35 },
      ]
    }
  },
  27: {
    title: "Commands (Imperative)",
    subtitle: "Telling people what to do",
    grammar: {
      title: "Commands",
      screens: [
        { type: 'lesson', heading: "Informal (Tú) Commands", content: "Positive = él form. Negative = subjunctive:", examples: [
          { spanish: "Habla.", pronunciation: "Speak! (positive)", word: "Same as él/ella form", meaning: "" },
          { spanish: "No hables.", pronunciation: "Don't speak!", word: "Subjunctive", meaning: "" },
          { spanish: "Come.", pronunciation: "Eat!", word: "él/ella form", meaning: "" },
          { spanish: "No comas.", pronunciation: "Don't eat!", word: "Subjunctive", meaning: "" },
        ]},
        { type: 'lesson', heading: "Irregular Tú Commands", content: "8 common irregular positives:", examples: [
          { spanish: "ven", pronunciation: "come", word: "¡Ven aquí!", meaning: "Come here!" },
          { spanish: "di", pronunciation: "say/tell", word: "Dime.", meaning: "Tell me." },
          { spanish: "haz", pronunciation: "do/make", word: "Haz la tarea.", meaning: "Do the homework." },
          { spanish: "pon", pronunciation: "put", word: "Pon la mesa.", meaning: "Set the table." },
          { spanish: "sal", pronunciation: "leave", word: "Sal de aquí.", meaning: "Get out of here." },
          { spanish: "ten", pronunciation: "have", word: "Ten cuidado.", meaning: "Be careful." },
          { spanish: "ve", pronunciation: "go", word: "Ve a casa.", meaning: "Go home." },
          { spanish: "sé", pronunciation: "be", word: "Sé bueno.", meaning: "Be good." },
        ]},
        { type: 'lesson', heading: "Formal (Usted) Commands", content: "Always use subjunctive form:", examples: [
          { spanish: "Hable.", pronunciation: "Speak! (formal)", word: "Subjunctive", meaning: "" },
          { spanish: "No hable.", pronunciation: "Don't speak! (formal)", word: "Same form", meaning: "" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'Come here!' (tú, venir):", options: ["Vienes", "Ven", "Vengas"], correctAnswer: 1, explanation: "Ven = irregular tú command" },
      ]
    },
    vocabulary: {
      title: "Common Commands",
      screens: [
        { type: 'vocab', category: "Daily Commands", words: [
          { spanish: "espera", english: "wait", example: "¡Espera un momento!" },
          { spanish: "mira", english: "look", example: "Mira esto." },
          { spanish: "escucha", english: "listen", example: "Escucha bien." },
          { spanish: "cállate", english: "be quiet", example: "¡Cállate, por favor!" },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 What should the person do?", transcript: "Ven aquí y siéntate", options: ["Go away", "Come and sit", "Stand up"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Instructions",
      screens: [
        { type: 'reading', title: "Receta", passage: "Primero, pon agua en una olla. Espera hasta que hierva. Añade la pasta. No la cocines demasiado. Prueba y sirve.", translation: "First, put water in a pot. Wait until it boils. Add the pasta. Don't cook it too much. Taste and serve.", wordCount: 28 },
      ]
    }
  },
  28: {
    title: "Week 4 Review",
    subtitle: "Advanced grammar review",
    grammar: {
      title: "Week 4 Review",
      screens: [
        { type: 'lesson', heading: "What We've Learned", content: "Week 4 covered advanced grammar!", examples: [
          { spanish: "Future", pronunciation: "hablaré", word: "Mañana hablaré.", meaning: "Tomorrow I will speak." },
          { spanish: "Conditional", pronunciation: "hablaría", word: "Hablaría si pudiera.", meaning: "I would speak if I could." },
          { spanish: "Subjunctive", pronunciation: "hable", word: "Quiero que hables.", meaning: "I want you to speak." },
          { spanish: "Commands", pronunciation: "habla/no hables", word: "¡Habla! / ¡No hables!", meaning: "Speak! / Don't speak!" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I will go' (ir):", options: ["voy", "iré", "iría"], correctAnswer: 1, explanation: "Iré = future" },
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I hope you come': Espero que ___.", options: ["vienes", "vengas", "vendrás"], correctAnswer: 1, explanation: "Subjunctive after 'espero que'" },
      ]
    },
    vocabulary: {
      title: "Review Vocabulary",
      screens: [
        { type: 'vocab', category: "Key Expressions", words: [
          { spanish: "mañana", english: "tomorrow", example: "Mañana iré." },
          { spanish: "me gustaría", english: "I would like", example: "Me gustaría ir." },
          { spanish: "espero que", english: "I hope that", example: "Espero que vengas." },
        ]},
      ]
    },
    listening: {
      title: "Listening Review",
      screens: [
        { type: 'listening', instruction: "🔊 Future or conditional?", transcript: "Mañana iré al cine", options: ["Conditional", "Future"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Review",
      screens: [
        { type: 'reading', title: "Planes", passage: "Mañana iré a España. Me gustaría quedarme un mes. Espero que haga buen tiempo. ¡Ven conmigo si puedes!", translation: "Tomorrow I will go to Spain. I would like to stay a month. I hope the weather is nice. Come with me if you can!", wordCount: 28 },
      ]
    }
  },
  29: {
    title: "Advanced Conversation",
    subtitle: "Putting it all together",
    grammar: {
      title: "Conversation Skills",
      screens: [
        { type: 'lesson', heading: "Expressing Opinions", content: "Different ways to share your view:", examples: [
          { spanish: "Creo que...", pronunciation: "I think that...", word: "Creo que es verdad.", meaning: "I think it's true." },
          { spanish: "Me parece que...", pronunciation: "It seems to me...", word: "Me parece que sí.", meaning: "It seems so to me." },
          { spanish: "En mi opinión...", pronunciation: "In my opinion...", word: "En mi opinión, es bueno.", meaning: "In my opinion, it's good." },
          { spanish: "Pienso que...", pronunciation: "I think that...", word: "Pienso que tienes razón.", meaning: "I think you're right." },
        ]},
        { type: 'lesson', heading: "Agreeing & Disagreeing", content: "Useful expressions:", examples: [
          { spanish: "Estoy de acuerdo.", pronunciation: "I agree.", word: "", meaning: "" },
          { spanish: "No estoy de acuerdo.", pronunciation: "I disagree.", word: "", meaning: "" },
          { spanish: "Tienes razón.", pronunciation: "You're right.", word: "", meaning: "" },
          { spanish: "No es así.", pronunciation: "That's not how it is.", word: "", meaning: "" },
          { spanish: "Depende.", pronunciation: "It depends.", word: "", meaning: "" },
        ]},
        { type: 'lesson', heading: "Connecting Ideas", content: "Flow better in conversation:", examples: [
          { spanish: "además", pronunciation: "besides/also", word: "Además, es barato.", meaning: "Besides, it's cheap." },
          { spanish: "sin embargo", pronunciation: "however", word: "Sin embargo, no me gusta.", meaning: "However, I don't like it." },
          { spanish: "por lo tanto", pronunciation: "therefore", word: "Por lo tanto, no iré.", meaning: "Therefore, I won't go." },
          { spanish: "en cambio", pronunciation: "on the other hand", word: "En cambio, esto es mejor.", meaning: "On the other hand, this is better." },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "'I agree':", options: ["Estoy de acuerdo", "Tengo razón", "Creo que"], correctAnswer: 0, explanation: "Estoy de acuerdo = I agree" },
      ]
    },
    vocabulary: {
      title: "Conversation Fillers",
      screens: [
        { type: 'vocab', category: "Natural Speech", words: [
          { spanish: "bueno", english: "well...", example: "Bueno, no sé." },
          { spanish: "pues", english: "well/so", example: "Pues, creo que sí." },
          { spanish: "o sea", english: "I mean", example: "O sea, no me gustó." },
          { spanish: "a ver", english: "let's see", example: "A ver... sí, aquí está." },
        ]},
      ]
    },
    listening: {
      title: "Listening Practice",
      screens: [
        { type: 'listening', instruction: "🔊 Does the person agree?", transcript: "No estoy de acuerdo, creo que es diferente", options: ["Yes", "No", "Partially"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Discussion",
      screens: [
        { type: 'reading', title: "Debate", passage: "—Creo que el cambio climático es serio.\n—Estoy de acuerdo. Además, necesitamos actuar ahora.\n—Sin embargo, algunos no lo creen.\n—Tienes razón. Por lo tanto, debemos educar.", translation: "—I think climate change is serious.\n—I agree. Besides, we need to act now.\n—However, some don't believe it.\n—You're right. Therefore, we must educate.", wordCount: 35 },
      ]
    }
  },
  30: {
    title: "Final Assessment",
    subtitle: "Celebrate your achievement!",
    grammar: {
      title: "Course Summary",
      screens: [
        { type: 'lesson', heading: "¡Felicidades!", content: "You've completed 30 days of Spanish!", examples: [
          { spanish: "Week 1", pronunciation: "Foundation", word: "SER, ESTAR, present tense", meaning: "" },
          { spanish: "Week 2", pronunciation: "Past Tenses", word: "Preterite, imperfect, pronouns", meaning: "" },
          { spanish: "Week 3", pronunciation: "Structures", word: "Gustar, comparatives, por/para", meaning: "" },
          { spanish: "Week 4", pronunciation: "Advanced", word: "Future, conditional, subjunctive", meaning: "" },
        ]},
        { type: 'lesson', heading: "What You Can Do Now", content: "Your Spanish abilities:", examples: [
          { spanish: "Introduce yourself", pronunciation: "", word: "Me llamo... Soy de...", meaning: "" },
          { spanish: "Describe people/places", pronunciation: "", word: "Es alto. Está cansado.", meaning: "" },
          { spanish: "Talk about past", pronunciation: "", word: "Ayer fui... Cuando era niño...", meaning: "" },
          { spanish: "Express wishes", pronunciation: "", word: "Quiero que... Espero que...", meaning: "" },
          { spanish: "Make polite requests", pronunciation: "", word: "Me gustaría... ¿Podría...?", meaning: "" },
        ]},
        { type: 'exercise', exerciseType: 'multiple_choice', instruction: "Best translation for 'I was eating when he arrived':", options: ["Comí cuando llegó", "Comía cuando llegó", "Comeré cuando llegue"], correctAnswer: 1, explanation: "Imperfect (ongoing) + preterite (interruption)" },
      ]
    },
    vocabulary: {
      title: "Final Vocabulary",
      screens: [
        { type: 'vocab', category: "Celebration", words: [
          { spanish: "¡Felicidades!", english: "Congratulations!", example: "¡Felicidades por terminar!" },
          { spanish: "lo lograste", english: "you did it", example: "¡Lo lograste!" },
          { spanish: "sigue adelante", english: "keep going", example: "¡Sigue adelante con el español!" },
        ]},
      ]
    },
    listening: {
      title: "Final Listening",
      screens: [
        { type: 'listening', instruction: "🔊 What's the message?", transcript: "Felicidades, has completado el curso de español", options: ["Welcome", "Congratulations on completing", "See you tomorrow"], correctAnswer: 1 },
      ]
    },
    reading: {
      title: "Reading: Your Journey",
      screens: [
        { type: 'reading', title: "Tu viaje", passage: "Has trabajado mucho durante treinta días. Ahora puedes hablar español básico. Espero que sigas practicando. El español te abrirá muchas puertas. ¡Buena suerte!", translation: "You have worked hard for thirty days. Now you can speak basic Spanish. I hope you keep practicing. Spanish will open many doors for you. Good luck!", wordCount: 35 },
      ]
    }
  }
};

const allFlashcards = [
  { id: 1, front: "hola", back: "hello", day: 1 },
  { id: 2, front: "gracias", back: "thank you", day: 1 },
  { id: 3, front: "por favor", back: "please", day: 1 },
  { id: 4, front: "yo soy", back: "I am (ser)", day: 2 },
  { id: 5, front: "me llamo", back: "my name is", day: 2 },
  { id: 6, front: "estoy", back: "I am (estar)", day: 3 },
  { id: 7, front: "cansado", back: "tired", day: 3 },
  { id: 8, front: "hablo", back: "I speak", day: 4 },
  { id: 9, front: "voy", back: "I go", day: 5 },
  { id: 10, front: "tengo", back: "I have", day: 5 },
  { id: 11, front: "tengo hambre", back: "I'm hungry", day: 5 },
  { id: 12, front: "¿dónde?", back: "where?", day: 6 },
  { id: 13, front: "me gusta", back: "I like", day: 6 },
  { id: 14, front: "hablé", back: "I spoke", day: 8 },
  { id: 15, front: "ayer", back: "yesterday", day: 8 },
  { id: 16, front: "fui", back: "I went/was", day: 9 },
  { id: 17, front: "hablaba", back: "I used to speak", day: 10 },
  { id: 18, front: "era", back: "I was (imperfect)", day: 10 },
  { id: 19, front: "mientras", back: "while", day: 11 },
  { id: 20, front: "de repente", back: "suddenly", day: 11 },
  { id: 21, front: "lo/la", back: "it/him/her (direct)", day: 12 },
  { id: 22, front: "me/te/le", back: "to me/you/him (indirect)", day: 13 },
  { id: 23, front: "me levanto", back: "I get up", day: 14 },
  { id: 24, front: "me gusta", back: "I like (lit: it pleases me)", day: 16 },
  { id: 25, front: "más...que", back: "more...than", day: 17 },
  { id: 26, front: "por", back: "for/through/because of", day: 18 },
  { id: 27, front: "para", back: "for/in order to", day: 18 },
  { id: 28, front: "este/esta", back: "this", day: 19 },
  { id: 29, front: "mi/mis", back: "my", day: 20 },
  { id: 30, front: "hablaré", back: "I will speak", day: 22 },
  { id: 31, front: "hablaría", back: "I would speak", day: 23 },
  { id: 32, front: "hable", back: "speak (subjunctive)", day: 24 },
  { id: 33, front: "quiero que", back: "I want (someone to)", day: 25 },
  { id: 34, front: "espero que", back: "I hope that", day: 26 },
  { id: 35, front: "¡ven!", back: "come! (command)", day: 27 },
  { id: 36, front: "estoy de acuerdo", back: "I agree", day: 29 },
  { id: 37, front: "¡felicidades!", back: "congratulations!", day: 30 },
];

const assessments = {
  week1: { title: "Week 1 Assessment", passingScore: 70, questions: [
    { question: "'I am' with SER:", options: ["estoy", "soy", "tengo"], correctAnswer: 1, explanation: "Yo soy" },
    { question: "Location uses:", options: ["SER", "ESTAR"], correctAnswer: 1, explanation: "ESTAR for location" },
    { question: "'I go':", options: ["voy", "tengo", "soy"], correctAnswer: 0, explanation: "Yo voy" },
    { question: "'I am hungry':", options: ["Estoy hambre", "Tengo hambre"], correctAnswer: 1, explanation: "Tengo hambre" },
  ]},
  week2: { title: "Week 2 Assessment", passingScore: 70, questions: [
    { question: "'I spoke' (hablar):", options: ["hablo", "hablé", "hablaba"], correctAnswer: 1, explanation: "Hablé = preterite" },
    { question: "Habitual past uses:", options: ["Preterite", "Imperfect"], correctAnswer: 1, explanation: "Imperfect for habitual" },
    { question: "'I see it' (el libro):", options: ["Le veo", "Lo veo"], correctAnswer: 1, explanation: "Lo = direct object (masc)" },
    { question: "'I wake up':", options: ["Me despierto", "Se despierto"], correctAnswer: 0, explanation: "Me = myself" },
  ]},
  week3: { title: "Week 3 Assessment", passingScore: 70, questions: [
    { question: "'I like books': Me ___ los libros.", options: ["gusta", "gustan"], correctAnswer: 1, explanation: "Gustan = plural" },
    { question: "'Taller than me': más alto ___ yo.", options: ["de", "que"], correctAnswer: 1, explanation: "más...que" },
    { question: "'Thanks for everything':", options: ["Gracias para", "Gracias por"], correctAnswer: 1, explanation: "Por = for (gratitude)" },
    { question: "'This house': ___ casa.", options: ["Este", "Esta"], correctAnswer: 1, explanation: "Esta = feminine" },
  ]},
  week4: { title: "Week 4 Assessment", passingScore: 70, questions: [
    { question: "'I will go' (ir):", options: ["voy", "iré", "iría"], correctAnswer: 1, explanation: "Iré = future" },
    { question: "'I would like':", options: ["me gusta", "me gustaría"], correctAnswer: 1, explanation: "Me gustaría = conditional" },
    { question: "'I want you to come': Quiero que ___.", options: ["vienes", "vengas"], correctAnswer: 1, explanation: "Subjunctive after quiero que" },
    { question: "'Come here!' (tú):", options: ["Vienes", "Ven"], correctAnswer: 1, explanation: "Ven = irregular command" },
  ]},
  final: { title: "Final Assessment", passingScore: 70, questions: [
    { question: "SER is for:", options: ["Location", "Identity"], correctAnswer: 1, explanation: "SER for identity" },
    { question: "Preterite is for:", options: ["Habitual", "Completed"], correctAnswer: 1, explanation: "Completed actions" },
    { question: "'Me gusta' literally means:", options: ["I like", "It pleases me"], correctAnswer: 1, explanation: "Gustar = to please" },
    { question: "Subjunctive expresses:", options: ["Facts", "Wishes/doubt"], correctAnswer: 1, explanation: "Non-factual" },
    { question: "'I would speak':", options: ["hablaré", "hablaría"], correctAnswer: 1, explanation: "Conditional" },
  ]}
};

const styles = {
  container: { maxWidth: 480, margin: '0 auto', minHeight: '100vh', backgroundColor: '#FAF9F6', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' },
  header: { backgroundColor: '#2D5A27', color: 'white', padding: 20, textAlign: 'center' },
  content: { padding: 20 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
  button: { backgroundColor: '#2D5A27', color: 'white', border: 'none', padding: '14px 28px', borderRadius: 8, fontSize: 16, fontWeight: 600, cursor: 'pointer', width: '100%', marginTop: 12 },
  buttonSecondary: { backgroundColor: 'transparent', color: '#2D5A27', border: '2px solid #2D5A27', padding: '12px 24px', borderRadius: 8, fontSize: 16, cursor: 'pointer', width: '100%', marginTop: 8 },
  progressBar: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, overflow: 'hidden', marginBottom: 8 },
  progressFill: { height: '100%', backgroundColor: '#228B22', transition: 'width 0.3s ease' },
  optionButton: { display: 'block', width: '100%', padding: 16, marginBottom: 8, border: '2px solid #E0E0E0', borderRadius: 8, backgroundColor: 'white', cursor: 'pointer', textAlign: 'left', fontSize: 16 },
  heading: { fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#2C2C2C' },
  tip: { backgroundColor: '#FFF9E6', padding: 12, borderRadius: 8, marginTop: 12, borderLeft: '4px solid #DAA520' },
  flashcard: { backgroundColor: '#2D5A27', color: 'white', padding: 40, borderRadius: 16, textAlign: 'center', cursor: 'pointer', minHeight: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 600 },
};

function App() {
  const [screen, setScreen] = useState('splash');
  const [currentDay, setCurrentDay] = useState(1);
  const [progress, setProgress] = useState({});
  const [moduleProgress, setModuleProgress] = useState({});
  const [currentModule, setCurrentModule] = useState(null);
  const [screenIndex, setScreenIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [assessmentAnswers, setAssessmentAnswers] = useState({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [currentAssessment, setCurrentAssessment] = useState('week1');

  useEffect(() => {
    const saved = localStorage.getItem('fluidez_30day');
    if (saved) {
      const d = JSON.parse(saved);
      setProgress(d.progress || {});
      setModuleProgress(d.moduleProgress || {});
      setCurrentDay(d.currentDay || 1);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fluidez_30day', JSON.stringify({ progress, moduleProgress, currentDay }));
  }, [progress, moduleProgress, currentDay]);

  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => setScreen('home'), 2000);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES';
      u.rate = 0.85;
      speechSynthesis.speak(u);
    }
  };

  const getDayFlashcards = (d) => allFlashcards.filter(f => f.day <= d);
  const getCompletedDays = () => Object.keys(progress).filter(d => progress[d]?.completed).length;

  const handleModuleComplete = (module) => {
    const newMP = { ...moduleProgress, [currentDay + '-' + module]: true };
    setModuleProgress(newMP);
    const mods = ['grammar', 'vocabulary', 'listening', 'reading'];
    if (mods.filter(m => newMP[currentDay + '-' + m]).length === 4) {
      setProgress(p => ({ ...p, [currentDay]: { completed: true } }));
      if (currentDay < TOTAL_DAYS) setCurrentDay(d => d + 1);
    }
    setScreen('day');
    setCurrentModule(null);
    setScreenIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const renderExercise = (ex) => {
    const { exerciseType, instruction, options, correctAnswer, explanation } = ex;
    if (exerciseType === 'multiple_choice') {
      return (
        <div>
          <p style={{ fontSize: 18, marginBottom: 20 }}>{instruction}</p>
          {options.map((o, i) => (
            <button key={i} onClick={() => { setSelectedAnswer(i); setShowResult(true); }} disabled={showResult}
              style={{ ...styles.optionButton, backgroundColor: showResult ? (i === correctAnswer ? '#E8F5E9' : (i === selectedAnswer ? '#FFEBEE' : 'white')) : 'white' }}>
              {o}
            </button>
          ))}
          {showResult && <div style={{ ...styles.tip, backgroundColor: selectedAnswer === correctAnswer ? '#E8F5E9' : '#FFEBEE' }}><strong>{selectedAnswer === correctAnswer ? '✓ Correct!' : '✗ Incorrect'}</strong><p>{explanation}</p></div>}
        </div>
      );
    }
    return null;
  };

  const renderScreen = () => {
    switch (screen) {
      case 'splash':
        return <div style={{ ...styles.container, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#2D5A27' }}><h1 style={{ color: 'white', fontSize: 48 }}>🇪🇸 Fluidez</h1><p style={{ color: 'rgba(255,255,255,0.8)' }}>30-Day Spanish Course</p></div>;

      case 'home':
        const done = getCompletedDays();
        return (
          <div style={styles.container}>
            <div style={styles.header}><h1 style={{ margin: 0 }}>🇪🇸 Fluidez</h1><p style={{ margin: '8px 0 0', opacity: 0.9 }}>30-Day Spanish Course</p></div>
            <div style={styles.content}>
              <div style={styles.card}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><span>Progress</span><span style={{ color: '#2D5A27' }}>{done}/{TOTAL_DAYS}</span></div><div style={styles.progressBar}><div style={{ ...styles.progressFill, width: (done/TOTAL_DAYS*100)+'%' }}/></div></div>
              <h2 style={styles.heading}>📚 Daily Lessons</h2>
              {Array.from({length: TOTAL_DAYS}, (_, i) => i + 1).map(day => {
                const d = curriculum[day], comp = progress[day]?.completed, locked = day > currentDay && !comp;
                return <div key={day} onClick={() => !locked && (setCurrentDay(day), setScreen('day'))} style={{ ...styles.card, opacity: locked ? 0.5 : 1, cursor: locked ? 'not-allowed' : 'pointer', borderLeft: '4px solid ' + (comp ? '#228B22' : (day === currentDay ? '#2D5A27' : '#E0E0E0')) }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><div><h3 style={{ margin: 0, fontSize: 16 }}>Day {day}: {d.title}</h3><p style={{ margin: '4px 0 0', fontSize: 14, color: '#666' }}>{d.subtitle}</p></div><span style={{ fontSize: 24 }}>{comp ? '✅' : (locked ? '🔒' : '→')}</span></div></div>;
              })}
              <h2 style={{ ...styles.heading, marginTop: 24 }}>🎯 Practice</h2>
              <div style={styles.card} onClick={() => setScreen('flashcards')}><h3 style={{ margin: 0 }}>📚 Flashcards ({getDayFlashcards(currentDay).length})</h3></div>
              {currentDay >= 7 && <div style={styles.card} onClick={() => { setCurrentAssessment('week1'); setAssessmentAnswers({}); setAssessmentComplete(false); setScreen('assessment'); }}><h3 style={{ margin: 0 }}>📝 Week 1 Assessment</h3></div>}
              {currentDay >= 15 && <div style={styles.card} onClick={() => { setCurrentAssessment('week2'); setAssessmentAnswers({}); setAssessmentComplete(false); setScreen('assessment'); }}><h3 style={{ margin: 0 }}>📝 Week 2 Assessment</h3></div>}
              {currentDay >= 21 && <div style={styles.card} onClick={() => { setCurrentAssessment('week3'); setAssessmentAnswers({}); setAssessmentComplete(false); setScreen('assessment'); }}><h3 style={{ margin: 0 }}>📝 Week 3 Assessment</h3></div>}
              {currentDay >= 28 && <div style={styles.card} onClick={() => { setCurrentAssessment('week4'); setAssessmentAnswers({}); setAssessmentComplete(false); setScreen('assessment'); }}><h3 style={{ margin: 0 }}>📝 Week 4 Assessment</h3></div>}
              {currentDay >= 30 && <div style={styles.card} onClick={() => { setCurrentAssessment('final'); setAssessmentAnswers({}); setAssessmentComplete(false); setScreen('assessment'); }}><h3 style={{ margin: 0 }}>🏆 Final Assessment</h3></div>}
            </div>
          </div>
        );

      case 'day':
        const day = curriculum[currentDay], mods = ['grammar', 'vocabulary', 'listening', 'reading'], icons = { grammar: '📖', vocabulary: '📝', listening: '🎧', reading: '📚' };
        return (
          <div style={styles.container}>
            <div style={styles.header}><button onClick={() => setScreen('home')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Back</button><h1 style={{ margin: 0 }}>Day {currentDay}</h1><p style={{ margin: '4px 0 0', opacity: 0.9 }}>{day.title}</p></div>
            <div style={styles.content}>
              {mods.map(m => {
                const done = moduleProgress[currentDay + '-' + m];
                return <div key={m} onClick={() => { setCurrentModule(m); setScreenIndex(0); setSelectedAnswer(null); setShowResult(false); setScreen('module'); }} style={{ ...styles.card, cursor: 'pointer', borderLeft: '4px solid ' + (done ? '#228B22' : '#E0E0E0') }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><div><h3 style={{ margin: 0, textTransform: 'capitalize' }}>{icons[m]} {m}</h3><p style={{ margin: '4px 0 0', color: '#666' }}>{day[m].title}</p></div><span>{done ? '✅' : '→'}</span></div></div>;
              })}
            </div>
          </div>
        );

      case 'module':
        const mod = curriculum[currentDay][currentModule], cur = mod.screens[screenIndex], last = screenIndex === mod.screens.length - 1;
        const next = () => { if (last) handleModuleComplete(currentModule); else { setScreenIndex(i => i + 1); setSelectedAnswer(null); setShowResult(false); } };
        return (
          <div style={styles.container}>
            <div style={styles.header}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}><button onClick={() => { setScreen('day'); setCurrentModule(null); setScreenIndex(0); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Exit</button><span>{screenIndex + 1}/{mod.screens.length}</span></div><div style={styles.progressBar}><div style={{ ...styles.progressFill, width: ((screenIndex + 1)/mod.screens.length*100)+'%' }}/></div></div>
            <div style={styles.content}>
              {cur.type === 'lesson' && <div><h2 style={styles.heading}>{cur.heading}</h2><p style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 16 }}>{cur.content}</p>{cur.examples && cur.examples.map((e, i) => <div key={i} style={{ ...styles.card, padding: 16, cursor: 'pointer' }} onClick={() => speak(e.word || e.spanish)}><div style={{ fontWeight: 600, color: '#2D5A27' }}>{e.spanish}</div><div style={{ fontSize: 14, color: '#666' }}>{e.pronunciation}</div>{e.word && <div style={{ marginTop: 8 }}>{e.word}</div>}<div style={{ fontSize: 14, color: '#666' }}>{e.meaning}</div></div>)}{cur.tip && <div style={styles.tip}>💡 {cur.tip}</div>}</div>}
              {cur.type === 'vocab' && <div><h2 style={styles.heading}>{cur.category}</h2>{cur.words.map((w, i) => <div key={i} style={{ ...styles.card, padding: 16, cursor: 'pointer' }} onClick={() => speak(w.spanish)}><div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 600 }}>{w.spanish}</span><span style={{ color: '#666' }}>{w.english}</span></div><div style={{ fontSize: 14, color: '#666', marginTop: 4, fontStyle: 'italic' }}>{w.example}</div></div>)}</div>}
              {cur.type === 'exercise' && renderExercise(cur)}
              {cur.type === 'listening' && <div><p style={{ fontSize: 18, marginBottom: 20 }}>{cur.instruction}</p><button onClick={() => speak(cur.transcript)} style={{ ...styles.button, backgroundColor: '#4A7C43', marginBottom: 20 }}>🔊 Play</button>{cur.options.map((o, i) => <button key={i} onClick={() => { setSelectedAnswer(i); setShowResult(true); }} disabled={showResult} style={{ ...styles.optionButton, backgroundColor: showResult ? (i === cur.correctAnswer ? '#E8F5E9' : (i === selectedAnswer ? '#FFEBEE' : 'white')) : 'white' }}>{o}</button>)}{showResult && <div style={{ ...styles.tip, backgroundColor: selectedAnswer === cur.correctAnswer ? '#E8F5E9' : '#FFEBEE' }}><strong>{selectedAnswer === cur.correctAnswer ? '✓ Correct!' : '✗ Listen again!'}</strong><p>Audio: "{cur.transcript}"</p></div>}</div>}
              {cur.type === 'reading' && <div><h2 style={styles.heading}>{cur.title}</h2><div style={{ ...styles.card, backgroundColor: '#F5F5F5' }}><p style={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>{cur.passage}</p><button onClick={() => speak(cur.passage.replace(/[—\n]/g, ' '))} style={{ ...styles.buttonSecondary, marginTop: 16 }}>🔊 Listen</button></div><details style={{ marginTop: 16 }}><summary style={{ cursor: 'pointer', color: '#2D5A27', fontWeight: 600 }}>Translation</summary><p style={{ marginTop: 8, color: '#666', whiteSpace: 'pre-line' }}>{cur.translation}</p></details></div>}
              <button style={{ ...styles.button, marginTop: 24 }} onClick={next} disabled={(cur.type === 'exercise' || cur.type === 'listening') && !showResult}>{last ? 'Complete ✓' : 'Continue →'}</button>
            </div>
          </div>
        );

      case 'flashcards':
        const cards = getDayFlashcards(currentDay), card = cards[flashcardIndex];
        return (
          <div style={styles.container}>
            <div style={styles.header}><button onClick={() => { setScreen('home'); setFlashcardIndex(0); setFlashcardFlipped(false); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Back</button><h2 style={{ margin: '8px 0 0' }}>Flashcards</h2><p style={{ opacity: 0.8 }}>{flashcardIndex + 1}/{cards.length}</p></div>
            <div style={styles.content}>
              <div onClick={() => { setFlashcardFlipped(!flashcardFlipped); if (!flashcardFlipped) speak(card.front); }} style={{ ...styles.flashcard, backgroundColor: flashcardFlipped ? '#228B22' : '#2D5A27' }}>{flashcardFlipped ? card.back : card.front}</div>
              <p style={{ textAlign: 'center', color: '#666', marginTop: 12 }}>Tap to flip</p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}><button onClick={() => { setFlashcardIndex(Math.max(0, flashcardIndex - 1)); setFlashcardFlipped(false); }} style={{ ...styles.buttonSecondary, flex: 1 }} disabled={flashcardIndex === 0}>← Prev</button><button onClick={() => { setFlashcardIndex(Math.min(cards.length - 1, flashcardIndex + 1)); setFlashcardFlipped(false); }} style={{ ...styles.button, flex: 1, marginTop: 0 }} disabled={flashcardIndex === cards.length - 1}>Next →</button></div>
            </div>
          </div>
        );

      case 'assessment':
        const asmt = assessments[currentAssessment], qs = asmt.questions;
        if (assessmentComplete) {
          const score = Object.keys(assessmentAnswers).filter(q => assessmentAnswers[q] === qs[parseInt(q)].correctAnswer).length, pct = (score/qs.length)*100, pass = pct >= asmt.passingScore;
          return <div style={styles.container}><div style={{ ...styles.header, backgroundColor: pass ? '#228B22' : '#DAA520' }}><h1>{pass ? '🎉 Passed!' : '📚 Keep Practicing'}</h1></div><div style={styles.content}><div style={{ ...styles.card, textAlign: 'center' }}><h2 style={{ fontSize: 48, margin: 0 }}>{score}/{qs.length}</h2><p style={{ fontSize: 24, color: '#666' }}>{pct.toFixed(0)}%</p></div><button style={styles.button} onClick={() => { setScreen('home'); setAssessmentComplete(false); setAssessmentAnswers({}); }}>Home</button></div></div>;
        }
        const ans = Object.keys(assessmentAnswers).length, q = qs[ans] || qs[qs.length-1], idx = ans < qs.length ? ans : qs.length-1;
        return (
          <div style={styles.container}>
            <div style={styles.header}><button onClick={() => { setScreen('home'); setAssessmentAnswers({}); }} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>← Exit</button><h2>{asmt.title}</h2><div style={styles.progressBar}><div style={{ ...styles.progressFill, width: (ans/qs.length*100)+'%' }}/></div></div>
            <div style={styles.content}>
              <h3 style={styles.heading}>Q{idx + 1}</h3><p style={{ fontSize: 18, marginBottom: 20 }}>{q.question}</p>
              {q.options.map((o, i) => <button key={i} onClick={() => { const na = { ...assessmentAnswers, [idx]: i }; setAssessmentAnswers(na); if (Object.keys(na).length === qs.length) setTimeout(() => setAssessmentComplete(true), 800); }} disabled={assessmentAnswers[idx] !== undefined} style={{ ...styles.optionButton, backgroundColor: assessmentAnswers[idx] !== undefined ? (i === q.correctAnswer ? '#E8F5E9' : (i === assessmentAnswers[idx] ? '#FFEBEE' : 'white')) : 'white' }}>{o}</button>)}
              {assessmentAnswers[idx] !== undefined && <div style={{ ...styles.tip, backgroundColor: assessmentAnswers[idx] === q.correctAnswer ? '#E8F5E9' : '#FFEBEE' }}>{q.explanation}</div>}
            </div>
          </div>
        );

      default: return <div style={styles.container}><div style={styles.content}>Unknown screen</div></div>;
    }
  };

  return renderScreen();
}

export default App;
