param(
    [switch]$NoHealthcheck,
    [switch]$VerboseLogs,
    [switch]$Quiet,
    [switch]$Normal,
    [switch]$DryRun,
    [switch]$NoEnvReset
)

$ErrorActionPreference = "Stop"

$scriptPath = Join-Path $PSScriptRoot "scripts/dev.ps1"

if (-not (Test-Path $scriptPath)) {
    Write-Host "[dev.ps1] Missing launcher script: $scriptPath" -ForegroundColor Red
    exit 1
}

$args = @()
if ($NoHealthcheck) { $args += "-NoHealthcheck" }
if ($VerboseLogs) { $args += "-VerboseLogs" }
if ($Quiet) { $args += "-Quiet" }
if ($Normal) { $args += "-Normal" }
if ($DryRun) { $args += "-DryRun" }
if ($NoEnvReset) { $args += "-NoEnvReset" }

& $scriptPath @args
exit $LASTEXITCODE
