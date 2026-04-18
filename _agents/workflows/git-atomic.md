---
description: "AI Atomic Git Push: Commits and pushes files one by one with descriptive messages."
---

# AI Atomic Git Push Agent 🚀

// turbo-all
1. Get the list of all changed or untracked files in the repository.
```powershell
git status --porcelain
```
2. For each relevant file:
    a. Stage the file: `git add <file>`
    b. Get the staged diff: `git diff --cached <file>`
    c. Generate a concise, meaningful "Conventional Commits" message for that specific change.
    d. Commit: `git commit -m "<message>"`
3. Once all files are individually committed, confirm with the user before pushing:
```powershell
git push
```
4. Report a summary of all atomic commits performed.
