# PowerShell Script for 100+ Atomic Commits
# Logic: Loops through all changed or untracked files and commits each individually.

Write-Host "🚀 Starting Mass Atomic Commits..." -ForegroundColor Cyan

# 1. Get the list of all untracked or modified files
$statusLines = git status --porcelain
if (-not $statusLines) {
    Write-Host "✅ No changes to commit!" -ForegroundColor Green
    return
}

$commitCount = 0

foreach ($line in $statusLines) {
    # If it's a directory (ends with /), skip or handle
    if ($line -match "/$") { continue }

    # Strip the status code (first 3 chars)
    $file = $line.Substring(3).Trim()
    
    if (-not $file) { continue }
    
    # 2. Heuristic Message Generation
    $pfx = "feat: Add "
    if ($file -like "*styles*") { $pfx = "style: Add " }
    elseif ($file -like "*.css") { $pfx = "style: Add " }
    elseif ($file -like "*.png" -or $file -like "*.jpg" -or $file -like "*.svg") { $pfx = "asset: Add " }
    elseif ($file -like "*scripts*") { $pfx = "chore: Add " }
    elseif ($file -like "*components*") { $pfx = "feat(ui): Add " }
    elseif ($file -like "*pages*") { $pfx = "feat(page): Add " }
    
    $fullMsg = $pfx + $file

    Write-Host "📝 Committing [$file]..." -ForegroundColor White
    
    # 3. Stage and Commit
    git add "$file"
    git commit -m "$fullMsg"
    $commitCount++
}

Write-Host "✅ Finished! Created $commitCount atomic commits." -ForegroundColor Green
Write-Host "----------------------------------------------------"
Write-Host "Run 'git push' to upload all commits to the remote repo." -ForegroundColor Yellow
