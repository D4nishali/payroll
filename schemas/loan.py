from pydantic import BaseModel

class LoanCreate(BaseModel):
    loan_type: str
    amount: float
    term_months: int

class LoanOut(LoanCreate):
    id: int
    status: str

    class Config:
        from_attributes = True
