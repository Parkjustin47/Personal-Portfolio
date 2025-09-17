/**
 * Knowledge base extraction and management for Justin's portfolio chatbot
 * Extracts structured information from data.js for RAG (Retrieval Augmented Generation)
 */

import { dataArray } from '../data.js';

/**
* Justin's core information extracted from portfolio data (written in first person)
*/
const justinInfo = {
    bio: "I’m Justin, a Computer Science with Business Applications student at UC Riverside, passionate about backend infrastructure, scalable systems, and full-stack development. I’m actively involved in computing organizations and hackathons, with a focus on building innovative solutions that create real world impact.",

    highlights: [
        "I’m a Computer Science with Business Applications student at UC Riverside.",
        "I love building real world software that helps small businesses reduce costs and improve efficiency.",
        "I'm a full-stack developer experienced with React.js, Next.js, C++, Python, and Javascript.",
        "I’m active in hackathons and involved with the Association for Computing Machinery at UC Riverside."
    ],

    contact: {
        email: "You can find my email and contact information on this portfolio.",
        resume: "My resume is available for download here.",
        github: "Visit my GitHub through the portfolio links.",
        linkedin: "Connect with me on LinkedIn via the portfolio links."
    },

    fun: [
        "I enjoy going to the gym, spending time with friends, and both watching and playing sports.",
        "I occasionally play basketball with friends and enjoy traveling the world together.",
        "I enjoy exploring new places I’ve never been before.",
    ]
};

/**
* Skill categorization mapping for efficient categorization
*/
const SKILL_CATEGORIES = {
    "Programming Languages": {
        description: "Languages I use to build software, from low-level systems to web applications",
        keywords: ['c++', 'python', 'javascript', 'assembly', 'html', 'css', 'sql']
    },
    "Frontend Technologies": {
        description: "Tools and frameworks for building responsive and modern web interfaces",
        keywords: ['html', 'css', 'javascript', 'tailwind', 'react', 'next']
    },
    "Backend Technologies": {
        description: "Server-side development, API creation, and database interactions",
        keywords: ['nodejs', 'django', 'python', 'mysql', 'mongodb', 'sql']
    },
    "Developer Tools": {
        description: "Version control, deployment platforms, and other development utilities",
        eywords: ['git', 'mongodb', 'vercel', 'unix', 'linux', 'version control']
    },
    "Databases": {
        description: "Database management and data storage solutions",
        keywords: ['mysql', 'mongodb', 'sql']
    }
};

/**
 * Extracts skills from DataArray projects grouped by category
 * @returns {Object} Skills organized by category
 */
export function getSkillsByCategory(){
    const allSkills = getAllSkills();

    // Start with no skills in each category
    const skillsMap = Object.fromEntries(
        Object.entries(SKILL_CATEGORIES).map(([category, { description }]) => [
            category,
            { skills: [], description }
        ])
    );

    // Put each skill in right category efficiently
    allSkills.forEach(skill => {
        const lowerSkill = skill.toLowerCase();
    
    // Find the first matching category
    const categoryEntry = Object.entries(SKILL_CATEGORIES).find(([, { keywords }]) =>
        keywords.some(keyword => lowerSkill.includes(keyword))
    );
    
    if (categoryEntry) {
        const [categoryName] = categoryEntry;
        if (!skillsMap[categoryName].skills.includes(skill)) {
            skillsMap[categoryName].skills.push(skill);
        }
    }
});

    return skillsMap;
}


