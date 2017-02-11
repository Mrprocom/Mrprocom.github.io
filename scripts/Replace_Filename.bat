: Copyright 2017 Mrprocom All Rights Reserved
@echo off
setlocal ENABLEDELAYEDEXPANSION
echo [Replace Filename] Copyright 2017 Mrprocom All Rights Reserved
echo. 
echo This batch file replaces text in all filenames in the same directory this batch file is in.
echo 1) Enter the string in filename you want to replace
echo 2) Enter the file extention (use * for all files)
echo 3) Enter what you want to replace it with.
echo Be careful not to rename important windows files, which could damage your operating system.
echo. 
echo Example:
echo.  If you want to replace all "Copy" text files in you directory with "Clone", then enter:
echo.  Copy
echo.  txt
echo.  Clone
echo. 
echo. 

:main
set /p old=Search For: 
set /p ext=File extention: 
set /p new=Replace it with: 
echo. 
for /f "tokens=*" %%f in ('dir /b *.%ext%') do (
  set newname=%%f
  set newname=!newname:%old%=%new%!
  move "%%f" "!newname!"
)

echo Done!
:choice
set /P question=Do you want to replace something else? [Y/N]: 
if /I "%question%" EQU "Y" goto :main
if /I "%question%" EQU "N" goto :end
goto :choice
:end
