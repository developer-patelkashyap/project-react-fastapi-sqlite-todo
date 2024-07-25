import pydantic
import datetime
from pydantic import Field


class UserBase(pydantic.BaseModel):
    email: str
    fullName: str


class UserRequest(UserBase):
    password: str

    class Config:
        from_attributes = True


class UserResponse(UserBase):
    id: int
    createdAt: datetime.datetime

    class Config:
        from_attributes = True


class TodoBase(pydantic.BaseModel):
    title: str
    description: str
    completed: bool = Field(default=False)


class TodoRequest(TodoBase):
    pass


class TodoResponse(TodoBase):
    id: int
    userId: int

    class Config:
        from_attributes = True
