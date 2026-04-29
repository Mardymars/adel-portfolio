param(
  [string]$Message = ""
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path ".git")) {
  Write-Error "This folder is not connected to a Git repository yet."
}

$status = git status --porcelain
if (-not $status) {
  Write-Output "No changes to publish."
  exit 0
}

if (-not $Message) {
  $Message = Read-Host "Commit message"
}

if (-not $Message) {
  Write-Error "A commit message is required."
}

git add .
git commit -m $Message
git push origin main
