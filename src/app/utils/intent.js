/**
 * Intent routing for portfolio chatbot
 * Routes user queries to appropriate response categories
 */

export const INTENT_TYPES = {
    GREETING: "greeting",
    ABOUT: "about",
    PROJECTS: "projects", 
    SKILLS: "skills",
    EXPERIENCE: "experience",
    CONTACT: "contact",
    FUN: "fun",
    OFF_TOPIC: "off_topic",
    FALLBACK: "fallback"
};

/**
 * Intent patterns for more maintainable routing
 */
const INTENT_PATTERNS = [
    {
        type: INTENT_TYPES.GREETING,
        patterns: [
            /^(hi|hello|hey|good\s+(morning|afternoon|evening)|greetings|what's\s+up|whats\s+up|yo|sup|hiya|howdy)\s*[!.?]*$/,
            /^(hi|hello|hey)\s+(there|justin|bot)\s*[!.?]*$/,
            /^(nice\s+to\s+meet\s+you|pleasure\s+to\s+meet\s+you)\s*[!.?]*$/,
            /^(how\s+(are\s+)?you(\s+doing)?)\s*[!.?]*$/
        ]
    },
    {
        type: INTENT_TYPES.ABOUT,
        patterns: [/\b(who\s+(are\s+)?you|about\s+(you|yourself)|introduce\s+yourself|bio|background.*you)\b/]
    },
    {
        type: INTENT_TYPES.EXPERIENCE,
        patterns: [
            /\b(experience|internship|roles|education|university|ucr|riverside|student|academic|hackathon)\b/,
            /\b(have\s+you\s+(ever\s+)?(done|participated|been\s+to|attended).*hackathon)\b/
        ]
    },
    {
        type: INTENT_TYPES.PROJECTS,
        patterns: [
            /\b(projects?\s+(you\s+)?(built|made|developed|created|worked\s+on))\b/,
            /\b(what.*projects|show.*projects|portfolio.*projects)\b/,
            /\b(personal portfolio)\b/,
            /\b(built.*app|made.*website|developed.*platform)\b/
        ]
    },
    {
        type: INTENT_TYPES.SKILLS,
        patterns: [
            /\b(skills?|tech\s+stack|technologies|tools|languages|programming|frameworks?|what.*know)\b/,
            /\b(c++|react|next|python|java|javascript|html|css|mongodb|mysql|assembly)\b/
        ]
    },
    {
        type: INTENT_TYPES.CONTACT,
        patterns: [/\b(contact|email|reach|hire|connect|linkedin|github|resume)\b/]
    },
    {
        type: INTENT_TYPES.FUN,
        patterns: [/\b(hobby|hobbies|fun|interests|personal|like|enjoy|free\s+time|outside\s+work)\b/]
    },
];

/**
 * Routes user input to appropriate intent category with intelligent, multilingual context awareness
 * @param {string} query - User's input message
 * @returns {string} Intent type (OFF_TOPIC detection now handled by LLM for better accuracy)
 */

export function routeIntent(query) {
    const s = query.toLowerCase().trim();
  
    // First, check for specific Justin-related intents (projects, skills, contact, fun)
    for (const { type, patterns } of INTENT_PATTERNS) {
        if (patterns.some(pattern => pattern.test(s))) {
            return type;
        }
    }
  
    // Check for greetings in multiple languages and casual formats
    const greetingPatterns = /\b(hi|hello|hey|hola|bonjour|guten\s+tag|ciao|konnichiwa|annyeonghaseyo|안녕|namaste|salaam|shalom|howdy|sup|what's\s+up|whats\s+up|good\s+morning|good\s+afternoon|good\s+evening|hey\s+there|hey\s+man|heyy+|yo|hallo|aloha)\b/;
  
    if (greetingPatterns.test(s)) {
        return INTENT_TYPES.ABOUT; // Treat greetings as about Justin for friendly intro
    }
  
    // Broader pattern matching for Justin-related questions (including multilingual indicators)
    const justinRelatedPatterns = /\b(you|your|justin|portfolio|project|skill|experience|education|study|work|build|develop|create|made|built|ucr|riverside|hackathon|university|student|resume|background|journey|story|learn|career|future|goals|achievements|accomplishments|academic|internship|job|hire|contact|email|github|linkedin|tell\s+me|about\s+yourself|who\s+are\s+you|introduce|yourself|퀘스|qui\s+es|quien\s+eres|c'est\s+quoi|wer\s+bist|chi\s+sei)\b/;
  
    const questionPatterns = /\b(what.*you|how.*you|where.*you|when.*you|why.*you|who.*you|tell.*about|describe|explain.*your|show.*your|share.*your|can\s+you|could\s+you|would\s+you|do\s+you|did\s+you|have\s+you|are\s+you|were\s+you)\b/;
  
    // If it contains Justin-related patterns or seems like a personal question, let LLM handle it
    if (justinRelatedPatterns.test(s) || questionPatterns.test(s)) {
        return INTENT_TYPES.FALLBACK; // Let OpenAI determine exact intent and relevance
    }
  
    // For everything else, let the LLM decide if it's relevant
    // This removes rigid off-topic detection and leverages LLM intelligence
        return INTENT_TYPES.FALLBACK;
    }

/**
 * Gets appropriate fallback responses for different intents
 * @param {string} intent - Intent type
 * @returns {string} Fallback response
 */
export function getFallbackResponse(intent) {
    const fallbacks = {
        [INTENT_TYPES.GREETING]: "Hey, I’m Justin! I’m studying Computer Science with Business Applications at UC Riverside. I’d be happy to chat about my projects, experience, or anything else you’re curious about.",
        [INTENT_TYPES.ABOUT]: "I’d be happy to tell you about myself! I’m Justin, a Computer Science with Business Applications student at UC Riverside, passionate about AI and full-stack development.",
        [INTENT_TYPES.PROJECTS]: "I've worked on a personal portfolio. Would you like to know more about the personal portfolio?",
        [INTENT_TYPES.SKILLS]: "I have experience with React.js, Next.js, Python, Java, C++, and several AI/ML frameworks. Is there a specific technology you’d like to hear more about?",
        [INTENT_TYPES.EXPERIENCE]: "I’m currently a Computer Science with Business Applications student at UC Riverside, involved in computing organizations and hackathons. Which part of my experience would you like to hear more about?",
        [INTENT_TYPES.CONTACT]: "You can find my contact information and resume on this portfolio. I’d love to connect with you!",
        [INTENT_TYPES.FUN]: "I enjoy participating in hackathons, building innovative solutions, and exploring AI projects. I’m also actively involved in computing communities at UC Riverside!",
        [INTENT_TYPES.OFF_TOPIC]: "This portfolio is all about my journey. I’d love to chat about my projects, skills, experiences, or education. What would you like to learn more about my work?",
        [INTENT_TYPES.FALLBACK]: "I’m not sure what you’re looking for, but I’d be happy to help! Feel free to ask about my projects, skills, experience, or anything else you’d like to know about me."
    };
  
    return fallbacks[intent] || fallbacks[INTENT_TYPES.FALLBACK];
}