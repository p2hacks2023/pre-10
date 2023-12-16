
def iseeLevelCheck(item): 
    print(item)
    allIseeCount = 0
    maxIseeCount = 0
    for element in item:
        print(element["isee"])
        allIseeCount += element["isee"]
        if (maxIseeCount < element["isee"]):
            maxIseeCount = element["isee"]
    
    if (allIseeCount >= 15 or maxIseeCount >= 10):
        return 5
    elif (allIseeCount >= 12 or maxIseeCount >= 8):
        return 4
    elif (allIseeCount >= 9 or maxIseeCount >= 6):
        return 3
    elif (allIseeCount >= 5):
        return 2
    else:
        return 1
