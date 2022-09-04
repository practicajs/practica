---
sidebar_position: 4
sidebar_label: Questions and answers
---

# Questions and answers for contributors

## Code generator

**1. Question-** When running the local shell command 'create-node-app' a wrong version of the code is running or it is not running at all

**Answer-** Consider re-linking the local command to the code and cleaning the .dist folder: 

a. Locate your bin folder by typing `which node`

Copy the path

b. CD to the path that was copied

c. `rm create-node-app`

d. Navigate to the code folder and build the code `npm run build`

e. Delete [root]/.dist folder

f. Build the project again with ```npm run build```

f. Navigate to `.dist` and run the command again

`npm link`
