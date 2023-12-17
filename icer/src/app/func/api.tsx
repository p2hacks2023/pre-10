"use client";
import React, { useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import {
  getdiscussionAllDataAtom,
  parentDiscussionIdAtom,
  parentDiscussionIseeLevelAtom,
  parentDiscussionRandomAtom,
  userNameAtom,
} from "../recoil/atom";
import axios from "axios";
import { Button } from "@mui/material";
import { iseeCheck } from "./isee";

export function ApiAutoUpdate() {
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );
  const [discussionAll, setDiscussionAll] = useRecoilState(
    getdiscussionAllDataAtom
  );
  const [discussionLevel, setDiscussionLevel] = useRecoilState(
    parentDiscussionIseeLevelAtom
  );
  const [parentDiscussionItems, setParentDiscussionItems] = useRecoilState(
    parentDiscussionRandomAtom
  );
  // discussionIdに変更があるたびデータを取得し直す
  useEffect(() => {
    (async () => {
      if (discussionId !== null) {
        const getdata = await getDiscussionAll(discussionId);
        setDiscussionAll(getdata);
        // IseeLevelを更新
        setDiscussionLevel(iseeCheck(getdata));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discussionId]);
  useEffect(() => {
    (async () => {
      const getdata = await getDiscussionRandom();
      setParentDiscussionItems(getdata);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
}

export async function checkUserName(userName: string) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/user/check/",
    {
      user_id: userName,
    }
  );
  return checkRequiest.data;
}

export async function createUser(userName: string, dusername: string) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/user/create/",
    {
      user_id: userName,
      display_username: dusername,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return checkRequiest.data;
}
export interface formatGetDiscussionItem {
  post_id: string;
  discussion_id: number;
  is_parent: number;
  parent_discussion_id: number;
  user_id: string;
  isee: number;
  bad: number;
  isee_level: number;
  content: string;
  date: string;
}

export async function getDiscussionItem(
  discussion_id: string
): Promise<formatGetDiscussionItem> {
  const getRequest = await axios.get(
    `https://p2-api.flyanyfree.com/discussion/get/item/${discussion_id}`
  );
  return getRequest.data;
}

export async function getDiscussionAll(
  parent_discussion_id: number
): Promise<formatGetDiscussionItem[]> {
  const getRequest = await axios.get(
    `https://p2-api.flyanyfree.com/discussion/get/all/${parent_discussion_id}`
  );
  return getRequest.data;
}
export async function getDiscussionItemsRandom(
  offset: number
): Promise<formatGetDiscussionItem[]> {
  const getRequest = await axios.get(
    `https://p2-api.flyanyfree.com/discussion/get/random/?offset=${offset}`
  );
  return getRequest.data;
}

export async function getDiscussionRandom(): Promise<
  formatGetDiscussionItem[]
> {
  const getRequest = await axios.get(
    `https://p2-api.flyanyfree.com/discussion/get/random_normal/`
  );
  return getRequest.data;
}

export interface propsPostCreateDiscussion {
  user_id: string;
  content: string;
}
export async function postCreateDiscussion(
  props: propsPostCreateDiscussion
): Promise<number> {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/discussion/post/parent",
    {
      user_id: props.user_id,
      content: props.content,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
  return checkRequiest.data["LAST_INSERT_ID()"];
}

export interface propsPostCreateChild {
  user_id: string;
  parent_discussion_id: number;
  content: string;
}
export async function postCreateChild(props: propsPostCreateChild) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/discussion/post/child",
    {
      user_id: props.user_id,
      parent_discussion_id: props.parent_discussion_id,
      content: props.content,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

export interface propsPostUpIsee {
  parent_discussion_id: number;
  discussion_id: number;
  user_id: string;
  count: number;
}
export async function postUpIsee(props: propsPostUpIsee) {
  const checkRequiest = await axios.post(
    "https://p2-api.flyanyfree.com/discussion/post/up_isee",
    {
      parent_discussion_id: props.parent_discussion_id,
      discussion_id: props.discussion_id,
      user_id: props.user_id,
      count: props.count,
    },
    {
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
