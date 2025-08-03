from pydantic import BaseModel
from datetime import date
from enum import Enum

class LeaveCreate(BaseModel):
    start_date: date
    end_date: date
    reason: str

class LeaveOut(LeaveCreate):
    id: int
    status: str

    class Config:
        from_attributes = True
