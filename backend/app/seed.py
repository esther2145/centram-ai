from datetime import date, timedelta

from sqlalchemy.orm import Session

from . import models


COURSES = [
    {
        "title": "Application of AI in Human Resource & Administration",
        "slug": "ai-human-resource-administration",
        "description": "Use generative AI, machine learning, and predictive analytics to improve talent management, administration, and workforce decisions.",
        "duration": "6 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Hybrid",
        "image_url": "https://plus.unsplash.com/premium_photo-1689700527592-3c3aadca400c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWZyaWNhbnMlMjBvbiUyMGxhcHRvcHN8ZW58MHx8MHx8fDA%3D",
        "featured": True,
        "modules": [
            ("Foundations of AI in HR & Administration", "Understand the technologies reshaping workplace management and master practical prompt engineering.", ["Evolution of HR technology", "Machine learning, NLP, and large language models", "Prompt engineering for HR professionals", "Levels of AI application in HR", "HR technology-stack audit"]),
            ("AI-Powered Talent Acquisition & Onboarding", "Automate sourcing, screening, interviewing, and personalized onboarding.", ["Intelligent job architectures", "Candidate sourcing and high-volume screening", "Automated interview frameworks", "Personalized digital onboarding", "Resume-screening lab"]),
            ("Learning, Development & Performance Management", "Design adaptive learning paths and continuous AI-assisted evaluation loops.", ["Adaptive learning paths", "Synthetic training-content creation", "Real-time performance analysis", "Goal-driven evaluation loops", "Employee upskilling-plan lab"]),
            ("Employee Engagement, Retention & People Analytics", "Use workforce analytics to strengthen culture, retention, and planning.", ["Sentiment and pulse analytics", "Predictive retention modeling", "Well-being and internal mobility", "Workforce planning optimization", "Turnover-risk analysis lab"]),
            ("Office Administration, Payroll & Workflow Automation", "Eliminate repetitive administrative work through intelligent workflows.", ["Internal knowledge chatbots", "AI-powered document routing", "Payroll and benefits validation", "Meeting and scheduling workflows", "Employee-support assistant lab"]),
            ("Ethics, Bias Mitigation & Governance", "Deploy workplace AI with privacy, fairness, transparency, and human oversight.", ["Algorithmic bias mitigation", "Data privacy and compliance", "Corporate AI policy", "Human-in-the-loop governance", "AI adoption roadmap capstone"]),
        ],
    },
    {
        "title": "Application of AI in Finance & Accounting",
        "slug": "ai-finance-accounting",
        "description": "Move from manual financial processing to automated insights, predictive forecasting, intelligent auditing, and strategic decision-making.",
        "duration": "6 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Hybrid",
        "image_url": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
        "featured": True,
        "modules": [
            ("The AI Revolution in Finance & Accounting", "Understand financial AI technologies, safe data handling, and finance-focused prompting.", ["The AI-native financial technology stack", "ML, NLP, and predictive analytics", "Generative AI for finance", "Financial data security and privacy", "Workflow automation audit"]),
            ("Financial Accounting & Accounts Operations", "Automate transaction processing, invoice matching, reconciliation, and bookkeeping.", ["Intelligent document processing", "Automated payables and receivables", "Smart bank reconciliation", "Continuous close", "Invoice-to-journal workflow lab"]),
            ("Advanced Financial Planning & Analysis", "Replace static spreadsheets with dynamic predictive financial models.", ["Revenue and cash-flow forecasting", "Scenario planning and Monte Carlo simulation", "Automated variance analysis", "Executive dashboards", "Demand-forecasting lab"]),
            ("Intelligent Auditing, Tax Compliance & Fraud Detection", "Use full-population auditing and anomaly detection to strengthen controls.", ["Full-population auditing", "Anomalous behavior detection", "AI-driven tax optimization", "AML and KYC automation", "General-ledger anomaly lab"]),
            ("Strategic Investment & Corporate Finance", "Apply AI to capital allocation, treasury, valuation, and due diligence.", ["Automated M&A due diligence", "Algorithmic treasury management", "Alternative data in valuation", "Capital-budget optimization", "Competitor valuation lab"]),
            ("Governance, Ethics & AI Strategy", "Build a defensible and compliant institutional finance-AI roadmap.", ["Explainable AI in finance", "Regulatory compliance", "The hybrid finance team", "Human validation checkpoints", "Finance implementation capstone"]),
        ],
    },
    {
        "title": "Application of AI for Economic Planning and Modeling",
        "slug": "ai-economic-planning-modeling",
        "description": "Apply machine learning, NLP, and computational modeling to economic forecasting, policy evaluation, and market analysis.",
        "duration": "4 weeks",
        "level": "Advanced",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive boot camp",
        "image_url": "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=1200&q=80",
        "featured": True,
        "modules": [
            ("Predictive Modeling & Macroeconomic Forecasting", "Move from traditional econometrics to modern machine-learning time-series pipelines.", ["Economic data engineering", "Regularized and ensemble models", "LSTM forecasting", "Economic nowcasting", "GDP forecasting lab"]),
            ("Causal Inference, Policy Evaluation & Micro-Markets", "Separate correlation from causation when evaluating policy and market interventions.", ["Double machine learning", "Synthetic controls", "Demand estimation", "Credit-risk and labor-market modeling", "Subsidy evaluation lab"]),
            ("Unstructured Data, NLP & System Simulation", "Extract economic signals from text and simulate multi-agent economic systems.", ["Economic text mining", "FinBERT sentiment analysis", "Topic modeling", "Agent-based modeling", "Market-sentiment lab"]),
            ("Strategic Public Policy, Risk & Explainable AI", "Design transparent, fair, and future-ready economic policy models.", ["Geospatial AI for poverty assessment", "Algorithmic tax and resource policy", "Climate-economic planning", "SHAP and LIME", "Credit-model explainability lab"]),
        ],
    },
    {
        "title": "Application of AI in Procurement & Logistics Management",
        "slug": "ai-procurement-logistics",
        "description": "Automate procurement, optimize inventory, forecast demand, and build resilient logistics networks with AI.",
        "duration": "3 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
        "featured": True,
        "modules": [
            ("Intelligent Procurement & Automated Sourcing", "Move procurement cycles toward automated, data-driven sourcing and supplier management.", ["Spend analytics", "Automated contract analysis", "Supplier risk scoring", "AI-assisted RFPs and negotiation", "Contract-analysis lab"]),
            ("Predictive Demand Planning & Inventory Optimization", "Reduce carrying costs and stockouts using multivariable forecasting.", ["Advanced demand forecasting", "Dynamic safety stock", "Computer vision in warehouses", "Bullwhip-effect mitigation", "Product-demand lab"]),
            ("Autonomous Logistics & Network Optimization", "Improve routing, asset reliability, freight forecasting, and supply-chain visibility.", ["Dynamic route optimization", "Predictive maintenance", "Freight and congestion analytics", "Explainable supply-chain AI", "Fleet-routing lab"]),
        ],
    },
    {
        "title": "Application of AI in Library & Information Management",
        "slug": "ai-library-information-management",
        "description": "Use NLP, computer vision, and language models to automate cataloguing, preserve archives, and improve discovery services.",
        "duration": "3 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Intelligent Cataloguing, Metadata & Knowledge Graphs", "Automate indexing and build richer semantic information structures.", ["Automated classification", "Metadata enrichment with NER", "Semantic web and knowledge graphs", "Human-in-the-loop quality control", "Cataloguing lab"]),
            ("Digital Preservation, OCR & Computer Vision", "Use visual AI to digitize, restore, classify, and preserve information assets.", ["OCR enhancement", "Document-layout understanding", "Image and object classification", "Digital preservation workflows", "Archive digitization lab"]),
            ("Conversational Discovery, Ethics & Governance", "Build responsible conversational discovery services grounded in trusted collections.", ["Semantic and vector search", "Retrieval-augmented generation", "Conversational library assistants", "Copyright, privacy, and bias", "Discovery-assistant capstone"]),
        ],
    },
    {
        "title": "AI Applications in Radio Frequency Spectrum Management",
        "slug": "ai-rf-spectrum-management",
        "description": "Apply AI to spectrum sensing, dynamic allocation, interference prediction, security, and regulatory decision-making.",
        "duration": "3 weeks",
        "level": "Advanced",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Signal Classification & Intelligent Spectrum Sensing", "Apply machine learning to identify signals and occupancy patterns.", ["RF data preparation", "Signal classification", "Deep learning for spectrum sensing", "Cognitive radio", "Spectrum-sensing lab"]),
            ("Dynamic Allocation, Optimization & Prediction", "Use predictive and reinforcement-learning methods for efficient allocation.", ["Spectrum-demand forecasting", "Dynamic spectrum access", "Reinforcement learning", "Interference optimization", "Allocation lab"]),
            ("Anomaly Detection, Security & Algorithmic Policy", "Detect harmful activity and govern automated spectrum decisions.", ["Interference anomaly detection", "Jamming and spoofing defense", "Transmitter identification", "Explainable regulatory AI", "Policy capstone"]),
        ],
    },
    {
        "title": "AI in Consumer Protection & Communication Quality of Service",
        "slug": "ai-consumer-protection-qos",
        "description": "Use AI to combat communication fraud, audit service quality, protect consumers, and support inclusive regulation.",
        "duration": "3 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Anti-Scam, Smishing & Voice-Clone Defense", "Detect evolving communication scams and synthetic-media threats.", ["Scam-message classification", "Smishing and malicious URLs", "Voice-clone and robocall detection", "Threat intelligence", "Fraud-defense lab"]),
            ("AI-Driven Quality of Service & Experience Auditing", "Measure network performance and customer experience using intelligent analytics.", ["QoS anomaly detection", "Customer-experience modeling", "Coverage and outage prediction", "Complaint analytics", "Service-quality dashboard lab"]),
            ("Ethical AI Policy, Bias & Digital Inclusion", "Create fair, transparent, and inclusive consumer-protection systems.", ["Algorithmic fairness", "Privacy and consent", "Explainable enforcement", "Inclusive service monitoring", "Regulatory policy capstone"]),
        ],
    },
    {
        "title": "AI Applications in Content & Broadcasting Regulation",
        "slug": "ai-content-broadcasting-regulation",
        "description": "Apply multimodal AI to content compliance, misinformation, copyright enforcement, and recommendation-system oversight.",
        "duration": "3 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Automated Audio-Visual Compliance & Content Auditing", "Automate monitoring across broadcast audio, video, and text.", ["Speech and image recognition", "Content classification", "Political balance and airtime auditing", "Multilingual monitoring", "Compliance-monitoring lab"]),
            ("Deepfakes, Misinformation & Copyright Enforcement", "Identify synthetic media, coordinated misinformation, and rights violations.", ["Deepfake detection", "Misinformation network analysis", "Content fingerprinting", "Copyright matching", "Verification lab"]),
            ("Recommendation Algorithms & Policy Frameworks", "Audit platform algorithms and develop transparent regulatory approaches.", ["Recommendation-system auditing", "Filter bubbles and amplification", "Child and vulnerable-user protection", "Explainable regulatory AI", "Governance capstone"]),
        ],
    },
    {
        "title": "AI Applications in Universal Service & Digital Inclusion",
        "slug": "ai-universal-service-digital-inclusion",
        "description": "Use geospatial and predictive AI to identify access gaps, improve accessibility, and evaluate digital-inclusion programs.",
        "duration": "3 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Infrastructure Gaps & Predictive Demand Modeling", "Map underserved communities and predict infrastructure demand.", ["Geospatial access mapping", "Coverage-gap detection", "Demand forecasting", "Infrastructure prioritization", "Connectivity-map lab"]),
            ("Digital Accessibility, Literacy & Localized Content", "Design intelligent services for diverse languages, abilities, and skill levels.", ["Assistive AI", "Local-language NLP", "Adaptive digital literacy", "Inclusive content generation", "Accessibility lab"]),
            ("Inclusivity Auditing, Impact Evaluation & Policy", "Measure outcomes and govern inclusive digital investment.", ["Program impact evaluation", "Algorithmic inclusion metrics", "Bias and data gaps", "Explainable funding decisions", "Universal-service capstone"]),
        ],
    },
    {
        "title": "AI Applications in Modern Financial Auditing",
        "slug": "ai-modern-financial-auditing",
        "description": "Move from sample-based audits to continuous full-population testing, intelligent document review, and predictive risk assessment.",
        "duration": "3 weeks",
        "level": "Advanced",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Automated Anomalies, Fraud & Ledger Auditing", "Apply machine learning to full-population transaction testing.", ["Ledger data engineering", "Fraud and anomaly detection", "Benford and behavioral analytics", "Continuous auditing", "Transaction-audit lab"]),
            ("Document AI & Intelligent Evidence Review", "Extract and validate evidence from invoices, contracts, revenue records, and physical assets.", ["Invoice OCR and information extraction", "LLM contract review", "Revenue-recognition auditing", "Computer vision for inventory", "Document-to-ledger project"]),
            ("Predictive Auditing, Risk & Explainable AI", "Build forward-looking risk models with evidence-grade transparency.", ["Revenue and expense forecasting", "Going-concern prediction", "Auditing client AI systems", "SHAP and LIME reporting", "Audit-module capstone"]),
        ],
    },
    {
        "title": "AI Applications in Strategic Public Relations Management",
        "slug": "ai-strategic-public-relations",
        "description": "Use AI for audience intelligence, reputation monitoring, narrative design, crisis simulation, and campaign measurement.",
        "duration": "3 weeks",
        "level": "Professional",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Sentiment, Media Auditing & Audience Intelligence", "Move from manual monitoring to real-time stakeholder intelligence.", ["Aspect-based sentiment analysis", "Audience clustering", "Media monitoring and NER", "Multi-channel data fusion", "PR dashboard lab"]),
            ("Generative Narratives, Deepfakes & Crisis Simulation", "Create content safely and defend brands against synthetic-media threats.", ["Brand-grounded content generation", "Deepfake defense", "Misinformation networks", "Multi-agent crisis simulation", "Brand-threat project"]),
            ("Conversational Agents, Impact Modeling & Governance", "Deploy reliable public-facing agents and measure campaign outcomes transparently.", ["Crisis FAQ agents", "Campaign reach forecasting", "Disclosure-compliance checking", "Explainable communication metrics", "PR capstone"]),
        ],
    },
    {
        "title": "AI Applications in Modern Inventory Management",
        "slug": "ai-modern-inventory-management",
        "description": "Apply forecasting, reinforcement learning, and computer vision to replenishment, warehouse operations, and inventory control.",
        "duration": "3 weeks",
        "level": "Advanced",
        "instructor": "Centram AI Faculty",
        "price": 0,
        "delivery_mode": "Intensive",
        "image_url": "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1200&q=80",
        "featured": False,
        "modules": [
            ("Predictive Demand Forecasting & Data Engineering", "Build multivariable forecasting pipelines for volatile inventory demand.", ["Inventory data engineering", "Feature engineering", "Gradient-boosting forecasts", "LSTM and transformer forecasting", "Hierarchical demand reconciliation"]),
            ("Safety Stock, Replenishment & Reinforcement Learning", "Automate ordering and optimize stock across multi-echelon networks.", ["Dynamic safety stock", "Reinforcement-learning replenishment", "Multi-agent supply chains", "ABC-XYZ clustering", "Predictive ordering project"]),
            ("Computer Vision, Anomaly Tracking & Governance", "Automate stock counting, shrinkage detection, maintenance, and explainable planning.", ["Visual stock counting", "Shrinkage and phantom-stock detection", "Predictive warehouse maintenance", "Explainable S&OP", "Inventory capstone"]),
        ],
    },
]


