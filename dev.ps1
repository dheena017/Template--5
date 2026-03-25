# Run both frontend and backend for testing
$backendProc = Start-Process -FilePath "python" -ArgumentList "manage.py runserver 8000" -WorkingDirectory "backend" -PassThru
$frontendProc = Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "frontend" -PassThru

Write-Host "Both services are starting..."
Write-Host "Backend: http://localhost:8000"
Write-Host "Frontend: http://localhost:5173"

# Keep the script alive or just wait for input
Read-Host "Press enter to stop both services..."

Stop-Process -Id $backendProc.Id
Stop-Process -Id $frontendProc.Id
