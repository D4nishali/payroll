from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from utils.auth import get_current_user
from models.user import User
from models.attendance import Attendance
from models.leave import Leave, LeaveStatus
from models.loan import Loan, LoanStatus
from schemas.user import UserOut
from schemas.attendance import AttendanceOut
from schemas.leave import LeaveOut
from schemas.loan import LoanOut

router = APIRouter(prefix="/manager", tags=["Manager"])

def is_manager(user: User):
    if user.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can access this")
    return True

@router.get("/employees", response_model=list[UserOut])
def list_employees(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    is_manager(current_user)
    return db.query(User).filter(User.role == "employee").all()

@router.get("/attendance/{employee_id}", response_model=list[AttendanceOut])
def view_attendance(employee_id: int, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    is_manager(current_user)
    return db.query(Attendance).filter(Attendance.employee_id == employee_id).all()

@router.get("/leave-requests", response_model=list[LeaveOut])
def get_pending_leaves(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    is_manager(current_user)
    return db.query(Leave).filter(Leave.status == LeaveStatus.pending).all()

@router.patch("/approve-leave/{leave_id}", response_model=LeaveOut)
def approve_leave(leave_id: int, decision: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    is_manager(current_user)
    leave = db.query(Leave).get(leave_id)
    if not leave:
        raise HTTPException(status_code=404, detail="Leave not found")
    if decision not in ["approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid decision")
    leave.status = decision
    db.commit()
    db.refresh(leave)
    return leave

@router.get("/loan-requests", response_model=list[LoanOut])
def get_pending_loans(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    is_manager(current_user)
    return db.query(Loan).filter(Loan.status == LoanStatus.pending).all()

@router.patch("/approve-loan/{loan_id}", response_model=LoanOut)
def approve_loan(loan_id: int, decision: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    is_manager(current_user)
    loan = db.query(Loan).get(loan_id)
    if not loan:
        raise HTTPException(status_code=404, detail="Loan not found")
    if decision not in ["approved", "rejected"]:
        raise HTTPException(status_code=400, detail="Invalid decision")
    loan.status = decision
    db.commit()
    db.refresh(loan)
    return loan
