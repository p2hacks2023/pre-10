"use client";
import React from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { formatGetDiscussionItem } from "../func/api";
export const userNameAtom = atom<string>({
  key: "userNameAtom", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
export const displayUserNameAtom = atom<string | null>({
  key: "displayUserNameAtom", // unique ID (with respect to other atoms/selectors)
  default: "ぺんぎん", // default value (aka initial value)
});

/**
 * 親discussionのIDを管理
 */
export const parentDiscussionIdAtom = atom<number | null>({
  key: "parentDiscussionIdAtom", // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});
/**
 * 親discussionのIDを管理
 */
export const parentDiscussionIseeLevelAtom = atom<number>({
  key: "parentDiscussionIseeLevelAtom", // unique ID (with respect to other atoms/selectors)
  default: 1, // default value (aka initial value)
});

/**
 * 親discussionのリストを保持
 */
export const parentDiscussionRandomAtom = atom<formatGetDiscussionItem[]>({
  key: "parentDiscussionRandomAtom", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
/**
 * 選択されているDiscussionを表示
 */
export const getdiscussionAllDataAtom = atom<formatGetDiscussionItem[]>({
  key: "getdiscussionAllData", // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
/**
 * 選択されているDiscussionを表示
 */
export const sendQuestionDialogAtom = atom<boolean>({
  key: "sendQuestionDialogAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const sendAnsQuestionDialogAtom = atom<boolean>({
  key: "sendAnsQuestionDialogAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
export const openTipsAtom = atom<boolean>({
  key: "openTipsAtom", // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});
