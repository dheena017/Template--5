import subprocess
import os

print("--- Starting Mass Atomic Commits (Python Version) ---")

def run(cmd):
    # We use a proper shell call but handle any error silently here
    # However, for commiting we should be careful.
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, shell=True)
        return result.stdout.strip()
    except Exception as e:
        print(f"Error: {e}")
        return ""

# 1. Get changed files
status = run("git status --porcelain")
if not status:
    print("No changes to commit!")
    exit()

lines = status.splitlines()
commit_count = 0

for line in lines:
    # Status line is XY path (3 chars prefix)
    file_path = line[3:].strip()
    if not file_path or os.path.isdir(file_path):
        continue
    
    # 2. Heuristic Message
    prefix = "feat: Add "
    if "styles" in file_path or file_path.endswith(".css"):
        prefix = "style: Add "
    elif any(file_path.endswith(ext) for ext in [".png", ".jpg", ".svg", ".ico", ".json", ".db"]):
        prefix = "asset: Add "
    elif "scripts" in file_path:
        prefix = "chore: Add "
    elif "components" in file_path:
        prefix = "feat(ui): Add "
    elif "pages" in file_path:
        prefix = "feat(page): Add "
    
    msg = f"{prefix}{file_path}"
    
    print(f"Committing [{file_path}]...")
    # Escape quotes in file_path if any
    safe_path = file_path.replace('"', '\\"')
    run(f'git add "{safe_path}"')
    run(f'git commit -m "{msg}"')
    commit_count += 1

print(f"Done! Created {commit_count} atomic commits.")
print("Run 'git push' to upload all commits.")
