from typing import Union
from fastapi import FastAPI, Depends

from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
from app.data import create_child, create_discussion, getdiscussion, getdiscussion_all, getdiscussion_random, getdiscussion_random_normal, up_isee

from app.user import check_user, create_user
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "https://icer.pages.dev",
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class ItemUserAdd(BaseModel):
    user_id: str
    display_username:str

# INSERT INTO `user_data` (`id`, `user_id`, `pass_hash`) VALUES (uuid(), 'koo', '0000000');
@app.post("/user/create/")
async def create_item(item: ItemUserAdd):
    getreturn=create_user(item.user_id,item.display_username)
    return getreturn

class ItemUserCheck(BaseModel):
    user_id: str
@app.post("/user/check/")
async def create_item(item: ItemUserCheck):
    getreturn=check_user(item.user_id)
    return getreturn

@app.get("/discussion/get/item/{discussion_id}")
async def read_item(discussion_id:str):
    getreturn= getdiscussion(discussion_id)
    return getreturn

@app.get("/discussion/get/all/{parent_discussion_id}")
async def read_item(parent_discussion_id:str):
    getreturn= getdiscussion_all(parent_discussion_id)
    return getreturn



@app.get("/discussion/get/random/")
async def read_item(offset:int):
    getreturn = getdiscussion_random(offset)
    return getreturn

@app.get("/discussion/get/random_normal/")
async def read_item():
    getreturn = getdiscussion_random_normal()
    return getreturn


class ItemCreateDiscussion(BaseModel):
    user_id: str
    content: str

@app.post("/discussion/post/parent")
async def create_item(item: ItemCreateDiscussion):
    getreturn=create_discussion(item.user_id,item.content)
    return getreturn

class ItemCreatechild(BaseModel):
    user_id: str
    parent_discussion_id:str
    content: str


@app.post("/discussion/post/child")
async def create_item(item: ItemCreatechild):
    getreturn=create_child(item.parent_discussion_id,item.user_id,item.content)
    return getreturn


class ItemIsee(BaseModel):
    parent_discussion_id:str
    discussion_id: str
    user_id:str
    count: str

@app.post("/discussion/post/up_isee")
async def create_item(item: ItemIsee):
    getreturn=up_isee(item.parent_discussion_id,item.discussion_id,item.user_id,item.count)
    return getreturn

