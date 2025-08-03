# routers/admin.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models.user import User, RoleEnum
from schemas.user import UserCreate, UserOut
from utils.auth import get_db, hash_password, get_current_user, require_admin
from services.payroll import calculate_payroll
from utils.payslip import generate_payslip
from fastapi.responses import FileResponse
from database import get_db

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.post("/add-user", response_model=UserOut)
def create_user(user: UserCreate, db: Session = Depends(get_db), _: User = Depends(require_admin)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already exists")
    
    hashed_pw = hash_password(user.password)
    new_user = User(
        name=user.name,
        username=user.username,
        phone=user.phone,
        employee_id=user.employee_id,
        role=user.role,
        hashed_password=hashed_pw
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.delete("/delete-user/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(require_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": f"User {user.username} deleted"}

@router.patch("/promote/{user_id}")
def promote_user(user_id: int, db: Session = Depends(get_db), _: User = Depends(require_admin)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.role = RoleEnum.manager
    db.commit()
    return {"message": f"User {user.username} promoted to manager"}

@router.get("/users", response_model=list[UserOut])
def list_users(db: Session = Depends(get_db), _: User = Depends(require_admin)):
    return db.query(User).all()

@router.post("/admin/generate-payroll/{user_id}")
def generate_user_payroll(user_id: int, month: str, year: int, db: Session = Depends(get_db)):
    employee = db.query(User).filter(User.id == user_id).first()
    payroll = calculate_payroll(db, employee, month, year)
    file = generate_payslip(payroll, employee)
    return FileResponse(file, media_type="application/pdf", filename=file)

@router.get("/admin/payroll-report")
def payroll_report(month: str, year: int, db: Session = Depends(get_db)):
    payrolls = db.query(Payroll).filter(
        Payroll.month == month,
        Payroll.year == year
    ).all()
    return payrolls

import csv
from fastapi.responses import StreamingResponse
from io import StringIO

@router.get("/admin/payroll-export-csv")
def export_payroll_csv(month: str, year: int, db: Session = Depends(get_db)):
    payrolls = db.query(Payroll).filter(Payroll.month == month, Payroll.year == year).all()
    
    def generate():
        buffer = StringIO()
        writer = csv.writer(buffer)
        writer.writerow([
            "Employee", "Month", "Year", "Base Salary", "Days Present", 
            "Leaves Taken", "Loan Deduction", "Net Salary"
        ])
        for p in payrolls:
            writer.writerow([
                p.employee.username,
                p.month, p.year,
                p.base_salary,
                p.days_present,
                p.leaves_taken,
                p.loan_deduction,
                p.net_salary
            ])
        buffer.seek(0)
        yield buffer.read()

    return StreamingResponse(generate(), media_type="text/csv", headers={
        "Content-Disposition": f"attachment; filename=payroll_{month}_{year}.csv"
    })


@router.get("/admin/dashboard-summary")
def dashboard(db: Session = Depends(get_db)):
    total_employees = db.query(User).count()
    total_loans = db.query(Loan).filter(Loan.is_approved == True).count()
    total_leaves = db.query(Leave).filter(Leave.status == "approved").count()
    return {
        "total_employees": total_employees,
        "approved_loans": total_loans,
        "approved_leaves": total_leaves,
    }
