import fastapi
import fastapi.security as security
import sqlalchemy.orm as orm

import schemas
import services

app = fastapi.FastAPI()


@app.post("/api/v1/users")
async def registerUser(user: schemas.UserRequest, db: orm.Session = fastapi.Depends(services.getDB)):
    dbUser = await services.getUserByEmail(email=user.email, db=db)
    if dbUser:
        raise fastapi.HTTPException(
            status_code=400, detail="Email Already Exists!")
    dbUser = await services.createUser(user=user, db=db)
    return await services.createToken(user=dbUser)


@app.post("/api/v1/login")
async def login(form_data: security.OAuth2PasswordRequestForm = fastapi.Depends(), db: orm.Session = fastapi.Depends(services.getDB)):
    dbUser = await services.login(email=form_data.username, password=form_data.password, db=db)

    if not dbUser:
        raise fastapi.HTTPException(
            status_code=401, detail="Invalid Credentials!")

    return await services.createToken(dbUser)


@app.get("/api/v1/users/current-user", response_model=schemas.UserResponse)
async def currentUser(user: schemas.UserResponse = fastapi.Depends(services.currentUser)):
    return user


@app.post("/api/v1/todos", response_model=schemas.TodoResponse)
async def createTodo(
    todoRequest: schemas.TodoRequest,
    user: schemas.UserRequest = fastapi.Depends(services.currentUser),
    db: orm.Session = fastapi.Depends(services.getDB)
):
    return await services.createTodo(user=user, db=db, todo=todoRequest)


@app.get("/api/v1/todos/user", response_model=list[schemas.TodoResponse])
async def getTodosByUser(user: schemas.UserRequest = fastapi.Depends(services.currentUser), db: orm.Session = fastapi.Depends(services.getDB)):
    return await services.getTodosByUser(user=user, db=db)


@app.get("/api/v1/todos/{todoId}", response_model=schemas.TodoResponse)
async def getTodoDetails(todoId: int, db: orm.Session = fastapi.Depends(services.getDB)):
    todo = await services.getTodoDetails(todoId=todoId, db=db)
    if todo is None:
        raise fastapi.HTTPException(status_code=404, details="Todo Not Found!")
    return todo


@app.delete("/api/v1/todos/{todoId}")
async def deleteTodo(todoId: int, user: schemas.UserRequest = fastapi.Depends(services.currentUser), db: orm.Session = fastapi.Depends(services.getDB)):
    todo = await services.getTodoDetails(todoId=todoId, db=db)
    await services.deleteTodo(todo=todo, db=db)

    return "Todo Deleted Successfully"


@app.put("/api/v1/todos/{todoId}", response_model=schemas.TodoResponse)
async def updateTodo(todoId: int, todoRequest: schemas.TodoRequest, user: schemas.UserRequest = fastapi.Depends(services.currentUser), db: orm.Session = fastapi.Depends(services.getDB)):
    dbTodo = await services.getTodoDetails(todoId=todoId, db=db)
    return await services.updateTodoDetails(todoRequest=todoRequest, todo=dbTodo, db=db)


@app.get("/api/v1/all/todos", response_model=list[schemas.TodoResponse])
async def getAllTodos(db: orm.Session = fastapi.Depends(services.getDB)):
    return await services.getAllTodos(db=db)


@app.get("/api/v1/user/{userId}", response_model=schemas.UserResponse)
async def getUserDetails(userId: int, db: orm.Session = fastapi.Depends(services.getDB)):
    user = await services.getUserDetails(userId=userId, db=db)
    if user is None:
        raise fastapi.HTTPException(status_code=404, details="User Not Found!")
    return user
