# What is Resh?
It is a console that everyone can use. It has the power of bash without having to use cryptic commands. The suggestions and tab-to-complete make the interface quite quick despite the longer names for commands. The suggestions make learning new commands incredibly easy. However, it is also fully backwards compatible with console commands (bash or your shell of choice).

Demo: https://www.youtube.com/watch?v=_DzvYvrkBXo&feature=youtu.be

<img width="776" alt="screen shot 2017-08-28 at 2 22 33 am" src="https://user-images.githubusercontent.com/17692058/29763276-1ef8629c-8b98-11e7-9a9c-1154195a5f52.png">

![rebygif](https://user-images.githubusercontent.com/17692058/29953404-8ec19c4c-8e95-11e7-8770-c628ee57dfe0.gif)


# How to test out/install
Easy! For those familiar with git, clone this repo and then open resh.app inside the newly created resh folder.


# Features
Many unix things were made more simple. For example, deleting something in bash depended on whether the thing was a folder (`rm -r`) or a file (just `rm`). Now in resh its just `delete` and it will figure out if its a file or folder.

Many things like permissions (`chmod`) have been totally overhauled into a Q&A system. (See pictures below)

<img width="818" alt="screen shot 2017-10-14 at 7 59 17 pm" src="https://user-images.githubusercontent.com/17692058/31580593-3ebdad60-b11a-11e7-8bc9-78806039eb37.png">
<img width="815" alt="screen shot 2017-10-14 at 8 00 22 pm" src="https://user-images.githubusercontent.com/17692058/31580605-60274d4e-b11a-11e7-8001-77d2a3a7af8c.png">



# Development

This app is still in alpha but is stable and useful enough to be my daily terminal. All the basic bash commands have been added, even things like ssh. At the moment it is only being developed for Mac. Most of the features will still work on Linux, so once the mac version is complete, I may work on a Linux version. A beta build will most likely appear around the end of Jan 2018. 

The app is being built using Electron and Node.js.

To run things youself or modify the existing code, make sure you have Node.js and Electron installed. Then to run/compile the code, simply clone the repo, then, using terminal, go to the directory of the clone, and to test it run the command `electron .` and to create a mac app-file on your desktop run `npm run make`.


