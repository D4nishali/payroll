from pydantic import BaseModel
from datetime import time, date

class AttendanceCreate(BaseModel):
    time_in: time

class AttendanceOut(BaseModel):
    id: int
    date: date
    time_in: time

    class Config:
        from_attributes = True
