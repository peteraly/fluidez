#!/usr/bin/env python3
"""
═══════════════════════════════════════════════════════════════════════════════
FLUIDEZ DAY JSON ENHANCER
═══════════════════════════════════════════════════════════════════════════════

Applies Processability Theory, Noticing Hypothesis, and Shadowing Mode
enhancements to existing day01.json through day30.json files.

PRESERVES all existing content - only ADDS new fields.

Run from your fluidez directory:
    python3 apply_enhancements.py
"""

import json
import os
from datetime import datetime
from pathlib import Path

# ═══════════════════════════════════════════════════════════════════════════════
# CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════

DAYS_DIR = "src/content/days"
BACKUP_DIR = "src/content/days-backup-enhanced"

# ═══════════════════════════════════════════════════════════════════════════════
# NOTICING HYPOTHESIS - COLOR SCHEMES
# ═══════════════════════════════════════════════════════════════════════════════

COLOR_SCHEMES = {
    "verb_endings": {
        "yo": "#F44336",
        "tú": "#2196F3", 
        "él_ella_usted": "#4CAF50",
        "nosotros": "#9C27B0",
        "vosotros": "#FF5722",
        "ellos_ustedes": "#FF9800"
    },
    "gender": {
        "masculine": "#2196F3",
        "feminine": "#E91E63"
    },
    "tense": {
        "present": "#4CAF50",
        "preterite": "#F44336",
        "imperfect": "#FF9800",
        "future": "#2196F3",
        "conditional": "#9C27B0",
        "subjunctive": "#E91E63"
    },
    "sentence_structure": {
        "subject": "#E3F2FD",
        "verb": "#E8F5E9",
        "object": "#FFF3E0",
        "complement": "#F3E5F5"
    }
}

# ═══════════════════════════════════════════════════════════════════════════════
# PROCESSABILITY THEORY - STAGE MAPPING
# ═══════════════════════════════════════════════════════════════════════════════

PT_STAGES = {
    1: {"name": "Words/Formulas", "days": [1, 2, 3]},
    2: {"name": "Lexical Morphology", "days": [3, 4, 5, 6, 7]},
    3: {"name": "Phrasal Agreement", "days": [5, 6, 7, 8, 9, 10]},
    4: {"name": "Sentence Procedure", "days": [8, 9, 10, 11, 12, 13, 14, 15]},
    5: {"name": "Subordinate Clause", "days": [15, 16, 17, 18, 19, 20, 21, 22]},
    6: {"name": "Complex Structures", "days": [22, 23, 24, 25, 26, 27, 28, 29, 30]}
}

def get_pt_stage(day):
    """Get PT stage for a given day."""
    for stage, data in PT_STAGES.items():
        if day in data["days"]:
            return stage, data["name"]
    return 6, "Complex Structures"

# ═══════════════════════════════════════════════════════════════════════════════
# SHADOWING MODE - CONFIGURATION
# ═══════════════════════════════════════════════════════════════════════════════

SHADOWING_CONFIG = {
    "day_7_10": {"max_words": 5, "speed": 0.8, "focus": "rhythm"},
    "day_11_15": {"max_words": 7, "speed": 0.9, "focus": "intonation"},
    "day_16_20": {"max_words": 10, "speed": 1.0, "focus": "stress"},
    "day_21_25": {"max_words": 12, "speed": 1.0, "focus": "fluency"},
    "day_26_30": {"max_words": 15, "speed": 1.1, "focus": "naturalness"}
}

def get_shadowing_tier(day):
    """Get shadowing difficulty tier for a day."""
    if day < 7:
        return None
    elif day <= 10:
        return "day_7_10"
    elif day <= 15:
        return "day_11_15"
    elif day <= 20:
        return "day_16_20"
    elif day <= 25:
        return "day_21_25"
    else:
        return "day_26_30"

# ═══════════════════════════════════════════════════════════════════════════════
# NOTICING CALLOUT TEMPLATES
# ═══════════════════════════════════════════════════════════════════════════════

CALLOUT_TEMPLATES = {
    "pre_pattern": "👀 Look at these examples. What do you notice about {feature}?",
    "post_pattern": "💡 Did you notice? {pattern}",
    "comparison": "🔍 Notice how {a} is different from {b}",
    "rule": "📐 The pattern: {rule}",
    "exception": "⚠️ Watch out: {exception}",
    "memory": "🧠 Remember: {tip}"
}

# ═══════════════════════════════════════════════════════════════════════════════
# DAY-SPECIFIC ENHANCEMENTS
# ═══════════════════════════════════════════════════════════════════════════════

