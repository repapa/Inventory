Git Workflow
===================

Branches
-------------
- [Master](https://github.com/repapa/Inventory/tree/master)
    - Codes that will be release and will be viewed by the user.
- [Dev](https://github.com/repapa/Inventory/tree/dev)
    - Codes that will be updated by the Developers.

Guide of Developer when implementing new feature/task
### 1) Always update your dev branch 
```sequence
- git checkout dev
- git pull
```
### 2) Create a new branch
```sequence
- git checkout -b YOUR_NEW_BRANCH
```
### 3) Commit and push to Github your new branch
> **Linting, Unit Tests and E2E Tests should passed.**
```sequence
- git add .
- git commit -m "YOUR_MESSAGE_THAT_DESCRIBES_YOUR_COMMIT"
- git push origin YOUR_NEW_BRANCH
```
### 4) In Github, create a pull request
- Go to [Github Inventory Project](https://github.com/repapa/Inventory).
- Go to YOUR_NEW_BRANCH.
- Click `Create new pull request`.
- On the Asignee, input your Github User.
- On the Review, input anyone from your team who is free to review.

### 5) Reviewing a pull request
- Check if the code follows the task requirements.
- Check if the code implementation follows the [clean code guidelines](https://blog.goyello.com/2013/01/21/top-9-principles-clean-code/).
- Checkout the branch and make sure that linting, unit test and e2e test passed.

