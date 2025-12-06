// Professional resume templates for selection
const dummyTemplates = [
  {
    id: 1,
    name: "Classic Professional",
    content: {
      name: "Jonathan Reed",
      title: "Senior Software Engineer",
      email: "jonathan.reed@example.com",
      phone: "+1 555-123-4567",
      website: "jonathanreed.dev",
      summary:
        "Senior Software Engineer with 8+ years of expertise in scalable system design, backend engineering, distributed systems, and enterprise architecture. Proven success in optimizing platforms, reducing cloud costs, building microservices, mentoring teams, and delivering high-impact solutions for B2B SaaS, analytics, cloud automation, and security technology companies.",
      skills: [
        "JavaScript / TypeScript",
        "React / Next.js",
        "Node.js / Express",
        "Java / Spring Boot",
        "GraphQL / REST",
        "Microservices",
        "Docker / Kubernetes ",
        "AWS / GCP / Firebase",
        "SQL / PostgreSQL",
        "MongoDB / Redis",
        "CI/CD · GitHub Actions",
      ],
      experience: [
        {
          role: "Lead Software Engineer – NovaTech Labs",
          years: "2021 – Present",
          bullets: `Designed & developed a real-time customer analytics system processing 2M+ events/day.
Reduced infrastructure costs by 28% through optimized microservice orchestration.
Implemented event-driven architecture using Kafka, improving reliability by 40%.
Led 6 engineers; established coding standards, review process & mentoring culture.
Built internal developer platform reducing deployment time from 35 mins to 3 mins.`,
        },
        {
          role: "Software Engineer – Cygnus Systems",
          years: "2018 – 2021",
          bullets: `Built enterprise React dashboards used by 14+ Fortune 500 clients.
Developed GraphQL services improving data retrieval performance by 60%.
Implemented robust role-based access system covering 45+ permission types.
Improved CI/CD pipelines reducing deployment errors by 70%.`,
        },
        {
          role: "Junior Developer – Orion Softworks",
          years: "2016 – 2018",
          bullets: `Developed internal tools saving ~300 developer hours per quarter.
Enhanced SQL queries improving reporting performance 4×.
Built monitoring dashboards for system health tracking.`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Technology – Computer Science",
          years: "2012 – 2016",
          details: "University of Techville · GPA: 8.6/10",
        },
      ],
      certifications: [
        "AWS Certified Solutions Architect – Associate",
        "Google Professional Cloud Developer",
        "Oracle Certified Java Programmer",
        "Kubernetes & Cloud Native Associate (KCNA)",
      ],
    },
  },
  {
    id: 2,
    name: "Modern Executive",
    content: {
      name: "Sarah Chen",
      title: "Product Design Lead",
      email: "sarah.chen@example.com",
      phone: "+1 555-987-6543",
      website: "sarachen.design",
      summary:
        "Award-winning Product Design Lead with 10+ years creating user-centered digital experiences for Fortune 500 companies. Expert in design systems, user research, and leading design teams. Successfully launched 20+ products with measurable improvements in user engagement and satisfaction.",
      skills: [
        "Figma / Sketch",
        "Adobe Creative Suite",
        "Prototyping",
        "User Research",
        "Design Systems",
        "Wireframing",
        "A/B Testing",
        "Usability Testing",
        "HTML/CSS",
        "Mobile-First Design",
      ],
      experience: [
        {
          role: "Product Design Lead – DesignForward Inc",
          years: "2020 – Present",
          bullets: `Lead design team of 12 designers across multiple product lines.
Established company-wide design system adopted by 50+ engineers.
Increased user satisfaction scores by 35% through data-driven design improvements.
Conducted workshops and design sprints with stakeholders from 8+ departments.`,
        },
        {
          role: "Senior UX/UI Designer – Creative Solutions Agency",
          years: "2017 – 2020",
          bullets: `Designed enterprise SaaS applications for clients including Microsoft and Adobe.
Conducted user research with 500+ participants.
Created wireframes, prototypes, and high-fidelity mockups.
Improved conversion rates by 42% through strategic redesign.`,
        },
        {
          role: "UX Designer & Consultant – Freelance",
          years: "2014 – 2017",
          bullets: `Provided design consulting for 30+ startups and small businesses.
Specialized in mobile-first design and conversion optimization.
Delivered complete design systems and brand guidelines.`,
        },
      ],
      education: [
        {
          degree: "Master of Fine Arts in Interaction Design",
          years: "2012 – 2014",
          details: "School of Visual Arts · GPA: 4.0/4.0",
        },
        {
          degree: "Bachelor of Arts in Graphic Design",
          years: "2008 – 2012",
          details: "Rhode Island School of Design · GPA: 3.8/4.0",
        },
      ],
      certifications: [
        "Nielsen Norman Group UX Certification",
        "Google UX Design Professional",
        "Certified Usability Analyst (CUA)",
      ],
    },
  },
  {
    id: 3,
    name: "Creative Gradient",
    content: {
      name: "Alexandra Martinez",
      title: "Full Stack Developer & Cloud Architect",
      email: "alex.martinez@example.com",
      phone: "+1 555-234-8901",
      website: "alexmartinez.io",
      summary:
        "Innovative Full Stack Developer and Cloud Architect with 7+ years building scalable web applications and cloud infrastructure. Specialized in modern JavaScript frameworks, serverless architectures, DevOps automation, and performance optimization. Passionate about clean code, user experience, and cutting-edge technologies.",
      skills: [
        "React / Vue.js",
        "TypeScript / ES6+",
        "Python / Django",
        "Node.js / NestJS",
        "Serverless / Lambda",
        "AWS / Azure",
        "Terraform / IaC",
        "Docker / Kubernetes",
        "PostgreSQL / DynamoDB",
        "GraphQL / tRPC",
      ],
      experience: [
        {
          role: "Senior Full Stack Engineer – CloudTech Innovations",
          years: "2021 – Present",
          bullets: `Architected serverless platform handling 5M+ requests/day with 99.9% uptime.
Reduced API response times by 65% through intelligent caching strategies.
Built automated deployment pipelines saving 15 hours/week in manual work.
Mentored 8 junior developers on best practices and modern architecture patterns.
Implemented comprehensive testing suite achieving 92% code coverage.`,
        },
        {
          role: "Full Stack Developer – StartupHub Technologies",
          years: "2019 – 2021",
          bullets: `Developed e-commerce platform generating $2M+ in annual revenue.
Integrated payment systems (Stripe, PayPal) processing 50K+ transactions.
Created admin dashboards used by 200+ internal team members.
Optimized database queries reducing page load times by 75%.`,
        },
        {
          role: "Frontend Developer – Digital Wave Studio",
          years: "2018 – 2019",
          bullets: `Built responsive web applications for 15+ client projects.
Collaborated with designers to implement pixel-perfect UI components.
Improved website performance scores from 60 to 95+ (Lighthouse).`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Science – Software Engineering",
          years: "2014 – 2018",
          details: "Tech University · GPA: 3.9/4.0 · Dean's List",
        },
      ],
      certifications: [
        "AWS Certified Solutions Architect – Professional",
        "Certified Kubernetes Application Developer (CKAD)",
        "Meta Front-End Developer Professional",
        "HashiCorp Certified: Terraform Associate",
      ],
    },
  },
];

export default dummyTemplates;
