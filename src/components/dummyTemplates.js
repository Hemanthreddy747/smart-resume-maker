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
  {
    id: 4,
    name: "Minimalist Tech",
    content: {
      name: "David Thompson",
      title: "Data Scientist & ML Engineer",
      email: "david.thompson@example.com",
      phone: "+1 555-456-7890",
      website: "davidthompson.ai",
      summary:
        "Data Scientist and Machine Learning Engineer with 6+ years of experience building AI-powered solutions and predictive models. Expert in Python, deep learning frameworks, and big data technologies. Proven track record of translating complex data into actionable business insights and deploying production ML systems.",
      skills: [
        "Python / R",
        "TensorFlow / PyTorch",
        "Scikit-learn / XGBoost",
        "SQL / Spark / Hadoop",
        "Machine Learning",
        "Deep Learning / NLP",
        "Data Visualization",
        "Statistical Analysis",
        "MLOps / MLflow",
        "AWS SageMaker",
      ],
      experience: [
        {
          role: "Senior Data Scientist – AI Solutions Corp",
          years: "2020 – Present",
          bullets: `Developed recommendation engine increasing user engagement by 47%.
Built fraud detection model saving company $3.2M annually.
Deployed ML models to production serving 10M+ predictions daily.
Led data science team of 5 engineers on multiple AI initiatives.
Implemented A/B testing framework used across 12 product features.`,
        },
        {
          role: "Machine Learning Engineer – DataWorks Inc",
          years: "2019 – 2020",
          bullets: `Created NLP models for sentiment analysis with 94% accuracy.
Optimized data pipelines processing 500GB+ daily.
Built real-time prediction APIs with sub-100ms latency.
Collaborated with product teams to integrate ML capabilities.`,
        },
        {
          role: "Data Analyst – InsightTech",
          years: "2018 – 2019",
          bullets: `Analyzed customer behavior data identifying key retention drivers.
Created interactive dashboards used by executive leadership.
Automated reporting processes saving 20 hours weekly.`,
        },
      ],
      education: [
        {
          degree: "Master of Science – Data Science",
          years: "2016 – 2018",
          details: "Stanford University · GPA: 3.95/4.0",
        },
        {
          degree: "Bachelor of Science – Mathematics",
          years: "2012 – 2016",
          details: "MIT · GPA: 3.85/4.0",
        },
      ],
      certifications: [
        "Google Professional Machine Learning Engineer",
        "AWS Certified Machine Learning – Specialty",
        "TensorFlow Developer Certificate",
        "Deep Learning Specialization (Coursera)",
      ],
    },
  },
  {
    id: 5,
    name: "Modern Timeline",
    content: {
      name: "Emily Rodriguez",
      title: "Marketing Director & Growth Strategist",
      email: "emily.rodriguez@example.com",
      phone: "+1 555-789-0123",
      website: "emilyrodriguez.pro",
      summary:
        "Results-driven Marketing Director with 9+ years leading digital marketing campaigns and growth strategies for B2B and B2C brands. Expert in performance marketing, content strategy, brand development, and team leadership. Track record of scaling companies from startup to multi-million dollar revenue.",
      skills: [
        "Digital Marketing",
        "Growth Strategy",
        "SEO / SEM",
        "Content Marketing",
        "Social Media Strategy",
        "Email Marketing",
        "Google Analytics / GA4",
        "Marketing Automation",
        "Brand Development",
        "Team Leadership",
      ],
      experience: [
        {
          role: "Marketing Director – GrowthLab Inc",
          years: "2020 – Present",
          bullets: `Scaled revenue from $2M to $15M in 3 years through strategic campaigns.
Built and led marketing team of 14 across content, paid ads, and analytics.
Increased organic traffic by 320% through comprehensive SEO strategy.
Launched influencer program generating $4M in attributed revenue.
Reduced customer acquisition cost by 42% while maintaining growth.`,
        },
        {
          role: "Senior Marketing Manager – BrandBoost Agency",
          years: "2017 – 2020",
          bullets: `Managed marketing campaigns for 20+ client brands.
Achieved average ROAS of 4.5× across paid advertising channels.
Developed content strategies increasing engagement by 250%.
Implemented marketing automation increasing conversion rates by 35%.`,
        },
      ],
      education: [
        {
          degree: "MBA – Marketing & Strategy",
          years: "2013 – 2015",
          details: "Wharton School · GPA: 3.92/4.0",
        },
        {
          degree: "Bachelor of Arts – Communications",
          years: "2009 – 2013",
          details: "UCLA · GPA: 3.75/4.0 · Magna Cum Laude",
        },
      ],
      certifications: [
        "Google Ads Certification",
        "HubSpot Inbound Marketing Certified",
        "Facebook Blueprint Certification",
        "Certified Digital Marketing Professional (CDMP)",
      ],
    },
  },
  {
    id: 6,
    name: "Professional Column",
    content: {
      name: "Michael Anderson",
      title: "Financial Analyst & Investment Consultant",
      email: "m.anderson@example.com",
      phone: "+1 555-321-9876",
      website: "michaelanderson.finance",
      summary:
        "Experienced Financial Analyst with 8+ years in investment banking, portfolio management, and financial modeling. Proven expertise in market analysis, risk assessment, and strategic financial planning. Strong track record of delivering actionable insights that drive business growth and optimize investment performance.",
      skills: [
        "Financial Modeling",
        "Investment Analysis",
        "Risk Management",
        "Excel / VBA",
        "Bloomberg Terminal",
        "Portfolio Management",
        "Valuation",
        "Financial Reporting",
        "SQL / Python",
        "Tableau",
      ],
      experience: [
        {
          role: "Senior Financial Analyst \u2013 Prime Capital Group",
          years: "2019 \u2013 Present",
          bullets: `Led financial analysis for $500M+ portfolio across multiple asset classes.
Developed predictive models improving forecast accuracy by 35%.
Managed due diligence for 15+ merger and acquisition deals.
Presented investment recommendations to C-suite executives.
Reduced portfolio risk exposure by 28% through strategic rebalancing.`,
        },
        {
          role: "Financial Analyst \u2013 Sterling Investments",
          years: "2017 \u2013 2019",
          bullets: `Analyzed market trends and provided investment recommendations.
Built financial models for equity research covering 20+ companies.
Prepared quarterly reports for institutional investors.
Identified undervalued assets generating 18% average returns.`,
        },
        {
          role: "Junior Analyst \u2013 Greenfield Financial Services",
          years: "2016 \u2013 2017",
          bullets: `Supported senior analysts in financial statement analysis.
Conducted industry research and competitive analysis.
Assisted in preparation of client presentation materials.`,
        },
      ],
      education: [
        {
          degree: "Master of Business Administration (MBA) \u2013 Finance",
          years: "2014 \u2013 2016",
          details: "Columbia Business School \u00b7 GPA: 3.88/4.0",
        },
        {
          degree: "Bachelor of Science \u2013 Economics",
          years: "2010 \u2013 2014",
          details: "University of Pennsylvania \u00b7 GPA: 3.72/4.0",
        },
      ],
      certifications: [
        "Chartered Financial Analyst (CFA)",
        "Financial Risk Manager (FRM)",
        "Bloomberg Market Concepts (BMC)",
        "Advanced Excel for Finance",
      ],
    },
  },
  {
    id: 7,
    name: "Minimalist Card",
    content: {
      name: "Olivia Bennett",
      title: "Cybersecurity Analyst & Penetration Tester",
      email: "olivia.bennett@example.com",
      phone: "+1 555-147-2580",
      website: "oliviabennett.security",
      summary:
        "Cybersecurity Analyst with 6+ years protecting enterprise systems from cyber threats. Expert in penetration testing, vulnerability assessment, incident response, and security architecture. Successfully identified and mitigated critical vulnerabilities for Fortune 500 companies. Passionate about ethical hacking and continuous security improvement.",
      skills: [
        "Penetration Testing",
        "Network Security",
        "SIEM / Splunk",
        "Vulnerability Assessment",
        "Incident Response",
        "Python / PowerShell",
        "Kali Linux / Metasploit",
        "Cloud Security",
        "Security Compliance",
        "Threat Intelligence",
      ],
      experience: [
        {
          role: "Senior Cybersecurity Analyst – SecureNet Solutions",
          years: "2021 – Present",
          bullets: `Lead security assessments for 30+ enterprise clients annually.
Identified and remediated 200+ critical vulnerabilities preventing data breaches.
Implemented security monitoring reducing incident response time by 55%.
Conducted penetration tests uncovering weaknesses in web apps and networks.
Developed security awareness training program for 500+ employees.`,
        },
        {
          role: "Security Analyst – CyberDefense Corp",
          years: "2019 – 2021",
          bullets: `Monitored security events using SIEM tools detecting 1000+ threats.
Performed vulnerability scans and risk assessments across infrastructure.
Responded to security incidents achieving 99.5% containment within SLA.
Created security documentation and incident playbooks.`,
        },
        {
          role: "Junior Security Analyst – InfoGuard Systems",
          years: "2018 – 2019",
          bullets: `Assisted in security audits and compliance assessments.
Analyzed security logs and investigated suspicious activities.
Supported implementation of security controls and policies.`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Science – Cybersecurity",
          years: "2014 – 2018",
          details: "Purdue University · GPA: 3.82/4.0",
        },
      ],
      certifications: [
        "Certified Ethical Hacker (CEH)",
        "Offensive Security Certified Professional (OSCP)",
        "CISSP – Certified Information Systems Security Professional",
        "CompTIA Security+ & CySA+",
      ],
    },
  },
  {
    id: 8,
    name: "Elegant Serif",
    content: {
      name: "Isabella Laurent",
      title: "Content Strategist & Copywriting Director",
      email: "isabella.laurent@example.com",
      phone: "+1 555-890-1234",
      website: "isabellalaurent.com",
      summary:
        "Award-winning Content Strategist with 10+ years crafting compelling narratives for global brands. Expert in content marketing, brand storytelling, SEO-driven writing, and editorial leadership. Proven ability to increase engagement, drive conversions, and build authentic brand voices across multiple channels.",
      skills: [
        "Content Strategy",
        "Copywriting",
        "SEO Optimization",
        "Brand Storytelling",
        "Editorial Leadership",
        "Content Marketing",
        "Social Media Writing",
        "WordPress / CMS",
        "Google Analytics",
        "Team Management",
        "Content Strategy",
        "Copywriting",
        "SEO Optimization",
        "Brand Storytelling",
        "Editorial Leadership",
        "Content Marketing",
        "Social Media Writing",
        "WordPress / CMS",
        "Google Analytics",
        "Team Management",
      ],
      experience: [
        {
          role: "Director of Content – BrandVoice Media",
          years: "2020 – Present",
          bullets: `Lead content team of 18 writers, editors, and strategists.
Developed content strategy increasing organic traffic by 425%.
Created award-winning campaigns featured in Forbes and AdWeek.
Managed content budget of $2.5M across multiple initiatives.
Established editorial guidelines adopted company-wide.`,
        },
        {
          role: "Senior Content Strategist – Creative Agency Co",
          years: "2017 – 2020",
          bullets: `Crafted content strategies for Fortune 500 clients.
Produced thought leadership content generating 10M+ impressions.
Improved conversion rates by 58% through strategic messaging.
Led workshops on content best practices for 100+ stakeholders.`,
        },
        {
          role: "Content Writer & SEO Specialist – Digital Marketing Hub",
          years: "2014 – 2017",
          bullets: `Wrote SEO-optimized content ranking on first page for 200+ keywords.
Managed editorial calendar for 3 company blogs.
Collaborated with designers and developers on content integration.`,
        },
      ],
      education: [
        {
          degree: "Master of Arts – Journalism & Media Studies",
          years: "2012 – 2014",
          details: "Northwestern University · GPA: 3.95/4.0",
        },
        {
          degree: "Bachelor of Arts – English Literature",
          years: "2008 – 2012",
          details: "Yale University · GPA: 3.85/4.0 · Summa Cum Laude",
        },
      ],
      certifications: [
        "HubSpot Content Marketing Certification",
        "Google Analytics Certified",
        "Content Marketing Institute Certification",
        "Copyblogger Certified Content Marketer",
        "Google Analytics Certified",
        "Content Marketing Institute Certification",
      ],
    },
  },
  {
    id: 9,
    name: "Tech Stack",
    content: {
      name: "Marcus Johnson",
      title: "Mobile Developer – iOS & Android Expert",
      email: "marcus.johnson@example.com",
      phone: "+1 555-567-8901",
      website: "marcusjohnson.app",
      summary:
        "Mobile Developer with 8+ years building high-performance iOS and Android applications. Expert in Swift, Kotlin, React Native, and Flutter. Successfully launched 30+ apps with millions of downloads. Passionate about clean architecture, user experience, and mobile-first design principles.",
      skills: [
        "Swift / SwiftUI",
        "Kotlin / Jetpack Compose",
        "React Native",
        "Flutter / Dart",
        "iOS / Android SDK",
        "Firebase / Cloud",
        "REST / GraphQL APIs",
        "App Store Optimization",
        "Mobile UI/UX",
        "Git / CI/CD",
      ],
      experience: [
        {
          role: "Lead Mobile Developer – AppLaunch Studios",
          years: "2020 – Present",
          bullets: `Lead development of flagship iOS/Android app with 2M+ downloads.
Reduced app crash rate from 3.2% to 0.4% through optimization.
Implemented offline-first architecture improving user experience.
Mentored team of 6 mobile developers on best practices.
Integrated payment systems processing $5M+ monthly transactions.`,
        },
        {
          role: "Senior iOS Developer – MobileTech Inc",
          years: "2018 – 2020",
          bullets: `Developed native iOS apps for healthcare and finance sectors.
Improved app performance reducing load times by 60%.
Implemented security features achieving HIPAA compliance.
Collaborated with designers on intuitive UI/UX implementations.`,
        },
        {
          role: "Mobile Developer – Startup Innovations",
          years: "2017 – 2018",
          bullets: `Built cross-platform apps using React Native.
Integrated third-party SDKs and APIs for enhanced functionality.
Published 10+ apps to App Store and Google Play.`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Science – Computer Science",
          years: "2013 – 2017",
          details: "Carnegie Mellon University · GPA: 3.8/4.0",
        },
      ],
      certifications: [
        "Apple Certified iOS Developer",
        "Google Associate Android Developer",
      ],
    },
  },
  {
    id: 10,
    name: "Corporate Modern",
    content: {
      name: "Sophia Williams",
      title: "HR Director & Talent Acquisition Leader",
      email: "sophia.williams@example.com",
      phone: "+1 555-234-5678",
      website: "sophiawilliams.hr",
      summary:
        "Strategic HR Director with 11+ years leading talent acquisition, employee engagement, and organizational development initiatives. Expert in building high-performing teams, scaling recruitment processes, and fostering inclusive workplace cultures. Proven track record of reducing turnover and improving employee satisfaction.",
      skills: [
        "Talent Acquisition",
        "HR Strategy",
        "Employee Relations",
        "Performance Management",
        "Compensation & Benefits",
        "Diversity & Inclusion",
        "HRIS / Workday",
        "Change Management",
        "Training & Development",
        "Labor Law Compliance",
      ],
      experience: [
        {
          role: "HR Director – TechGrowth Corporation",
          years: "2019 – Present",
          bullets: `Lead HR team of 12 supporting 800+ employees across 4 locations.
Reduced employee turnover by 38% through strategic retention programs.
Scaled hiring process from 50 to 200+ hires annually.
Implemented diversity initiatives increasing representation by 45%.
Launched learning & development program with 95% participation rate.`,
        },
        {
          role: "Senior Talent Acquisition Manager – InnovateCorp",
          years: "2016 – 2019",
          bullets: `Built recruiting team and processes for hypergrowth startup.
Hired 150+ employees across engineering, sales, and operations.
Reduced time-to-hire from 60 to 28 days through process optimization.
Established employer branding strategy increasing applicant quality.`,
        },
        {
          role: "HR Generalist – Professional Services Inc",
          years: "2014 – 2016",
          bullets: `Managed full-cycle recruitment for multiple departments.
Developed onboarding program improving new hire retention.
Administered employee benefits and handled employee relations.`,
        },
      ],
      education: [
        {
          degree: "Master of Science – Human Resources Management",
          years: "2012 – 2014",
          details: "Cornell University · GPA: 3.9/4.0",
        },
        {
          degree: "Bachelor of Business Administration",
          years: "2008 – 2012",
          details: "University of Michigan · GPA: 3.75/4.0",
        },
      ],
      certifications: [
        "SHRM Senior Certified Professional (SHRM-SCP)",
        "Professional in Human Resources (PHR)",
      ],
    },
  },
  {
    id: 11,
    name: "Fresher Clean",
    content: {
      name: "Ravi Kumar",
      title: "Junior Software Developer",
      email: "ravi.kumar@example.com",
      phone: "+91 98765 43210",
      website: "ravi.codes",
      summary:
        "Entry-level Software Developer with 1 year of internship experience focused on front-end development and building responsive web apps. Familiar with JavaScript, React, and basic backend integration.",
      skills: [
        "JavaScript",
        "React",
        "HTML / CSS",
        "Git",
        "REST APIs",
        "Basic Node.js",
      ],
      experience: [
        {
          role: "Frontend Intern – Startup Labs",
          years: "2023 – 2024",
          bullets: `Built responsive components in React used across marketing and dashboard pages.
Collaborated with designers to implement accessible UI patterns.
Wrote unit tests and improved load times by optimizing assets.`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Technology – Computer Science",
          years: "2020 – 2024",
          details: "University of Bengaluru · CGPA: 8.1/10",
        },
      ],
      certifications: [
        "Frontend Web Development (Coursera)",
        "JavaScript Fundamentals",
      ],
    },
  },
  {
    id: 12,
    name: "Campus Grad Minimal",
    content: {
      name: "Priya Singh",
      title: "Graduate — Data Analyst",
      email: "priya.singh@example.com",
      phone: "+91 91234 56789",
      website: "priyasingh.dev",
      summary:
        "Recent graduate with strong analytical skills and hands-on projects in data cleaning, visualization, and basic machine learning (0-2 years). Comfortable with Python, SQL and visualization libraries.",
      skills: [
        "Python",
        "Pandas / NumPy",
        "SQL",
        "Tableau / Power BI",
        "Data Visualization",
      ],
      experience: [
        {
          role: "Data Science Intern – AnalyticsHub",
          years: "2024",
          bullets: `Cleaned and merged multiple datasets to produce weekly business reports.
Created visual dashboards in Tableau used by the sales team to track KPIs.
Performed exploratory data analysis to identify churn signals.`,
        },
        {
          role: "Academic Project – Campus Placements",
          years: "2023",
          bullets: `Built a predictive model to classify student placement outcomes (accuracy 78%).
Presented findings to faculty and incorporated feedback into final report.`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Science – Statistics",
          years: "2020 – 2024",
          details: "Delhi University · Percentage: 72%",
        },
      ],
      certifications: [
        "Data Analysis with Python (IBM)",
        "SQL for Data Science",
      ],
    },
  },
  {
    id: 13,
    name: "Fresher Pop",
    content: {
      name: "Aman Verma",
      title: "Junior UX/UI Designer",
      email: "aman.verma@example.com",
      phone: "+91 98700 11223",
      website: "aman.design",
      summary:
        "Recent graduate and UX enthusiast with internship experience focused on user research, prototyping, and accessible interfaces (1 year). Skilled in Figma, basic HTML/CSS and collaborating with cross-functional teams.",
      skills: [
        "Figma",
        "User Research",
        "Prototyping",
        "HTML / CSS",
        "Accessibility",
      ],
      experience: [
        {
          role: "UX Intern – BrightStudio",
          years: "2024",
          bullets: `Conducted user interviews and usability tests for mobile app flows.
  Designed high-fidelity prototypes and handed off assets to developers.
  Improved onboarding completion by simplifying task steps.`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Design – Interaction Design",
          years: "2020 – 2024",
          details: "National Institute of Design · CGPA: 7.8/10",
        },
      ],
      certifications: ["UX Design Fundamentals", "Accessibility Basics"],
    },
  },
  {
    id: 14,
    name: "Fresher Neo",
    content: {
      name: "Neha Rao",
      title: "Junior Frontend Developer",
      email: "neha.rao@example.com",
      phone: "+91 99876 54321",
      website: "nehar.dev",
      summary:
        "Energetic recent graduate with 1 year of internship experience and strong foundations in modern frontend frameworks. Passionate about crafting accessible, responsive user interfaces and eager to grow as a frontend engineer.",
      skills: [
        "JavaScript",
        "React",
        "HTML / CSS",
        "Responsive Design",
        "TypeScript (basic)",
        "Accessibility",
      ],
      experience: [
        {
          role: "Frontend Intern – PixelForge",
          years: "2024",
          bullets: `Implemented responsive landing pages using React and CSS modules.
Improved accessibility of forms and navigation; reduced keyboard-trap issues.
Built reusable UI components and documented storybook stories for each.`,
        },
        {
          role: "Academic Project – Campus App",
          years: "2023",
          bullets: `Built a campus events web app using React and Firebase.
Integrated authentication and realtime updates for event registrations.`,
        },
      ],
      education: [
        {
          degree: "Bachelor of Technology – Computer Science",
          years: "2020 – 2024",
          details: "IIIT Hyderabad · CGPA: 8.3/10",
        },
      ],
      certifications: [
        "Frontend Web Development (Coursera)",
        "Accessibility Basics",
      ],
    },
  },
];

export default dummyTemplates;
