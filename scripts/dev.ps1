param(
    [switch]$NoHealthcheck,
    [switch]$VerboseLogs,
    [switch]$Quiet,
    [switch]$Normal,
    [switch]$DryRun,
    [switch]$NoEnvReset
)

$ErrorActionPreference = "Stop"

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$rootDir = Resolve-Path (Join-Path $scriptDir "..")

Set-Location $rootDir

if (-not $NoEnvReset) {
    $varsToReset = @(
        "STARTUP_TIMEOUT_MS",
        "HEALTHCHECK_TIMEOUT_MS",
        "START_FULL_LOG_MODE",
        "START_FULL_HEALTHCHECK",
        "START_FULL_LOG_FILE",
        "START_FULL_LOG_MAX_BYTES",
        "START_FULL_LOG_MAX_FILES"
    )

    foreach ($name in $varsToReset) {
        if (Test-Path "Env:$name") {
            Remove-Item "Env:$name"
            Write-Host "[dev.ps1] Cleared Env:$name"
        }
    }
}

$nodeArgs = @("scripts/start-full.js")

if ($NoHealthcheck) { $nodeArgs += "--no-healthcheck" }
if ($VerboseLogs) { $nodeArgs += "--verbose" }
if ($Quiet) { $nodeArgs += "--quiet" }
if ($Normal) { $nodeArgs += "--normal" }
if ($DryRun) { $nodeArgs += "--dry-run" }

Write-Host "[dev.ps1] Running: node $($nodeArgs -join ' ')"

& node @nodeArgs
$exitCode = $LASTEXITCODE

if ($exitCode -ne 0) {
    Write-Host "[dev.ps1] Launcher exited with code $exitCode" -ForegroundColor Red
} else {
    Write-Host "[dev.ps1] Launcher exited successfully" -ForegroundColor Green
}

exit $exitCode