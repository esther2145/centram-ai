from datetime import date, datetime
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str | None = None
    password: str = Field(min_length=6)


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    full_name: str
    email: EmailStr
    phone: str | None
    role: str
    is_active: bool


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class CourseBase(BaseModel):
    title: str
    slug: str
    description: str
    duration: str
    level: str
    instructor: str
    price: float = 0
    delivery_mode: str
    start_date: date | None = None
    image_url: str | None = None
    featured: bool = False
    is_active: bool = True


class CourseCreate(CourseBase):
    pass


class CourseOut(CourseBase):
    model_config = ConfigDict(from_attributes=True)
    id: int


class EventCreate(BaseModel):
    title: str
    description: str
    event_date: date
    location: str
    event_type: str = "Workshop"
    registration_link: str | None = None


class EventOut(EventCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int


class ApplicationCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    education_level: str
    course_id: int
    motivation: str = Field(min_length=20)


class ApplicationOut(ApplicationCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    status: str
    created_at: datetime


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str = Field(min_length=10)


class ContactOut(ContactCreate):
    model_config = ConfigDict(from_attributes=True)
    id: int
    created_at: datetime
