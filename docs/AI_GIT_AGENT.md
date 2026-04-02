# 🤖 AI Git Agent: Atomic Push Tool

This tool is designed to automate your Git workflow by performing **Atomic Commits**—committing every changed file individually with a unique, AI-generated message.

## 🚀 Key Features
- **File-by-File Commits**: Keeps your Git history extremely clean and easy to revert.
- **AI-Powered Messages**: Uses Deepseek-Coder (via Ollama) to analyze your `git diff` and write professional messages.
- **Developer First**: Built as a CLI tool for fast, local execution.

---

## 🛠️ Setup Instructions

### 1. Install Ollama
Download and install Ollama from [ollama.com](https://ollama.com).

### 2. Download the AI Model
Deepseek-Coder is highly recommended for identifying code changes:
```bash
ollama run deepseek-coder
```

### 3. Run the Agent
Whenever you have changes you want to push:
```bash
python scripts/git_agent.py
```

---

## 📂 Included Scripts

### `scripts/git_agent.py`
The main Python script. It will scan for changes, send them to your local Ollama instance, and perform the commits. 

### `scripts/git_mass_commit.py`
A high-speed fallback script. Use this if you have **100+ files** and just want them all committed immediately with decent heuristic messages (without waiting for the LLM).

---

## 💡 Why use Atomic Commits?
1. **Easy Reverts**: If a change in `Navbar.jsx` breaks the site, you can revert only that file without losing work in `Footer.jsx`.
2. **Better Code Reviews**: Your team can see the evolution of each file individually.
3. **Professionalism**: No more "minor fixes" or "updated code" messages. Every commit has a specific purpose.

---

## 🤖 Internal Agent Workflow (Slash Command)
If you are working with an AI assistant (like Antigravity), you can simply use the internal workflow:
- Type `/git-atomic` in the chat, and the assistant will handle the entire process directly.
