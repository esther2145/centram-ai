from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas
from .database import Base, SessionLocal, engine, get_db
from .security import hash_password, verify_password
from .seed import seed_data

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Centram AI API",
    version="1.0.0",
    description="Backend API for the Centram AI training institution website.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    try:
        seed_data(db)
    finally:
        db.close()


@app.get("/")
def root():
    return {"message": "Centram AI API is running", "docs": "/docs"}


@app.post("/api/auth/register", response_model=schemas.UserOut, status_code=201)
def register(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing:
        raise HTTPException(status_code=409, detail="An account with this email already exists.")

    user = models.User(
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        hashed_password=hash_password(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.post("/api/auth/login")
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password.")
    return {
        "message": "Login successful",
        "user": {"id": user.id, "full_name": user.full_name, "email": user.email, "role": user.role},
    }


@app.get("/api/courses", response_model=list[schemas.CourseOut])
def list_courses(
    level: str | None = None,
    delivery_mode: str | None = None,
    search: str | None = Query(default=None, max_length=100),
    db: Session = Depends(get_db),
):
    query = db.query(models.Course).filter(models.Course.is_active.is_(True))
    if level:
        query = query.filter(models.Course.level == level)
    if delivery_mode:
        query = query.filter(models.Course.delivery_mode == delivery_mode)
    if search:
        query = query.filter(models.Course.title.ilike(f"%{search}%"))
    return query.order_by(models.Course.start_date).all()


@app.get("/api/courses/{course_id}", response_model=schemas.CourseOut)
def get_course(course_id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found.")
    return course


@app.post("/api/courses", response_model=schemas.CourseOut, status_code=201)
def create_course(payload: schemas.CourseCreate, db: Session = Depends(get_db)):
    if db.query(models.Course).filter(models.Course.slug == payload.slug).first():
        raise HTTPException(status_code=409, detail="Course slug already exists.")
    course = models.Course(**payload.model_dump())
    db.add(course)
    db.commit()
    db.refresh(course)
    return course


@app.get("/api/events", response_model=list[schemas.EventOut])
def list_events(db: Session = Depends(get_db)):
    return db.query(models.Event).order_by(models.Event.event_date).all()


@app.post("/api/events", response_model=schemas.EventOut, status_code=201)
def create_event(payload: schemas.EventCreate, db: Session = Depends(get_db)):
    event = models.Event(**payload.model_dump())
    db.add(event)
    db.commit()
    db.refresh(event)
    return event


@app.post("/api/applications", response_model=schemas.ApplicationOut, status_code=201)
def submit_application(payload: schemas.ApplicationCreate, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.id == payload.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Selected course does not exist.")
    application = models.Application(**payload.model_dump())
    db.add(application)
    db.commit()
    db.refresh(application)
    return application


@app.get("/api/applications", response_model=list[schemas.ApplicationOut])
def list_applications(db: Session = Depends(get_db)):
    return db.query(models.Application).order_by(models.Application.created_at.desc()).all()


@app.post("/api/contact", response_model=schemas.ContactOut, status_code=201)
def submit_contact(payload: schemas.ContactCreate, db: Session = Depends(get_db)):
    contact = models.ContactMessage(**payload.model_dump())
    db.add(contact)
    db.commit()
    db.refresh(contact)
    return contact

@app.get("/api/courses/{course_id}/details")
def get_course_details(
    course_id: int,
    db: Session = Depends(get_db)
):
    course = (
        db.query(models.Course)
        .filter(models.Course.id == course_id)
        .first()
    )

    if not course:
        raise HTTPException(
            status_code=404,
            detail="Course not found"
        )

    modules = (
        db.query(models.CourseModule)
        .filter(models.CourseModule.course_id == course_id)
        .order_by(models.CourseModule.position)
        .all()
    )

    result_modules = []

    for module in modules:
        topics = (
            db.query(models.ModuleTopic)
            .filter(models.ModuleTopic.module_id == module.id)
            .order_by(models.ModuleTopic.position)
            .all()
        )

        result_modules.append({
            "id": module.id,
            "title": module.title,
            "objective": module.objective,
            "topics": topics
        })

    return {
        "course": course,
        "modules": result_modules
    }
