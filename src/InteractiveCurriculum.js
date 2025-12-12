import React, { useState } from 'react';
import { StreakDisplay } from './components/engagement';
import { ReviewSystem, QuizMode, ShadowingMode, PTStageDisplay } from './components/learning';
import { SuccessAnimation } from './components/feedback';
import { completeDay } from './utils/streakManager';
import RandomDelight from "./components/RandomDelight";
import SessionTeaser from "./components/SessionTeaser";

const theme = { primary: '#2D5A27', primaryLight: '#4A7C43', bg: '#FAFAFA', surface: '#FFF', text: '#1A1A1A', textLight: '#666', border: '#E0E0E0' };

// ============================================
// COMPLETE 30-DAY CURRICULUM v5
// Grammar, Vocabulary, Objectives, Cultural Notes,
// False Friends, Multimedia, AND Reading Passages
// ============================================
const CURRICULUM = {
  "1": {
    "day": 1,
    "title": "Spanish Sounds & Alphabet",
    "subtitle": "Pronunciation foundations",
    "level": "A1",
    "objectives": [
      "Master the 5 Spanish vowel sounds",
      "Learn key consonant differences",
      "Understand stress rules",
      "Greet people in Spanish"
    ],
    "grammar": [
      {
        "heading": "Welcome to Spanish!",
        "content": "¡Bienvenidos! Today you'll master the sounds of Spanish. The great news? Spanish is phonetic — once you learn the sounds, you can pronounce any word c",
        "examples": [
          {"es": "¡Hola!", "en": "Hello!"},
          {"es": "¡Buenos días!", "en": "Good morning!"},
          {"es": "¿Cómo estás?", "en": "How are you?"},
          {"es": "Muy bien, gracias.", "en": "Very well, thank you."}
        ],
        "tip": "Spanish has only 5 vowel sounds (English has 14+). Master these first!"
      },
      {
        "heading": "The 5 Vowels",
        "content": "Each vowel has ONE sound that never changes:",
        "examples": [
          {"es": "A - padre, casa, hablar", "en": "Like 'ah' in father - always the same"},
          {"es": "E - leche, verde, comer", "en": "Like 'e' in bet - short and crisp"},
          {"es": "I - sí, libro, vivir", "en": "Like 'ee' in see - always long"},
          {"es": "O - hola, como, ocho", "en": "Like 'o' in go - but shorter"},
          {"es": "U - uno, tú, azul", "en": "Like 'oo' in moon - rounded lips"}
        ],
        "tip": null
      },
      {
        "heading": "Consonants That Differ",
        "content": "Most consonants are like English, but these are different:",
        "examples": [
          {"es": "H is SILENT: hola → 'ola'", "en": "Never pronounced in Spanish"},
          {"es": "J sounds like H: julio, joven", "en": "Like English 'h' in hello"},
          {"es": "LL sounds like Y: llamar, calle", "en": "Like 'y' in yes"},
          {"es": "Ñ has 'ny' sound: España, niño", "en": "Like 'ny' in canyon"},
          {"es": "RR is trilled: perro, carro", "en": "Roll your tongue!"}
        ],
        "tip": null
      },
      {
        "heading": "Stress Rules",
        "content": "Spanish has clear rules for which syllable gets stressed:",
        "examples": [
          {
            "es": "Words ending in vowel, N, or S",
            "en": "stress second-to-last syllable: ha-BLO, ca-SA"
          },
          {
            "es": "Words ending in other consonants",
            "en": "stress last syllable: ha-BLAR, es-pa-ÑOL"
          },
          {
            "es": "Written accent marks",
            "en": "override the rules: te-LÉ-fo-no, ca-FÉ"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Essential Greetings",
        "words": [
          {
            "es": "hola",
            "en": "hello"
          },
          {
            "es": "buenos días",
            "en": "good morning"
          },
          {
            "es": "buenas tardes",
            "en": "good afternoon"
          },
          {
            "es": "buenas noches",
            "en": "good evening/night"
          },
          {
            "es": "adiós",
            "en": "goodbye"
          },
          {
            "es": "hasta luego",
            "en": "see you later"
          },
          {
            "es": "gracias",
            "en": "thank you"
          },
          {
            "es": "de nada",
            "en": "you're welcome"
          }
        ]
      },
      {
        "category": "Numbers 1-10",
        "words": [
          {
            "es": "uno",
            "en": "one"
          },
          {
            "es": "dos",
            "en": "two"
          },
          {
            "es": "tres",
            "en": "three"
          },
          {
            "es": "cuatro",
            "en": "four"
          },
          {
            "es": "cinco",
            "en": "five"
          },
          {
            "es": "seis",
            "en": "six"
          },
          {
            "es": "siete",
            "en": "seven"
          },
          {
            "es": "ocho",
            "en": "eight"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 1. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "embarazada",
        "means": "pregnant",
        "not": "embarrassed",
        "correct": "avergonzado/a"
      },
      {
        "es": "actualmente",
        "means": "currently",
        "not": "actually",
        "correct": "en realidad"
      },
      {
        "es": "realizar",
        "means": "to accomplish",
        "not": "to realize",
        "correct": "darse cuenta"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Hola, me llamo María.",
        "Buenos días, ¿cómo estás?",
        "Muy bien, gracias.",
        "Mucho gusto.",
        "¿Cómo te llamas?",
        "Adiós, hasta luego."
      ]
    },
    "reading": {
      "title": "Practice Reading",
      "passage": "¡Hola! Me llamo María. Soy de España. Mucho gusto. ¿Cómo te llamas? Buenos días. Gracias por tu ayuda. De nada. Hasta luego."
    }
  },
  "2": {
    "day": 2,
    "title": "Introducing Yourself",
    "subtitle": "Subject pronouns & SER",
    "level": "A1",
    "objectives": [
      "Master Spanish subject pronouns",
      "Conjugate SER in present tense",
      "Introduce yourself completely",
      "State name, origin, age, and profession"
    ],
    "grammar": [
      {
        "heading": "Subject Pronouns",
        "content": "Subject pronouns tell us WHO is doing the action. Unlike English, Spanish often drops the pronoun because verb endings indicate the subject. However,",
        "examples": [],
        "tip": "Spanish often omits pronouns because verb endings already show who's speaking!"
      },
      {
        "heading": "The Pronoun Chart",
        "content": "Learn these essential pronouns:",
        "examples": [
          {
            "es": "yo",
            "en": "I"
          },
          {
            "es": "tú",
            "en": "you (informal)"
          },
          {
            "es": "él",
            "en": "he"
          },
          {
            "es": "ella",
            "en": "she"
          },
          {
            "es": "usted (Ud.)",
            "en": "you (formal)"
          }
        ],
        "tip": null
      },
      {
        "heading": "Tú vs Usted",
        "content": "'Tú' is informal — use with friends, family, peers, and children. 'Usted' is formal — use with strangers, elders, and professionals. When in doubt, us",
        "examples": [],
        "tip": "In Latin America, 'ustedes' is used for ALL plural 'you' (formal and informal). In Spain, 'vosotros' is informal plural."
      },
      {
        "heading": "The Verb SER (To Be)",
        "content": "SER is one of two Spanish verbs meaning 'to be.' Use SER for permanent, essential, or defining characteristics.",
        "examples": [
          {
            "es": "yo soy",
            "en": "I am"
          },
          {
            "es": "tú eres",
            "en": "you are (informal)"
          },
          {
            "es": "él/ella/usted es",
            "en": "he/she is, you are (formal)"
          },
          {
            "es": "nosotros somos",
            "en": "we are"
          },
          {
            "es": "ellos/ustedes son",
            "en": "they are, you all are"
          }
        ],
        "tip": null
      },
      {
        "heading": "When to Use SER",
        "content": "Use SER for: Identity (who someone is), Origin (where from), Profession, Nationality, Physical traits, Personality, Time & dates.",
        "examples": [
          {
            "es": "Soy María",
            "en": "I am María (identity)"
          },
          {
            "es": "Soy de México",
            "en": "I am from Mexico (origin)"
          },
          {
            "es": "Soy profesor",
            "en": "I am a teacher (profession)"
          },
          {
            "es": "Soy estadounidense",
            "en": "I am American (nationality)"
          },
          {
            "es": "Ella es alta",
            "en": "She is tall (physical trait)"
          }
        ],
        "tip": null
      },
      {
        "heading": "Introducing Yourself",
        "content": "Now let's put it together! Here are the essential phrases for self-introduction:",
        "examples": [
          {
            "es": "Me llamo [nombre]",
            "en": "My name is [name]"
          },
          {
            "es": "Soy de [lugar]",
            "en": "I am from [place]"
          },
          {
            "es": "Tengo [número] años",
            "en": "I am [number] years old"
          },
          {
            "es": "Soy [profesión]",
            "en": "I am a [profession]"
          }
        ],
        "tip": "Spanish says 'I have years' (tengo años), not 'I am years old'!"
      }
    ],
    "vocabulary": [
      {
        "category": "Personal Information",
        "words": [
          {
            "es": "el nombre",
            "en": "name"
          },
          {
            "es": "el apellido",
            "en": "last name"
          },
          {
            "es": "la edad",
            "en": "age"
          },
          {
            "es": "el cumpleaños",
            "en": "birthday"
          },
          {
            "es": "casado/a",
            "en": "married"
          },
          {
            "es": "soltero/a",
            "en": "single"
          }
        ]
      },
      {
        "category": "Professions",
        "words": [
          {
            "es": "el/la profesor/a",
            "en": "teacher"
          },
          {
            "es": "el/la estudiante",
            "en": "student"
          },
          {
            "es": "el/la médico/a",
            "en": "doctor"
          },
          {
            "es": "el/la abogado/a",
            "en": "lawyer"
          },
          {
            "es": "el/la ingeniero/a",
            "en": "engineer"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el/la programador/a",
            "en": "programmer"
          }
        ]
      },
      {
        "category": "Nationalities",
        "words": [
          {
            "es": "estadounidense",
            "en": "American (US)"
          },
          {
            "es": "mexicano/a",
            "en": "Mexican"
          },
          {
            "es": "español/a",
            "en": "Spanish"
          },
          {
            "es": "inglés/inglesa",
            "en": "English/British"
          },
          {
            "es": "francés/francesa",
            "en": "French"
          },
          {
            "es": "japonés/japonesa",
            "en": "Japanese"
          },
          {
            "es": "colombiano/a",
            "en": "Colombian"
          }
        ]
      },
      {
        "category": "Family Members",
        "words": [
          {
            "es": "la familia",
            "en": "family"
          },
          {
            "es": "el padre / el papá",
            "en": "father / dad"
          },
          {
            "es": "la madre / la mamá",
            "en": "mother / mom"
          },
          {
            "es": "el hermano",
            "en": "brother"
          },
          {
            "es": "la hermana",
            "en": "sister"
          },
          {
            "es": "el hijo / la hija",
            "en": "son / daughter"
          },
          {
            "es": "el abuelo / la abuela",
            "en": "grandfather / grandmother"
          },
          {
            "es": "el tío / la tía",
            "en": "uncle / aunt"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 2. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "actualmente",
        "means": "currently",
        "not": "actually",
        "correct": "en realidad"
      },
      {
        "es": "realizar",
        "means": "to accomplish",
        "not": "to realize",
        "correct": "darse cuenta"
      },
      {
        "es": "sensible",
        "means": "sensitive",
        "not": "sensible",
        "correct": "sensato"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Yo soy estudiante.",
        "Tú eres de España.",
        "Él es profesor.",
        "Nosotros somos amigos.",
        "¿De dónde eres?",
        "Soy de México."
      ]
    },
    "reading": {
      "title": "Being & Describing",
      "passage": "Hoy estoy muy cansado. Estoy en mi casa. Mi casa es grande y bonita. La cocina está limpia. Mi hermana está feliz porque es su cumpleaños."
    }
  },
  "3": {
    "day": 3,
    "title": "Being & Describing",
    "subtitle": "SER vs ESTAR + Progressive Tense",
    "level": "A1",
    "objectives": [
      "Master the SER vs ESTAR distinction",
      "Learn complete ESTAR conjugation (including vosotros)",
      "Use progressive tense (estar + gerund)",
      "Learn household vocabulary"
    ],
    "grammar": [
      {
        "heading": "Two Verbs for 'To Be'",
        "content": "Spanish has TWO verbs meaning 'to be': SER and ESTAR. This is one of the most important distinctions in Spanish.",
        "examples": [],
        "tip": "SER = essence (who you ARE). ESTAR = state (how you're DOING)."
      },
      {
        "heading": "ESTAR - Complete Conjugation",
        "content": "ESTAR = 'to be' for temporary states and locations:",
        "examples": [
          {
            "es": "yo estoy",
            "en": "I am"
          },
          {
            "es": "tú estás",
            "en": "you are (informal)"
          },
          {
            "es": "vos estás",
            "en": "you are (Argentina)"
          },
          {
            "es": "él/ella/usted está",
            "en": "he/she is, you are (formal)"
          },
          {
            "es": "nosotros/as estamos",
            "en": "we are"
          }
        ],
        "tip": null
      },
      {
        "heading": "When to Use ESTAR",
        "content": "Use ESTAR for: Location, Temporary states, Emotions, Progressive tense",
        "examples": [
          {
            "es": "Estoy en Madrid.",
            "en": "I am in Madrid. (location)"
          },
          {
            "es": "Ella está cansada.",
            "en": "She is tired. (temporary state)"
          },
          {
            "es": "Estamos contentos.",
            "en": "We are happy. (emotion)"
          },
          {
            "es": "Estoy trabajando.",
            "en": "I am working. (progressive)"
          }
        ],
        "tip": null
      },
      {
        "heading": "SER vs ESTAR - Key Differences",
        "content": "Same adjective, different verb = different meaning!",
        "examples": [
          {
            "es": "Ella ES alta.",
            "en": "She IS tall. (permanent trait)"
          },
          {
            "es": "Ella ESTÁ cansada.",
            "en": "She IS tired. (temporary)"
          },
          {
            "es": "Él ES aburrido.",
            "en": "He IS boring. (personality)"
          },
          {
            "es": "Él ESTÁ aburrido.",
            "en": "He IS bored. (current feeling)"
          },
          {
            "es": "La manzana ES verde.",
            "en": "The apple IS green. (color)"
          }
        ],
        "tip": "SER listo = smart. ESTAR listo = ready. SER bueno = good person. ESTAR bueno = tasty/attractive!"
      },
      {
        "heading": "⚠️ Adjectives That Change Meaning",
        "content": "CRITICAL: These adjectives have DIFFERENT meanings with SER vs ESTAR:",
        "examples": [
          {
            "es": "ser bueno / estar bueno",
            "en": "to be good (character) / to be tasty OR attractive"
          },
          {
            "es": "ser malo / estar malo",
            "en": "to be bad (character) / to be sick"
          },
          {
            "es": "ser listo / estar listo",
            "en": "to be smart / to be ready"
          },
          {
            "es": "ser aburrido / estar aburrido",
            "en": "to be boring / to be bored"
          },
          {
            "es": "ser verde / estar verde",
            "en": "to be green (color) / to be unripe"
          }
        ],
        "tip": null
      },
      {
        "heading": "🔥 Progressive Tense (Estar + Gerund)",
        "content": "Use for actions happening RIGHT NOW. Like English '-ing':",
        "examples": [
          {
            "es": "-AR verbs: hablar → hablando",
            "en": "speaking"
          },
          {
            "es": "-ER verbs: comer → comiendo",
            "en": "eating"
          },
          {
            "es": "-IR verbs: vivir → viviendo",
            "en": "living"
          },
          {
            "es": "Estoy hablando por teléfono.",
            "en": "I am speaking on the phone."
          },
          {
            "es": "¿Qué estás haciendo?",
            "en": "What are you doing?"
          }
        ],
        "tip": "Spanish progressive is ONLY for right-now actions. Don't overuse like English!"
      },
      {
        "heading": "Irregular Gerunds",
        "content": "Some verbs have spelling changes in the gerund:",
        "examples": [
          {
            "es": "leer → leyendo",
            "en": "reading (not 'leiendo')"
          },
          {
            "es": "oír → oyendo",
            "en": "hearing"
          },
          {
            "es": "traer → trayendo",
            "en": "bringing"
          },
          {
            "es": "dormir → durmiendo",
            "en": "sleeping (o→u)"
          },
          {
            "es": "morir → muriendo",
            "en": "dying (o→u)"
          }
        ],
        "tip": null
      },
      {
        "heading": "Progressive vs Simple Present",
        "content": "When to use each:",
        "examples": [
          {
            "es": "Estoy comiendo ahora.",
            "en": "I am eating now. (at this moment)"
          },
          {
            "es": "Como a las 2.",
            "en": "I eat at 2. (every day - habitual)"
          },
          {
            "es": "¿Qué estás haciendo?",
            "en": "What are you doing? (right now)"
          },
          {
            "es": "¿Qué haces los fines de semana?",
            "en": "What do you do on weekends? (habitual)"
          }
        ],
        "tip": "Spanish progressive is less common than English. Use simple present for habitual actions."
      },
      {
        "heading": "Adjective Agreement",
        "content": "Spanish adjectives agree in GENDER and NUMBER with the noun:",
        "examples": [
          {
            "es": "el chico alto",
            "en": "the tall boy"
          },
          {
            "es": "la chica alta",
            "en": "the tall girl"
          },
          {
            "es": "los chicos altos",
            "en": "the tall boys"
          },
          {
            "es": "las chicas altas",
            "en": "the tall girls"
          }
        ],
        "tip": "Adjectives ending in -e or consonants often don't change for gender: 'inteligente' works for both."
      }
    ],
    "vocabulary": [
      {
        "category": "Rooms of the House",
        "words": [
          {
            "es": "la casa",
            "en": "house"
          },
          {
            "es": "el apartamento / el piso",
            "en": "apartment (LA/Spain)"
          },
          {
            "es": "la habitación / el cuarto",
            "en": "room/bedroom"
          },
          {
            "es": "el dormitorio",
            "en": "bedroom"
          },
          {
            "es": "la cocina",
            "en": "kitchen"
          },
          {
            "es": "el baño",
            "en": "bathroom"
          },
          {
            "es": "la sala / el salón",
            "en": "living room"
          },
          {
            "es": "el comedor",
            "en": "dining room"
          }
        ]
      },
      {
        "category": "Furniture & Appliances",
        "words": [
          {
            "es": "la cama",
            "en": "bed"
          },
          {
            "es": "la mesa",
            "en": "table"
          },
          {
            "es": "la silla",
            "en": "chair"
          },
          {
            "es": "el sofá",
            "en": "sofa/couch"
          },
          {
            "es": "el armario / el clóset",
            "en": "closet/wardrobe"
          },
          {
            "es": "el escritorio",
            "en": "desk"
          },
          {
            "es": "el refrigerador / la nevera",
            "en": "refrigerator"
          },
          {
            "es": "la estufa / la cocina",
            "en": "stove"
          }
        ]
      },
      {
        "category": "Physical Descriptions",
        "words": [
          {
            "es": "alto/a",
            "en": "tall"
          },
          {
            "es": "bajo/a",
            "en": "short"
          },
          {
            "es": "grande",
            "en": "big/large"
          },
          {
            "es": "pequeño/a",
            "en": "small"
          },
          {
            "es": "gordo/a",
            "en": "fat"
          },
          {
            "es": "delgado/a",
            "en": "thin/slim"
          },
          {
            "es": "guapo/a",
            "en": "handsome/pretty"
          },
          {
            "es": "joven",
            "en": "young"
          }
        ]
      },
      {
        "category": "Personality Traits",
        "words": [
          {
            "es": "simpático/a",
            "en": "nice/friendly"
          },
          {
            "es": "antipático/a",
            "en": "unpleasant"
          },
          {
            "es": "inteligente",
            "en": "intelligent"
          },
          {
            "es": "trabajador/a",
            "en": "hardworking"
          },
          {
            "es": "perezoso/a",
            "en": "lazy"
          },
          {
            "es": "amable",
            "en": "kind"
          },
          {
            "es": "serio/a",
            "en": "serious"
          },
          {
            "es": "gracioso/a",
            "en": "funny"
          }
        ]
      },
      {
        "category": "Emotions & States - use with ESTAR",
        "words": [
          {
            "es": "contento/a",
            "en": "happy/content"
          },
          {
            "es": "triste",
            "en": "sad"
          },
          {
            "es": "feliz",
            "en": "happy"
          },
          {
            "es": "cansado/a",
            "en": "tired"
          },
          {
            "es": "enfermo/a",
            "en": "sick"
          },
          {
            "es": "nervioso/a",
            "en": "nervous"
          },
          {
            "es": "emocionado/a",
            "en": "excited"
          },
          {
            "es": "enojado/a",
            "en": "angry"
          }
        ]
      }
    ],
    "cultural": "Housing Differences: In Spain, apartments are called 'pisos' and floors are numbered differently: Spanish 'primer piso' =... Regional Vocabulary: Appliance names vary: 'refrigerador' (Mexico), 'nevera' (Spain/Caribbean), 'heladera' (Argentina). '...",
    "falseFriends": [
      {
        "es": "embarazada",
        "means": "pregnant",
        "not": "embarrassed",
        "correct": "avergonzado/a"
      },
      {
        "es": "carpeta",
        "means": "folder/binder",
        "not": "carpet",
        "correct": "alfombra"
      },
      {
        "es": "éxito",
        "means": "success",
        "not": "exit",
        "correct": "salida"
      }
    ],
    "multimedia": [
      {
        "name": "SpanishPod101 - House Vocabulary",
        "description": "Visual tour of a Spanish house"
      },
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input for beginners"
      },
      {
        "name": "Label Your Home!",
        "description": "Put Spanish sticky notes on items in your house"
      }
    ],
    "listening": {
      "phrases": [
        "Mi familia es grande.",
        "Tengo dos hermanos.",
        "Mi madre se llama Ana.",
        "Mi padre es alto.",
        "¿Tienes hermanos?",
        "Somos cuatro."
      ]
    },
    "reading": {
      "title": "House & Descriptions",
      "passage": "Mi apartamento es pequeño pero bonito. Tiene una cocina moderna, un baño limpio y un dormitorio cómodo. Las paredes son blancas y el sofá es nuevo. Mi vecino es simpático y trabajador."
    }
  },
  "4": {
    "day": 4,
    "title": "Daily Actions",
    "subtitle": "Regular -AR verbs",
    "level": "A1",
    "objectives": [
      "Conjugate regular -AR verbs in present tense",
      "Describe daily routines",
      "Use time expressions",
      "Talk about what you do regularly"
    ],
    "grammar": [
      {
        "heading": "Present Tense -AR Verbs",
        "content": "Most Spanish verbs end in -AR, -ER, or -IR. Today we learn -AR verbs! To conjugate, remove -AR and add the endings.",
        "examples": [],
        "tip": "About 90% of new verbs you learn will follow these regular patterns!"
      },
      {
        "heading": "-AR Verb Endings",
        "content": "Here are the endings for -AR verbs using HABLAR (to speak):",
        "examples": [
          {
            "es": "yo hablo",
            "en": "I speak"
          },
          {
            "es": "tú hablas",
            "en": "you speak"
          },
          {
            "es": "él/ella habla",
            "en": "he/she speaks"
          },
          {
            "es": "nosotros hablamos",
            "en": "we speak"
          },
          {
            "es": "ellos/ustedes hablan",
            "en": "they/you all speak"
          }
        ],
        "tip": null
      },
      {
        "heading": "Common -AR Verbs",
        "content": "Learn these essential -AR verbs:",
        "examples": [
          {
            "es": "trabajar",
            "en": "to work"
          },
          {
            "es": "estudiar",
            "en": "to study"
          },
          {
            "es": "comprar",
            "en": "to buy"
          },
          {
            "es": "cocinar",
            "en": "to cook"
          },
          {
            "es": "caminar",
            "en": "to walk"
          }
        ],
        "tip": null
      },
      {
        "heading": "Time Expressions",
        "content": "Use these expressions to talk about when you do things:",
        "examples": [
          {
            "es": "por la mañana",
            "en": "in the morning"
          },
          {
            "es": "por la tarde",
            "en": "in the afternoon"
          },
          {
            "es": "por la noche",
            "en": "at night"
          },
          {
            "es": "todos los días",
            "en": "every day"
          },
          {
            "es": "siempre",
            "en": "always"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Morning Routine",
        "words": [
          {
            "es": "despertarse",
            "en": "to wake up"
          },
          {
            "es": "levantarse",
            "en": "to get up"
          },
          {
            "es": "ducharse",
            "en": "to shower"
          },
          {
            "es": "desayunar",
            "en": "to have breakfast"
          },
          {
            "es": "vestirse",
            "en": "to get dressed"
          }
        ]
      },
      {
        "category": "Daily Activities",
        "words": [
          {
            "es": "almorzar",
            "en": "to have lunch"
          },
          {
            "es": "cenar",
            "en": "to have dinner"
          },
          {
            "es": "limpiar",
            "en": "to clean"
          },
          {
            "es": "lavar",
            "en": "to wash"
          },
          {
            "es": "cocinar",
            "en": "to cook"
          },
          {
            "es": "llamar",
            "en": "to call"
          }
        ]
      },
      {
        "category": "Time Words",
        "words": [
          {
            "es": "temprano",
            "en": "early"
          },
          {
            "es": "tarde",
            "en": "late"
          },
          {
            "es": "ahora",
            "en": "now"
          },
          {
            "es": "hoy",
            "en": "today"
          },
          {
            "es": "mañana",
            "en": "tomorrow"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 4. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "sensible",
        "means": "sensitive",
        "not": "sensible",
        "correct": "sensato"
      },
      {
        "es": "éxito",
        "means": "success",
        "not": "exit",
        "correct": "salida"
      },
      {
        "es": "librería",
        "means": "bookstore",
        "not": "library",
        "correct": "biblioteca"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "El coche es rojo.",
        "Me gusta el azul.",
        "La casa es blanca.",
        "Las flores son amarillas.",
        "¿De qué color es?",
        "Es verde."
      ]
    },
    "reading": {
      "title": "Family & Possessions",
      "passage": "Mi familia es grande. Tengo dos hermanos y una hermana. Mi madre tiene ojos verdes y mi padre tiene pelo negro. Nuestros abuelos viven en México. Su casa es muy bonita."
    }
  },
  "5": {
    "day": 5,
    "title": "Having & Needing",
    "subtitle": "TENER & its expressions",
    "level": "A1",
    "objectives": [
      "Conjugate TENER in present tense",
      "Use TENER expressions (hunger, thirst, age, etc.)",
      "Express obligation with TENER QUE",
      "Learn numbers 21-100"
    ],
    "grammar": [
      {
        "heading": "TENER (To Have)",
        "content": "TENER is one of the most important verbs in Spanish. It means 'to have' but is also used in many expressions where English uses 'to be'!",
        "examples": [],
        "tip": "TENER is irregular - memorize these forms!"
      },
      {
        "heading": "TENER Conjugation",
        "content": "Learn these essential forms:",
        "examples": [
          {
            "es": "yo tengo",
            "en": "I have"
          },
          {
            "es": "tú tienes",
            "en": "you have"
          },
          {
            "es": "él/ella tiene",
            "en": "he/she has"
          },
          {
            "es": "nosotros tenemos",
            "en": "we have"
          },
          {
            "es": "ellos/ustedes tienen",
            "en": "they/you all have"
          }
        ],
        "tip": null
      },
      {
        "heading": "TENER Expressions",
        "content": "Spanish uses TENER where English uses 'to be' for physical states and feelings:",
        "examples": [
          {
            "es": "tener hambre",
            "en": "to be hungry (to have hunger)"
          },
          {
            "es": "tener sed",
            "en": "to be thirsty (to have thirst)"
          },
          {
            "es": "tener frío",
            "en": "to be cold (to have cold)"
          },
          {
            "es": "tener calor",
            "en": "to be hot (to have heat)"
          },
          {
            "es": "tener sueño",
            "en": "to be sleepy (to have sleep)"
          }
        ],
        "tip": "Never say 'soy hambre' or 'estoy hambre' - always 'tengo hambre'!"
      },
      {
        "heading": "TENER QUE + Infinitive",
        "content": "To express obligation ('have to'), use TENER QUE + infinitive verb:",
        "examples": [
          {
            "es": "Tengo que trabajar",
            "en": "I have to work"
          },
          {
            "es": "Tienes que estudiar",
            "en": "You have to study"
          },
          {
            "es": "Tenemos que ir",
            "en": "We have to go"
          }
        ],
        "tip": null
      },
      {
        "heading": "Numbers 21-100",
        "content": "Learn these number patterns:",
        "examples": [
          {
            "es": "veintiuno",
            "en": "21"
          },
          {
            "es": "veintidós",
            "en": "22"
          },
          {
            "es": "treinta",
            "en": "30"
          },
          {
            "es": "treinta y uno",
            "en": "31"
          },
          {
            "es": "cuarenta",
            "en": "40"
          }
        ],
        "tip": "21-29 are one word (veintiuno), but 31+ use 'y': treinta y uno, cuarenta y dos..."
      }
    ],
    "vocabulary": [
      {
        "category": "TENER Expressions",
        "words": [
          {
            "es": "tener hambre",
            "en": "to be hungry"
          },
          {
            "es": "tener sed",
            "en": "to be thirsty"
          },
          {
            "es": "tener frío",
            "en": "to be cold"
          },
          {
            "es": "tener calor",
            "en": "to be hot"
          },
          {
            "es": "tener sueño",
            "en": "to be sleepy"
          },
          {
            "es": "tener miedo",
            "en": "to be afraid"
          },
          {
            "es": "tener prisa",
            "en": "to be in a hurry"
          },
          {
            "es": "tener razón",
            "en": "to be right"
          }
        ]
      },
      {
        "category": "Numbers 21-100",
        "words": [
          {
            "es": "veintiuno",
            "en": "21"
          },
          {
            "es": "veinticinco",
            "en": "25"
          },
          {
            "es": "treinta",
            "en": "30"
          },
          {
            "es": "cuarenta",
            "en": "40"
          },
          {
            "es": "cincuenta",
            "en": "50"
          },
          {
            "es": "sesenta",
            "en": "60"
          },
          {
            "es": "setenta",
            "en": "70"
          },
          {
            "es": "ochenta",
            "en": "80"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 5. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "éxito",
        "means": "success",
        "not": "exit",
        "correct": "salida"
      },
      {
        "es": "librería",
        "means": "bookstore",
        "not": "library",
        "correct": "biblioteca"
      },
      {
        "es": "carpeta",
        "means": "folder",
        "not": "carpet",
        "correct": "alfombra"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Mi casa tiene tres dormitorios.",
        "La cocina es grande.",
        "El baño está arriba.",
        "Hay un jardín.",
        "¿Dónde está el salón?",
        "Está a la derecha."
      ]
    },
    "reading": {
      "title": "Daily Routines",
      "passage": "Me despierto a las siete de la mañana. Primero me ducho y después desayuno. Salgo de casa a las ocho. Trabajo hasta las cinco. Por la noche ceno con mi familia y me acuesto a las once."
    }
  },
  "6": {
    "day": 6,
    "title": "Questions & Negation",
    "subtitle": "Asking questions & saying no",
    "level": "A1",
    "objectives": [
      "Form questions with question words",
      "Use all interrogative words",
      "Make negative sentences",
      "Use double negatives correctly"
    ],
    "grammar": [
      {
        "heading": "Forming Questions",
        "content": "There are three ways to form questions in Spanish: 1) Raise your intonation at the end, 2) Invert subject and verb, 3) Use question words.",
        "examples": [],
        "tip": "Spanish uses ¿ at the start AND ? at the end of questions!"
      },
      {
        "heading": "Question Words",
        "content": "Essential interrogatives:",
        "examples": [
          {
            "es": "¿Qué?",
            "en": "What?"
          },
          {
            "es": "¿Quién?",
            "en": "Who?"
          },
          {
            "es": "¿Cuándo?",
            "en": "When?"
          },
          {
            "es": "¿Dónde?",
            "en": "Where?"
          },
          {
            "es": "¿Por qué?",
            "en": "Why?"
          }
        ],
        "tip": null
      },
      {
        "heading": "Negation",
        "content": "To make a sentence negative, put 'no' before the verb:",
        "examples": [
          {
            "es": "Hablo español → No hablo español",
            "en": "I speak Spanish → I don't speak Spanish"
          },
          {
            "es": "Tengo hambre → No tengo hambre",
            "en": "I'm hungry → I'm not hungry"
          }
        ],
        "tip": null
      },
      {
        "heading": "Double Negatives",
        "content": "Unlike English, Spanish REQUIRES double negatives:",
        "examples": [
          {
            "es": "No tengo nada",
            "en": "I don't have anything"
          },
          {
            "es": "No hay nadie",
            "en": "There isn't anyone"
          },
          {
            "es": "No voy nunca",
            "en": "I never go"
          }
        ],
        "tip": "Negative words: nada (nothing), nadie (nobody), nunca (never), ninguno (none)"
      }
    ],
    "vocabulary": [
      {
        "category": "Question Words",
        "words": [
          {
            "es": "qué",
            "en": "what"
          },
          {
            "es": "quién",
            "en": "who"
          },
          {
            "es": "cuándo",
            "en": "when"
          },
          {
            "es": "dónde",
            "en": "where"
          },
          {
            "es": "por qué",
            "en": "why"
          },
          {
            "es": "cómo",
            "en": "how"
          },
          {
            "es": "cuánto",
            "en": "how much"
          },
          {
            "es": "cuál",
            "en": "which"
          }
        ]
      },
      {
        "category": "Negative Words",
        "words": [
          {
            "es": "no",
            "en": "no/not"
          },
          {
            "es": "nada",
            "en": "nothing"
          },
          {
            "es": "nadie",
            "en": "nobody"
          },
          {
            "es": "nunca",
            "en": "never"
          },
          {
            "es": "ninguno/a",
            "en": "none"
          },
          {
            "es": "tampoco",
            "en": "neither"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 6. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "librería",
        "means": "bookstore",
        "not": "library",
        "correct": "biblioteca"
      },
      {
        "es": "carpeta",
        "means": "folder",
        "not": "carpet",
        "correct": "alfombra"
      },
      {
        "es": "soportar",
        "means": "to tolerate",
        "not": "to support",
        "correct": "apoyar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Me levanto a las siete.",
        "Desayuno café con tostadas.",
        "Voy al trabajo en metro.",
        "Almuerzo a las dos.",
        "Ceno a las nueve.",
        "Me acuesto tarde."
      ]
    },
    "reading": {
      "title": "Going Places",
      "passage": "Hoy voy al supermercado porque necesito comprar comida. Después voy a la biblioteca para estudiar. Mi amigo viene a mi casa a las seis. Vamos juntos al cine esta noche."
    }
  },
  "7": {
    "day": 7,
    "title": "Week 1 Review",
    "subtitle": "-ER/-IR verbs & review",
    "level": "A1",
    "objectives": [
      "Conjugate -ER and -IR verbs",
      "Review all Week 1 content",
      "Practice integrated skills",
      "Prepare for Week 1 Assessment"
    ],
    "grammar": [
      {
        "heading": "-ER Verb Conjugation",
        "content": "Now let's learn -ER verbs! Use COMER (to eat) as your model:",
        "examples": [
          {
            "es": "yo como",
            "en": "I eat"
          },
          {
            "es": "tú comes",
            "en": "you eat"
          },
          {
            "es": "él/ella come",
            "en": "he/she eats"
          },
          {
            "es": "nosotros comemos",
            "en": "we eat"
          },
          {
            "es": "ellos comen",
            "en": "they eat"
          }
        ],
        "tip": null
      },
      {
        "heading": "-IR Verb Conjugation",
        "content": "-IR verbs are almost identical to -ER! Use VIVIR (to live):",
        "examples": [
          {
            "es": "yo vivo",
            "en": "I live"
          },
          {
            "es": "tú vives",
            "en": "you live"
          },
          {
            "es": "él/ella vive",
            "en": "he/she lives"
          },
          {
            "es": "nosotros vivimos",
            "en": "we live"
          },
          {
            "es": "ellos viven",
            "en": "they live"
          }
        ],
        "tip": "Only difference: nosotros form is -imos not -emos!"
      },
      {
        "heading": "Common -ER/-IR Verbs",
        "content": "Essential verbs to know:",
        "examples": [
          {
            "es": "comer",
            "en": "to eat"
          },
          {
            "es": "beber",
            "en": "to drink"
          },
          {
            "es": "leer",
            "en": "to read"
          },
          {
            "es": "aprender",
            "en": "to learn"
          },
          {
            "es": "comprender",
            "en": "to understand"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "ER/-IR Verbs",
        "words": [
          {
            "es": "comer",
            "en": "to eat"
          },
          {
            "es": "beber",
            "en": "to drink"
          },
          {
            "es": "leer",
            "en": "to read"
          },
          {
            "es": "aprender",
            "en": "to learn"
          },
          {
            "es": "vivir",
            "en": "to live"
          },
          {
            "es": "escribir",
            "en": "to write"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 7. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "carpeta",
        "means": "folder",
        "not": "carpet",
        "correct": "alfombra"
      },
      {
        "es": "soportar",
        "means": "to tolerate",
        "not": "to support",
        "correct": "apoyar"
      },
      {
        "es": "constipado",
        "means": "having a cold",
        "not": "constipated",
        "correct": "estreñido"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "¿Qué desea pedir?",
        "Quiero una paella.",
        "¿Para beber?",
        "Agua, por favor.",
        "La cuenta, por favor.",
        "¿Aceptan tarjeta?"
      ]
    },
    "reading": {
      "title": "Week in Review",
      "passage": "Esta semana estudié mucho español. Practiqué los verbos todos los días. Hablé con mi profesor y escuché música en español. Aprendí palabras nuevas sobre la casa y la familia."
    }
  },
  "8": {
    "day": 8,
    "title": "Talking About the Past",
    "subtitle": "Preterite tense introduction",
    "level": "A2",
    "objectives": [
      "Understand when to use preterite",
      "Conjugate -AR verbs in preterite",
      "Use past time expressions",
      "Narrate completed past actions"
    ],
    "grammar": [
      {
        "heading": "Introduction to the Past",
        "content": "Spanish has two main past tenses: PRETERITE and IMPERFECT. Today we learn the preterite, used for completed actions in the past.",
        "examples": [],
        "tip": "Preterite = something that started AND ended at a specific time."
      },
      {
        "heading": "Preterite -AR Endings",
        "content": "Using HABLAR as the model:",
        "examples": [
          {
            "es": "yo hablé",
            "en": "I spoke"
          },
          {
            "es": "tú hablaste",
            "en": "you spoke"
          },
          {
            "es": "él/ella habló",
            "en": "he/she spoke"
          },
          {
            "es": "nosotros hablamos",
            "en": "we spoke"
          },
          {
            "es": "ellos hablaron",
            "en": "they spoke"
          }
        ],
        "tip": "Notice: nosotros form is SAME as present tense! Context tells you which."
      },
      {
        "heading": "Preterite -ER/-IR Endings",
        "content": "-ER and -IR verbs share the same preterite endings:",
        "examples": [
          {
            "es": "yo comí/viví",
            "en": "I ate/lived"
          },
          {
            "es": "tú comiste/viviste",
            "en": "you ate/lived"
          },
          {
            "es": "él comió/vivió",
            "en": "he ate/lived"
          },
          {
            "es": "nosotros comimos/vivimos",
            "en": "we ate/lived"
          },
          {
            "es": "ellos comieron/vivieron",
            "en": "they ate/lived"
          }
        ],
        "tip": null
      },
      {
        "heading": "Past Time Expressions",
        "content": "These words signal preterite:",
        "examples": [
          {
            "es": "ayer",
            "en": "yesterday"
          },
          {
            "es": "anoche",
            "en": "last night"
          },
          {
            "es": "la semana pasada",
            "en": "last week"
          },
          {
            "es": "el mes pasado",
            "en": "last month"
          },
          {
            "es": "el año pasado",
            "en": "last year"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Time Expressions",
        "words": [
          {
            "es": "ayer",
            "en": "yesterday"
          },
          {
            "es": "anoche",
            "en": "last night"
          },
          {
            "es": "anteayer",
            "en": "day before yesterday"
          },
          {
            "es": "la semana pasada",
            "en": "last week"
          },
          {
            "es": "hace dos días",
            "en": "two days ago"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 8. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "soportar",
        "means": "to tolerate",
        "not": "to support",
        "correct": "apoyar"
      },
      {
        "es": "constipado",
        "means": "having a cold",
        "not": "constipated",
        "correct": "estreñido"
      },
      {
        "es": "asistir",
        "means": "to attend",
        "not": "to assist",
        "correct": "ayudar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "¿Qué hora es?",
        "Son las tres.",
        "Es la una y media.",
        "Son las cinco menos cuarto.",
        "¿A qué hora empieza?",
        "A las nueve."
      ]
    },
    "reading": {
      "title": "Completed Actions",
      "passage": "Ayer fui al parque con mis amigos. Caminamos por dos horas y después comimos en un restaurante. La comida estuvo deliciosa. Llegué a casa a las diez de la noche."
    }
  },
  "9": {
    "day": 9,
    "title": "Irregular Preterite",
    "subtitle": "Key irregular past tense verbs",
    "level": "A2",
    "objectives": [
      "Learn SER/IR preterite (same forms!)",
      "Master HACER, TENER, ESTAR preterite",
      "Use irregular verbs in past narratives"
    ],
    "grammar": [
      {
        "heading": "SER and IR (Same Forms!)",
        "content": "SER and IR have identical preterite forms! Context tells you which:",
        "examples": [
          {
            "es": "yo fui",
            "en": "I was / I went"
          },
          {
            "es": "tú fuiste",
            "en": "you were / you went"
          },
          {
            "es": "él/ella fue",
            "en": "he was/went"
          },
          {
            "es": "nosotros fuimos",
            "en": "we were / we went"
          },
          {
            "es": "ellos fueron",
            "en": "they were / they went"
          }
        ],
        "tip": null
      },
      {
        "heading": "HACER Preterite",
        "content": "HACER (to do/make) is irregular:",
        "examples": [
          {
            "es": "yo hice",
            "en": "I did/made"
          },
          {
            "es": "tú hiciste",
            "en": "you did"
          },
          {
            "es": "él/ella hizo",
            "en": "he/she did"
          },
          {
            "es": "nosotros hicimos",
            "en": "we did"
          },
          {
            "es": "ellos hicieron",
            "en": "they did"
          }
        ],
        "tip": "Note: hizo (not hico) to keep the 's' sound!"
      },
      {
        "heading": "TENER & ESTAR Preterite",
        "content": "More essential irregular verbs:",
        "examples": [
          {
            "es": "tuve/tuviste/tuvo/tuvimos/tuvieron",
            "en": "had (TENER)"
          },
          {
            "es": "estuve/estuviste/estuvo/estuvimos/estuvieron",
            "en": "was (ESTAR)"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Irregular Preterite Forms",
        "words": [
          {
            "es": "fui",
            "en": "I went/was"
          },
          {
            "es": "fue",
            "en": "he/she went/was"
          },
          {
            "es": "hice",
            "en": "I did/made"
          },
          {
            "es": "hizo",
            "en": "he/she did"
          },
          {
            "es": "tuve",
            "en": "I had"
          },
          {
            "es": "estuve",
            "en": "I was"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 9. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "constipado",
        "means": "having a cold",
        "not": "constipated",
        "correct": "estreñido"
      },
      {
        "es": "asistir",
        "means": "to attend",
        "not": "to assist",
        "correct": "ayudar"
      },
      {
        "es": "pretender",
        "means": "to try/attempt",
        "not": "to pretend",
        "correct": "fingir"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "¿Qué tiempo hace?",
        "Hace sol.",
        "Está lloviendo.",
        "Hace mucho frío.",
        "Va a nevar mañana.",
        "Me gusta el verano."
      ]
    },
    "reading": {
      "title": "Yesterday's Events",
      "passage": "El fin de semana pasado viajé a Barcelona. Visité la Sagrada Familia y caminé por Las Ramblas. Comí paella cerca del mar. Fue un viaje increíble. Saqué muchas fotos."
    }
  },
  "10": {
    "day": 10,
    "title": "Background & Description",
    "subtitle": "The imperfect tense",
    "level": "A2",
    "objectives": [
      "Understand imperfect vs preterite",
      "Conjugate -AR verbs in imperfect",
      "Conjugate -ER/-IR verbs in imperfect",
      "Describe past habits and backgrounds"
    ],
    "grammar": [
      {
        "heading": "What is the Imperfect?",
        "content": "The imperfect describes ongoing or habitual past actions, background information, and descriptions in the past. Think of it as 'used to' or 'was doing",
        "examples": [],
        "tip": "Imperfect = no clear beginning or end. Preterite = completed action."
      },
      {
        "heading": "Imperfect -AR Endings",
        "content": "Using HABLAR:",
        "examples": [
          {
            "es": "yo hablaba",
            "en": "I used to speak / was speaking"
          },
          {
            "es": "tú hablabas",
            "en": "you used to speak"
          },
          {
            "es": "él/ella hablaba",
            "en": "he/she used to speak"
          },
          {
            "es": "nosotros hablábamos",
            "en": "we used to speak"
          },
          {
            "es": "ellos hablaban",
            "en": "they used to speak"
          }
        ],
        "tip": null
      },
      {
        "heading": "Imperfect -ER/-IR Endings",
        "content": "-ER and -IR share the same endings:",
        "examples": [
          {
            "es": "yo comía/vivía",
            "en": "I used to eat/live"
          },
          {
            "es": "tú comías/vivías",
            "en": "you used to eat/live"
          },
          {
            "es": "él comía/vivía",
            "en": "he used to eat/live"
          },
          {
            "es": "nosotros comíamos/vivíamos",
            "en": "we used to eat/live"
          },
          {
            "es": "ellos comían/vivían",
            "en": "they used to eat/live"
          }
        ],
        "tip": null
      },
      {
        "heading": "Only 3 Irregular Verbs!",
        "content": "Great news - only 3 verbs are irregular in imperfect:",
        "examples": [
          {
            "es": "SER: era, eras, era, éramos, eran",
            "en": "was/were (essence)"
          },
          {
            "es": "IR: iba, ibas, iba, íbamos, iban",
            "en": "was going/used to go"
          },
          {
            "es": "VER: veía, veías, veía, veíamos, veían",
            "en": "used to see/was seeing"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Past Time Expressions",
        "words": [
          {
            "es": "cuando era niño/a",
            "en": "when I was a child"
          },
          {
            "es": "de pequeño/a",
            "en": "as a kid"
          },
          {
            "es": "en aquella época",
            "en": "in that era/time"
          },
          {
            "es": "todos los veranos",
            "en": "every summer"
          },
          {
            "es": "a menudo",
            "en": "often"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 10. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "asistir",
        "means": "to attend",
        "not": "to assist",
        "correct": "ayudar"
      },
      {
        "es": "pretender",
        "means": "to try/attempt",
        "not": "to pretend",
        "correct": "fingir"
      },
      {
        "es": "introducir",
        "means": "to insert",
        "not": "to introduce",
        "correct": "presentar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "¿Cómo te llamas?",
        "Me llamo Juan.",
        "¿De dónde eres?",
        "Soy de Colombia.",
        "¿Cuántos años tienes?",
        "Tengo veinticinco."
      ]
    },
    "reading": {
      "title": "Background Story",
      "passage": "Cuando era niño, vivía en un pueblo pequeño. Mi casa tenía un jardín grande donde jugaba todos los días. Mi abuela cocinaba platos deliciosos. Era una época muy feliz."
    }
  },
  "11": {
    "day": 11,
    "title": "Preterite vs Imperfect",
    "subtitle": "Using both past tenses together",
    "level": "A2",
    "objectives": [
      "Understand when to use each tense",
      "Combine preterite and imperfect in narratives",
      "Use story connectors",
      "Tell stories about the past"
    ],
    "grammar": [
      {
        "heading": "The Key Distinction",
        "content": "PRETERITE: Completed actions, specific times, sequence of events. IMPERFECT: Background, descriptions, ongoing/habitual actions.",
        "examples": [],
        "tip": "Imperfect sets the scene, preterite advances the action!"
      },
      {
        "heading": "Classic Examples",
        "content": "See how they work together:",
        "examples": [
          {
            "es": "Llovía cuando salí",
            "en": "It was raining (ongoing) when I left (completed)"
          },
          {
            "es": "Mientras estudiaba, sonó el teléfono",
            "en": "While I was studying (ongoing), the phone rang (completed)"
          },
          {
            "es": "Era las ocho cuando llegué",
            "en": "It was 8:00 (background) when I arrived (completed)"
          }
        ],
        "tip": null
      },
      {
        "heading": "Story Connectors",
        "content": "Use these to connect ideas:",
        "examples": [
          {
            "es": "mientras",
            "en": "while"
          },
          {
            "es": "cuando",
            "en": "when"
          },
          {
            "es": "de repente",
            "en": "suddenly"
          },
          {
            "es": "entonces",
            "en": "then"
          },
          {
            "es": "después",
            "en": "after"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Narrative Words",
        "words": [
          {
            "es": "mientras",
            "en": "while"
          },
          {
            "es": "cuando",
            "en": "when"
          },
          {
            "es": "de repente",
            "en": "suddenly"
          },
          {
            "es": "entonces",
            "en": "then"
          },
          {
            "es": "primero",
            "en": "first"
          },
          {
            "es": "luego",
            "en": "then/later"
          },
          {
            "es": "por fin",
            "en": "finally"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 11. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "pretender",
        "means": "to try/attempt",
        "not": "to pretend",
        "correct": "fingir"
      },
      {
        "es": "introducir",
        "means": "to insert",
        "not": "to introduce",
        "correct": "presentar"
      },
      {
        "es": "largo",
        "means": "long",
        "not": "large",
        "correct": "grande"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 11.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Combining Past Tenses",
      "passage": "Era una noche oscura cuando llegué a la estación. Llovía mucho y hacía frío. De repente, vi a una mujer que corría. Llevaba un vestido rojo. Me miró y sonrió."
    }
  },
  "12": {
    "day": 12,
    "title": "Reflexive Verbs",
    "subtitle": "Actions you do to yourself",
    "level": "A2",
    "objectives": [
      "Understand reflexive verb concept",
      "Conjugate reflexive verbs",
      "Describe daily routines fluently",
      "Use reflexive pronouns correctly"
    ],
    "grammar": [
      {
        "heading": "What Are Reflexive Verbs?",
        "content": "Reflexive verbs describe actions you do TO YOURSELF. The action reflects back on the subject. In Spanish, they're marked with 'se' at the end of the i",
        "examples": [],
        "tip": "English: 'I wake up' / Spanish: 'Me despierto' (I wake myself up)"
      },
      {
        "heading": "Reflexive Pronouns",
        "content": "These pronouns show WHO the action reflects back on:",
        "examples": [
          {
            "es": "me",
            "en": "myself (yo)"
          },
          {
            "es": "te",
            "en": "yourself (tú)"
          },
          {
            "es": "se",
            "en": "himself/herself/yourself formal"
          },
          {
            "es": "nos",
            "en": "ourselves (nosotros)"
          },
          {
            "es": "se",
            "en": "themselves/yourselves (ellos/ustedes)"
          }
        ],
        "tip": null
      },
      {
        "heading": "LEVANTARSE (to get up)",
        "content": "The pronoun goes BEFORE the conjugated verb:",
        "examples": [
          {
            "es": "yo me levanto",
            "en": "I get up"
          },
          {
            "es": "tú te levantas",
            "en": "you get up"
          },
          {
            "es": "él/ella se levanta",
            "en": "he/she gets up"
          },
          {
            "es": "nosotros nos levantamos",
            "en": "we get up"
          },
          {
            "es": "ellos se levantan",
            "en": "they get up"
          }
        ],
        "tip": null
      },
      {
        "heading": "Common Reflexive Verbs",
        "content": "Essential daily routine verbs:",
        "examples": [
          {
            "es": "despertarse",
            "en": "to wake up"
          },
          {
            "es": "levantarse",
            "en": "to get up"
          },
          {
            "es": "ducharse",
            "en": "to shower"
          },
          {
            "es": "bañarse",
            "en": "to bathe"
          },
          {
            "es": "vestirse",
            "en": "to get dressed"
          }
        ],
        "tip": null
      },
      {
        "heading": "Reflexive vs Non-Reflexive",
        "content": "Some verbs change meaning when reflexive:",
        "examples": [
          {
            "es": "dormir",
            "en": "to sleep = dormirse = to fall asleep"
          },
          {
            "es": "ir",
            "en": "to go = irse = to leave/go away"
          },
          {
            "es": "poner",
            "en": "to put = ponerse = to put on (clothes)"
          },
          {
            "es": "llamar",
            "en": "to call = llamarse = to be called/named"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Morning Routine",
        "words": [
          {
            "es": "despertarse",
            "en": "to wake up"
          },
          {
            "es": "levantarse",
            "en": "to get up"
          },
          {
            "es": "ducharse",
            "en": "to shower"
          },
          {
            "es": "secarse",
            "en": "to dry oneself"
          },
          {
            "es": "vestirse",
            "en": "to get dressed"
          },
          {
            "es": "peinarse",
            "en": "to comb hair"
          },
          {
            "es": "cepillarse los dientes",
            "en": "to brush teeth"
          }
        ]
      },
      {
        "category": "Evening Routine",
        "words": [
          {
            "es": "quitarse",
            "en": "to take off"
          },
          {
            "es": "ponerse",
            "en": "to put on"
          },
          {
            "es": "acostarse",
            "en": "to go to bed"
          },
          {
            "es": "dormirse",
            "en": "to fall asleep"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 12. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "introducir",
        "means": "to insert",
        "not": "to introduce",
        "correct": "presentar"
      },
      {
        "es": "largo",
        "means": "long",
        "not": "large",
        "correct": "grande"
      },
      {
        "es": "recordar",
        "means": "to remember",
        "not": "to record",
        "correct": "grabar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 12.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Object Pronouns",
      "passage": "¿El libro? Te lo di ayer. ¿Las llaves? Se las dejé a María. ¿La carta? No me la enviaron todavía. Los documentos los puse en tu escritorio esta mañana."
    }
  },
  "13": {
    "day": 13,
    "title": "Direct Object Pronouns",
    "subtitle": "Lo, la, los, las",
    "level": "A2",
    "objectives": [
      "Understand direct objects",
      "Use lo, la, los, las correctly",
      "Place pronouns in correct position",
      "Avoid repetition in speech"
    ],
    "grammar": [
      {
        "heading": "What is a Direct Object?",
        "content": "The direct object receives the action of the verb directly. 'I eat THE APPLE' → 'the apple' is the direct object. In Spanish, we can replace it with a",
        "examples": [],
        "tip": "Ask 'What?' after the verb to find the direct object: I eat WHAT? → the apple."
      },
      {
        "heading": "Direct Object Pronouns",
        "content": "These replace nouns that receive the action:",
        "examples": [
          {
            "es": "me",
            "en": "me"
          },
          {
            "es": "te",
            "en": "you (informal)"
          },
          {
            "es": "lo",
            "en": "him/it (masculine)/you (formal m)"
          },
          {
            "es": "la",
            "en": "her/it (feminine)/you (formal f)"
          },
          {
            "es": "nos",
            "en": "us"
          }
        ],
        "tip": null
      },
      {
        "heading": "Using LO, LA, LOS, LAS",
        "content": "These are the most common. Match gender and number:",
        "examples": [
          {
            "es": "Veo el libro → Lo veo",
            "en": "I see the book → I see it"
          },
          {
            "es": "Compro la manzana → La compro",
            "en": "I buy the apple → I buy it"
          },
          {
            "es": "Leo los libros → Los leo",
            "en": "I read the books → I read them"
          },
          {
            "es": "Quiero las flores → Las quiero",
            "en": "I want the flowers → I want them"
          }
        ],
        "tip": null
      },
      {
        "heading": "Pronoun Placement",
        "content": "The pronoun goes BEFORE the conjugated verb:",
        "examples": [
          {
            "es": "Lo como",
            "en": "I eat it"
          },
          {
            "es": "La veo",
            "en": "I see her/it"
          },
          {
            "es": "Los tengo",
            "en": "I have them"
          },
          {
            "es": "No la quiero",
            "en": "I don't want it"
          }
        ],
        "tip": "With infinitives, you can attach it to the end: 'Quiero verlo' OR 'Lo quiero ver'"
      },
      {
        "heading": "With Infinitives",
        "content": "Two options - both correct:",
        "examples": [
          {
            "es": "Quiero comerlo",
            "en": "Lo quiero comer = I want to eat it"
          },
          {
            "es": "Voy a verla",
            "en": "La voy a ver = I'm going to see her"
          },
          {
            "es": "Necesito comprarlos",
            "en": "Los necesito comprar = I need to buy them"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Transitive Verbs",
        "words": [
          {
            "es": "ver",
            "en": "to see"
          },
          {
            "es": "comprar",
            "en": "to buy"
          },
          {
            "es": "leer",
            "en": "to read"
          },
          {
            "es": "escribir",
            "en": "to write"
          },
          {
            "es": "conocer",
            "en": "to know (people)"
          },
          {
            "es": "llamar",
            "en": "to call"
          },
          {
            "es": "buscar",
            "en": "to look for"
          },
          {
            "es": "encontrar",
            "en": "to find"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 13. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "largo",
        "means": "long",
        "not": "large",
        "correct": "grande"
      },
      {
        "es": "recordar",
        "means": "to remember",
        "not": "to record",
        "correct": "grabar"
      },
      {
        "es": "ropa",
        "means": "clothes",
        "not": "rope",
        "correct": "cuerda"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 13.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Giving Commands",
      "passage": "¡Escucha! Ven aquí y siéntate. Dime qué pasó. No te preocupes, todo va a estar bien. Hazme un favor: llama a tu madre y dile que llegas tarde."
    }
  },
  "14": {
    "day": 14,
    "title": "Week 2 Review",
    "subtitle": "Past tenses & pronouns mastery",
    "level": "A2",
    "objectives": [
      "Review preterite vs imperfect",
      "Practice reflexive verbs",
      "Master direct object pronouns",
      "Prepare for Week 2 Assessment"
    ],
    "grammar": [
      {
        "heading": "Preterite vs Imperfect Summary",
        "content": "PRETERITE: Completed actions, specific times, sequences. IMPERFECT: Background, descriptions, habits, ongoing actions.",
        "examples": [
          {
            "es": "Ayer comí pizza (completed)",
            "en": "Yesterday I ate pizza"
          },
          {
            "es": "Cuando era niño, comía pizza (habit)",
            "en": "When I was a child, I used to eat pizza"
          },
          {
            "es": "Llovía cuando salí",
            "en": "It was raining when I left"
          }
        ],
        "tip": null
      },
      {
        "heading": "Reflexive Verbs Review",
        "content": "Remember: pronoun matches the subject and goes BEFORE the verb.",
        "examples": [
          {
            "es": "me levanto, te levantas, se levanta",
            "en": "I get up, you get up, he/she gets up"
          },
          {
            "es": "nos levantamos, se levantan",
            "en": "we get up, they get up"
          }
        ],
        "tip": null
      },
      {
        "heading": "Direct Object Pronouns Review",
        "content": "lo (him/it-m), la (her/it-f), los (them-m), las (them-f)",
        "examples": [
          {
            "es": "Veo el libro → Lo veo",
            "en": "I see it (m)"
          },
          {
            "es": "Compro la fruta → La compro",
            "en": "I buy it (f)"
          },
          {
            "es": "Tengo los libros → Los tengo",
            "en": "I have them (m)"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Key Week 2 Words",
        "words": [
          {
            "es": "ayer",
            "en": "yesterday"
          },
          {
            "es": "mientras",
            "en": "while"
          },
          {
            "es": "de repente",
            "en": "suddenly"
          },
          {
            "es": "levantarse",
            "en": "to get up"
          },
          {
            "es": "ducharse",
            "en": "to shower"
          },
          {
            "es": "acostarse",
            "en": "to go to bed"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 14. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "recordar",
        "means": "to remember",
        "not": "to record",
        "correct": "grabar"
      },
      {
        "es": "ropa",
        "means": "clothes",
        "not": "rope",
        "correct": "cuerda"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 14.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Review Week 2",
      "passage": "La semana pasada practiqué mucho. Usé los pronombres de objeto directo e indirecto. También aprendí a dar órdenes informales. El español cada vez me parece más fácil."
    }
  },
  "15": {
    "day": 15,
    "title": "The Near Future",
    "subtitle": "IR + a + infinitive",
    "level": "B1",
    "objectives": [
      "Express future plans with IR + a",
      "Talk about what you're going to do",
      "Make plans and appointments",
      "Discuss upcoming events"
    ],
    "grammar": [
      {
        "heading": "IR + A + Infinitive",
        "content": "The easiest way to express future in Spanish! Use the verb IR (to go) + a + any infinitive verb.",
        "examples": [],
        "tip": "This is like English 'going to': I'm going to eat = Voy a comer"
      },
      {
        "heading": "Formation",
        "content": "Conjugate IR, add 'a', then the infinitive:",
        "examples": [
          {
            "es": "voy a hablar",
            "en": "I'm going to speak"
          },
          {
            "es": "vas a comer",
            "en": "you're going to eat"
          },
          {
            "es": "va a vivir",
            "en": "he/she is going to live"
          },
          {
            "es": "vamos a estudiar",
            "en": "we're going to study"
          },
          {
            "es": "van a trabajar",
            "en": "they're going to work"
          }
        ],
        "tip": null
      },
      {
        "heading": "Time Expressions for Future",
        "content": "Common phrases to use with near future:",
        "examples": [
          {
            "es": "mañana",
            "en": "tomorrow"
          },
          {
            "es": "esta noche",
            "en": "tonight"
          },
          {
            "es": "la semana que viene",
            "en": "next week"
          },
          {
            "es": "el mes que viene",
            "en": "next month"
          },
          {
            "es": "el año que viene",
            "en": "next year"
          }
        ],
        "tip": null
      },
      {
        "heading": "Questions in Near Future",
        "content": "Form questions naturally:",
        "examples": [
          {
            "es": "¿Qué vas a hacer?",
            "en": "What are you going to do?"
          },
          {
            "es": "¿Cuándo van a llegar?",
            "en": "When are they going to arrive?"
          },
          {
            "es": "¿Dónde vamos a comer?",
            "en": "Where are we going to eat?"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Time Expressions",
        "words": [
          {
            "es": "mañana",
            "en": "tomorrow"
          },
          {
            "es": "pasado mañana",
            "en": "day after tomorrow"
          },
          {
            "es": "esta noche",
            "en": "tonight"
          },
          {
            "es": "este fin de semana",
            "en": "this weekend"
          },
          {
            "es": "la semana que viene",
            "en": "next week"
          },
          {
            "es": "el próximo mes",
            "en": "next month"
          }
        ]
      },
      {
        "category": "Common Plans",
        "words": [
          {
            "es": "viajar",
            "en": "to travel"
          },
          {
            "es": "visitar",
            "en": "to visit"
          },
          {
            "es": "celebrar",
            "en": "to celebrate"
          },
          {
            "es": "empezar",
            "en": "to start"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 15. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "ropa",
        "means": "clothes",
        "not": "rope",
        "correct": "cuerda"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 15.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Making Comparisons",
      "passage": "Mi hermano es más alto que yo, pero yo soy más rápido que él. Nuestra hermana es la más inteligente de los tres. Sin embargo, yo cocino mejor que ellos."
    }
  },
  "16": {
    "day": 16,
    "title": "Simple Future Tense",
    "subtitle": "Will + verb (-ré, -rás, -rá)",
    "level": "B1",
    "objectives": [
      "Conjugate regular verbs in simple future",
      "Learn irregular future stems",
      "Express predictions and plans",
      "Use future for probability"
    ],
    "grammar": [
      {
        "heading": "Future Tense Formation",
        "content": "Add endings to the FULL infinitive (don't remove -ar/-er/-ir!):",
        "examples": [
          {
            "es": "-é",
            "en": "yo"
          },
          {
            "es": "-ás",
            "en": "tú"
          },
          {
            "es": "-á",
            "en": "él/ella/Ud."
          },
          {
            "es": "-emos",
            "en": "nosotros"
          },
          {
            "es": "-án",
            "en": "ellos/Uds."
          }
        ],
        "tip": "Same endings for ALL verbs (-ar, -er, -ir)!"
      },
      {
        "heading": "Examples: HABLAR",
        "content": "Full infinitive + endings:",
        "examples": [
          {
            "es": "hablaré",
            "en": "I will speak"
          },
          {
            "es": "hablarás",
            "en": "you will speak"
          },
          {
            "es": "hablará",
            "en": "he/she will speak"
          },
          {
            "es": "hablaremos",
            "en": "we will speak"
          },
          {
            "es": "hablarán",
            "en": "they will speak"
          }
        ],
        "tip": null
      },
      {
        "heading": "Irregular Future Stems",
        "content": "12 verbs have irregular stems (but same endings):",
        "examples": [
          {
            "es": "tener → tendr-",
            "en": "tendré, tendrás..."
          },
          {
            "es": "venir → vendr-",
            "en": "vendré, vendrás..."
          },
          {
            "es": "poner → pondr-",
            "en": "pondré, pondrás..."
          },
          {
            "es": "salir → saldr-",
            "en": "saldré, saldrás..."
          },
          {
            "es": "poder → podr-",
            "en": "podré, podrás..."
          }
        ],
        "tip": null
      },
      {
        "heading": "Future for Probability",
        "content": "Future can express 'probably' or 'I wonder':",
        "examples": [
          {
            "es": "¿Qué hora será?",
            "en": "I wonder what time it is / What time could it be?"
          },
          {
            "es": "Estará en casa",
            "en": "He's probably at home"
          },
          {
            "es": "Tendrá unos 30 años",
            "en": "She's probably about 30"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Time Markers",
        "words": [
          {
            "es": "mañana",
            "en": "tomorrow"
          },
          {
            "es": "la semana que viene",
            "en": "next week"
          },
          {
            "es": "el año que viene",
            "en": "next year"
          },
          {
            "es": "dentro de",
            "en": "in (time)"
          },
          {
            "es": "algún día",
            "en": "someday"
          },
          {
            "es": "pronto",
            "en": "soon"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 16. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "embarazada",
        "means": "pregnant",
        "not": "embarrassed",
        "correct": "avergonzado/a"
      },
      {
        "es": "actualmente",
        "means": "currently",
        "not": "actually",
        "correct": "en realidad"
      },
      {
        "es": "realizar",
        "means": "to accomplish",
        "not": "to realize",
        "correct": "darse cuenta"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 16.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Future Plans",
      "passage": "El próximo año viajaré a España. Visitaré Madrid y Barcelona. Comeré tapas y beberé sangría. Practicaré español con los locales. Será una experiencia increíble."
    }
  },
  "17": {
    "day": 17,
    "title": "Conditional Mood",
    "subtitle": "Would + verb (-ría, -rías, -ría)",
    "level": "B1",
    "objectives": [
      "Conjugate verbs in conditional",
      "Express hypothetical situations",
      "Make polite requests",
      "Talk about what you would do"
    ],
    "grammar": [
      {
        "heading": "The Conditional",
        "content": "The conditional expresses what WOULD happen. Like future, add endings to the infinitive:",
        "examples": [
          {
            "es": "-ía",
            "en": "yo"
          },
          {
            "es": "-ías",
            "en": "tú"
          },
          {
            "es": "-ía",
            "en": "él/ella/Ud."
          },
          {
            "es": "-íamos",
            "en": "nosotros"
          },
          {
            "es": "-ían",
            "en": "ellos/Uds."
          }
        ],
        "tip": "Same irregular stems as future tense!"
      },
      {
        "heading": "Examples: HABLAR",
        "content": "Infinitive + conditional endings:",
        "examples": [
          {
            "es": "hablaría",
            "en": "I would speak"
          },
          {
            "es": "hablarías",
            "en": "you would speak"
          },
          {
            "es": "hablaría",
            "en": "he/she would speak"
          },
          {
            "es": "hablaríamos",
            "en": "we would speak"
          },
          {
            "es": "hablarían",
            "en": "they would speak"
          }
        ],
        "tip": null
      },
      {
        "heading": "Irregular Conditionals",
        "content": "Same irregular stems as future:",
        "examples": [
          {
            "es": "tener → tendría",
            "en": "would have"
          },
          {
            "es": "poder → podría",
            "en": "would be able"
          },
          {
            "es": "hacer → haría",
            "en": "would do/make"
          },
          {
            "es": "decir → diría",
            "en": "would say"
          },
          {
            "es": "querer → querría",
            "en": "would want"
          }
        ],
        "tip": null
      },
      {
        "heading": "Uses of Conditional",
        "content": "Common uses:",
        "examples": [
          {
            "es": "Me gustaría un café",
            "en": "I would like a coffee (polite)"
          },
          {
            "es": "¿Podrías ayudarme?",
            "en": "Could you help me? (polite)"
          },
          {
            "es": "Yo compraría esa casa",
            "en": "I would buy that house (hypothetical)"
          },
          {
            "es": "Dijo que vendría",
            "en": "He said he would come (reported speech)"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Conditional Phrases",
        "words": [
          {
            "es": "me gustaría",
            "en": "I would like"
          },
          {
            "es": "podría",
            "en": "could/would be able"
          },
          {
            "es": "debería",
            "en": "should"
          },
          {
            "es": "sería",
            "en": "would be"
          },
          {
            "es": "tendría",
            "en": "would have"
          },
          {
            "es": "habría",
            "en": "there would be"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 17. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "actualmente",
        "means": "currently",
        "not": "actually",
        "correct": "en realidad"
      },
      {
        "es": "realizar",
        "means": "to accomplish",
        "not": "to realize",
        "correct": "darse cuenta"
      },
      {
        "es": "sensible",
        "means": "sensitive",
        "not": "sensible",
        "correct": "sensato"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 17.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Hypothetical Situations",
      "passage": "Si tuviera más dinero, compraría una casa en la playa. Viajaría por todo el mundo y conocería muchas culturas. Pero por ahora, trabajo duro y ahorro cada mes."
    }
  },
  "18": {
    "day": 18,
    "title": "Commands (Tú)",
    "subtitle": "Informal commands",
    "level": "B1",
    "objectives": [
      "Master informal commands",
      "Build practical vocabulary",
      "Practice real-world scenarios",
      "Increase fluency confidence"
    ],
    "grammar": [
      {
        "heading": "Day 18: Commands (Tú)",
        "content": "Today we focus on informal commands. This is an essential skill for conversational Spanish that you'll use every day.",
        "examples": [],
        "tip": "Practice these patterns until they become automatic!"
      },
      {
        "heading": "Key Concepts",
        "content": "Let's explore the main ideas for informal commands.",
        "examples": [
          {
            "es": "Example phrase in Spanish",
            "en": "English translation"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Commands (Tú) Words",
        "words": [
          {
            "es": "palabra",
            "en": "word"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 18. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "realizar",
        "means": "to accomplish",
        "not": "to realize",
        "correct": "darse cuenta"
      },
      {
        "es": "sensible",
        "means": "sensitive",
        "not": "sensible",
        "correct": "sensato"
      },
      {
        "es": "éxito",
        "means": "success",
        "not": "exit",
        "correct": "salida"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 18.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Informal Commands",
      "passage": "¡Oye! Ven a la fiesta esta noche. Trae algo de beber. No llegues tarde como siempre. Dile a Pedro que venga también. ¡Va a ser divertido!"
    }
  },
  "19": {
    "day": 19,
    "title": "Commands (Usted)",
    "subtitle": "Formal commands",
    "level": "B1",
    "objectives": [
      "Master formal commands",
      "Build practical vocabulary",
      "Practice real-world scenarios",
      "Increase fluency confidence"
    ],
    "grammar": [
      {
        "heading": "Day 19: Commands (Usted)",
        "content": "Today we focus on formal commands. This is an essential skill for conversational Spanish that you'll use every day.",
        "examples": [],
        "tip": "Practice these patterns until they become automatic!"
      },
      {
        "heading": "Key Concepts",
        "content": "Let's explore the main ideas for formal commands.",
        "examples": [
          {
            "es": "Example phrase in Spanish",
            "en": "English translation"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Commands (Usted) Words",
        "words": [
          {
            "es": "palabra",
            "en": "word"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 19. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "sensible",
        "means": "sensitive",
        "not": "sensible",
        "correct": "sensato"
      },
      {
        "es": "éxito",
        "means": "success",
        "not": "exit",
        "correct": "salida"
      },
      {
        "es": "librería",
        "means": "bookstore",
        "not": "library",
        "correct": "biblioteca"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 19.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Formal Commands",
      "passage": "Señor García, por favor tome asiento. Espere un momento, el doctor lo atenderá pronto. No se preocupe, el examen será rápido. Complete este formulario mientras espera."
    }
  },
  "20": {
    "day": 20,
    "title": "Subjunctive Intro",
    "subtitle": "Expressions of desire",
    "level": "B1",
    "objectives": [
      "Master subjunctive mood basics",
      "Build practical vocabulary",
      "Practice real-world scenarios",
      "Increase fluency confidence"
    ],
    "grammar": [
      {
        "heading": "Day 20: Subjunctive Intro",
        "content": "Today we focus on subjunctive mood basics. This is an essential skill for conversational Spanish that you'll use every day.",
        "examples": [],
        "tip": "Practice these patterns until they become automatic!"
      },
      {
        "heading": "Key Concepts",
        "content": "Let's explore the main ideas for subjunctive mood basics.",
        "examples": [
          {
            "es": "Example phrase in Spanish",
            "en": "English translation"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Subjunctive Intro Words",
        "words": [
          {
            "es": "palabra",
            "en": "word"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 20. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "éxito",
        "means": "success",
        "not": "exit",
        "correct": "salida"
      },
      {
        "es": "librería",
        "means": "bookstore",
        "not": "library",
        "correct": "biblioteca"
      },
      {
        "es": "carpeta",
        "means": "folder",
        "not": "carpet",
        "correct": "alfombra"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 20.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Wishes & Desires",
      "passage": "Quiero que vengas a mi fiesta. Espero que puedas quedarte todo el fin de semana. Deseo que nos divirtamos mucho. Ojalá que no llueva ese día."
    }
  },
  "21": {
    "day": 21,
    "title": "Week 3 Review",
    "subtitle": "Advanced structures",
    "level": "B1",
    "objectives": [
      "Master future, conditional, commands",
      "Build practical vocabulary",
      "Practice real-world scenarios",
      "Increase fluency confidence"
    ],
    "grammar": [
      {
        "heading": "Day 21: Week 3 Review",
        "content": "Today we focus on future, conditional, commands. This is an essential skill for conversational Spanish that you'll use every day.",
        "examples": [],
        "tip": "Practice these patterns until they become automatic!"
      },
      {
        "heading": "Key Concepts",
        "content": "Let's explore the main ideas for future, conditional, commands.",
        "examples": [
          {
            "es": "Example phrase in Spanish",
            "en": "English translation"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Week 3 Review Words",
        "words": [
          {
            "es": "palabra",
            "en": "word"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 21. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "librería",
        "means": "bookstore",
        "not": "library",
        "correct": "biblioteca"
      },
      {
        "es": "carpeta",
        "means": "folder",
        "not": "carpet",
        "correct": "alfombra"
      },
      {
        "es": "soportar",
        "means": "to tolerate",
        "not": "to support",
        "correct": "apoyar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 21.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Impersonal Expressions",
      "passage": "Es importante que estudies cada día. Es necesario que practiques la pronunciación. Es mejor que hables con nativos. Es posible que cometas errores, pero es normal."
    }
  },
  "22": {
    "day": 22,
    "title": "Introduction to Subjunctive",
    "subtitle": "A new mood for Spanish",
    "level": "B1-B2",
    "objectives": [
      "Understand what the subjunctive mood is",
      "Learn when subjunctive is required",
      "Conjugate regular verbs in present subjunctive",
      "Use subjunctive with expressions of desire"
    ],
    "grammar": [
      {
        "heading": "What is the Subjunctive?",
        "content": "The subjunctive is not a tense but a MOOD. It expresses subjectivity: wishes, doubts, emotions, possibilities, and hypotheticals. The indicative state",
        "examples": [],
        "tip": "Think of it this way: Indicative = Reality, Subjunctive = Non-reality (wishes, doubts, emotions)"
      },
      {
        "heading": "The WEIRDO Triggers",
        "content": "Subjunctive is triggered by these categories in the main clause:",
        "examples": [
          {
            "es": "W - Wishes/Wants",
            "en": "querer que, desear que, preferir que"
          },
          {
            "es": "E - Emotions",
            "en": "alegrarse de que, tener miedo de que"
          },
          {
            "es": "I - Impersonal expressions",
            "en": "es importante que, es necesario que"
          },
          {
            "es": "R - Recommendations",
            "en": "recomendar que, sugerir que"
          },
          {
            "es": "D - Doubt/Denial",
            "en": "dudar que, no creer que"
          }
        ],
        "tip": null
      },
      {
        "heading": "Forming Present Subjunctive",
        "content": "Start with yo form of present indicative, drop -o, add opposite endings:",
        "examples": [
          {
            "es": "-AR verbs: -e, -es, -e, -emos, -en",
            "en": "hable, hables, hable, hablemos, hablen"
          },
          {
            "es": "-ER/-IR verbs: -a, -as, -a, -amos, -an",
            "en": "coma, comas, coma, comamos, coman"
          }
        ],
        "tip": "-AR verbs get -ER endings, -ER/-IR verbs get -AR endings!"
      },
      {
        "heading": "HABLAR in Subjunctive",
        "content": "From hablo → habl- + subjunctive endings:",
        "examples": [
          {
            "es": "yo hable",
            "en": "that I speak"
          },
          {
            "es": "tú hables",
            "en": "that you speak"
          },
          {
            "es": "él/ella hable",
            "en": "that he/she speak"
          },
          {
            "es": "nosotros hablemos",
            "en": "that we speak"
          },
          {
            "es": "ellos hablen",
            "en": "that they speak"
          }
        ],
        "tip": null
      },
      {
        "heading": "Subjunctive with Wishes",
        "content": "When the subjects are different, use subjunctive after que:",
        "examples": [
          {
            "es": "Quiero que vengas",
            "en": "I want you to come"
          },
          {
            "es": "Deseo que seas feliz",
            "en": "I wish you to be happy"
          },
          {
            "es": "Espero que llueva",
            "en": "I hope it rains"
          }
        ],
        "tip": "Same subject = infinitive: Quiero ir. Different subjects = que + subjunctive."
      },
      {
        "heading": "Irregular Subjunctives",
        "content": "Common irregular verbs:",
        "examples": [
          {
            "es": "ser: sea, seas, sea, seamos, sean",
            "en": "to be"
          },
          {
            "es": "estar: esté, estés, esté, estemos, estén",
            "en": "to be"
          },
          {
            "es": "ir: vaya, vayas, vaya, vayamos, vayan",
            "en": "to go"
          },
          {
            "es": "haber: haya",
            "en": "there is (subjunctive)"
          },
          {
            "es": "saber: sepa, sepas, sepa, sepamos, sepan",
            "en": "to know"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Wishes & Desires",
        "words": [
          {
            "es": "querer que",
            "en": "to want (that)"
          },
          {
            "es": "desear que",
            "en": "to wish (that)"
          },
          {
            "es": "esperar que",
            "en": "to hope (that)"
          },
          {
            "es": "preferir que",
            "en": "to prefer (that)"
          },
          {
            "es": "necesitar que",
            "en": "to need (that)"
          }
        ]
      },
      {
        "category": "Impersonal Expressions",
        "words": [
          {
            "es": "es importante que",
            "en": "it's important that"
          },
          {
            "es": "es necesario que",
            "en": "it's necessary that"
          },
          {
            "es": "es mejor que",
            "en": "it's better that"
          },
          {
            "es": "es posible que",
            "en": "it's possible that"
          },
          {
            "es": "ojalá (que)",
            "en": "I hope that"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 22. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "carpeta",
        "means": "folder",
        "not": "carpet",
        "correct": "alfombra"
      },
      {
        "es": "soportar",
        "means": "to tolerate",
        "not": "to support",
        "correct": "apoyar"
      },
      {
        "es": "constipado",
        "means": "having a cold",
        "not": "constipated",
        "correct": "estreñido"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 22.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Future Tense Practice",
      "passage": "Mañana saldré temprano porque tendré una reunión importante. Después iré al gimnasio y haré ejercicio. Por la noche, comeré con mis amigos. Será un día ocupado pero productivo."
    }
  },
  "23": {
    "day": 23,
    "title": "Subjunctive: Emotions & Doubt",
    "subtitle": "Expressing feelings and uncertainty",
    "level": "B2",
    "objectives": [
      "Use subjunctive with emotion triggers",
      "Express doubt and uncertainty",
      "Distinguish subjunctive vs indicative",
      "Master stem-changing subjunctives"
    ],
    "grammar": [
      {
        "heading": "Subjunctive with Emotions",
        "content": "Express how you feel about someone else's actions:",
        "examples": [
          {
            "es": "Me alegro de que estés aquí.",
            "en": "I'm glad you're here."
          },
          {
            "es": "Siento que no puedas venir.",
            "en": "I'm sorry you can't come."
          },
          {
            "es": "Me sorprende que hables español.",
            "en": "It surprises me that you speak Spanish."
          },
          {
            "es": "Tengo miedo de que llueva.",
            "en": "I'm afraid it will rain."
          },
          {
            "es": "Es triste que se vaya.",
            "en": "It's sad that he's leaving."
          }
        ],
        "tip": null
      },
      {
        "heading": "Common Emotion Triggers",
        "content": "These expressions require subjunctive:",
        "examples": [
          {
            "es": "alegrarse de que",
            "en": "to be glad that"
          },
          {
            "es": "sentir que",
            "en": "to be sorry that"
          },
          {
            "es": "tener miedo de que",
            "en": "to be afraid that"
          },
          {
            "es": "sorprenderse de que",
            "en": "to be surprised that"
          },
          {
            "es": "molestar que",
            "en": "to bother that"
          }
        ],
        "tip": null
      },
      {
        "heading": "Subjunctive with Doubt",
        "content": "Uncertainty triggers subjunctive:",
        "examples": [
          {
            "es": "Dudo que venga.",
            "en": "I doubt he'll come."
          },
          {
            "es": "No creo que sea verdad.",
            "en": "I don't think it's true."
          },
          {
            "es": "No es seguro que llegue.",
            "en": "It's not certain he'll arrive."
          },
          {
            "es": "Es imposible que lo sepa.",
            "en": "It's impossible that he knows."
          },
          {
            "es": "Tal vez llueva mañana.",
            "en": "Maybe it will rain tomorrow."
          }
        ],
        "tip": "CREER QUE uses indicative (certainty). NO CREER QUE uses subjunctive (doubt)."
      },
      {
        "heading": "Indicative vs Subjunctive",
        "content": "Compare certainty (indicative) vs doubt (subjunctive):",
        "examples": [
          {
            "es": "Creo que viene. (indicative)",
            "en": "I think he's coming."
          },
          {
            "es": "No creo que venga. (subjunctive)",
            "en": "I don't think he's coming."
          },
          {
            "es": "Es verdad que está aquí. (indicative)",
            "en": "It's true he's here."
          },
          {
            "es": "No es verdad que esté aquí. (subjunctive)",
            "en": "It's not true he's here."
          }
        ],
        "tip": null
      },
      {
        "heading": "Stem-Changing Subjunctives",
        "content": "Stem changes carry over from indicative:",
        "examples": [
          {
            "es": "pensar (e→ie): piense, pienses, piense, pensemos, piensen",
            "en": "to think"
          },
          {
            "es": "poder (o→ue): pueda, puedas, pueda, podamos, puedan",
            "en": "to be able"
          },
          {
            "es": "sentir (e→ie, e→i): sienta, sientas, sienta, sintamos, sientan",
            "en": "to feel"
          },
          {
            "es": "dormir (o→ue, o→u): duerma, duermas, duerma, durmamos, duerman",
            "en": "to sleep"
          }
        ],
        "tip": "In nosotros/ellos forms, -ir verbs have additional stem changes."
      }
    ],
    "vocabulary": [
      {
        "category": "Emotion Expressions",
        "words": [
          {
            "es": "alegrarse de que",
            "en": "to be happy that"
          },
          {
            "es": "sentir que",
            "en": "to regret that"
          },
          {
            "es": "tener miedo de que",
            "en": "to be afraid that"
          },
          {
            "es": "sorprenderse de que",
            "en": "to be surprised that"
          },
          {
            "es": "es una lástima que",
            "en": "it's a pity that"
          }
        ]
      },
      {
        "category": "Doubt Expressions",
        "words": [
          {
            "es": "dudar que",
            "en": "to doubt that"
          },
          {
            "es": "no creer que",
            "en": "to not think that"
          },
          {
            "es": "no estar seguro de que",
            "en": "to not be sure that"
          },
          {
            "es": "es posible que",
            "en": "it's possible that"
          },
          {
            "es": "quizás/tal vez",
            "en": "maybe/perhaps"
          }
        ]
      },
      {
        "category": "Bonus Vocabulary",
        "words": [
          {
            "es": "el médico/la médica",
            "en": "doctor"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el hospital",
            "en": "hospital"
          },
          {
            "es": "la farmacia",
            "en": "pharmacy"
          },
          {
            "es": "la receta",
            "en": "prescription"
          },
          {
            "es": "la pastilla",
            "en": "pill"
          },
          {
            "es": "el dolor",
            "en": "pain"
          },
          {
            "es": "la fiebre",
            "en": "fever"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 23. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "soportar",
        "means": "to tolerate",
        "not": "to support",
        "correct": "apoyar"
      },
      {
        "es": "constipado",
        "means": "having a cold",
        "not": "constipated",
        "correct": "estreñido"
      },
      {
        "es": "asistir",
        "means": "to attend",
        "not": "to assist",
        "correct": "ayudar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 23.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Subjunctive Letter",
      "passage": "Querida mamá, me alegro de que estés mejor de salud. Siento mucho que no pueda visitarte este fin de semana, pero tengo mucho trabajo. Es una lástima que vivamos tan lejos. Dudo que pueda tomar vacaciones antes de diciembre. Te quiero mucho y espero verte pronto. Un abrazo fuerte, tu hijo Carlos."
    }
  },
  "24": {
    "day": 24,
    "title": "Subjunctive: Conjunctions",
    "subtitle": "Purpose, time, and condition clauses",
    "level": "B2",
    "objectives": [
      "Use subjunctive with purpose conjunctions",
      "Master time clauses with subjunctive",
      "Understand condition and concession clauses",
      "Know when conjunctions DON'T need subjunctive"
    ],
    "grammar": [
      {
        "heading": "Purpose Conjunctions (Always Subjunctive)",
        "content": "These ALWAYS trigger subjunctive:",
        "examples": [
          {
            "es": "para que",
            "en": "so that, in order that"
          },
          {
            "es": "a fin de que",
            "en": "so that"
          },
          {
            "es": "con tal de que",
            "en": "provided that"
          },
          {
            "es": "a menos que",
            "en": "unless"
          },
          {
            "es": "sin que",
            "en": "without"
          }
        ],
        "tip": null
      },
      {
        "heading": "Purpose Clause Examples",
        "content": "Purpose = non-fact = subjunctive:",
        "examples": [
          {
            "es": "Te lo digo para que sepas.",
            "en": "I'm telling you so you know."
          },
          {
            "es": "Voy a llamar a menos que vengas.",
            "en": "I'll call unless you come."
          },
          {
            "es": "Salió sin que lo viéramos.",
            "en": "He left without us seeing him."
          },
          {
            "es": "Te ayudo con tal de que estudies.",
            "en": "I'll help you provided you study."
          }
        ],
        "tip": null
      },
      {
        "heading": "Time Conjunctions (Sometimes Subjunctive)",
        "content": "Future/hypothetical = subjunctive. Past/habitual = indicative.",
        "examples": [
          {
            "es": "cuando",
            "en": "when"
          },
          {
            "es": "hasta que",
            "en": "until"
          },
          {
            "es": "después de que",
            "en": "after"
          },
          {
            "es": "antes de que",
            "en": "before (ALWAYS subjunctive)"
          },
          {
            "es": "tan pronto como",
            "en": "as soon as"
          }
        ],
        "tip": null
      },
      {
        "heading": "Time Clause Examples",
        "content": "Compare future (subjunctive) vs past (indicative):",
        "examples": [
          {
            "es": "Cuando llegue, te llamo. (future)",
            "en": "When I arrive, I'll call you."
          },
          {
            "es": "Cuando llegué, te llamé. (past)",
            "en": "When I arrived, I called you."
          },
          {
            "es": "Esperaré hasta que vengas. (future)",
            "en": "I'll wait until you come."
          },
          {
            "es": "Esperé hasta que viniste. (past)",
            "en": "I waited until you came."
          }
        ],
        "tip": "ANTES DE QUE is special - it ALWAYS uses subjunctive because 'before' is always uncertain."
      },
      {
        "heading": "Antes de que (Always Subjunctive)",
        "content": "Before = action hasn't happened yet = always subjunctive:",
        "examples": [
          {
            "es": "Ven antes de que llueva.",
            "en": "Come before it rains."
          },
          {
            "es": "Terminé antes de que llegaras.",
            "en": "I finished before you arrived."
          },
          {
            "es": "Antes de que digas algo...",
            "en": "Before you say anything..."
          }
        ],
        "tip": null
      },
      {
        "heading": "Concession Clauses",
        "content": "'Even though' expressions:",
        "examples": [
          {
            "es": "aunque + indicative",
            "en": "fact = although (it IS true)"
          },
          {
            "es": "aunque + subjunctive",
            "en": "hypothetical = even if (it might be)"
          },
          {
            "es": "Aunque está lloviendo, voy.",
            "en": "Although it's raining, I'm going."
          },
          {
            "es": "Aunque llueva, iré.",
            "en": "Even if it rains, I'll go."
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Always Subjunctive",
        "words": [
          {
            "es": "para que",
            "en": "so that"
          },
          {
            "es": "a menos que",
            "en": "unless"
          },
          {
            "es": "sin que",
            "en": "without"
          },
          {
            "es": "antes de que",
            "en": "before"
          },
          {
            "es": "en caso de que",
            "en": "in case"
          }
        ]
      },
      {
        "category": "Sometimes Subjunctive",
        "words": [
          {
            "es": "cuando",
            "en": "when"
          },
          {
            "es": "hasta que",
            "en": "until"
          },
          {
            "es": "después de que",
            "en": "after"
          },
          {
            "es": "aunque",
            "en": "although/even if"
          },
          {
            "es": "tan pronto como",
            "en": "as soon as"
          }
        ]
      },
      {
        "category": "Bonus Vocabulary",
        "words": [
          {
            "es": "el médico/la médica",
            "en": "doctor"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el hospital",
            "en": "hospital"
          },
          {
            "es": "la farmacia",
            "en": "pharmacy"
          },
          {
            "es": "la receta",
            "en": "prescription"
          },
          {
            "es": "la pastilla",
            "en": "pill"
          },
          {
            "es": "el dolor",
            "en": "pain"
          },
          {
            "es": "la fiebre",
            "en": "fever"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 24. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "constipado",
        "means": "having a cold",
        "not": "constipated",
        "correct": "estreñido"
      },
      {
        "es": "asistir",
        "means": "to attend",
        "not": "to assist",
        "correct": "ayudar"
      },
      {
        "es": "pretender",
        "means": "to try/attempt",
        "not": "to pretend",
        "correct": "fingir"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 24.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Expressing Doubt",
      "passage": "No creo que Juan venga a la reunión. Dudo que haya terminado el proyecto. Es improbable que nos den más tiempo. Quizás podamos pedir una extensión, pero no estoy seguro."
    }
  },
  "25": {
    "day": 25,
    "title": "The Conditional Tense",
    "subtitle": "Would, could, should",
    "level": "B2",
    "objectives": [
      "Form the conditional tense",
      "Express hypothetical situations",
      "Make polite requests",
      "Give advice with conditional"
    ],
    "grammar": [
      {
        "heading": "What is the Conditional?",
        "content": "The conditional expresses what WOULD happen. Used for hypotheticals, polite requests, and advice.",
        "examples": [
          {
            "es": "Me gustaría un café",
            "en": "I would like a coffee"
          },
          {
            "es": "¿Podrías ayudarme?",
            "en": "Could you help me?"
          },
          {
            "es": "Yo no haría eso",
            "en": "I wouldn't do that"
          }
        ],
        "tip": null
      },
      {
        "heading": "Forming the Conditional",
        "content": "Add these endings to the INFINITIVE (same for all verbs):",
        "examples": [
          {
            "es": "yo: -ía",
            "en": "hablaría, comería, viviría"
          },
          {
            "es": "tú: -ías",
            "en": "hablarías, comerías, vivirías"
          },
          {
            "es": "él/ella: -ía",
            "en": "hablaría, comería, viviría"
          },
          {
            "es": "nosotros: -íamos",
            "en": "hablaríamos, comeríamos, viviríamos"
          },
          {
            "es": "ellos: -ían",
            "en": "hablarían, comerían, vivirían"
          }
        ],
        "tip": "Same endings for -AR, -ER, -IR verbs! Add to full infinitive."
      },
      {
        "heading": "Regular Examples",
        "content": "Simply add endings to infinitive:",
        "examples": [
          {
            "es": "hablar → hablaría, hablarías, hablaría...",
            "en": "would speak"
          },
          {
            "es": "comer → comería, comerías, comería...",
            "en": "would eat"
          },
          {
            "es": "vivir → viviría, vivirías, viviría...",
            "en": "would live"
          }
        ],
        "tip": null
      },
      {
        "heading": "Irregular Stems",
        "content": "Same irregular stems as future tense:",
        "examples": [
          {
            "es": "decir → dir-: diría",
            "en": "would say"
          },
          {
            "es": "hacer → har-: haría",
            "en": "would do/make"
          },
          {
            "es": "poder → podr-: podría",
            "en": "could"
          },
          {
            "es": "poner → pondr-: pondría",
            "en": "would put"
          },
          {
            "es": "querer → querr-: querría",
            "en": "would want"
          }
        ],
        "tip": null
      },
      {
        "heading": "Uses of Conditional",
        "content": "Four main uses:",
        "examples": [
          {
            "es": "Hypothetical: Yo compraría un coche nuevo",
            "en": "I would buy a new car"
          },
          {
            "es": "Polite requests: ¿Podría repetir?",
            "en": "Could you repeat?"
          },
          {
            "es": "Advice: Yo que tú, estudiaría más",
            "en": "If I were you, I'd study more"
          },
          {
            "es": "Probability in past: Serían las diez",
            "en": "It was probably ten o'clock"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Polite Requests",
        "words": [
          {
            "es": "¿Podría...?",
            "en": "Could you...?"
          },
          {
            "es": "¿Sería posible...?",
            "en": "Would it be possible...?"
          },
          {
            "es": "Me gustaría...",
            "en": "I would like..."
          },
          {
            "es": "Querría...",
            "en": "I would want..."
          },
          {
            "es": "¿Le importaría...?",
            "en": "Would you mind...?"
          }
        ]
      },
      {
        "category": "Giving Advice",
        "words": [
          {
            "es": "Yo que tú...",
            "en": "If I were you..."
          },
          {
            "es": "Yo en tu lugar...",
            "en": "In your place, I..."
          },
          {
            "es": "Deberías...",
            "en": "You should..."
          },
          {
            "es": "Sería mejor...",
            "en": "It would be better..."
          },
          {
            "es": "¿No crees que deberías...?",
            "en": "Don't you think you should...?"
          }
        ]
      },
      {
        "category": "Bonus Vocabulary",
        "words": [
          {
            "es": "el médico/la médica",
            "en": "doctor"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el hospital",
            "en": "hospital"
          },
          {
            "es": "la farmacia",
            "en": "pharmacy"
          },
          {
            "es": "la receta",
            "en": "prescription"
          },
          {
            "es": "la pastilla",
            "en": "pill"
          },
          {
            "es": "el dolor",
            "en": "pain"
          },
          {
            "es": "la fiebre",
            "en": "fever"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 25. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "asistir",
        "means": "to attend",
        "not": "to assist",
        "correct": "ayudar"
      },
      {
        "es": "pretender",
        "means": "to try/attempt",
        "not": "to pretend",
        "correct": "fingir"
      },
      {
        "es": "introducir",
        "means": "to insert",
        "not": "to introduce",
        "correct": "presentar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 25.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Conditional Wishes",
      "passage": "Si pudiera viajar en el tiempo, iría a la España del siglo XV. Me gustaría ver cómo era la vida entonces. Si hubiera nacido en esa época, habría sido explorador."
    }
  },
  "26": {
    "day": 26,
    "title": "Imperfect Subjunctive & Si Clauses",
    "subtitle": "Hypotheticals and past wishes",
    "level": "B2",
    "objectives": [
      "Form the imperfect subjunctive",
      "Use si clauses for hypotheticals",
      "Express past wishes and regrets",
      "Understand contrary-to-fact conditions"
    ],
    "grammar": [
      {
        "heading": "Forming Imperfect Subjunctive",
        "content": "Take the ellos form of preterite, remove -ron, add these endings:",
        "examples": [
          {
            "es": "-ra, -ras, -ra, -ramos, -ran",
            "en": "Common form"
          },
          {
            "es": "hablaron → habla- → hablara, hablaras, hablara...",
            "en": "to speak"
          },
          {
            "es": "comieron → comie- → comiera, comieras, comiera...",
            "en": "to eat"
          },
          {
            "es": "vivieron → vivie- → viviera, vivieras, viviera...",
            "en": "to live"
          }
        ],
        "tip": "The -ra endings are most common. -se endings (hablase) exist but are less frequent."
      },
      {
        "heading": "Irregular Imperfect Subjunctives",
        "content": "Use the irregular preterite stem:",
        "examples": [
          {
            "es": "ser/ir → fueron → fuera, fueras, fuera...",
            "en": "were/went"
          },
          {
            "es": "tener → tuvieron → tuviera, tuvieras...",
            "en": "had"
          },
          {
            "es": "hacer → hicieron → hiciera, hicieras...",
            "en": "did/made"
          },
          {
            "es": "poder → pudieron → pudiera, pudieras...",
            "en": "could"
          },
          {
            "es": "estar → estuvieron → estuviera, estuvieras...",
            "en": "were"
          }
        ],
        "tip": null
      },
      {
        "heading": "Si Clauses (If Clauses)",
        "content": "Three types of conditions:",
        "examples": [
          {
            "es": "Type 1 (Real): Si tengo tiempo, voy.",
            "en": "If I have time, I go. (present + present)"
          },
          {
            "es": "Type 2 (Hypothetical): Si tuviera tiempo, iría.",
            "en": "If I had time, I would go. (imp subj + conditional)"
          },
          {
            "es": "Type 3 (Past Unreal): Si hubiera tenido tiempo, habría ido.",
            "en": "If I had had time, I would have gone."
          }
        ],
        "tip": "Type 2 is most important: Si + imperfect subjunctive + conditional"
      },
      {
        "heading": "Type 2 Si Clause Examples",
        "content": "Hypothetical situations:",
        "examples": [
          {
            "es": "Si fuera rico, viajaría por el mundo.",
            "en": "If I were rich, I would travel the world."
          },
          {
            "es": "Si tuviera más tiempo, estudiaría más.",
            "en": "If I had more time, I would study more."
          },
          {
            "es": "Si pudiera, te ayudaría.",
            "en": "If I could, I would help you."
          },
          {
            "es": "Si estuviera en tu lugar, no lo haría.",
            "en": "If I were in your place, I wouldn't do it."
          }
        ],
        "tip": null
      },
      {
        "heading": "Ojalá with Imperfect Subjunctive",
        "content": "Use for unlikely/impossible wishes:",
        "examples": [
          {
            "es": "Ojalá pudiera ir.",
            "en": "I wish I could go. (but probably can't)"
          },
          {
            "es": "Ojalá tuviera más tiempo.",
            "en": "I wish I had more time. (but I don't)"
          },
          {
            "es": "Ojalá estuvieras aquí.",
            "en": "I wish you were here. (but you're not)"
          }
        ],
        "tip": "Ojalá + present subjunctive = possible. Ojalá + imperfect subjunctive = unlikely."
      }
    ],
    "vocabulary": [
      {
        "category": "Si Clause Vocabulary",
        "words": [
          {
            "es": "si pudiera",
            "en": "if I could"
          },
          {
            "es": "si tuviera",
            "en": "if I had"
          },
          {
            "es": "si fuera",
            "en": "if I were"
          },
          {
            "es": "si supiera",
            "en": "if I knew"
          },
          {
            "es": "como si",
            "en": "as if"
          }
        ]
      },
      {
        "category": "Result Clause Phrases",
        "words": [
          {
            "es": "iría",
            "en": "I would go"
          },
          {
            "es": "haría",
            "en": "I would do"
          },
          {
            "es": "diría",
            "en": "I would say"
          },
          {
            "es": "sería",
            "en": "it would be"
          },
          {
            "es": "tendría",
            "en": "I would have"
          }
        ]
      },
      {
        "category": "Bonus Vocabulary",
        "words": [
          {
            "es": "el médico/la médica",
            "en": "doctor"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el hospital",
            "en": "hospital"
          },
          {
            "es": "la farmacia",
            "en": "pharmacy"
          },
          {
            "es": "la receta",
            "en": "prescription"
          },
          {
            "es": "la pastilla",
            "en": "pill"
          },
          {
            "es": "el dolor",
            "en": "pain"
          },
          {
            "es": "la fiebre",
            "en": "fever"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 26. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "pretender",
        "means": "to try/attempt",
        "not": "to pretend",
        "correct": "fingir"
      },
      {
        "es": "introducir",
        "means": "to insert",
        "not": "to introduce",
        "correct": "presentar"
      },
      {
        "es": "largo",
        "means": "long",
        "not": "large",
        "correct": "grande"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 26.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Reported Speech",
      "passage": "María dijo que vendría a las ocho. Me contó que había tenido problemas con el tráfico. Me preguntó si podíamos empezar sin ella. Le respondí que la esperaríamos."
    }
  },
  "27": {
    "day": 27,
    "title": "Perfect Tenses Complete",
    "subtitle": "Present, past, future, and conditional perfect",
    "level": "B2",
    "objectives": [
      "Master all perfect tense formations",
      "Use present perfect vs preterite correctly",
      "Express completed future actions",
      "Understand perfect subjunctive"
    ],
    "grammar": [
      {
        "heading": "HABER + Past Participle",
        "content": "All perfect tenses use HABER + past participle (-ado/-ido):",
        "examples": [
          {
            "es": "-AR verbs: hablado, trabajado, estudiado",
            "en": "spoken, worked, studied"
          },
          {
            "es": "-ER verbs: comido, bebido, leído",
            "en": "eaten, drunk, read"
          },
          {
            "es": "-IR verbs: vivido, salido, dormido",
            "en": "lived, left, slept"
          }
        ],
        "tip": null
      },
      {
        "heading": "Irregular Past Participles",
        "content": "Memorize these common irregulars:",
        "examples": [
          {
            "es": "abrir → abierto",
            "en": "opened"
          },
          {
            "es": "decir → dicho",
            "en": "said"
          },
          {
            "es": "escribir → escrito",
            "en": "written"
          },
          {
            "es": "hacer → hecho",
            "en": "done/made"
          },
          {
            "es": "morir → muerto",
            "en": "died"
          }
        ],
        "tip": null
      },
      {
        "heading": "Present Perfect (Pretérito Perfecto)",
        "content": "Present of HABER + past participle:",
        "examples": [
          {
            "es": "he hablado, has hablado, ha hablado",
            "en": "I have spoken, you have spoken..."
          },
          {
            "es": "hemos comido, han comido",
            "en": "we have eaten, they have eaten"
          },
          {
            "es": "¿Has visto la película?",
            "en": "Have you seen the movie?"
          },
          {
            "es": "Nunca he estado en España.",
            "en": "I have never been to Spain."
          }
        ],
        "tip": "In Spain, present perfect is common for recent past. In Latin America, preterite is often preferred."
      },
      {
        "heading": "Past Perfect (Pluscuamperfecto)",
        "content": "Imperfect of HABER + past participle:",
        "examples": [
          {
            "es": "había hablado, habías hablado, había hablado",
            "en": "I had spoken..."
          },
          {
            "es": "Cuando llegué, ya habían comido.",
            "en": "When I arrived, they had already eaten."
          },
          {
            "es": "Nunca había visto algo así.",
            "en": "I had never seen anything like that."
          }
        ],
        "tip": null
      },
      {
        "heading": "Future & Conditional Perfect",
        "content": "Future/Conditional of HABER + past participle:",
        "examples": [
          {
            "es": "habré terminado, habrás terminado...",
            "en": "I will have finished..."
          },
          {
            "es": "Para las 5, habré terminado.",
            "en": "By 5, I will have finished."
          },
          {
            "es": "habría terminado, habrías terminado...",
            "en": "I would have finished..."
          },
          {
            "es": "Si hubiera sabido, habría venido.",
            "en": "If I had known, I would have come."
          }
        ],
        "tip": null
      },
      {
        "heading": "Perfect Subjunctive",
        "content": "Subjunctive of HABER + past participle:",
        "examples": [
          {
            "es": "Present: haya hablado, hayas hablado...",
            "en": "that I have spoken..."
          },
          {
            "es": "Espero que hayan llegado bien.",
            "en": "I hope they have arrived safely."
          },
          {
            "es": "Past: hubiera hablado, hubieras hablado...",
            "en": "that I had spoken..."
          },
          {
            "es": "Si hubieras estudiado, habrías aprobado.",
            "en": "If you had studied, you would have passed."
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Perfect Tense Markers",
        "words": [
          {
            "es": "ya",
            "en": "already"
          },
          {
            "es": "todavía no",
            "en": "not yet"
          },
          {
            "es": "nunca",
            "en": "never"
          },
          {
            "es": "alguna vez",
            "en": "ever"
          },
          {
            "es": "últimamente",
            "en": "lately"
          },
          {
            "es": "para entonces",
            "en": "by then"
          },
          {
            "es": "antes de que",
            "en": "before"
          }
        ]
      },
      {
        "category": "Bonus Vocabulary",
        "words": [
          {
            "es": "el médico/la médica",
            "en": "doctor"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el hospital",
            "en": "hospital"
          },
          {
            "es": "la farmacia",
            "en": "pharmacy"
          },
          {
            "es": "la receta",
            "en": "prescription"
          },
          {
            "es": "la pastilla",
            "en": "pill"
          },
          {
            "es": "el dolor",
            "en": "pain"
          },
          {
            "es": "la fiebre",
            "en": "fever"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 27. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "introducir",
        "means": "to insert",
        "not": "to introduce",
        "correct": "presentar"
      },
      {
        "es": "largo",
        "means": "long",
        "not": "large",
        "correct": "grande"
      },
      {
        "es": "recordar",
        "means": "to remember",
        "not": "to record",
        "correct": "grabar"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 27.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Passive Voice",
      "passage": "Este libro fue escrito por Cervantes. La casa fue construida en 1950. Las cartas fueron enviadas ayer. El problema ya ha sido resuelto por el equipo técnico."
    }
  },
  "28": {
    "day": 28,
    "title": "Advanced Grammar Mastery",
    "subtitle": "Passive voice, por vs para, relative pronouns",
    "level": "B2-C1",
    "objectives": [
      "Use passive voice and se constructions",
      "Master relative pronouns",
      "Distinguish por and para perfectly",
      "Sound more sophisticated in Spanish"
    ],
    "grammar": [
      {
        "heading": "Passive Voice: SER + Past Participle",
        "content": "True passive (less common in Spanish):",
        "examples": [
          {
            "es": "El libro fue escrito por Cervantes.",
            "en": "The book was written by Cervantes."
          },
          {
            "es": "La casa será vendida mañana.",
            "en": "The house will be sold tomorrow."
          },
          {
            "es": "Las cartas fueron enviadas ayer.",
            "en": "The letters were sent yesterday."
          }
        ],
        "tip": "Participle agrees with subject: escrito/escrita/escritos/escritas"
      },
      {
        "heading": "Se Pasiva (More Common)",
        "content": "SE + verb (3rd person) - agent unknown:",
        "examples": [
          {
            "es": "Se habla español aquí.",
            "en": "Spanish is spoken here."
          },
          {
            "es": "Se venden casas.",
            "en": "Houses are sold. (Houses for sale)"
          },
          {
            "es": "Se necesitan empleados.",
            "en": "Employees are needed."
          },
          {
            "es": "¿Cómo se dice 'hello'?",
            "en": "How do you say 'hello'?"
          }
        ],
        "tip": null
      },
      {
        "heading": "Se Impersonal",
        "content": "SE + verb (3rd singular) for 'one/you/people':",
        "examples": [
          {
            "es": "Se come bien aquí.",
            "en": "One eats well here."
          },
          {
            "es": "No se puede fumar.",
            "en": "One cannot smoke."
          },
          {
            "es": "Se dice que va a llover.",
            "en": "They say it's going to rain."
          }
        ],
        "tip": null
      },
      {
        "heading": "Relative Pronouns",
        "content": "Connecting clauses:",
        "examples": [
          {
            "es": "que",
            "en": "that/which/who (most common)"
          },
          {
            "es": "quien/quienes",
            "en": "who (for people, after preposition)"
          },
          {
            "es": "el que/la que/los que/las que",
            "en": "the one who/which"
          },
          {
            "es": "lo que",
            "en": "what/that which (abstract)"
          },
          {
            "es": "cuyo/cuya",
            "en": "whose"
          }
        ],
        "tip": null
      },
      {
        "heading": "Relative Pronoun Examples",
        "content": "In context:",
        "examples": [
          {
            "es": "El hombre que vi era alto.",
            "en": "The man (that) I saw was tall."
          },
          {
            "es": "La mujer con quien hablé...",
            "en": "The woman with whom I spoke..."
          },
          {
            "es": "Lo que dices es verdad.",
            "en": "What you say is true."
          },
          {
            "es": "La ciudad donde nací...",
            "en": "The city where I was born..."
          }
        ],
        "tip": null
      },
      {
        "heading": "POR - Uses",
        "content": "Through, because of, exchange, duration, per:",
        "examples": [
          {
            "es": "Cause: Por la lluvia, no salí.",
            "en": "Because of the rain, I didn't go out."
          },
          {
            "es": "Exchange: Pagué $10 por el libro.",
            "en": "I paid $10 for the book."
          },
          {
            "es": "Duration: Estudié por tres horas.",
            "en": "I studied for three hours."
          },
          {
            "es": "Through: Caminé por el parque.",
            "en": "I walked through the park."
          },
          {
            "es": "Per: Tres veces por semana.",
            "en": "Three times per week."
          }
        ],
        "tip": null
      },
      {
        "heading": "PARA - Uses",
        "content": "Purpose, destination, deadline, recipient, opinion:",
        "examples": [
          {
            "es": "Purpose: Estudio para aprender.",
            "en": "I study (in order) to learn."
          },
          {
            "es": "Destination: Voy para Madrid.",
            "en": "I'm heading for Madrid."
          },
          {
            "es": "Deadline: Es para mañana.",
            "en": "It's for (due) tomorrow."
          },
          {
            "es": "Recipient: Este regalo es para ti.",
            "en": "This gift is for you."
          },
          {
            "es": "Opinion: Para mí, es fácil.",
            "en": "For me, it's easy."
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Sophisticated Connectors",
        "words": [
          {
            "es": "sin embargo",
            "en": "however"
          },
          {
            "es": "no obstante",
            "en": "nevertheless"
          },
          {
            "es": "por lo tanto",
            "en": "therefore"
          },
          {
            "es": "en cambio",
            "en": "on the other hand"
          },
          {
            "es": "de hecho",
            "en": "in fact"
          },
          {
            "es": "es decir",
            "en": "that is to say"
          },
          {
            "es": "a pesar de (que)",
            "en": "despite/in spite of"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 28. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "largo",
        "means": "long",
        "not": "large",
        "correct": "grande"
      },
      {
        "es": "recordar",
        "means": "to remember",
        "not": "to record",
        "correct": "grabar"
      },
      {
        "es": "ropa",
        "means": "clothes",
        "not": "rope",
        "correct": "cuerda"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 28.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Advanced Subjunctive",
      "passage": "Busco un apartamento que tenga balcón. Necesito alguien que hable tres idiomas. No hay nadie que pueda ayudarme hoy. Haré lo que sea necesario para conseguirlo."
    }
  },
  "29": {
    "day": 29,
    "title": "Native-Level Expression",
    "subtitle": "Idioms, fillers, and cultural fluency",
    "level": "C1",
    "objectives": [
      "Use common Spanish idioms naturally",
      "Master conversation fillers",
      "Understand regional variations",
      "Sound like a native speaker"
    ],
    "grammar": [
      {
        "heading": "Conversation Fillers (Muletillas)",
        "content": "Native speakers use these constantly:",
        "examples": [
          {
            "es": "Pues...",
            "en": "Well... (thinking)"
          },
          {
            "es": "Es que...",
            "en": "The thing is..."
          },
          {
            "es": "O sea...",
            "en": "I mean... / That is..."
          },
          {
            "es": "Bueno...",
            "en": "Well... / OK..."
          },
          {
            "es": "A ver...",
            "en": "Let's see..."
          }
        ],
        "tip": "Using these makes you sound SO much more natural!"
      },
      {
        "heading": "Common Idioms (Modismos)",
        "content": "Expressions that don't translate literally:",
        "examples": [
          {
            "es": "estar en las nubes",
            "en": "to have one's head in the clouds"
          },
          {
            "es": "meter la pata",
            "en": "to put your foot in it"
          },
          {
            "es": "costar un ojo de la cara",
            "en": "to cost an arm and a leg"
          },
          {
            "es": "no tener pelos en la lengua",
            "en": "to not mince words"
          },
          {
            "es": "quedarse en blanco",
            "en": "to go blank"
          }
        ],
        "tip": null
      },
      {
        "heading": "More Useful Idioms",
        "content": "For everyday situations:",
        "examples": [
          {
            "es": "tomar el pelo (a alguien)",
            "en": "to pull someone's leg"
          },
          {
            "es": "estar hasta las narices",
            "en": "to be fed up"
          },
          {
            "es": "no tener ni idea",
            "en": "to have no clue"
          },
          {
            "es": "caer bien/mal",
            "en": "to like/dislike someone"
          },
          {
            "es": "echar de menos",
            "en": "to miss someone/something"
          }
        ],
        "tip": null
      },
      {
        "heading": "Regional Variations",
        "content": "Key differences across countries:",
        "examples": [
          {
            "es": "Spain: vale, tío, mola",
            "en": "OK, dude, cool"
          },
          {
            "es": "Mexico: órale, güey, padre",
            "en": "OK/wow, dude, cool"
          },
          {
            "es": "Argentina: che, boludo, bárbaro",
            "en": "hey, dude, great"
          },
          {
            "es": "Colombia: bacano, parcero",
            "en": "cool, buddy"
          },
          {
            "es": "⚠️ Spain: coger",
            "en": "to take = Latin America: coger = vulgar! Use 'tomar'"
          }
        ],
        "tip": "Be aware of regional differences to avoid misunderstandings!"
      },
      {
        "heading": "Nuanced Word Choices",
        "content": "Subtle distinctions natives make:",
        "examples": [
          {
            "es": "saber vs conocer",
            "en": "to know facts vs to be familiar with"
          },
          {
            "es": "pedir vs preguntar",
            "en": "to ask for vs to ask a question"
          },
          {
            "es": "llevar vs traer",
            "en": "to take (away) vs to bring (here)"
          },
          {
            "es": "sino vs pero",
            "en": "'but rather' (after negative) vs 'but'"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Everyday Colloquial",
        "words": [
          {
            "es": "mola / está padre / qué chévere",
            "en": "cool!"
          },
          {
            "es": "flipar / alucinar",
            "en": "to be amazed"
          },
          {
            "es": "currar / chambear",
            "en": "to work (slang)"
          },
          {
            "es": "pasta / plata / lana",
            "en": "money (slang)"
          },
          {
            "es": "tío/a / güey / che",
            "en": "dude"
          },
          {
            "es": "quedamos",
            "en": "let's meet up"
          },
          {
            "es": "ir de marcha / salir de fiesta",
            "en": "to go out partying"
          }
        ]
      },
      {
        "category": "Bonus Vocabulary",
        "words": [
          {
            "es": "el médico/la médica",
            "en": "doctor"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el hospital",
            "en": "hospital"
          },
          {
            "es": "la farmacia",
            "en": "pharmacy"
          },
          {
            "es": "la receta",
            "en": "prescription"
          },
          {
            "es": "la pastilla",
            "en": "pill"
          },
          {
            "es": "el dolor",
            "en": "pain"
          },
          {
            "es": "la fiebre",
            "en": "fever"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 29. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "recordar",
        "means": "to remember",
        "not": "to record",
        "correct": "grabar"
      },
      {
        "es": "ropa",
        "means": "clothes",
        "not": "rope",
        "correct": "cuerda"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 29.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Complex Sentences",
      "passage": "Aunque llueva mañana, iremos a la playa. Mientras esperábamos, leímos el periódico. Antes de que llegues, habré terminado la cena. Después de que salgas, cerraré la puerta."
    }
  },
  "30": {
    "day": 30,
    "title": "¡Felicidades Maestro!",
    "subtitle": "C2 Mastery Complete",
    "level": "C2",
    "objectives": [
      "Review your complete journey from A1 to C2",
      "Understand what you've achieved",
      "Know how to continue improving",
      "Celebrate your accomplishment!"
    ],
    "grammar": [
      {
        "heading": "¡Lo Lograste!",
        "content": "In 30 intensive days, you've covered what typically takes years. Take a moment to appreciate your achievement.",
        "examples": [],
        "tip": "🎉 You now have the foundation to communicate at an advanced level!"
      },
      {
        "heading": "A1 Foundation (Days 1-7)",
        "content": "What you mastered:",
        "examples": [
          {
            "es": "Pronunciation & alphabet",
            "en": "Spanish sounds, vowels, consonants"
          },
          {
            "es": "Numbers 1-100",
            "en": "Counting and dates"
          },
          {
            "es": "SER vs ESTAR",
            "en": "The two 'to be' verbs"
          },
          {
            "es": "Present tense",
            "en": "Regular and irregular verbs"
          },
          {
            "es": "Basic questions",
            "en": "¿Qué? ¿Dónde? ¿Cuándo?"
          }
        ],
        "tip": null
      },
      {
        "heading": "A2 Building (Days 8-14)",
        "content": "What you mastered:",
        "examples": [
          {
            "es": "Past tenses",
            "en": "Preterite and Imperfect"
          },
          {
            "es": "Object pronouns",
            "en": "Lo, la, le, me, te, se lo"
          },
          {
            "es": "Reflexive verbs",
            "en": "Levantarse, ducharse"
          },
          {
            "es": "GUSTAR structure",
            "en": "Me gusta, me gustan"
          }
        ],
        "tip": null
      },
      {
        "heading": "B1 Intermediate (Days 15-21)",
        "content": "What you mastered:",
        "examples": [
          {
            "es": "Future tense",
            "en": "IR + a + infinitive and simple future"
          },
          {
            "es": "Opinions & comparisons",
            "en": "Creo que, más que, el mejor"
          },
          {
            "es": "Storytelling",
            "en": "Connecting past tenses"
          },
          {
            "es": "Daily life scenarios",
            "en": "Shopping, travel, health"
          }
        ],
        "tip": null
      },
      {
        "heading": "B2 Advanced (Days 22-27)",
        "content": "What you mastered:",
        "examples": [
          {
            "es": "Subjunctive mood",
            "en": "Present and imperfect subjunctive"
          },
          {
            "es": "Si clauses",
            "en": "All types of conditionals"
          },
          {
            "es": "Perfect tenses",
            "en": "All formations with HABER"
          },
          {
            "es": "Conditional tense",
            "en": "Would, could, should"
          }
        ],
        "tip": null
      },
      {
        "heading": "C1-C2 Mastery (Days 28-30)",
        "content": "What you mastered:",
        "examples": [
          {
            "es": "Passive voice & SE",
            "en": "Se habla, fue escrito"
          },
          {
            "es": "Por vs para",
            "en": "All uses distinguished"
          },
          {
            "es": "Native-level idioms",
            "en": "Costar un ojo de la cara, etc."
          },
          {
            "es": "Conversation fillers",
            "en": "Pues, o sea, es que, ¿sabes?"
          },
          {
            "es": "Regional variations",
            "en": "Spain, Mexico, Argentina..."
          }
        ],
        "tip": null
      },
      {
        "heading": "What's Next?",
        "content": "To maintain and improve your C2 level:",
        "examples": [
          {
            "es": "Read daily",
            "en": "El País, novels, blogs"
          },
          {
            "es": "Watch content",
            "en": "Movies, series - NO subtitles"
          },
          {
            "es": "Listen actively",
            "en": "Podcasts, music, radio"
          },
          {
            "es": "Speak often",
            "en": "Language exchange, tutors, travel"
          },
          {
            "es": "Write regularly",
            "en": "Journal, messages, essays"
          }
        ],
        "tip": "The key is DAILY exposure. Even 15 minutes a day maintains fluency."
      },
      {
        "heading": "Final Message",
        "content": "Remember: Every native speaker was once a beginner. You've proven you can learn Spanish. Now the world of 500+ million Spanish speakers is open to you",
        "examples": [
          {
            "es": "¡Lo hiciste!",
            "en": "You did it!"
          },
          {
            "es": "Estoy orgulloso/a de ti.",
            "en": "I'm proud of you."
          },
          {
            "es": "Tu español es excelente.",
            "en": "Your Spanish is excellent."
          },
          {
            "es": "¡Sigue practicando!",
            "en": "Keep practicing!"
          },
          {
            "es": "¡Hasta siempre!",
            "en": "Until always! (Farewell)"
          }
        ],
        "tip": null
      }
    ],
    "vocabulary": [
      {
        "category": "Achievements",
        "words": [
          {
            "es": "lograr",
            "en": "to achieve"
          },
          {
            "es": "conseguir",
            "en": "to accomplish"
          },
          {
            "es": "el éxito",
            "en": "success"
          },
          {
            "es": "felicidades",
            "en": "congratulations"
          },
          {
            "es": "estar orgulloso/a",
            "en": "to be proud"
          },
          {
            "es": "el logro",
            "en": "achievement"
          },
          {
            "es": "superar",
            "en": "to overcome"
          },
          {
            "es": "dominar",
            "en": "to master"
          }
        ]
      },
      {
        "category": "Bonus Vocabulary",
        "words": [
          {
            "es": "el médico/la médica",
            "en": "doctor"
          },
          {
            "es": "el/la enfermero/a",
            "en": "nurse"
          },
          {
            "es": "el hospital",
            "en": "hospital"
          },
          {
            "es": "la farmacia",
            "en": "pharmacy"
          },
          {
            "es": "la receta",
            "en": "prescription"
          },
          {
            "es": "la pastilla",
            "en": "pill"
          },
          {
            "es": "el dolor",
            "en": "pain"
          },
          {
            "es": "la fiebre",
            "en": "fever"
          }
        ]
      }
    ],
    "cultural": "Cultural context for Day 30. Spanish is spoken in 21 countries with rich regional variations.",
    "falseFriends": [
      {
        "es": "ropa",
        "means": "clothes",
        "not": "rope",
        "correct": "cuerda"
      }
    ],
    "multimedia": [
      {
        "name": "Dreaming Spanish",
        "description": "Comprehensible input"
      },
      {
        "name": "SpanishPod101",
        "description": "Structured lessons"
      },
      {
        "name": "Coffee Break Spanish",
        "description": "Scottish teacher"
      }
    ],
    "listening": {
      "phrases": [
        "Práctica del día 30.",
        "Escucha con atención.",
        "Repite después.",
        "Muy bien.",
        "Continúa así.",
        "¡Excelente!"
      ]
    },
    "reading": {
      "title": "Course Completion",
      "passage": "Hace treinta días empecé este curso. He aprendido mucho sobre gramática, vocabulario y cultura. Ahora puedo hablar, leer y escribir en español con más confianza. El viaje continúa, pero estoy orgulloso de mi progreso. ¡Adelante con el español!"
    }
  }
};

export default function InteractiveCurriculum({ day = 1, onBack, onComplete }) {
  const [activeTab, setActiveTab] = useState('grammar');
  const [grammarIndex, setGrammarIndex] = useState(0);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [showTeaser, setShowTeaser] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showShadowing, setShowShadowing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const dayData = CURRICULUM[day] || CURRICULUM[1];
  
  const speak = (text) => {
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85;
    speechSynthesis.speak(utterance);
  };

  const getAllVocab = () => {
    if (!dayData?.vocabulary) return [];
    const words = [];
    Object.values(dayData.vocabulary).forEach(cat => {
      if (Array.isArray(cat)) cat.forEach(item => {
        if (item.spanish && item.english) words.push(item);
      });
    });
    return words;
  };
  const getPTStage = () => { if (day <= 6) return 1; if (day <= 12) return 2; if (day <= 18) return 3; if (day <= 24) return 4; if (day <= 28) return 5; return 6; };
  const getShadowPhrases = () => {
    const phrases = [];
    if (dayData?.listening?.phrases) {
      dayData.listening.phrases.slice(0, 8).forEach(p => {
        if (typeof p === 'string') phrases.push({ spanish: p, english: '' });
        else if (p?.spanish) phrases.push(p);
      });
    }
    return phrases;
  };

  const tabs = [
    { id: 'grammar', label: '📖 Grammar' },
    { id: 'vocabulary', label: '📚 Vocab' },
    { id: 'listening', label: '🎧 Listen' },
    { id: 'reading', label: '📰 Read' }
  ];

  const currentGrammar = dayData.grammar?.[grammarIndex];
  const currentVocab = dayData.vocabulary?.[vocabIndex];

  return (
    <div style={{minHeight: '100vh', background: theme.bg, paddingBottom: 100}}>
      {/* Header */}
      <div style={{background: theme.primary, color: '#fff', padding: 16, display: 'flex', alignItems: 'center', gap: 16}}>
        <button onClick={onBack} style={{background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: 8, cursor: 'pointer'}}>← Back</button>
        <div style={{marginLeft: 'auto', display: 'flex', gap: 8}}>
          <StreakDisplay compact />
          <PTStageDisplay stage={getPTStage()} compact />
        </div>
        <div>
          <div style={{fontWeight: 600, fontSize: 18}}>Day {day}: {dayData.title}</div>
          <div style={{fontSize: 13, opacity: 0.9}}>{dayData.subtitle} • {dayData.level}</div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={{display: 'flex', background: '#fff', borderBottom: '1px solid #e0e0e0', padding: 8}}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setGrammarIndex(0); setVocabIndex(0); }}
            style={{
              flex: 1, padding: '10px 8px', border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 13, fontWeight: 500,
              background: activeTab === tab.id ? theme.primary : 'transparent',
              color: activeTab === tab.id ? '#fff' : theme.text
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div style={{padding: 16}}>
        
        {/* GRAMMAR TAB */}
        {activeTab === 'grammar' && (
          <div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>📖 Grammar</h2>
            
            {dayData.grammar && dayData.grammar.length > 1 && (
              <div style={{display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap'}}>
                {dayData.grammar.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setGrammarIndex(i)}
                    style={{
                      padding: '6px 10px', borderRadius: 16, border: 'none', cursor: 'pointer', fontSize: 11,
                      background: i === grammarIndex ? theme.primary : '#e0e0e0',
                      color: i === grammarIndex ? '#fff' : theme.text
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
            
            {currentGrammar && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                <h3 style={{fontSize: 18, fontWeight: 600, marginBottom: 12, color: theme.primary}}>{currentGrammar.heading}</h3>
                <p style={{lineHeight: 1.6, marginBottom: 16}}>{currentGrammar.content}</p>
                
                {currentGrammar.examples && currentGrammar.examples.length > 0 && (
                  <div style={{background: '#f8f9fa', borderRadius: 8, padding: 12, marginBottom: 12}}>
                    <h4 style={{fontSize: 14, fontWeight: 600, marginBottom: 10}}>Examples:</h4>
                    {currentGrammar.examples.map((ex, i) => (
                      <button 
                        key={i} 
                        onClick={() => speak(ex.es)}
                        style={{
                          display: 'block', width: '100%', padding: '10px 12px', margin: '6px 0',
                          background: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left'
                        }}
                      >
                        <div style={{fontWeight: 600, color: '#d32f2f', marginBottom: 4}}>🔊 {ex.es}</div>
                        <div style={{fontSize: 13, color: theme.textLight}}>{ex.en}</div>
                      </button>
                    ))}
                  </div>
                )}
                
                {currentGrammar.tip && (
                  <div style={{background: '#e8f5e9', padding: 12, borderRadius: 8, color: '#2e7d32'}}>
                    💡 {currentGrammar.tip}
                  </div>
                )}
              </div>
            )}
            
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16}}>
              <button 
                onClick={() => setGrammarIndex(Math.max(0, grammarIndex - 1))}
                disabled={grammarIndex === 0}
                style={{padding: '10px 16px', background: theme.primary, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', opacity: grammarIndex === 0 ? 0.3 : 1}}
              >← Prev</button>
              <span>{grammarIndex + 1} / {dayData.grammar?.length || 1}</span>
              <button 
                onClick={() => setGrammarIndex(Math.min((dayData.grammar?.length || 1) - 1, grammarIndex + 1))}
                disabled={grammarIndex >= (dayData.grammar?.length || 1) - 1}
                style={{padding: '10px 16px', background: theme.primary, color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', opacity: grammarIndex >= (dayData.grammar?.length || 1) - 1 ? 0.3 : 1}}
              >Next →</button>
            </div>
          </div>
        )}

        {/* VOCABULARY TAB */}
        {activeTab === 'vocabulary' && (
          <div>
            <div style={{display: 'flex', gap: 12, marginBottom: 16}}>
              <button onClick={() => setShowReview(true)} style={{flex: 1, padding: 14, background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 'bold', cursor: 'pointer'}}>📚 Review</button>
              <button onClick={() => setShowQuiz(true)} style={{flex: 1, padding: 14, background: 'linear-gradient(135deg, #f093fb, #f5576c)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 'bold', cursor: 'pointer'}}>📝 Quiz</button>
            </div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>📚 Vocabulary</h2>
            
            {dayData.vocabulary && dayData.vocabulary.length > 0 && (
              <div style={{display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap'}}>
                {dayData.vocabulary.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setVocabIndex(i)}
                    style={{
                      padding: '8px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 13,
                      background: i === vocabIndex ? theme.primary : '#f0f0f0',
                      color: i === vocabIndex ? '#fff' : theme.text
                    }}
                  >
                    {cat.category}
                  </button>
                ))}
              </div>
            )}
            
            {currentVocab && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 12}}>
                  <h3 style={{fontSize: 16, fontWeight: 600}}>{currentVocab.category}</h3>
                  <span style={{color: theme.textLight, fontSize: 13}}>{currentVocab.words?.length || 0} words</span>
                </div>
                
                {currentVocab.words?.map((word, i) => (
                  <button 
                    key={i}
                    onClick={() => speak(word.es)}
                    style={{
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%',
                      padding: '12px 14px', margin: '6px 0', background: '#f8f9fa', border: 'none', 
                      borderRadius: 8, cursor: 'pointer', textAlign: 'left'
                    }}
                  >
                    <span style={{fontWeight: 600, color: '#7b1fa2'}}>🔊 {word.es}</span>
                    <span style={{color: theme.textLight, textAlign: 'right', maxWidth: '50%'}}>= {word.en}</span>
                  </button>
                ))}
              </div>
            )}
            
            {(!dayData.vocabulary || dayData.vocabulary.length === 0) && (
              <div style={{background: '#fff', borderRadius: 12, padding: 20, textAlign: 'center'}}>
                <p style={{color: theme.textLight}}>Vocabulary coming soon for this day.</p>
              </div>
            )}
          </div>
        )}

        {/* LISTENING TAB */}
        {activeTab === 'listening' && (
          <div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>🎧 Listening Practice</h2>
            {day >= 7 && (
              <button onClick={() => setShowShadowing(true)} style={{width: '100%', padding: 14, marginBottom: 16, background: 'linear-gradient(135deg, #11998e, #38ef7d)', color: 'white', border: 'none', borderRadius: 12, fontWeight: 'bold', cursor: 'pointer'}}>🎧 Shadowing Mode</button>
            )}
            <p style={{color: theme.textLight, marginBottom: 16}}>Tap each phrase to hear it, then repeat aloud:</p>
            
            <div style={{background: '#fff', borderRadius: 12, padding: 16}}>
              {dayData.listening?.phrases?.map((phrase, i) => (
                  <button 
                    key={`listen-${i}`}
                    onClick={() => speak(phrase)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                      padding: '14px', margin: '6px 0', background: '#f0f7ff', border: 'none',
                      borderRadius: 8, cursor: 'pointer', textAlign: 'left'
                    }}
                  >
                    <span style={{fontSize: 20}}>🔊</span>
                    <span style={{fontSize: 15}}>{phrase}</span>
                  </button>
                ))}
              
              {/* Fallback if no listening phrases */}
              {!dayData.listening?.phrases && dayData.vocabulary?.[0]?.words?.slice(0, 6).map((w, i) => (
                <button 
                  key={`v${i}`}
                  onClick={() => speak(w.spanish || w.es)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                    padding: '14px', margin: '6px 0', background: '#f5f0ff', border: 'none',
                    borderRadius: 8, cursor: 'pointer', textAlign: 'left'
                  }}
                >
                  <span style={{fontSize: 20}}>🔊</span>
                  <span style={{fontSize: 15}}>{w.es}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* READING TAB - Now includes Reading Passage! */}
        {activeTab === 'reading' && (
          <div>
            <h2 style={{fontSize: 20, fontWeight: 600, marginBottom: 16}}>📰 Reading & Culture</h2>
            
            {/* READING PASSAGE - NEW! */}
            {dayData.reading && dayData.reading.passage && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1565c0'}}>📖 {dayData.reading.title}</h3>
                <div style={{background: '#f0f7ff', padding: 16, borderRadius: 8, marginBottom: 12}}>
                  <p style={{fontSize: 16, lineHeight: 1.8, fontStyle: 'italic'}}>{dayData.reading.passage}</p>
                </div>
                <button 
                  onClick={() => speak(dayData.reading.passage)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    width: '100%', padding: 12, background: theme.primary, color: '#fff',
                    border: 'none', borderRadius: 8, cursor: 'pointer', fontSize: 14
                  }}
                >
                  🔊 Listen to Passage
                </button>
              </div>
            )}
            
            {/* Objectives */}
            {dayData.objectives && dayData.objectives.length > 0 && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: theme.primary}}>📎 Today's Objectives</h3>
                {dayData.objectives.map((obj, i) => (
                  <div key={i} style={{padding: '8px 0', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 8}}>
                    <span style={{color: theme.primary}}>✓</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            )}
            
            {/* Cultural Note */}
            {dayData.cultural && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: theme.primary}}>🌍 Cultural Note</h3>
                <p style={{lineHeight: 1.6}}>{dayData.cultural}</p>
              </div>
            )}
            
            {/* False Friends */}
            {dayData.falseFriends && dayData.falseFriends.length > 0 && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#c62828'}}>⚠️ False Friends (¡Cuidado!)</h3>
                {dayData.falseFriends.map((ff, i) => (
                  <div key={i} style={{padding: 12, margin: '8px 0', background: '#fff5f5', borderRadius: 8}}>
                    <div style={{fontWeight: 600, fontSize: 16}}>{ff.es}</div>
                    <div style={{color: '#2e7d32', marginTop: 4}}>✓ Means: {ff.means}</div>
                    <div style={{color: '#c62828', marginTop: 2}}>✗ NOT: {ff.not} (= {ff.correct})</div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Multimedia Resources */}
            {dayData.multimedia && dayData.multimedia.length > 0 && (
              <div style={{background: '#fff', borderRadius: 12, padding: 16}}>
                <h3 style={{fontSize: 16, fontWeight: 600, marginBottom: 12, color: '#1565c0'}}>📺 Recommended Resources</h3>
                {dayData.multimedia.map((mm, i) => (
                  <div key={i} style={{padding: 12, margin: '8px 0', background: '#e3f2fd', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 12}}>
                    <span style={{fontSize: 24}}>📺</span>
                    <div>
                      <div style={{fontWeight: 600}}>{mm.name}</div>
                      <div style={{fontSize: 13, color: theme.textLight}}>{mm.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Complete Button */}
      <div style={{position: 'fixed', bottom: 0, left: 0, right: 0, padding: 16, background: '#fff', borderTop: '1px solid #e0e0e0'}}>
        <button 
          onClick={() => setShowTeaser(true)}
          style={{width: '100%', padding: 16, background: theme.primary, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer'}}
        >
          Complete Day {day} ✓
        </button>
      </div>
      {/* === FLUIDEZ MODALS === */}
      {showReview && (
        <div style={{ position: 'fixed', inset: 0, background: '#f5f5f5', zIndex: 100, overflow: 'auto' }}>
          <ReviewSystem vocabulary={getAllVocab()} onClose={() => setShowReview(false)} />
        </div>
      )}
      {showQuiz && (
        <div style={{ position: 'fixed', inset: 0, background: '#f5f5f5', zIndex: 100, overflow: 'auto' }}>
          <QuizMode vocabulary={getAllVocab()} onClose={() => setShowQuiz(false)} />
        </div>
      )}
      {showShadowing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'white', borderRadius: '20px', width: '90%', maxWidth: '500px', maxHeight: '90vh', overflow: 'auto' }}>
            <ShadowingMode dayNumber={day} phrases={getShadowPhrases()} onClose={() => setShowShadowing(false)} />
          </div>
        </div>
      )}
      <SuccessAnimation show={showSuccess} onComplete={() => setShowSuccess(false)} message={"Day " + day + " Complete!"} />
    </div>
  );
}
