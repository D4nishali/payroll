from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from utils.auth import get_current_user
from models.leave import Leave
from models.loan import Loan
from models.attendance import Attendance
from schemas.leave import LeaveCreate, LeaveOut
from schemas.loan import LoanCreate, LoanOut
from schemas.attendance import AttendanceCreate, AttendanceOut
from schemas.user import UserOut
from models.user import User

router = APIRouter(prefix="/employee", tags=["Employee"])

@router.get("/me", response_model=UserOut)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.post("/apply-leave", response_model=LeaveOut)
def apply_leave(data: LeaveCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    leave = Leave(**data.dict(), employee_id=user.id)
    db.add(leave)
    db.commit()
    db.refresh(leave)
    return leave

@router.post("/apply-loan", response_model=LoanOut)
def apply_loan(data: LoanCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    loan = Loan(**data.dict(), employee_id=user.id)
    db.add(loan)
    db.commit()
    db.refresh(loan)
    return loan

@router.post("/mark-attendance", response_model=AttendanceOut)
def mark_attendance(data: AttendanceCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    today = db.query(Attendance).filter_by(employee_id=user.id).first()
    if today:
        raise HTTPException(status_code=400, detail="Already marked attendance today")
    attendance = Attendance(employee_id=user.id, time_in=data.time_in)
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance
