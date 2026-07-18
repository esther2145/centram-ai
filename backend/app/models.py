from sqlalchemy import Boolean, Column, Date, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), unique=True, index=True, nullable=False)
    phone = Column(String(30), nullable=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(30), default="student")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(180), nullable=False)
    slug = Column(String(180), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=False)
    duration = Column(String(80), nullable=False)
    level = Column(String(40), nullable=False)
    instructor = Column(String(120), nullable=False)
    price = Column(Float, default=0)
    delivery_mode = Column(String(40), nullable=False)
    start_date = Column(Date, nullable=True)
    image_url = Column(String(500), nullable=True)
    featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

class CourseModule(Base):
    __tablename__ = "course_modules"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    title = Column(String, nullable=False)
    objective = Column(Text)
    position = Column(Integer)

class ModuleTopic(Base):
    __tablename__ = "module_topics"

    id = Column(Integer, primary_key=True, index=True)
    module_id = Column(Integer, ForeignKey("course_modules.id"))
    title = Column(String, nullable=False)
    description = Column(Text)
    position = Column(Integer)

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(180), nullable=False)
    description = Column(Text, nullable=False)
    event_date = Column(Date, nullable=False)
    location = Column(String(180), nullable=False)
    event_type = Column(String(80), default="Workshop")
    registration_link = Column(String(500), nullable=True)


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False)
    phone = Column(String(30), nullable=False)
    education_level = Column(String(100), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=False)
    motivation = Column(Text, nullable=False)
    status = Column(String(30), default="Submitted")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    course = relationship("Course")


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(150), nullable=False)
    subject = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