DAY_ENHANCEMENTS = {
    1: {
        "theme": "Greetings & Introductions",
        "noticing": {
            "color_scheme": None,
            "callouts": [
                {"type": "memory", "text": "🧠 Remember: 'Me llamo' is a fixed phrase - memorize it as one unit!"},
                {"type": "pre_pattern", "text": "👀 Notice how Spanish greetings change based on time of day"}
            ],
            "input_flooding": [
                "Hola", "Buenos días", "Buenas tardes", "Buenas noches",
                "¿Cómo estás?", "¿Qué tal?", "Mucho gusto"
            ]
        },
        "shadowing": None
    },
    2: {
        "theme": "Numbers & Age",
        "noticing": {
            "color_scheme": None,
            "callouts": [
                {"type": "rule", "text": "📐 The pattern: 'Tengo X años' - Spanish uses 'have' for age, not 'am'"},
                {"type": "comparison", "text": "🔍 Notice: English says 'I am 25' but Spanish says 'I have 25 years'"}
            ],
            "input_flooding": [
                "Tengo veinte años", "Tengo veinticinco años", "Tengo treinta años",
                "¿Cuántos años tienes?", "Él tiene diez años"
            ]
        },
        "shadowing": None
    },
    3: {
        "theme": "Family & Gender",
        "noticing": {
            "color_scheme": "gender",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Look at these words. What do you notice about the endings?"},
                {"type": "post_pattern", "text": "💡 Did you notice? Words ending in -o are usually masculine, -a are feminine"},
                {"type": "rule", "text": "📐 The pattern: el hermano / la hermana, el abuelo / la abuela"}
            ],
            "input_flooding": [
                "el padre / la madre", "el hermano / la hermana", 
                "el abuelo / la abuela", "el hijo / la hija",
                "el tío / la tía", "el primo / la prima"
            ]
        },
        "shadowing": None
    },
    4: {
        "theme": "Colors & Adjectives",
        "noticing": {
            "color_scheme": "gender",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 What do you notice about these color words?"},
                {"type": "post_pattern", "text": "💡 Did you notice? Some colors change (-o/-a), some don't (verde, azul)"},
                {"type": "exception", "text": "⚠️ Watch out: 'azul', 'verde', 'naranja' don't change for gender!"}
            ],
            "input_flooding": [
                "rojo / roja", "blanco / blanca", "negro / negra",
                "amarillo / amarilla", "verde", "azul", "naranja"
            ]
        },
        "shadowing": None
    },
    5: {
        "theme": "Home & Possessives",
        "noticing": {
            "color_scheme": "gender",
            "callouts": [
                {"type": "rule", "text": "📐 The pattern: mi/tu/su don't change, but nuestro/vuestro do!"},
                {"type": "comparison", "text": "🔍 Notice: 'mi casa' stays the same, but 'nuestro coche' / 'nuestra casa'"}
            ],
            "input_flooding": [
                "mi casa", "tu habitación", "su cocina",
                "nuestro baño", "nuestra sala", "sus dormitorios"
            ]
        },
        "shadowing": None
    },
    6: {
        "theme": "Daily Objects & Demonstratives",
        "noticing": {
            "color_scheme": "gender",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Look at este/esta/estos/estas. What changes?"},
                {"type": "post_pattern", "text": "💡 Did you notice? Demonstratives match gender AND number!"},
                {"type": "rule", "text": "📐 The pattern: este libro, esta mesa, estos libros, estas mesas"}
            ],
            "input_flooding": [
                "este teléfono", "esta computadora", "estos lápices", "estas llaves",
                "ese coche", "esa silla", "esos vasos", "esas tazas"
            ]
        },
        "shadowing": None
    },
    7: {
        "theme": "Food & Adjective Agreement",
        "noticing": {
            "color_scheme": "gender",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Watch the adjective endings. What pattern do you see?"},
                {"type": "post_pattern", "text": "💡 Did you notice? Adjectives match the noun in gender AND number!"},
                {"type": "rule", "text": "📐 The pattern: café caliente, sopa caliente, tacos calientes"}
            ],
            "input_flooding": [
                "el café caliente", "la sopa caliente", "los tacos calientes",
                "una manzana roja", "un plátano amarillo", "las uvas verdes"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Quiero un café, por favor", "focus": "rhythm"},
                {"spanish": "¿Tiene agua fría?", "focus": "intonation"},
                {"spanish": "La cuenta, por favor", "focus": "rhythm"},
                {"spanish": "Está muy rico", "focus": "stress"},
                {"spanish": "¿Qué me recomienda?", "focus": "intonation"}
            ]
        }
    },
    8: {
        "theme": "Restaurant & -AR Verbs",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Look at these -AR verb endings. What pattern do you see?"},
                {"type": "post_pattern", "text": "💡 Did you notice? The endings are: -o, -as, -a, -amos, -áis, -an"},
                {"type": "rule", "text": "📐 The pattern: habl|o, habl|as, habl|a, habl|amos, habl|áis, habl|an"}
            ],
            "input_flooding": [
                "yo hablo", "tú hablas", "él habla",
                "nosotros hablamos", "ellos hablan",
                "yo como", "tú comes", "ella come"
            ],
            "morpheme_display": {
                "verb": "hablar",
                "stem": "habl-",
                "endings": ["o", "as", "a", "amos", "áis", "an"]
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿Qué desea ordenar?", "focus": "intonation"},
                {"spanish": "Yo quiero la paella", "focus": "rhythm"},
                {"spanish": "¿Viene con ensalada?", "focus": "intonation"},
                {"spanish": "Para beber, agua mineral", "focus": "rhythm"},
                {"spanish": "¿Aceptan tarjeta de crédito?", "focus": "stress"}
            ]
        }
    },
    9: {
        "theme": "Time & -ER Verbs",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Compare -AR and -ER endings. What's different?"},
                {"type": "post_pattern", "text": "💡 Did you notice? -ER uses 'e' where -AR uses 'a': comes vs. hablas"},
                {"type": "rule", "text": "📐 The pattern: com|o, com|es, com|e, com|emos, com|éis, com|en"}
            ],
            "input_flooding": [
                "yo como", "tú comes", "él come",
                "nosotros comemos", "ellos comen",
                "yo bebo", "tú bebes", "ella bebe"
            ],
            "morpheme_display": {
                "verb": "comer",
                "stem": "com-",
                "endings": ["o", "es", "e", "emos", "éis", "en"]
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿Qué hora es?", "focus": "intonation"},
                {"spanish": "Son las tres y media", "focus": "rhythm"},
                {"spanish": "Tengo una cita a las cinco", "focus": "stress"},
                {"spanish": "¿A qué hora abre?", "focus": "intonation"},
                {"spanish": "Llego en quince minutos", "focus": "rhythm"}
            ]
        }
    },
    10: {
        "theme": "Days & -IR Verbs",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Compare -ER and -IR endings. What's the same? What's different?"},
                {"type": "post_pattern", "text": "💡 Did you notice? -IR is almost identical to -ER, except 'nosotros': vivimos not vivemos"},
                {"type": "rule", "text": "📐 The pattern: viv|o, viv|es, viv|e, viv|imos, viv|ís, viv|en"}
            ],
            "input_flooding": [
                "yo vivo", "tú vives", "él vive",
                "nosotros vivimos", "ellos viven",
                "yo escribo", "tú escribes", "ella escribe"
            ],
            "morpheme_display": {
                "verb": "vivir",
                "stem": "viv-",
                "endings": ["o", "es", "e", "imos", "ís", "en"]
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿Qué día es hoy?", "focus": "intonation"},
                {"spanish": "Hoy es martes", "focus": "rhythm"},
                {"spanish": "Hace buen tiempo hoy", "focus": "stress"},
                {"spanish": "¿Va a llover mañana?", "focus": "intonation"},
                {"spanish": "El fin de semana hace sol", "focus": "rhythm"}
            ]
        }
    },
    11: {
        "theme": "Clothing & Questions",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Watch how questions are formed in Spanish"},
                {"type": "post_pattern", "text": "💡 Did you notice? Spanish just adds ¿? marks - word order often stays the same!"},
                {"type": "comparison", "text": "🔍 Notice: 'Tú hablas español' → '¿Hablas español?' (just intonation change)"}
            ],
            "input_flooding": [
                "¿Cuánto cuesta?", "¿Qué talla es?", "¿Tiene en azul?",
                "¿Puedo probármelo?", "¿Dónde están los probadores?"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿Cuánto cuesta esta camisa?", "focus": "intonation"},
                {"spanish": "¿Tiene una talla más grande?", "focus": "rhythm"},
                {"spanish": "Me queda un poco pequeño", "focus": "stress"},
                {"spanish": "¿Puedo pagar con tarjeta?", "focus": "intonation"},
                {"spanish": "Me lo llevo, gracias", "focus": "rhythm"}
            ]
        }
    },
    12: {
        "theme": "Body & Doler",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Watch how 'doler' works - it's like 'gustar'!"},
                {"type": "rule", "text": "📐 The pattern: Me duele la cabeza (it hurts TO ME)"},
                {"type": "comparison", "text": "🔍 Notice: 'Me duele' (one thing) vs 'Me duelen' (multiple things)"}
            ],
            "input_flooding": [
                "Me duele la cabeza", "Me duele el estómago", "Me duele la espalda",
                "Me duelen los pies", "Me duelen las piernas", "Le duele el brazo"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Me duele mucho la cabeza", "focus": "stress"},
                {"spanish": "¿Tiene algo para el dolor?", "focus": "intonation"},
                {"spanish": "Necesito ver a un médico", "focus": "rhythm"},
                {"spanish": "¿Dónde está la farmacia?", "focus": "intonation"},
                {"spanish": "Tome dos pastillas al día", "focus": "rhythm"}
            ]
        }
    },
    13: {
        "theme": "Directions & Estar",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 When do we use 'estar' vs 'ser'?"},
                {"type": "rule", "text": "📐 The pattern: ESTAR = Location & temporary states. SER = Identity & permanent traits"},
                {"type": "comparison", "text": "🔍 Notice: 'Está en la esquina' (location) vs 'Es un banco' (identity)"}
            ],
            "input_flooding": [
                "Está a la derecha", "Está a la izquierda", "Está al lado de",
                "Está enfrente de", "Está cerca de", "Está lejos de"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿Dónde está el metro?", "focus": "intonation"},
                {"spanish": "Siga todo recto", "focus": "rhythm"},
                {"spanish": "Gire a la derecha en la esquina", "focus": "stress"},
                {"spanish": "Está a dos cuadras de aquí", "focus": "rhythm"},
                {"spanish": "¿Puede repetir, por favor?", "focus": "intonation"}
            ]
        }
    },
    14: {
        "theme": "Transportation & Ir",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Look at 'ir' - it's completely irregular!"},
                {"type": "rule", "text": "📐 The pattern: voy, vas, va, vamos, vais, van"},
                {"type": "memory", "text": "🧠 Remember: 'Ir a + infinitive' = going to do something (future)"}
            ],
            "input_flooding": [
                "Voy al trabajo", "Vas a la escuela", "Va al mercado",
                "Vamos a comer", "Van a viajar", "Voy a estudiar"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿A qué hora sale el próximo tren?", "focus": "intonation"},
                {"spanish": "Un boleto de ida y vuelta", "focus": "rhythm"},
                {"spanish": "¿En qué andén llega?", "focus": "intonation"},
                {"spanish": "Voy a tomar un taxi", "focus": "stress"},
                {"spanish": "¿Cuánto tarda en llegar?", "focus": "rhythm"}
            ]
        }
    },
    15: {
        "theme": "Daily Routine & Reflexives",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 What's special about 'me levanto', 'te duchas', 'se viste'?"},
                {"type": "post_pattern", "text": "💡 Did you notice? The reflexive pronoun matches the subject!"},
                {"type": "rule", "text": "📐 The pattern: me/te/se/nos/os/se + verb"}
            ],
            "input_flooding": [
                "Me levanto temprano", "Te duchas rápido", "Se viste elegante",
                "Nos acostamos tarde", "Se despiertan a las siete"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Me levanto a las siete", "focus": "rhythm"},
                {"spanish": "Primero me ducho y después desayuno", "focus": "stress"},
                {"spanish": "¿A qué hora te acuestas?", "focus": "intonation"},
                {"spanish": "Los fines de semana me relajo", "focus": "rhythm"},
                {"spanish": "Nos vemos mañana por la mañana", "focus": "stress"}
            ]
        }
    },
    16: {
        "theme": "Work & Object Pronouns",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Where do lo/la/los/las go in the sentence?"},
                {"type": "rule", "text": "📐 The pattern: Object pronouns go BEFORE the conjugated verb"},
                {"type": "comparison", "text": "🔍 Notice: 'Lo veo' (I see it/him) - pronoun before verb!"}
            ],
            "input_flooding": [
                "Lo veo", "La llamo", "Los conozco", "Las necesito",
                "Lo quiero comprar", "Quiero comprarlo"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿En qué trabaja usted?", "focus": "intonation"},
                {"spanish": "Soy ingeniero de software", "focus": "rhythm"},
                {"spanish": "Trabajo desde casa los viernes", "focus": "stress"},
                {"spanish": "¿A qué hora termina su jornada?", "focus": "intonation"},
                {"spanish": "Tengo una reunión a las tres", "focus": "rhythm"}
            ]
        }
    },
    17: {
        "theme": "Hobbies & Gustar",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 'Gustar' is backwards from English!"},
                {"type": "rule", "text": "📐 The pattern: A mí ME GUSTA el fútbol = Football is pleasing TO ME"},
                {"type": "comparison", "text": "🔍 Notice: 'Me gusta' (one thing) vs 'Me gustan' (multiple things)"}
            ],
            "input_flooding": [
                "Me gusta bailar", "Te gusta cocinar", "Le gusta leer",
                "Nos gustan las películas", "Les gustan los deportes"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿Qué te gusta hacer los fines de semana?", "focus": "intonation"},
                {"spanish": "Me encanta ir al cine", "focus": "stress"},
                {"spanish": "¿Te gustaría jugar al tenis?", "focus": "intonation"},
                {"spanish": "Prefiero quedarme en casa", "focus": "rhythm"},
                {"spanish": "¿Cada cuánto practicas?", "focus": "rhythm"}
            ]
        }
    },
    18: {
        "theme": "Past Events I & Preterite -AR",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Look at these past tense endings for -AR verbs"},
                {"type": "rule", "text": "📐 The pattern: -é, -aste, -ó, -amos, -asteis, -aron"},
                {"type": "comparison", "text": "🔍 Notice: Present 'hablo' vs Past 'hablé' - accent marks matter!"}
            ],
            "input_flooding": [
                "Ayer hablé con María", "¿Hablaste con tu jefe?", "Ella habló muy bien",
                "Hablamos por teléfono", "Ellos hablaron en español"
            ],
            "morpheme_display": {
                "verb": "hablar (preterite)",
                "stem": "habl-",
                "endings": ["é", "aste", "ó", "amos", "asteis", "aron"]
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Ayer comí en un restaurante nuevo", "focus": "stress"},
                {"spanish": "¿Qué hiciste el fin de semana?", "focus": "intonation"},
                {"spanish": "Visité a mis padres", "focus": "rhythm"},
                {"spanish": "La semana pasada trabajé mucho", "focus": "stress"},
                {"spanish": "¿Ya terminaste el proyecto?", "focus": "intonation"}
            ]
        }
    },
    19: {
        "theme": "Past Events II & Preterite -ER/-IR",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Compare -AR preterite to -ER/-IR preterite"},
                {"type": "rule", "text": "📐 The pattern: -ER/-IR share endings: -í, -iste, -ió, -imos, -isteis, -ieron"},
                {"type": "post_pattern", "text": "💡 Did you notice? -ER and -IR have IDENTICAL preterite endings!"}
            ],
            "input_flooding": [
                "Comí pizza ayer", "¿Comiste bien?", "Ella comió tarde",
                "Vivimos en Madrid", "Escribieron una carta"
            ],
            "morpheme_display": {
                "verb": "comer/vivir (preterite)",
                "stem": "com-/viv-",
                "endings": ["í", "iste", "ió", "imos", "isteis", "ieron"]
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Anoche salí con mis amigos", "focus": "rhythm"},
                {"spanish": "Primero fuimos al cine", "focus": "stress"},
                {"spanish": "Después cenamos en un bar", "focus": "rhythm"},
                {"spanish": "¿A qué hora volviste a casa?", "focus": "intonation"},
                {"spanish": "Me acosté muy tarde", "focus": "stress"}
            ]
        }
    },
    20: {
        "theme": "Childhood & Imperfect",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 The imperfect is used for past descriptions and habits"},
                {"type": "rule", "text": "📐 The pattern: -AR: -aba, -abas, -aba, -ábamos, -abais, -aban"},
                {"type": "comparison", "text": "🔍 Notice: Preterite = completed actions, Imperfect = ongoing/habitual"}
            ],
            "input_flooding": [
                "Cuando era niño...", "Vivía en un pueblo pequeño", "Jugaba con mis amigos",
                "Siempre comíamos juntos", "Mi abuela cocinaba muy bien"
            ],
            "morpheme_display": {
                "verb": "hablar (imperfect)",
                "stem": "habl-",
                "endings": ["aba", "abas", "aba", "ábamos", "abais", "aban"]
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Cuando era niño, vivía en México", "focus": "rhythm"},
                {"spanish": "Todos los veranos visitaba a mis abuelos", "focus": "stress"},
                {"spanish": "Mi madre siempre cocinaba arroz con pollo", "focus": "rhythm"},
                {"spanish": "¿Dónde vivías cuando eras pequeño?", "focus": "intonation"},
                {"spanish": "Antes había menos tráfico", "focus": "stress"}
            ]
        }
    },
    21: {
        "theme": "Travel & Future",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 'Ir a + infinitive' is the easy way to express future"},
                {"type": "rule", "text": "📐 The pattern: Voy a viajar = I'm going to travel"},
                {"type": "memory", "text": "🧠 Remember: This is just like English 'going to'!"}
            ],
            "input_flooding": [
                "Voy a viajar a España", "Vas a visitar museos", "Va a quedarse una semana",
                "Vamos a reservar un hotel", "Van a alquilar un coche"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "El próximo mes voy a viajar a España", "focus": "rhythm"},
                {"spanish": "¿Tienes algún plan para las vacaciones?", "focus": "intonation"},
                {"spanish": "Quiero visitar Barcelona y Madrid", "focus": "stress"},
                {"spanish": "¿Cuánto cuesta un vuelo directo?", "focus": "intonation"},
                {"spanish": "Necesito renovar mi pasaporte", "focus": "rhythm"}
            ]
        }
    },
    22: {
        "theme": "Hotel & Conditional",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 The conditional is used for polite requests and hypotheticals"},
                {"type": "rule", "text": "📐 The pattern: Add -ía, -ías, -ía, -íamos, -íais, -ían to infinitive"},
                {"type": "comparison", "text": "🔍 Notice: 'Quiero' (I want) vs 'Querría' (I would like) - more polite!"}
            ],
            "input_flooding": [
                "Me gustaría una habitación", "¿Podría ver el menú?", "Querría reservar",
                "¿Sería posible...?", "¿Tendría una mesa disponible?"
            ],
            "morpheme_display": {
                "verb": "hablar (conditional)",
                "stem": "hablar-",
                "endings": ["ía", "ías", "ía", "íamos", "íais", "ían"]
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Me gustaría reservar una habitación", "focus": "rhythm"},
                {"spanish": "¿Tendría algo con vista al mar?", "focus": "intonation"},
                {"spanish": "¿A qué hora es el desayuno?", "focus": "intonation"},
                {"spanish": "¿Podría llamar un taxi, por favor?", "focus": "stress"},
                {"spanish": "La habitación está muy bien, gracias", "focus": "rhythm"}
            ]
        }
    },
    23: {
        "theme": "Sightseeing & Comparatives",
        "noticing": {
            "color_scheme": None,
            "callouts": [
                {"type": "rule", "text": "📐 The pattern: más/menos + adjective + que"},
                {"type": "comparison", "text": "🔍 Notice: 'más grande que' = bigger than, 'menos caro que' = less expensive than"},
                {"type": "exception", "text": "⚠️ Watch out: mejor (better), peor (worse), mayor (older), menor (younger)"}
            ],
            "input_flooding": [
                "más interesante que", "menos caro que", "tan bonito como",
                "mejor que", "peor que", "el más famoso"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Este museo es más interesante que el otro", "focus": "stress"},
                {"spanish": "¿Cuál es el monumento más famoso?", "focus": "intonation"},
                {"spanish": "Esta zona es menos turística", "focus": "rhythm"},
                {"spanish": "¿Hay tours en español?", "focus": "intonation"},
                {"spanish": "Me encantó la arquitectura de la ciudad", "focus": "stress"}
            ]
        }
    },
    24: {
        "theme": "Emergencies & Commands",
        "noticing": {
            "color_scheme": "verb_endings",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Informal commands (tú) look like él/ella present tense"},
                {"type": "rule", "text": "📐 The pattern: habla (speak!), come (eat!), escribe (write!)"},
                {"type": "exception", "text": "⚠️ Watch out: Some are irregular - ven, ten, pon, sal, haz, di, sé, ve"}
            ],
            "input_flooding": [
                "¡Llama a la policía!", "¡Espera aquí!", "¡No te muevas!",
                "¡Ven rápido!", "¡Ten cuidado!", "¡Dime qué pasó!"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¡Necesito ayuda, por favor!", "focus": "stress"},
                {"spanish": "¿Dónde está el hospital más cercano?", "focus": "intonation"},
                {"spanish": "Perdí mi pasaporte", "focus": "rhythm"},
                {"spanish": "¿Puede llamar a una ambulancia?", "focus": "intonation"},
                {"spanish": "Es una emergencia", "focus": "stress"}
            ]
        }
    },
    25: {
        "theme": "Technology & Present Perfect",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Present perfect: haber + past participle"},
                {"type": "rule", "text": "📐 The pattern: he/has/ha/hemos/habéis/han + -ado/-ido"},
                {"type": "comparison", "text": "🔍 Notice: 'He comido' = I have eaten, 'Ha llegado' = He/She has arrived"}
            ],
            "input_flooding": [
                "He terminado el trabajo", "¿Has visto la película?", "Ha llegado el paquete",
                "Hemos visitado Madrid", "Han comprado un coche nuevo"
            ],
            "morpheme_display": {
                "participles": {
                    "-ar": "-ado (hablado)",
                    "-er/-ir": "-ido (comido, vivido)"
                }
            }
        },
        "shadowing": {
            "phrases": [
                {"spanish": "¿Has probado la nueva aplicación?", "focus": "intonation"},
                {"spanish": "Todavía no he actualizado el sistema", "focus": "rhythm"},
                {"spanish": "Se ha caído la conexión otra vez", "focus": "stress"},
                {"spanish": "¿Has guardado el archivo?", "focus": "intonation"},
                {"spanish": "Ya he enviado el correo electrónico", "focus": "rhythm"}
            ]
        }
    },
    26: {
        "theme": "Opinions & Subjunctive Intro",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 The subjunctive is triggered by certain phrases"},
                {"type": "rule", "text": "📐 The pattern: Indicative after 'Creo que...', Subjunctive after 'No creo que...'"},
                {"type": "comparison", "text": "🔍 Notice: 'Creo que ES bueno' vs 'No creo que SEA bueno'"}
            ],
            "input_flooding": [
                "Creo que es importante", "No creo que sea difícil",
                "Pienso que tiene razón", "Dudo que venga",
                "Es posible que llueva"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Creo que tienes razón", "focus": "rhythm"},
                {"spanish": "No creo que sea tan difícil", "focus": "stress"},
                {"spanish": "En mi opinión, es la mejor opción", "focus": "rhythm"},
                {"spanish": "¿Qué opinas tú de esto?", "focus": "intonation"},
                {"spanish": "Es posible que haya otra solución", "focus": "stress"}
            ]
        }
    },
    27: {
        "theme": "Making Plans & Subjunctive with Desires",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Subjunctive is used when wanting someone ELSE to do something"},
                {"type": "rule", "text": "📐 The pattern: Quiero que + subjunctive (I want that you...)"},
                {"type": "comparison", "text": "🔍 Notice: 'Quiero comer' (I want to eat) vs 'Quiero que comas' (I want you to eat)"}
            ],
            "input_flooding": [
                "Quiero que vengas", "Espero que te mejores", "Necesito que me ayudes",
                "Prefiero que hablemos mañana", "Te pido que tengas paciencia"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Quiero que vengas a mi fiesta", "focus": "rhythm"},
                {"spanish": "Espero que puedas venir", "focus": "stress"},
                {"spanish": "¿Qué quieres que traiga?", "focus": "intonation"},
                {"spanish": "Prefiero que nos veamos el sábado", "focus": "rhythm"},
                {"spanish": "Necesito que me confirmes la hora", "focus": "stress"}
            ]
        }
    },
    28: {
        "theme": "Hypotheticals & Si Clauses",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 'Si' clauses follow specific patterns"},
                {"type": "rule", "text": "📐 The pattern: Si + present, present/future (real possibility)"},
                {"type": "comparison", "text": "🔍 Notice: 'Si llueve, me quedo en casa' - both verbs present for real conditions"}
            ],
            "input_flooding": [
                "Si tengo tiempo, voy", "Si llueve, nos quedamos",
                "Si quieres, te ayudo", "Si vienes, cenamos juntos",
                "Si no funciona, lo devuelvo"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Si tengo tiempo, te llamo esta noche", "focus": "rhythm"},
                {"spanish": "¿Qué harías si ganaras la lotería?", "focus": "intonation"},
                {"spanish": "Si pudiera, viajaría por todo el mundo", "focus": "stress"},
                {"spanish": "Si no llueve, vamos a la playa", "focus": "rhythm"},
                {"spanish": "¿Y si mejor vamos mañana?", "focus": "intonation"}
            ]
        }
    },
    29: {
        "theme": "Storytelling & Preterite vs Imperfect",
        "noticing": {
            "color_scheme": "tense",
            "callouts": [
                {"type": "pre_pattern", "text": "👀 Stories use BOTH preterite and imperfect together"},
                {"type": "rule", "text": "📐 The pattern: Imperfect = background/description, Preterite = action/event"},
                {"type": "comparison", "text": "🔍 Notice: 'Era de noche' (background) + 'cuando llegó' (event)"}
            ],
            "input_flooding": [
                "Era una noche oscura cuando llegó",
                "Estaba lloviendo y de repente vi",
                "Mientras caminaba, encontré",
                "Hacía frío y decidí entrar"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Era una noche oscura y tormentosa", "focus": "rhythm"},
                {"spanish": "De repente, escuché un ruido extraño", "focus": "stress"},
                {"spanish": "Mientras caminaba, vi algo en el suelo", "focus": "rhythm"},
                {"spanish": "Primero fui a la tienda, después al banco", "focus": "stress"},
                {"spanish": "¿Y qué pasó después?", "focus": "intonation"}
            ]
        }
    },
    30: {
        "theme": "Review & Conversation",
        "noticing": {
            "color_scheme": None,
            "callouts": [
                {"type": "memory", "text": "🧠 Remember: You've learned 6 tenses and many structures!"},
                {"type": "rule", "text": "📐 Key patterns: verb conjugations, gender agreement, gustar-type verbs, ser vs estar"}
            ],
            "input_flooding": [
                "Mucho gusto en conocerte", "Ha sido un placer",
                "Espero que nos veamos pronto", "Que te vaya bien",
                "Cuídate mucho", "Hasta la próxima"
            ]
        },
        "shadowing": {
            "phrases": [
                {"spanish": "Ha sido un placer conocerte", "focus": "rhythm"},
                {"spanish": "Espero que podamos vernos pronto", "focus": "stress"},
                {"spanish": "Me ha encantado hablar contigo", "focus": "rhythm"},
                {"spanish": "¿Tienes planes para el fin de semana?", "focus": "intonation"},
                {"spanish": "Que tengas un buen día", "focus": "rhythm"},
                {"spanish": "¡Mucha suerte con tu español!", "focus": "stress"},
                {"spanish": "Sigue practicando, lo estás haciendo muy bien", "focus": "rhythm"}
            ]
        }
    }
}