def _replace_course_catalog(db: Session):
    expected_slugs = {course["slug"] for course in COURSES}
    current_slugs = {slug for (slug,) in db.query(models.Course.slug).all()}

    if current_slugs == expected_slugs and db.query(models.CourseModule).count() > 0:
        return

    # Applications reference courses, while topics reference modules.
    db.query(models.Application).delete(synchronize_session=False)
    db.query(models.ModuleTopic).delete(synchronize_session=False)
    db.query(models.CourseModule).delete(synchronize_session=False)
    db.query(models.Course).delete(synchronize_session=False)
    db.flush()

    for course_number, course_data in enumerate(COURSES, start=1):
        modules = course_data["modules"]
        course = models.Course(
            **{key: value for key, value in course_data.items() if key != "modules"},
            start_date=date.today() + timedelta(days=14 * course_number),
        )
        db.add(course)
        db.flush()

        for module_position, (title, objective, topics) in enumerate(modules, start=1):
            module = models.CourseModule(
                course_id=course.id,
                title=title,
                objective=objective,
                position=module_position,
            )
            db.add(module)
            db.flush()

            db.add_all(
                models.ModuleTopic(
                    module_id=module.id,
                    title=topic,
                    position=topic_position,
                )
                for topic_position, topic in enumerate(topics, start=1)
            )


def seed_data(db: Session):
    _replace_course_catalog(db)

    if db.query(models.Event).count() == 0:
        db.add_all(
            [
                models.Event(
                    title="AI Career Discovery Day",
                    description="Meet trainers and industry practitioners and explore careers in AI and data science.",
                    event_date=date.today() + timedelta(days=14),
                    location="Centram AI Campus, Kampala",
                    event_type="Open Day",
                ),
                models.Event(
                    title="Responsible AI Webinar",
                    description="A practical conversation on privacy, fairness and safe AI adoption.",
                    event_date=date.today() + timedelta(days=28),
                    location="Online",
                    event_type="Webinar",
                ),
            ]
        )

    db.commit()
