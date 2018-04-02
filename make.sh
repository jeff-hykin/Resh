# try to delete the resh.app on the desktop if its there 
rm -rf "$HOME/Desktop/resh.app"

# disable the debugging in main.js 
# this just comments-out the line:
#    require('electron-debug')({showDevTools: true})
sed -i ''  -e "s/require(\\'electron-debug/\/\/ require(\\'electron-debug/" main.js

# then package up everything, name it resh
electron-packager "$PWD" resh --debug --platform=darwin --arch=x64 --electron-version=1.6.11 --out="$HOME/Desktop" --overwrite

# once thats done take the app out of the package 
mv "$HOME/Desktop/resh-darwin-x64/resh.app" "$HOME/Desktop"

# remove all the other stuff that was in the folder
rm -rf "$HOME/Desktop/resh-darwin-x64"

# re-enable the debugging in main.js 
# this just un-comments-out the line:
#    require('electron-debug')({showDevTools: true})
sed -i ''  -e "s/\/\/ *require(\\'electron-debug/require(\\'electron-debug/" main.js