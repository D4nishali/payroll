# backend/models/user.py
from sqlalchemy import Column, Integer, String, Enum
from database import Base
import enum
from sqlalchemy.orm import relationship


class RoleEnum(str, enum.Enum):
    admin = "admin"
    manager = "manager"
    employee = "employee"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    username = Column(String, unique=True, nullable=False)
    phone = Column(String, unique=True, nullable=True)
    employee_id = Column(String, unique=True, nullable=True)
    role = Column(Enum(RoleEnum), default="employee")
    hashed_password = Column(String, nullable=False)
    payrolls = relationship("Payroll", back_populates="employee")

