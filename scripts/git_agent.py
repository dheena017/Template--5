import os
import subprocess
import requests
import json
import argparse
from typing import List, Optional

# --- Configuration ---
# Set this to your LLM API service (e.g., openai, ollama, anthropic)
# For this example, we'll assume a local Ollama or OpenAI-like interface.
LLM_API_URL = "http://localhost:11434/api/generate"  # Default Ollama URL
LLM_MODEL = "llama3" # Or "gpt-4", "deepseek-coder", etc.

def run_command(command: List[str], cwd: Optional[str] = None) -> str:
    """Helper to run shell commands and return output."""
    try:
        process = subprocess.run(
            command,
            cwd=cwd,
            capture_output=True,
            text=True,
            check=True
        )
        return process.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running command {' '.join(command)}: {e.stderr}")
        return ""

def get_changed_files() -> List[str]:
    """Get a list of changed/untracked files."""
    status = run_command(["git", "status", "--porcelain"])
    files = []
    if not status:
        return files
    
    for line in status.splitlines():
        # Line format: "XY path/to/file"
        # X/Y are status codes: M (modified), A (added), ?? (untracked), etc.
        # We skip deleted files (D) unless they need a "Remove: ..." commit.
        if line[0] == 'D' or line[1] == 'D':
            # Handle deletions too
            files.append(line[3:].strip())
        else:
            files.append(line[3:].strip())
    return files

def generate_commit_message(filename: str, diff: str) -> str:
    """Generate a commit message using AI based on the diff."""
    # If LLM is not configured, fallback to a sensible default or AI-stub.
    # For now, let's assume we can prompt an AI.
    
    prompt = f"""
Generate a concise, professional Git commit message for the file: {filename}.
The change is as follows (Git Diff):
```diff
{diff}
```
Follow the conventional commits format (e.g., feat: ..., fix: ..., chore: ..., style: ...).
Do not include any explanation or extra text, JUST the commit message.
"""
    
    # --- Integration with Local Ollama (Example) ---
    try:
        response = requests.post(
            LLM_API_URL,
            json={
                "model": LLM_MODEL,
                "prompt": prompt,
                "stream": False
            },
            timeout=10
        )
        if response.status_code == 200:
            msg = response.json().get("response", "").strip()
            # Basic cleanup in case LLM adds quotes
            return msg.strip('"').strip("'")
    except Exception as e:
        print(f"Warning: AI message generation failed ({e}). Using manual input.")

    # Fallback to manual if AI fails or isn't available
    print(f"\n--- Changes for {filename} ---")
    print(diff[:500] + "..." if len(diff) > 500 else diff)
    return input(f"Enter commit message for {filename}: ")

def agent_push():
    """Main logic: Process files one by one."""
    print("🚀 Starting AI Git Agent...")
    
    files = get_changed_files()
    if not files:
        print("✅ No changes detected in the repository.")
        return

    print(f"🔍 Found {len(files)} changed file(s).")
    
    for file in files:
        if not os.path.exists(file):
            print(f"Skipping deleted file: {file} (or staging it for removal).")
            # For deletions, we might need a different handling
            if input(f"File {file} seems deleted. Do you want to commit the removal? (y/n) ").lower() != 'y':
                continue
        
        # Stage the file
        run_command(["git", "add", file])
        
        # Get the diff (now staged)
        diff = run_command(["git", "diff", "--cached", file])
        
        if not diff:
            print(f"⚠️ No changes detected for {file} (maybe it was just an add/remove).")
            # If it's a new file, diff might be empty if we don't use --staged or it's binary.
            # We can use git diff /dev/null <file> for new files.
            diff = run_command(["git", "diff", "/dev/null", file])

        # Generate message
        message = generate_commit_message(file, diff)
        
        # Commit
        print(f"📝 Committing {file} with message: '{message}'")
        run_command(["git", "commit", "-m", message])
    
    # Final Push
    do_push = input("\nCommits complete. Push to remote now? (y/n) ")
    if do_push.lower() == 'y':
        print("⬆️ Pushing changes...")
        run_command(["git", "push"])
        print("✅ Done!")
    else:
        print("🛑 Push skipped. Commits are locally saved.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Git Agent for atomic commits.")
    args = parser.parse_args()
    agent_push()
