import sqlalchemy.orm as orm
import email_validator as emailValidator
import fastapi
import passlib.hash as hash
from passlib.hash import bcrypt
import fastapi.security as security
import jwt
import db
import models
import schemas

JWT_SECRET = "kashyappatel.developer@gmail.com"
oauth2schema = security.OAuth2PasswordBearer("api/v1/login")


def createDB():
    return db.Base.metadata.create_all(bind=db.engine)


def getDB():
    database = db.sessionLocal()
    try:
        yield database
    finally:
        database.close()


# createDB()


async def getUserByEmail(email: str, db: orm.session):
    return db.query(models.UserModel).filter(models.UserModel.email == email).first()


async def createUser(user: schemas.UserRequest, db: orm.session):

    try:
        isValid = emailValidator.validate_email(user.email)
        email = isValid.email
    except emailValidator.EmailNotValidError:
        raise fastapi.HTTPException(
            status_code=400, status_message="Email Not Valid")

    hashedPassword = bcrypt.hash(user.password)
    userObj = models.UserModel(
        email=email, fullName=user.fullName, passwordHashed=hashedPassword)

    db.add(userObj)
    db.commit()
    db.refresh(userObj)
    return userObj


async def createToken(user: models.UserModel):
    userSchema = schemas.UserResponse.from_orm(user)

    userDict = userSchema.dict()
    del userDict['createdAt']

    token = jwt.encode(userDict, JWT_SECRET)

    return dict(access_token=token, token_type="bearer")


async def login(email: str, password: str, db: orm.session):
    dbUser = await getUserByEmail(email=email, db=db)

    if not dbUser:
        return False
    if not dbUser.verifyPassword(password=password):
        return False

    return dbUser


async def currentUser(db: orm.Session = fastapi.Depends(getDB), token: str = fastapi.Depends(oauth2schema)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        dbUser = db.query(models.UserModel).get(payload['id'])
    except:
        raise fastapi.HTTPException(
            status_code=401, detail="Invalide Credentials!")
    return schemas.UserResponse.from_orm(dbUser)


async def createTodo(user: schemas.UserResponse, db: orm.Session, todo: schemas.TodoRequest):
    todo = models.TodoModel(**todo.dict(), userId=user.id)

    db.add(todo)
    db.commit()
    db.refresh(todo)

    return schemas.TodoResponse.from_orm(todo)


async def getTodosByUser(user: schemas.UserResponse, db: orm.Session):
    todos = db.query(models.TodoModel).filter_by(userId=user.id)

    return list(map(schemas.TodoResponse.from_orm, todos))


async def getTodoDetails(todoId: int, db: orm.Session):
    dbTodo = db.query(models.TodoModel).filter(
        models.TodoModel.id == todoId).first()

    return dbTodo


async def deleteTodo(todo: models.TodoModel, db: orm.Session):
    db.delete(todo)
    db.commit()


async def updateTodoDetails(
    todoRequest: schemas.TodoRequest,
    todo: models.TodoModel,
    db: orm.Session
):
    if (todoRequest.title):
        todo.title = todoRequest.title
    if (todoRequest.description):
        todo.description = todoRequest.description
    if (todoRequest.completed):
        todo.completed = todoRequest.completed

    db.commit()
    db.refresh(todo)

    return schemas.TodoResponse.from_orm(todo)


async def getAllTodos(db: orm.Session):
    todos = db.query(models.TodoModel)

    return list(map(schemas.TodoResponse.from_orm, todos))


async def getUserDetails(userId: int, db: orm.Session):
    dbUser = db.query(models.UserModel).filter(
        models.UserModel.id == userId).first()

    return dbUser
