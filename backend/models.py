import datetime
import sqlalchemy
import sqlalchemy.orm as orm
import passlib.hash as hash
import db


class UserModel(db.Base):
    __tablename__ = "users"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)
    email = sqlalchemy.Column(sqlalchemy.String, unique=True, index=True)
    fullName = sqlalchemy.Column(sqlalchemy.String)
    passwordHashed = sqlalchemy.Column(sqlalchemy.String)
    createdAt = sqlalchemy.Column(
        sqlalchemy.DateTime, default=datetime.datetime.utcnow())
    todos = orm.relationship("TodoModel", back_populates="user")

    def verifyPassword(self, password: str):
        return hash.bcrypt.verify(password, self.passwordHashed)


class TodoModel(db.Base):
    __tablename__ = "todos"
    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, index=True)
    userId = sqlalchemy.Column(
        sqlalchemy.Integer, sqlalchemy.ForeignKey("users.id"))
    title = sqlalchemy.Column(sqlalchemy.String)
    description = sqlalchemy.Column(sqlalchemy.String)
    completed = sqlalchemy.Column(sqlalchemy.Boolean, default=False)
    user = orm.relationship("UserModel", back_populates="todos")