# ═══════════════════════════════════════════════════════════════════════════════
# ENHANCEMENT FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

def enhance_day_json(day_num, existing_data):
    """Add enhancement data to existing day JSON, preserving all content."""
    
    # Get enhancements for this day
    enhancements = DAY_ENHANCEMENTS.get(day_num, {})
    pt_stage, pt_name = get_pt_stage(day_num)
    shadowing_tier = get_shadowing_tier(day_num)
    
    # Create enhanced data structure
    enhanced = existing_data.copy()
    
    # Add PT metadata
    enhanced["processabilityTheory"] = {
        "stage": pt_stage,
        "stageName": pt_name,
        "description": f"Stage {pt_stage}: {pt_name}"
    }
    
    # Add noticing enhancements
    if enhancements.get("noticing"):
        noticing = enhancements["noticing"]
        enhanced["noticingEnhancements"] = {
            "colorScheme": noticing.get("color_scheme"),
            "colorCodes": COLOR_SCHEMES.get(noticing.get("color_scheme")) if noticing.get("color_scheme") else None,
            "callouts": noticing.get("callouts", []),
            "inputFlooding": noticing.get("input_flooding", [])
        }
        
        # Add morpheme display if present
        if noticing.get("morpheme_display"):
            enhanced["noticingEnhancements"]["morphemeDisplay"] = noticing["morpheme_display"]
    
    # Add shadowing mode
    if shadowing_tier and enhancements.get("shadowing"):
        config = SHADOWING_CONFIG[shadowing_tier]
        shadowing_data = enhancements["shadowing"]
        
        enhanced["shadowingMode"] = {
            "enabled": True,
            "tier": shadowing_tier,
            "config": {
                "maxWords": config["max_words"],
                "speed": config["speed"],
                "primaryFocus": config["focus"]
            },
            "phrases": shadowing_data.get("phrases", []),
            "instructions": {
                "intro": "Listen to each phrase, then repeat it immediately after.",
                "focus": f"Focus on matching the {config['focus']} of the speaker.",
                "tip": "Don't worry about perfect pronunciation - focus on the rhythm and flow!"
            }
        }
    elif day_num >= 7:
        # Day 7+ but no specific phrases defined yet
        enhanced["shadowingMode"] = {
            "enabled": True,
            "tier": shadowing_tier,
            "config": SHADOWING_CONFIG.get(shadowing_tier, {}),
            "phrases": [],
            "note": "Phrases to be added - use vocabulary and grammar from this day's content"
        }
    else:
        enhanced["shadowingMode"] = {
            "enabled": False,
            "unlockDay": 7,
            "reason": "Shadowing mode unlocks on Day 7 after basic vocabulary is established"
        }
    
    # Add color scheme reference for UI
    enhanced["colorSchemes"] = COLOR_SCHEMES
    
    # Add enhancement metadata
    enhanced["enhancementMeta"] = {
        "version": "2.0",
        "enhanced": True,
        "enhancedAt": datetime.now().isoformat(),
        "frameworks": ["ProcessabilityTheory", "NoticingHypothesis", "ShadowingMode"]
    }
    
    return enhanced

