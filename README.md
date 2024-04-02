## Note: this project is old, but may be redone in the (maybe distant) future!

# What is Resh?
It is a console/command line that everyone can use. It has the power of bash without having to use cryptic commands. The suggestions and tab-to-complete are designed to make the interface quick despite the longer names for commands. The suggestions make learning new commands easy, and Resh is also backwards compatible with traditional commands (bash or your shell of choice), with the exception of interactive commands (`top`, `vim`, `nano`, interpreters, etc).

![rebygif](https://user-images.githubusercontent.com/17692058/29953404-8ec19c4c-8e95-11e7-8770-c628ee57dfe0.gif)

Demo: https://www.youtube.com/watch?v=_DzvYvrkBXo&feature=youtu.be

<img width="776" alt="screen shot 2017-08-28 at 2 22 33 am" src="https://user-images.githubusercontent.com/17692058/29763276-1ef8629c-8b98-11e7-9a9c-1154195a5f52.png">


# How to test out/install
At them moment this is a Mac-only app (with planned future support for linux). For those familiar with git, clone this repo and then open resh.app inside the newly created resh folder.

For those unfamiliar with git, lookup "how to install git" and "how to git clone a repository from github" it shouldn't take long.


# Features
Many unix things were made more simple. For example, deleting something is just `delete ` followed by a file or folder name (in bash it is `rm -r` *foldername* for folders and just `rm` *filename* for files). Now in resh its just `delete` and it will figure out if its a file or folder.

Many things like permissions (bash example: `chmod u+x a_file`) have been totally overhauled into a Q&A system. (See pictures below)

<img width="818" alt="screen shot 2017-10-14 at 7 59 17 pm" src="https://user-images.githubusercontent.com/17692058/31580593-3ebdad60-b11a-11e7-8bc9-78806039eb37.png">
<img width="815" alt="screen shot 2017-10-14 at 8 00 22 pm" src="https://user-images.githubusercontent.com/17692058/31580605-60274d4e-b11a-11e7-8001-77d2a3a7af8c.png">



# Development / Contributing

This app is still in alpha, just a demo. I reccomend checking back in the summer of 2024 to see if a stable verison is out. I will probably eventually develop a beta and full release. The current to-do list is
* Switch to Tauri instead of Electron
* Bundle and use deno instead of Node.js
* Rewrite the codebase: clean, document, and simplify
* Add support for all interactive commands: `top`, `ssh`, etc
* Port to Linux
* Finish adding a full list of human commands

The existing app was built using Electron and Node.js.

To run things youself or modify the existing code: 
    install Node.js <br>
    install electron <br>
    Clone this repo <br> 
    using terminal, go to the directory of the clone <br>
    test resh using `electron .` <br>
    and to create a mac app-file on your desktop run `npm run make`


