from datetime import date, timedelta
from sqlalchemy.orm import Session
from . import models


def seed_data(db: Session):
    if db.query(models.Course).count() == 0:
        courses = [
            models.Course(
                title="Artificial Intelligence Foundations",
                slug="ai-foundations",
                description="Learn the principles of AI, machine learning, responsible AI and practical problem solving.",
                duration="8 weeks",
                level="Beginner",
                instructor="Dr. Miriam Achieng",
                price=450000,
                delivery_mode="Hybrid",
                start_date=date.today() + timedelta(days=21),
                image_url="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
                featured=True,
            ),
            models.Course(
                title="Machine Learning with Python",
                slug="machine-learning-python",
                description="Build, evaluate and deploy machine learning models using Python and scikit-learn.",
                duration="10 weeks",
                level="Intermediate",
                instructor="Esther Kica",
                price=650000,
                delivery_mode="Online",
                start_date=date.today() + timedelta(days=35),
                image_url="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1200&q=80",
                featured=True,
            ),
            models.Course(
                title="Generative AI and LLM Applications",
                slug="generative-ai-llm-applications",
                description="Create practical applications with large language models, RAG, agents and responsible deployment.",
                duration="6 weeks",
                level="Advanced",
                instructor="Samuel Mugisha",
                price=800000,
                delivery_mode="Physical",
                start_date=date.today() + timedelta(days=48),
                image_url="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
                featured=True,
            ),
        ]
        db.add_all(courses)

    if db.query(models.Event).count() == 0:
        events = [
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
        db.add_all(events)

    db.commit()