def backup_days_folder(days_dir, backup_dir):
    """Create backup of days folder."""
    import shutil
    
    if os.path.exists(backup_dir):
        # Add timestamp to existing backup
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        os.rename(backup_dir, f"{backup_dir}_{timestamp}")
    
    shutil.copytree(days_dir, backup_dir)
    print(f"  ✅ Backed up to: {backup_dir}")

def process_all_days(days_dir):
    """Process all day JSON files."""
    results = {"success": [], "failed": [], "skipped": []}
    
    for day_num in range(1, 31):
        filename = f"day{day_num:02d}.json"
        filepath = os.path.join(days_dir, filename)
        
        if not os.path.exists(filepath):
            results["skipped"].append(filename)
            print(f"  ⚠️  {filename} not found - skipping")
            continue
        
        try:
            # Read existing data
            with open(filepath, 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
            
            # Enhance the data
            enhanced_data = enhance_day_json(day_num, existing_data)
            
            # Write enhanced data
            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(enhanced_data, f, indent=2, ensure_ascii=False)
            
            results["success"].append(filename)
            print(f"  ✅ {filename} enhanced")
            
        except Exception as e:
            results["failed"].append((filename, str(e)))
            print(f"  ❌ {filename} failed: {e}")
    
    return results

# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════

def main():
    print("=" * 70)
    print("FLUIDEZ DAY JSON ENHANCER")
    print("=" * 70)
    print("\nThis script adds PT, Noticing, and Shadowing enhancements to your")
    print("existing day JSON files while PRESERVING all existing content.\n")
    
    # Check if days directory exists
    if not os.path.exists(DAYS_DIR):
        print(f"❌ Days directory not found: {DAYS_DIR}")
        print("   Make sure you're running this from your fluidez project root")
        return
    
    # Create backup
    print("[1/3] Creating backup...")
    backup_days_folder(DAYS_DIR, BACKUP_DIR)
    
    # Process all days
    print("\n[2/3] Enhancing day files...")
    results = process_all_days(DAYS_DIR)
    
    # Summary
    print("\n[3/3] Complete!")
    print("=" * 70)
    print(f"\n📊 RESULTS:")
    print(f"   ✅ Enhanced: {len(results['success'])} files")
    print(f"   ⚠️  Skipped:  {len(results['skipped'])} files")
    print(f"   ❌ Failed:   {len(results['failed'])} files")
    
    if results["failed"]:
        print("\n   Failed files:")
        for filename, error in results["failed"]:
            print(f"      - {filename}: {error}")
    
    print(f"\n📁 Backup saved to: {BACKUP_DIR}")
    print("\n🎯 WHAT'S NEW IN YOUR DAY FILES:")
    print("   • processabilityTheory - PT stage for this day's grammar")
    print("   • noticingEnhancements - Color schemes, callouts, input flooding")
    print("   • shadowingMode - Phrases and config for Days 7-30")
    print("   • colorSchemes - Reference for UI implementation")
    print("\n" + "=" * 70)

if __name__ == "__main__":
    main()
