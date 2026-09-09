param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$Args
)

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
$Repo = Split-Path -Parent $Root
$env:PYTHONPATH = $Root
Set-Location $Repo
python -m seo_memory @Args
