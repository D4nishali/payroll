# backend/schemas/user.py
from pydantic import BaseModel
from enum import Enum

class Role(str, Enum):
    admin = "admin"
    manager = "manager"
    employee = "employee"

class UserCreate(BaseModel):
    name: str
    username: str
    phone: str
    employee_id: str
    password: str
    role: Role

class UserLogin(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    username: str
    phone: str
    employee_id: str
    role: Role

    class Config:
        from_attributes = True
