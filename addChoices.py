import re

replacements = {
    "firstCreatureChoice" : """{choice
        - Touch it
          You Touched it
        - Leave it alone
          You left it alone
    }"""
}

gameDataFile = open("the_dark.bitsy", "r")
gameData = gameDataFile.read()
gameDataFile.close()

replaceStrings = re.findall(r"\(rTag.*?\)", gameData)
outData = gameData

for i in replaceStrings:
    tagName = re.search(r"\"(.*?)\"", i)[1]
    print(str(i))
    if tagName in replacements:
        outData = re.sub(str(i), replacements[tagName], outData)
    else:
        print("Found tag: " + tagName + " but no corrisponding replacement")

# gameDataFile = open("the_dark_modified.bitsy", "w")
# gameDataFile.write(outData)
# gameDataFile.close()

# testString = "(Blend again) something else"
# foundString = re.search(r"(\(.*?\))", testString)[1]
# outString = re.sub(foundString, "potato", testString)
# print(outString)