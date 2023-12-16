"use client";
import { formatGetDiscussionItem } from "./api";

export function iseeCheck(item: formatGetDiscussionItem[]): 1 | 2 | 3 | 4 | 5 {
  let allIseeCount = 0;
  let maxIseeCount = 0;
  console.log(item);

  item.forEach((element) => {
    if (maxIseeCount < element.isee) {
      maxIseeCount = element.isee;
    }
    allIseeCount += element.isee;
  });

  if (allIseeCount >= 15 || maxIseeCount >= 10) {
    return 5;
  } else if (allIseeCount >= 12 || maxIseeCount >= 8) {
    return 4;
  } else if (allIseeCount >= 9 || maxIseeCount >= 6) {
    return 3;
  } else if (allIseeCount >= 5) {
    return 2;
  } else {
    return 1;
  }
}
