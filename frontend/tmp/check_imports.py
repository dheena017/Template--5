import os
import re

ROOT = r"frontend\src"

def check_imports():
    errors = []
    for root, dirs, files in os.walk(ROOT):
        for file in files:
            if file.endswith(('.js', '.jsx')):
                path = os.path.join(root, file)
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read()
                    # Match relative imports
                    matches = re.findall(r"import\s+.*\s+from\s+['\"](\..*?)['\"]", content)
                    for m in matches:
                        # Clean up path
                        imp_path = m
                        if not imp_path.endswith(('.js', '.jsx', '.css', '.svg', '.png', '.jpg', '.webp')):
                            # Try adding extensions
                            # (Vite tries .js, .jsx, etc.)
                            resolved = False
                            base = os.path.normpath(os.path.join(root, imp_path))
                            for ext in ['.js', '.jsx', '/index.js', '/index.jsx', '.css']:
                                if os.path.exists(base + ext):
                                    resolved = True
                                    break
                            if not resolved:
                                errors.append(f"Broken import in {os.path.relpath(path, ROOT)}: '{m}' (Resolved base: {base})")
                        else:
                            # Explicit extension
                            base = os.path.normpath(os.path.join(root, imp_path))
                            if not os.path.exists(base):
                                errors.append(f"Broken explicit import in {os.path.relpath(path, ROOT)}: '{m}'")
    return errors

if __name__ == "__main__":
    errs = check_imports()
    if not errs:
        print("No broken imports found!")
    for e in errs:
        print(e)
