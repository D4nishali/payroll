from reportlab.pdfgen import canvas
from models.payroll import Payroll
from models.user import User


def generate_payslip(payroll: Payroll, employee: User):
    filename = f"payslip_{employee.username}_{payroll.month}_{payroll.year}.pdf"
    c = canvas.Canvas(filename)
    c.drawString(100, 800, f"Payslip for {employee.name} - {payroll.month} {payroll.year}")
    c.drawString(100, 770, f"Base Salary: ₹{payroll.base_salary}")
    c.drawString(100, 750, f"Days Present: {payroll.days_present}")
    c.drawString(100, 730, f"Leaves Taken: {payroll.leaves_taken}")
    c.drawString(100, 710, f"Loan Deduction: ₹{payroll.loan_deduction}")
    c.drawString(100, 690, f"Net Salary: ₹{payroll.net_salary}")
    c.save()
    return filename
