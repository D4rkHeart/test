$path = Get-Location
$envPath = Join-Path -Path $path -childPath ".env"

if(Test-Path -Path $envPath){
    Remove-Item -Path $envPath
}
New-Item -Path . -Name ".env" -ItemType "file"
Add-Content -Path $envPath -Value "DB_HOST=127.0.0.1:3306"
Add-Content -Path $envPath -Value "DB_NAME=digithub"
Add-Content -Path $envPath -Value "DB_USER=root"
Add-Content -Path $envPath -Value "DB_PASSWORD=123456"