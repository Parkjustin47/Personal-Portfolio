/**
 * Knowledge base extraction and management for Justin's portfolio chatbot
 * Extracts structured information from data.js for RAG (Retrieval Augmented Generation)
 */

import { DataArray } from '../data.js';

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

/**
 * Extracts all skills as a flat array from project tech stacks
 * @returns {Array} All unique skills from all projects
 */

export function getAllSkills(){
    return [...new Set(DataArray.flatMap(project => project.techStack))];
}

/**
 * Extracts project information with enhanced details
 * @returns {Array} Enhanced project data
 */
export function getProjectsData(){
    return DataArray.map(project =>({
        ...project,
        summary: project.des1,
        shortDescription: project.des,
        technologies: project.techStack.join(", "),
        links: {
            demo: project.demoLink,
            repo: project.repositoryLink
        }
    }));
}

/**
 * Converts knowledge base to searchable text passages for RAG
 * @returns {Array} Text passages for embedding search
 */
export function kbToPassages(){
    const passages = [];

    // Bio and highlights
    passages.push(`BIO: ${justinInfo.bio}`);
    passages.push(`HIGHLIGHTS: ${justinInfo.highlights.join("; ")}`);

    // Skills by category
    const skillsData = getSkillsByCategory();
    Object.entries(skillsData).forEach(([category, data]) => {
        if (data.skills.length > 0){
            passages.push(`MY SKILLS - ${category}: ${data.skills.join(", ")} | ${data.description}`);
        }
    });

    // All skills summary
    passages.push(`ALL MY SKILLS: ${getAllSkills().join(", ")}`);

    // Projects with detailed information
    DataArray.forEach(project => {
        passages.push(`MY PROJECT: ${project.name} | Status: ${project.status.text} | Year: ${project.year} | Stack: ${project.techStack.join(", ")} | Description: ${project.des1}`);

        // Add additional details for each project
        passages.push(`PROJECT SUMMARY: ${project.title} - ${project.des}`);
    });

    // Contact and fun facts
    passages.push(`CONTACT: ${justinInfo.contact.email}, ${justinInfo.contact.resume}, ${justinInfo.contact.github}, ${justinInfo.contact.linkedin}`);
    passages.push(`PERSONAL: ${justinInfoInfo.fun.join("; ")}`);

    // Education and involvement (first person)
    passages.push(`MY EDUCATION: I’m a Computer Science with Business Applications student at UC Riverside, involved with the Association for Computing Machinery and active in hackathons.`);
  
    return passages;
}

/**
 * Gets project by name (case insensitive)
 * @param {string} projectName 
 * @returns {Object|null} Project data or null if not found
 */
export function getProjectByName(projectName) {
    const normalizedName = projectName.toLowerCase();
    return DataArray.find(project => 
        [project.name, project.title].some(field => 
            field.toLowerCase().includes(normalizedName)
        )
    ) || null;
}

/**
 * Gets projects by technology/skill
 * @param {string} tech 
 * @returns {Array} Projects using the specified technology
 */
export function getProjectsByTech(tech) {
    const normalizedTech = tech.toLowerCase();
    return DataArray.filter(project =>
        project.techStack.some(t => t.toLowerCase().includes(normalizedTech))
    );
}

/**
 * Gets projects by status
 * @param {string} status 
 * @returns {Array} Projects with specified status
 */
export function getProjectsByStatus(status) {
    const normalizedStatus = status.toLowerCase();
    return DataArray.filter(project => 
        project.status.text.toLowerCase().includes(normalizedStatus)
    );
}

/**
 * Searches skills by query
 * @param {string} query 
 * @returns {Array} Matching skills and their categories
 */
export function searchSkills(query) {
    const normalizedQuery = query.toLowerCase();
    const skillsData = getSkillsByCategory();
  
    return Object.entries(skillsData)
        .map(([category, data]) => ({
            category,
            skills: data.skills.filter(skill => 
                skill.toLowerCase().includes(normalizedQuery)
            )
        }))
        .filter(result => result.skills.length > 0);
}

export default {
  justinInfo,
  getSkillsByCategory,
  getAllSkills,
  getProjectsData,
  kbToPassages,
  getProjectByName,
  getProjectsByTech,
  getProjectsByStatus,
  searchSkills
};


