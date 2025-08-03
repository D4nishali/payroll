from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Payroll(Base):
    __tablename__ = "payrolls"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("users.id"))
    month = Column(String)
    year = Column(Integer)
    base_salary = Column(Float)
    days_present = Column(Integer)
    leaves_taken = Column(Integer)
    loan_deduction = Column(Float)
    net_salary = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    employee = relationship("User", back_populates="payrolls")
