from math import log
import string
from typing import Union
from fastapi import FastAPI, Depends

from fastapi import FastAPI
from pydantic import BaseModel
import mysql.connector
import json

from app.fn import iseeLevelCheck

def getdiscussion(discussion_id:string):
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"SELECT * FROM `post` WHERE `discussion_id` = {discussion_id} ORDER BY `discussion_id` DESC;"
    cur.execute(query)
    rows=cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return rows

def getdiscussion_all(discussion_id:string):
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"SELECT * FROM `post` WHERE `discussion_id` = {discussion_id} OR `parent_discussion_id` = {discussion_id} ORDER BY `discussion_id` DESC;"
    cur.execute(query)

    result = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return result

randomtmp=0

def getdiscussion_random(offset:int):
    global randomtmp
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"SELECT COUNT(*) FROM `post` WHERE `is_parent` = 1;"
    cur.execute(query)
    result = cur.fetchall()

    randomtmp%=result[0]["COUNT(*)"]

    query2 = f"SELECT * FROM `post` WHERE `is_parent` = 1 LIMIT {offset} OFFSET {randomtmp};"
    cur.execute(query2)

    result2 = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    randomtmp+=1
    return result2

randomtmpnormal=0
randomtmpnormal_1=0

def getdiscussion_random_normal():
    global randomtmpnormal
    global randomtmpnormal_1
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"SELECT COUNT(*) FROM `post` WHERE `is_parent` = 1 AND `isee_level` < 5;"
    cur.execute(query)
    result = cur.fetchall()

    randomtmpnormal%=result[0]["COUNT(*)"]


    query = f"SELECT COUNT(*) FROM `post` WHERE `is_parent` = 1 AND `isee_level` = 5;"
    cur.execute(query)
    result = cur.fetchall()
    randomtmpnormal_1%=result[0]["COUNT(*)"]

    query2 = f"SELECT * FROM `post` WHERE `is_parent` = 1 AND `isee_level` < 2 LIMIT 5 OFFSET 0;"
    cur.execute(query2)

    result2 = cur.fetchall()

    query3 = f"SELECT * FROM `post` WHERE `is_parent` = 1 AND `isee_level` > 1 LIMIT 50 OFFSET 0;"
    cur.execute(query3)

    result3 = cur.fetchall()

    conn.commit()
    cur.close()
    conn.close()
    randomtmpnormal+=1
    randomtmpnormal_1+=1
    return result2+result3


def create_discussion(user_id:str,content:str):
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"INSERT INTO post (`post_id`, `is_parent`, `parent_discussion_id`, `user_id`, `isee`, `bad`, `content`, `date`) VALUES (uuid(), '1', '0', '{user_id}', '0', '0', '{content}', current_timestamp());"
    cur.execute(query)
    query2 = f"SELECT LAST_INSERT_ID();"
    cur.execute(query2)
    result = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return result[0]

def create_child(parent_discussion_id:str,user_id:str,content:str):
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"INSERT INTO post (`post_id`, `discussion_id`, `is_parent`, `parent_discussion_id`, `user_id`, `isee`, `bad`, `content`, `date`) VALUES (uuid(), NULL, '0', '{parent_discussion_id}', '{user_id}', '0', '0', '{content}', current_timestamp());"
    cur.execute(query)
    result = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return result

def up_isee(parent_discussion_id:str, discussion_id:str, user_id:str, count:str):
    conn = mysql.connector.connect(
    host="secret",
    port='3307',
    user='root',
    password='passSecret',
    database='icer'
    )
    cur = conn.cursor(dictionary=True)

    query = f"UPDATE `post` SET isee = isee + {count} WHERE `post`.`discussion_id` = {discussion_id};"
    cur.execute(query)
    query =  f"SELECT * FROM `post` WHERE `discussion_id` = {parent_discussion_id} OR `parent_discussion_id` = {parent_discussion_id} ORDER BY `discussion_id` DESC;"
    cur.execute(query)
    result = cur.fetchall()
    getIseeLevel=iseeLevelCheck(result)

    query = f"UPDATE `post` SET isee_level = {getIseeLevel} WHERE `post`.`discussion_id` = {parent_discussion_id};"
    cur.execute(query)

    query2 = f"INSERT INTO `isee_log` (`log_id`, `discussion_id`, `user_id`, `count`, `create_date`, `update_date`) VALUES (uuid(), '{discussion_id}', '{user_id}', '{count}', CURRENT_DATE(), CURRENT_DATE());"
    cur.execute(query2)
    result = cur.fetchall()
    conn.commit()
    cur.close()
    conn.close()
    return result
    