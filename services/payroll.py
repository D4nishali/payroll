from sqlalchemy.orm import Session
from datetime import datetime
from models.user import User
from models.payroll import Payroll

def calculate_payroll(db: Session, employee: User, month: str, year: int):
    base_salary = 30000  # Example
    days_in_month = 30
    leaves = get_approved_leaves(db, employee.id, month, year)
    attendance = get_attendance_count(db, employee.id, month, year)
    loan_deduction = get_monthly_loan_deduction(db, employee.id)

    # Salary = base * (days_present / days_in_month) - loan
    net_salary = (base_salary * (attendance / days_in_month)) - loan_deduction

    payroll = Payroll(
        employee_id=employee.id,
        month=month,
        year=year,
        base_salary=base_salary,
        days_present=attendance,
        leaves_taken=leaves,
        loan_deduction=loan_deduction,
        net_salary=net_salary
    )
    db.add(payroll)
    db.commit()
    return payroll
