import string
from typing import Union
from fastapi import FastAPI, Depends

from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
import json

def create_user(username:str,display_username:str):
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"INSERT INTO `user_data` (`id`, `user_id`, `pass_hash`, `display_username`) VALUES (uuid(), '{username}', '0000000', '{display_username}');"
    cur.execute(query)

    result = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return result

def check_user(username:string):
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)
    query = f"SELECT * FROM `user_data` WHERE `user_id` = '{str(username)}';"
    cur.execute(query)
    result = cur.fetchall()
    cur.close()
    conn.close()
    if len(result)==0:
        return {"status":"nouser"}
    else:
        return {"status":"ok","userdata":result[0]}

