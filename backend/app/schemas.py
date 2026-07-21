from datetime import date, datetime
from typing import Literal
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator


PHONE_LENGTHS = {
    "+256": (9, 9), "+254": (9, 9), "+255": (9, 9), "+250": (9, 9),
    "+257": (8, 8), "+211": (9, 9), "+243": (9, 9), "+251": (9, 9),
    "+252": (8, 9), "+260": (9, 9), "+263": (9, 9), "+265": (9, 9),
    "+234": (10, 10), "+233": (9, 9), "+27": (9, 9), "+44": (10, 10),
    "+1": (10, 10),
}


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
    full_name: str = Field(min_length=2, max_length=150)
    email: EmailStr
    phone: str = Field(pattern=r"^\+[1-9]\d{7,14}$")
    education_level: Literal["Certificate", "Diploma", "Undergraduate", "Postgraduate"]
    course_id: int
    motivation: str = Field(default="", max_length=1000)

    @field_validator("phone")
    @classmethod
    def validate_phone_length(cls, phone: str) -> str:
        country_code = next(
            (code for code in sorted(PHONE_LENGTHS, key=len, reverse=True) if phone.startswith(code)),
            None,
        )
        if country_code is None:
            raise ValueError("Select a supported phone country code.")

        minimum, maximum = PHONE_LENGTHS[country_code]
        national_number = phone[len(country_code):]
        if not minimum <= len(national_number) <= maximum:
            expected = str(minimum) if minimum == maximum else f"{minimum} to {maximum}"
            raise ValueError(f"Phone number for {country_code} must contain {expected} digits.")
        return phone


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
