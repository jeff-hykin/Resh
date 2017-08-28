// TODO, make sure to credit the iphone guy's work 
// TODO, fix up the graphics of the message_ bubbles
// TODO, add help messages for each of the commands
// FIXME, add error handling 
// FIXME, keep track of hidden/accidental directory changes (like using cd or running a script)
// FIXME, handle all-whitespace input 
// TODO, take away title bar with BrowserWindow({titleBarStyle: 'hiddenInset'}); and then make a titlebar div and in sass set -webkit-app-region: drag
// TODO, change hover to not move the element down 
// TODO, allow different behavior for different suggestions
    // ex: if the suggestion-command doesn't need any arguemnts, then clicking it runs it instantly 
    // ex: allow one-off suggestions like "Why?" that can be used when a command doesn't work 
// TODO, create a log of how many times the user has used each command

    
// TODO  features/commands/phrases:
    //   // core language
    //   DONE, go to
    //   DONE, go back
    //   go forwards
    //   DONE, go up
    //   DONE, where am i (pwd)
    //   DONE, who am i (whoami)
    //   who are you
    //   DONE, whats my ip address (ip config)
    //   DONE, whats my mac address
    //   DONE, whats today (date)
    //   DONE, show files (ls)
    //   DONE, show hidden files (ls -a)
    //   show files and info (ls -l)
    //   DONE, who owns
    //   DONE, show permissions for __file
    //   DONE, change permissions for 
    //   change owner of 
    //   give __user permission to __ __files
    //   *make sure sudo is called when needed
    //   refresh (ls)
    //   whats running (top)
    //   DONE, open
    //   DONE, open with
    //   show more details
    //   that^ / he^ / she^ / they^ (uses the pipe command)
    //   sort by
    //   DONE-ish, *press up to see last message_*
    //   DONE, new file
    //   DONE, delete (rm -i, detect if folder rm -r)
    //   DONE, copy (cp and ditto, handles folders, handles links/alias)
    //   DONE, move
    //   DONE, rename
    //   DONE, new folder
    //   *have a hidden method for dealing with lots of output
    //   find (builds in grep)
    //   help
    //   exit
    //   *evaluates math */+-% ^ etc
    //   connect to (ssh,ftp)
    //   literally (handles escaping, stops smart input)
    //   run (complicated, depends on file type and whats installed)
    //   compile (complicated, depends on file type and whats installed)
    //   get/install (get package from homebrew)
    //   disable protection (pulls up warning and instructions)
    //   show processes
    //   stop process (kill / kill all)
    //   undo (might not be possible)
    //   reboot
    //   github
    //
    //
    //   // advanced
    //   run in background
    //   allow creation of a local website
    //   say (speaks text out loud)
    //   screenshot (screencapture)
    //   find and replace (sed and others)
    //   play (afplay for audio, something else for video)
    //   convert (af convert for audio)
    //   new alias (ln, shortcut, not Unix alias)
    //   zip
    //   unzip
    //   compress (gzip, tar)
    //   decompress
    //   prevent sleep (caffinate)
    //   compare/diff
    //   schedule (cron)
    //   geturl (curl)
    //   disk utility (diskutil)
    //   dns lookup (dig)
    //   show groups
    //   new variable 
    //   show vars (env)
    //   new function
    //   preview (head)
    //   new command
    //   print (literally prints out paper)
    //   printer info
    //   stop printing
    //   mount
    //   unmount (umount)
    //   set (set a variable to a value)
    //   share (using ftp, afp, etc)
    //
    //   // unaddressed
    //   if / for / until
    //   unset
    //   users
    //   wall (write message_ to users)
    //   ifconfig
    //   ipconfig
    //   iostat
    //   write (messags another user)
    //   hostname
    //   install
    //   jobs
    //   netcat / net / netstat
    //   passwd
    //   srm (secure remove)
    //   tmutil (time machine commands)
    //   trap (event programming unix)
    //   uname
    //   
      







// globals 
    var shell = require('shelljs'); // get access to shell commands
    var $ = require('jQuery');
    var dir_history = []
    var command_history = []
    var dont_run_message = false
    var message_input_Element = document.getElementById("messageInput");
    var suggestion_box = document.getElementById("suggestionBox")
    // create a reby object to hold some functions and variables 
    var reby = {
                says : function(message_)
                    {
                        // if there is no message_, then do nothing
                        if (message_ == "") { return }
                        
                        // get time and date
                        // get the time and date
                        // TODO, add am/pm instead of 24 hour time
                        var d = new Date();
                        var clock = d.getHours() + ":" + (('' + d.getMinutes).length < 2 ? '0' : '') + d.getMinutes() + ":" + (('' + d.getSeconds).length < 2 ? '0' : '') + d.getSeconds();
                        var month = d.getMonth() + 1;
                        var day = d.getDate();
                        var currentDate =
                          (('' + month).length < 2 ? '0' : '') + month + '/' +
                          (('' + day).length < 2 ? '0' : '') + day + '/' +
                          d.getFullYear() + '&nbsp;&nbsp;' + clock;
                        
                        
                        // replace newlines with \n
                        message_ = message_.replace(/\n/g,"<br>")
                        
                        // FIXME, check for accidental html-escape sequences 
                        
                        
                        // create Reby's response
                        $('form.chat div.messages').append('<div class="message"><div class="fromThem"><p>' + message_ + '</p><date><b>Reby </b>' + currentDate + '</date></div></div>');
                        
                        // Scroll down when the new message_ is made
                        var focusBottom = document.getElementById("main_container")
                        focusBottom.scrollTop = focusBottom.scrollHeight
                    },
                suggestions : ["show files","where am I?","create file ", "create folder", "go to ", "who am I?"],
                suggestion_index : 0,
                showSuggestions : function()
                    {
                        if (reby.suggestions.length < 1)
                            {
                                reby.suggestions = ["show files","where am I?","create file ", "create folder", "go to ", "who am I?"]
                            }
                        console.log("about to remove current suggestions");
                        // remove all the old suggestions 
                        for (var each in suggestion_box.childNodes)
                            {
                                // FIXME, this if statement is here because sometimes theres an error 
                                if (suggestion_box.childNodes.length > 0 )
                                    {
                                        suggestion_box.removeChild(suggestion_box.childNodes[0])
                                    }
                            }
                        console.log("about to add new suggestions");
                        for (var each in reby.suggestions)
                            {
                                // make an element for each one
                                    // create the paragraph 
                                    var paragraph_ = document.createElement("p")
                                    // add the text to the paragraph 
                                    paragraph_.innerHTML = reby.suggestions[each]
                                    // create the suggestion 
                                    var suggestion_ = document.createElement("div")
                                    // add the class 
                                    suggestion_.classList.add("suggestion")
                                    // put the paragraph_ in the suggestion_ 
                                    suggestion_.appendChild(paragraph_)
                                    // put the suggestion in the suggestionBox
                                    suggestion_box.appendChild(suggestion_)
                                // get or make the callback function 
                                    suggestion_.onclick = function()
                                        {
                                            message_input_Element.value = this.childNodes[0].innerHTML
                                            // FIXME, submit the thing 
                                            // $('form.chat input[type="submit"]').click()
                                            message_input_Element.focus()
                                        }
                            }
                        message_input_Element.placeholder = ""
                    }
            }


// initilize stuff
    // FIXME, this is currently just a workaround due to an issue with shelljs in electron  
    // see the github issue: https://github.com/shelljs/shelljs/wiki/Electron-compatibility
    shell.config.execPath = "/usr/local/bin/node"
    run = function(string)
        {
            // remove ending-newline 
            return shell.exec(string).stdout.replace(/\n$/,"")
        }
    // get the home_dir
    const home_dir = run('cd ;pwd')
    // add the home directory
    dir_history.push(home_dir)
    // add a blank command 
    command_history.push("")
    command_history_index = command_history.length -1
    // show the default suggestions 
    reby.showSuggestions()


// Onload
    window.onload = function() 
        {
            // focus on the main input box
            message_input_Element.focus()
        }



// Event-driven functions 
    // When enter is pressed, then simulate clicking submit 
        $("input").keypress(function(event) {
            const ENTER = 13;
            if (event.which == ENTER) {
                event.preventDefault();
                $('form.chat input[type="submit"]').click();
            }
        });

    // press up for history
        document.addEventListener('keydown', function(event) {
            const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
            if (key === "ArrowUp")
                {
                    // if possible, go back an index 
                    if (command_history_index > 1) { command_history_index -= 1 }
                    message_input_Element.placeholder = command_history[ command_history_index ]

                }
        });

    // Tab completion 
        // add a keydown listener to the input box
        // link it to keyHandler
        if (message_input_Element.addEventListener ) 
            {
                message_input_Element.addEventListener('keydown',this.keyHandler,false)
            } 
        // when tab is pressed, convert placeholder text to actual text 
        function keyHandler(an_event) 
            {
                console.log("the "+an_event.key+" was pressed");
                if(an_event.key === "Tab") 
                    {
                        // prevent the default tab (which would got to the next element)
                        an_event.preventDefault()
                        
                        // if there is placeholder text 
                        if (message_input_Element.placeholder.length > 0)
                            {
                                // if the placeholder text is different from the value
                                if (message_input_Element.value != message_input_Element.placeholder)
                                    {
                                        // convert the placeholder into the actual content 
                                        message_input_Element.value = message_input_Element.placeholder
                                        
                                    }
                                // if the placeholder text is equal to the current text 
                                // then tab will change the placeholder and value 
                                else 
                                    {
                                        // if there's another suggestion, then increment the suggestion_index
                                        if (reby.suggestion_index <= reby.suggestions.length-2)
                                            {
                                                reby.suggestion_index += 1
                                            }
                                        message_input_Element.value = reby.suggestions[reby.suggestion_index]
                                        message_input_Element.placeholder = reby.suggestions[reby.suggestion_index]
                                        
                                    }
                            }
                        else 
                            {
                                // if theres at least one suggestion
                                if (reby.suggestions.length > 0)
                                    {
                                        // set the placeholder equal to the suggestion 
                                        reby.suggestion_index = 0
                                        message_input_Element.placeholder = reby.suggestions[reby.suggestion_index]
                                    }
                            }
                            
                        // refocus on the text box 
                        message_input_Element.focus()                        
                        
                    }
            }



// helper functions 
    
    // this returns the the last dir in the dir_history
    // it also ensures there is a / at the end of the dir 
    function CurrentDir()
        {
            // current_dir is the last thing in the history 
            var current_dir_output = dir_history.slice(-1)[0]
            // make sure to add a / to the end of the current_dir if it doesn't have one
            if (current_dir_output.match(/[^\/]$/)) { current_dir_output += '/' }
            
            return current_dir_output
        }

    // stadard run is default way to run commands
    // most of rebys commands will use it
    function StandardRun(command) 
        {            
            console.log("current command:",command);
            console.log("CurrentDir:"+CurrentDir());
            // run the command as a bash command at the right directory
            raw_output = shell.exec("cd \""+CurrentDir()+"\";"+command)
            standard_run_output = raw_output.stdout
            
            console.log("output:" + standard_run_output);
            console.log("errors:" + raw_output.stderr);
            
            // if no output, but there is error output 
            if (standard_run_output == '' && raw_output.stderr != '')
                {
                    console.log("I think there was an error 😕");
                    standard_run_output = 'I think there was an error 😕 ' + raw_output.stderr
                }
            
            // remove ending-newline 
            standard_run_output = standard_run_output.replace(/\n$/,"")
            
            
            if (standard_run_output.length > 2000)
                {
                    // FIXME, make a way to deal with long messages 
                }
            
            return standard_run_output
        }
    


    // helper functions for Reby commands 
        // helps for excaping "" and such 
        function Escape(the_string)
            {
                // FIXME, this actually needs to do some escaping
                return '"'+the_string+'"'
            }
        // returns true if string is a form of "Yes" 
        function ParseYesOrNo(the_string)
            {
                // FIXME, this needs to be more robust
                if (the_string.match(/ *Yes */i))
                    {
                        return true
                    }
                else if (the_string.match(/ *No */i))
                    {
                        return false
                    }
                else 
                    {
                        return null 
                    }
            }
        // returns true if the current account is an admin account
        function UserIsAdmin(user=null)
            {
                if (user == null)
                    {
                        return StandardRun('id -Gn $whoami').search(/\badmin\b/)
                    }
                else 
                    {
                        return StandardRun('id -Gn '+user).search(/\badmin\b/)
                    }
            }
        // returns the current account's username
        function CurrentUsersname()
            {
                return StandardRun("whoami")
            }
        // the raw name of the account that owns the file
        function WhoOwns(file_location)
            {
                // FIXME, escaping needs to be added 
                // FIXME, handle folder cases 
                // FIXME, handle confirmation in unix
                return StandardRun('stat -f %Su "' + file_location + '"')
            }
        // returns a permissions object
        function PermissionsFor(file_location)
            {
                // FIXME, escaping needs to be added 
                // FIXME, handle folder cases 
                // FIXME, handle confirmation in unix
                raw_permissions = StandardRun('stat -f "%Sp" "' + file_location + '"')
                
                owner_per     = raw_permissions.slice(1,4)
                groups_per    = raw_permissions.slice(4,7)
                everyones_per = raw_permissions.slice(7,10)
                
                owner_ = WhoOwns(file_location)
                group_ = StandardRun('stat -f "%Sg" "'+file_location+'"')
                
                return {
                    owner    : { name : owner_ , canRead : owner_per    .search(/r/) != -1 , canWrite : owner_per    .search(/w/) != -1 , canExecute : owner_per    .search(/x/) != -1 } ,
                    group    : { name : group_ , canRead : groups_per   .search(/r/) != -1 , canWrite : groups_per   .search(/w/) != -1 , canExecute : groups_per   .search(/x/) != -1 } ,
                    everyone : {                 canRead : everyones_per.search(/r/) != -1 , canWrite : everyones_per.search(/w/) != -1 , canExecute : everyones_per.search(/x/) != -1 } ,
                }
                
            }
        // returns true if a user is part of a group
        function GroupIncludesUser(group_name,username_=null)
            {
                if (username_ == null)
                    {
                        username_ = CurrentUsersname()
                    }
                users_groups = StandardRun('id -Gn "'+username_+'"')
                regex_pattern = new RegExp("\\b"+group_name+"\\b")
                if (users_groups.search(regex_pattern) > -1)
                    {
                        return true
                    }
            }
        // has Reby talk about the permissions for a file
        function ShowPermissionsFor(file_location)
            {
                the_permissions = PermissionsFor(file_location)
                permissions_output = ""
                
                // talk about the owner 
                if (WhoOwns(file_location) == CurrentUsersname())
                    {
                        
                        can_do = ""
                        if (the_permissions.owner.canRead    ) { can_do += "    look at the file\n" }
                        if (the_permissions.owner.canWrite   ) { can_do += "    edit the file\n"    }
                        if (the_permissions.owner.canExecute ) { can_do += "    run the file\n"     }
                        if (can_do != "") { can_do = "owner: You can:\n" + can_do }
                        
                        cant_do = ""
                        if (!the_permissions.owner.canRead    ) { cant_do += "    look at the file\n" }
                        if (!the_permissions.owner.canWrite   ) { cant_do += "    edit the file\n"    }
                        if (!the_permissions.owner.canExecute ) { cant_do += "    run the file\n"     }
                        if (cant_do != "") { cant_do = "owner: You're not able to:\n" + cant_do }
                        
                        connect_with = "\n"
                        if (cant_do == "" || can_do == "") { connect_with = "" }
                        permissions_output += can_do + connect_with + cant_do + "\n"
                        
                    }
                else if (WhoOwns(file_location) == 'root')
                    {
                        // root can do anything so no need to say anything
                    }
                else  
                    {
                        
                        can_do = ""
                        if (the_permissions.owner.canRead    ) { can_do += "    look at the file\n" }
                        if (the_permissions.owner.canWrite   ) { can_do += "    edit the file\n"    }
                        if (the_permissions.owner.canExecute ) { can_do += "    run the file\n"     }
                        if (can_do != "") { can_do  = "owner: "+the_permissions.owner.name + "(another user) can:\n" + can_do }
                        
                        cant_do = ""
                        if (!the_permissions.owner.canRead    ) { cant_do += "    look at the file\n" }
                        if (!the_permissions.owner.canWrite   ) { cant_do += "    edit the file\n"    }
                        if (!the_permissions.owner.canExecute ) { cant_do += "    run the file\n"     }
                        if (cant_do != "") { cant_do = "owner: "+the_permissions.owner.name + "(another user) is not able to:\n" + cant_do }
                        
                        connect_with = "\n"
                        if (cant_do == "" || can_do == "") { connect_with = "" }
                        permissions_output += can_do + connect_with + cant_do + "\n"
                    }
                
                // talk about the group
                // if the current user is not the owner 
                // and current user is in the group
                if ( (the_permissions.owner.name != CurrentUsersname()) && (GroupIncludesUser(the_permissions.group.name)) )
                    {
                        
                        can_do = ""
                        if (the_permissions.group.canRead    ) { can_do += "    look at the file\n" }
                        if (the_permissions.group.canWrite   ) { can_do += "    edit the file\n"    }
                        if (the_permissions.group.canExecute ) { can_do += "    run the file\n"     }
                        if (can_do != "") { can_do = "group: You (and everyone else in "+the_permissions.group.name+") can:\n" + can_do }
                        
                        cant_do = ""
                        if (!the_permissions.group.canRead    ) { cant_do += "    look at the file\n" }
                        if (!the_permissions.group.canWrite   ) { cant_do += "    edit the file\n"    }
                        if (!the_permissions.group.canExecute ) { cant_do += "    run the file\n"     }
                        if (cant_do != "") { cant_do = "group: You (and everyone else in "+the_permissions.group.name+") are not able to:\n" + cant_do }
                        
                        connect_with = "\n"
                        if (cant_do == "" || can_do == "") { connect_with = "" }
                        permissions_output += can_do + connect_with + cant_do + "\n"

                    }
                else 
                    {
                        
                        can_do = ""
                        if (the_permissions.group.canRead    ) { can_do += "    look at the file\n" }
                        if (the_permissions.group.canWrite   ) { can_do += "    edit the file\n"    }
                        if (the_permissions.group.canexecute ) { can_do += "    run the file\n"     }
                        if (can_do != "") { can_do = "group: Everyone in "+the_permissions.group.name+" can:\n" + can_do }
                        
                        cant_do = ""
                        if (!the_permissions.group.canRead    ) { cant_do += "    look at the file\n" }
                        if (!the_permissions.group.canWrite   ) { cant_do += "    edit the file\n"    }
                        if (!the_permissions.group.canexecute ) { cant_do += "    run the file\n"     }
                        if (cant_do != "") { cant_do = "group: Everyone in "+the_permissions.group.name+" is not able to:\n" + cant_do }
                        // FIXME, check if the file owner is in the group
                        // if they are in the group (and the owner is not the current user)
                        // then say "Everyone other than " owner can/cant ... 
                        // FIXME, if 
                        //    user is in the group 
                        //    but the user is also the owner, 
                        //    and the owner has less permissions than the group 
                        // then 
                        //    say "Everyone in the group except you"
                        
                        connect_with = "\n"
                        if (cant_do == "" || can_do == "") { connect_with = "" }
                        permissions_output += can_do + connect_with + cant_do + "\n"

                    }
                
                // talk about everyone else
                can_do = ""
                if (the_permissions.everyone.canRead    ) { can_do += "    look at the file\n" }
                if (the_permissions.everyone.canWrite   ) { can_do += "    edit the file\n"    }
                if (the_permissions.everyone.canexecute ) { can_do += "    run the file\n"     }
                if (can_do != "") { can_do = "everyone: Everyone else can:\n" + can_do }
                
                cant_do = ""
                if (!the_permissions.everyone.canRead    ) { cant_do += "    look at the file\n" }
                if (!the_permissions.everyone.canWrite   ) { cant_do += "    edit the file\n"    }
                if (!the_permissions.everyone.canexecute ) { cant_do += "    run the file\n"     }
                if (cant_do != "") { cant_do = "everyone: Everyone else is not able to:\n" + cant_do }
                connect_with = "\n"
                if (cant_do == "" || can_do == "") { connect_with = "" }
                permissions_output += can_do + connect_with + cant_do + "\n"

                reby.says(permissions_output)
            }

// when submitted 
$('form.chat input[type="submit"]').click(function(event) {
    event.preventDefault();
    

    // get the user's command 
    var original_message  = $('form.chat input[type="text"]').val();
        
    // if there was input in the text box 
    if ($('form.chat input[type="text"]').val()) 
        {

            // Handle command_history
                // add the new command 
                command_history.push(original_message)
                // reset the command_history_index so that its 
                // the last element in the history
                command_history_index = command_history.length 

            // get the time and date
            // TODO, add am/pm instead of 24 hour time
            var d = new Date();
            var clock = d.getHours() + ":" + (('' + d.getMinutes).length < 2 ? '0' : '') + d.getMinutes() + ":" + (('' + d.getSeconds).length < 2 ? '0' : '') + d.getSeconds();
            var month = d.getMonth() + 1;
            var day = d.getDate();
            var currentDate =
              (('' + month).length < 2 ? '0' : '') + month + '/' +
              (('' + day).length < 2 ? '0' : '') + day + '/' +
              d.getFullYear() + '&nbsp;&nbsp;' + clock;
            
            // create the user's command
            // FIXME, swap \n for break-statements 
            $('form.chat div.messages').append('<div class="message"><div class="myMessage"><p>' + original_message + '</p><date><b>You </b>' + currentDate + '</date></div></div>');
            
            // create the progress/loading bar at the top
            setTimeout(function() {
                    $('form.chat > span').addClass('spinner');
                }, 100);
            setTimeout(function() {
                    $('form.chat > span').removeClass('spinner');
                }, 2000);
            
            // reset the placeholder text 
            // FIXME, give a placeholder 
            message_input_Element.placeholder = ''

            
            
        }
    // get rid of the text in the input field 
    $('form.chat input[type="text"]').val('');
    
    // Scroll down when the new message_ is made
    var focusBottom = document.getElementById("main_container")
    focusBottom.scrollTop = focusBottom.scrollHeight
    
    // give Reby the message_
    RebyResponse(original_message)
})




// initial_checks is a list of functions that should return either a response-function or null
initial_checks = []
// response_functions will contain the next response reby should give
response_functions = []
// this is the reby command class 
RebyCommand = function(input_ = {name:"", initial_check:function(the_command){},responses:{}})
    {
        initial_checks.push(input_.initial_check)
        this.responses = input_.responses
    }


showfiles_Command            = new RebyCommand({name:"showfiles_Command"   ,
        initial_check : function(the_command)
            {
                if (the_command.match(/^show files */i))
                    {
                        return function(message_)
                            {
                                reby.says("Here they are:\n\n" + StandardRun('ls -1'))
                                reby.suggestions = [ "go to ", "show hidden files", "create folder ", "delete " , "rename ", "move ", "copy ", "create file ", "who owns ", "show permissions for " ]
                            }
                    }
            }
    })
goto_Command                 = new RebyCommand({name:"goto_Command"        ,
    initial_check: function(the_command)
            {
                if(the_command.match(/^go ?to +/) )
                    {
                        return function(message_)
                            {
                                // remove the goto from the message_
                                message_ = message_.replace(/^go ?to +/,"")
                                // FIXME, check that the new location exists (local or global)
                                
                                // TODO, add special cases like Desktop and Downloads
                                
                                // check if its a global or local location, then add the new location
                                if (message_.match(/^\//)) { dir_history.push(message_)              }
                                else                        { dir_history.push(CurrentDir()+message_) }
                                // FIXME, handle escaping of things
                                // set the ls message_
                                reby.says("Okay, here's the new location's files:\n\n" + StandardRun('ls -1'))
                                reby.suggestions = ["go back","go up","go home","show hidden files", "open "]
                            }
                    }
            },
})
goback_Command               = new RebyCommand({name:"goback_Command"      ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^go back */))
                {
                    return function(message_)
                        {
                            // globals:
                                // dir_history
                                
                            // if there is history left 
                            if (dir_history.length > 1)
                                {
                                    // then remove one from the history
                                    dir_history.pop()
                                    reby.says("Okay, here's the new location's files:\n\n" + StandardRun('ls -1'))
                                }
                            else 
                                {
                                    // TODO, make this a better message_ 
                                    reby.says("There's no more history")
                                }
                            reby.suggestions = ["go to ","where am I?","go up","show hidden files", "open "]
                        }
                }
        },
})
goup_Command                 = new RebyCommand({name:"goup_Command"        ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^go up */))
                {
                    return function (message_) 
                        {
                            // globals:
                                // dir_history
                            

                            // find the parent directory 
                            var parent_dir = StandardRun("cd ..;pwd")
                            // add it to the history
                            dir_history.push(parent_dir)
                            // FIXME, handle escaping of things
                            reby.says( "Okay, here's the new location's files:\n\n" + StandardRun("ls -1") )
                            reby.suggestions = ["go to ","where am I?","show hidden files","go home", "open "]
                        }

                }
        }
})
gohome_Command               = new RebyCommand({name:"gohome_Command"      ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^go home */))
                {
                    return function(message_)
                        {
                            // globals:
                                // dir_history 
                            
                            dir_history.push(home_dir)
                            reby.suggestions = ["go back","go to ","go up","show hidden files", "open "]
                        }
                }
        }
}) 
whereami_Command             = new RebyCommand({name:"whereami_Command"    ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^where ?am ?i[\?]? */i))
                {
                    return function(message_)
                        {
                            reby.says("In the file system, you're at:\n"+StandardRun("pwd"))
                            reby.suggestions = [ "show files", "go to ","go up","go home","show hidden files", "open "]
                        }
                }
        }
})
whoami_Command               = new RebyCommand({name:"whoami_Command"      ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^who ?am ?i[\?]? */i))
                {
                    return function(message_)
                        {
                            reby.says("I'm not not really sure who you are, but your current username is:" + StandardRun("whoami"))
                            reby.suggestions = [ "whats my ip address?", "whats my mac address?", "show hidden files" ]
                        }
                }
        },
})
whatsmyip_Command            = new RebyCommand({name:"whatsmyip_Command"   ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^what('?s| is) ?my ?ip ?address\?? */i))
                {
                    return function(message_)
                        {
                            // FIXME, make sure to check and make sure that en0 is their wireless card 
                                    // and that they are using wireless and not ethernet 
                            // FIXME, test for internet connection as Public: will fail if there is no internet 
                            reby.says("You have two main ip addresses"+
                            "\nLocal: " +StandardRun("ipconfig getifaddr en0")+
                            "\nPublic: "+StandardRun("curl -s http://checkip.dyndns.org/ | sed 's/[a-zA-Z<>/ :]//g'"))
                            reby.suggestions = [ "whats my mac address?", "who am I?", "show hidden files" ]
                        }
                }
        }
})
whatsmymacaddress_Command    = new RebyCommand({name:"whatsmymacaddress_Command",
    initial_check : function(the_command)
        {
            if (the_command.match(/^what('?s| is) ?my ?mac ?addres\?? */i))
                {
                    return function(message_)
                        {
                            // get the mac address line using ifconfig
                            mac_address_line = StandardRun('ifconfig en0 | grep "ether"')
                            // get rid of the intro "ether" text 
                            mac_address_line = mac_address_line.replace(/ether */g,"")
                            // display the line 
                            reby.says("Your mac address is: "+mac_address_line)
                            reby.suggestions = [ "whats my ip address?", "show files", "show hidden files" ]
                        }
                }
        }
})
whatstoday_Command           = new RebyCommand({name:"whatstoday_Command"  ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^what('?s| is) ?today\?? */i))
                {
                    return function(message_)
                        {
                            reby.says("Today is: "+StandardRun("date"))
                        }
                }
        }
})
whoowns_Command              = new RebyCommand({name:"whoowns_Command"     ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^who ?owns +/i))
                {
                    return function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle folder cases 
                            // FIXME, handle confirmation in unix
                            file_location = message_.replace(/^who ?owns\?? */,"")
                            owner_        = WhoOwns(file_location)

                            if (owner_ == CurrentUsersname())
                               {
                                   reby.says("You own it")
                               }
                            else if (owner_ == 'root')
                               {
                                   // check if current user is admin
                                   if (UserIsAdmin())
                                       {
                                           reby.says("You own it") 
                                           reby.says("But it is protected so you'll be asked for you password before you're allowed to change it")
                                       }
                                   else 
                                       {
                                           reby.says("The administrator account(s) own it")
                                           reby.says("(There's no single administrator that owns it)")
                                       }
                               }
                            else  
                               {
                                   reby.says("The owner is "+owner_)
                               }
                        }
                }
        }
})
showpermissionsfor_Command   = new RebyCommand({name:"showpermissionsfor_Command",
    initial_check : function(the_command)
        {
            if (the_command.match(/^show ?permissions ?for +/))
                {
                    return function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle folder cases 
                            // FIXME, handle confirmation in unix
                            file_location = message_.replace(/^show ?permissions ?for */,"")
                            
                            // have reby talk about the permissions 
                            ShowPermissionsFor(file_location)
                            
                            // give a warning about admins
                            permissions_output = "NOTE: if someone is an administrator, they can change these rules" 
                            if (UserIsAdmin())
                                {
                                    permissions_output += "\nSince you're an administrator, you can change these rules"
                                }
                            reby.says(permissions_output)
                        }
                }
        }
})
changepermissionsfor_Command = new RebyCommand({name:"changepermissionsfor_Command",
    initial_check : function(the_command)
        {
            if (the_command.match(/^change ?permissions ?for +/i))
                {
                    return function(message_)
                        {
                            
                            // FIXME, handle folder cases
                            // FIXME, escaping needs to be added 
                            // FIXME, this needs to be a multi-step message_
                            changepermissionsfor_Command.file_location = message_.replace(/^change ?permissions ?for +/,"") 
                            changepermissionsfor_Command.file_name     = StandardRun('basename '+changepermissionsfor_Command.file_location)
                            reby.says("Okay here are the current permissions")
                            ShowPermissionsFor(changepermissionsfor_Command.file_location)
                            
                            //#MULTI_STEP
                            // ask question
                            reby.says("Whose permissions would you like to change?")
                            // give some suggesstions 
                            reby.suggestions = [ "the owner's" , "the group's" , "everyone else's" ]
                            // return the next step
                            return changepermissionsfor_Command.responses.whosePermissions
                            
                        }
                }
        },
    responses :
        {
            whosePermissions : function(message_)
                {
                    // the message_ should be an answer to "Whose permissions would you like to change?"
                    // FIXME, this needs to be more restricted
                    // FIXME, there needs to be an "everyone" and an "everyone else"
                         if (message_.search(/owner/   ) != -1) { message_ = "the owner"; changepermissionsfor_Command.which_level_char = 'u' }
                    else if (message_.search(/group/   ) != -1) { message_ = "the group"; changepermissionsfor_Command.which_level_char = 'g' }
                    else if (message_.search(/everyone/) != -1) { message_ = "everyone" ; changepermissionsfor_Command.which_level_char = 'o' }
                    
                    // keep the which_level variable for another function 
                    changepermissionsfor_Command.which_level = message_
                    // ask the question 
                    reby.says("Should "+changepermissionsfor_Command.which_level+" be able to look at the file?")
                    // give suggestions 
                    reby.suggestions = [ "Yes" , "No" ]
                    // return the next step 
                    return changepermissionsfor_Command.responses.canRead
                },
            canRead : function(message_)
                {
                    // the message_ should be an answer to "Should "+changepermissionsfor_Command.which_level+" be able to look at the file?"
                    changepermissionsfor_Command.can_read = ParseYesOrNo(message_)
                    // FIXME, handle non y/n responses 
                    
                    // ask about write permissions
                    reby.says("Should "+changepermissionsfor_Command.which_level+" be able to edit the file?")
                    // give suggestions
                    reby.suggestions = ["Yes", "No"]
                    // activate next step
                    return changepermissionsfor_Command.responses.canWrite
                },
            canWrite : function(message_)
                {
                    // the message_ should be an answer to "Should "+changepermissionsfor_Command.which_level+" be able to edit the file?"
                    changepermissionsfor_Command.can_write = ParseYesOrNo(message_)
                    // FIXME, handle non y/n responses
                    
                    
                    // ask about exec permissions
                    reby.says("Should "+changepermissionsfor_Command.which_level+" be able to run the file?")
                    // give suggestions
                    reby.suggestions = ["Yes","No"]
                    // return next step 
                    return changepermissionsfor_Command.responses.canExecute
                },
            canExecute : function(message_)
                {
                    // the message_ should be an answer to "Should "+changepermissionsfor_Command.which_level+" be able to execute the file?"
                    changepermissionsfor_Command.can_execute = ParseYesOrNo(message_)
                    // FIXME, handle non y/n responses
                    
                    // FIXME, handle scenarios where user does not have permission to change permissions
                    if (changepermissionsfor_Command.can_read    === true ) { StandardRun('chmod '+changepermissionsfor_Command.which_level_char+'+r '+Escape(changepermissionsfor_Command.file_location)) }  
                    if (changepermissionsfor_Command.can_write   === true ) { StandardRun('chmod '+changepermissionsfor_Command.which_level_char+'+w '+Escape(changepermissionsfor_Command.file_location)) } 
                    if (changepermissionsfor_Command.can_execute === true ) { StandardRun('chmod '+changepermissionsfor_Command.which_level_char+'+x '+Escape(changepermissionsfor_Command.file_location)) } 
                    if (changepermissionsfor_Command.can_read    === false) { StandardRun('chmod '+changepermissionsfor_Command.which_level_char+'-r '+Escape(changepermissionsfor_Command.file_location)) }  
                    if (changepermissionsfor_Command.can_write   === false) { StandardRun('chmod '+changepermissionsfor_Command.which_level_char+'-w '+Escape(changepermissionsfor_Command.file_location)) } 
                    if (changepermissionsfor_Command.can_execute === false) { StandardRun('chmod '+changepermissionsfor_Command.which_level_char+'-x '+Escape(changepermissionsfor_Command.file_location)) } 
                    
                    
                    // give confirmation 
                    reby.says("Okay, the permissions have been changed")
                    // give suggestions
                    reby.suggestions = [ "show permissions for "+changepermissionsfor_Command.file_location ]
                    // delete extra variables 
                    delete changepermissionsfor_Command.file_location
                    delete changepermissionsfor_Command.file_name
                    delete changepermissionsfor_Command.can_read
                    delete changepermissionsfor_Command.can_write
                    delete changepermissionsfor_Command.can_execute
                }
        }
})
showhiddenfiles_Command      = new RebyCommand({name:"showhiddenfiles_Command",
    initial_check : function(the_command)
    {
        if (the_command.match(/^show hidden files */i))
            {
                return function(message_)
                    {
                        reby.says("Here they are:\n\n" + StandardRun('ls -a | grep \'^\\.\'| grep -v "^\\\\.\\\\.$"| grep -v "^\\\\.$"'))
                    }
            }
    }
})
openwith_Command             = new RebyCommand({name:"openwith_Command"    ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^open +(.*[^ ]) +with(?=( *))\2(.+?) *$/i))
                {
                    return function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle confirmation in unix
                            // get the dir of the file 
                            reby.says("Okay, opening")
                            var file_location = message_.replace(/^open +(.*[^ ]) +with(?=( *))\2(.+?) *$/,"$1")
                            var app_name      = message_.replace(/^open +(.*[^ ]) +with(?=( *))\2(.+?) *$/,"$3")
                            // delay the action for a sec so the user can read the message_
                            setTimeout(function(){
                                reby.says(StandardRun('open "'+file_location+'" -a "'+app_name+'"'))
                            },100)
                        }
                }
        }
})
open_Command                 = new RebyCommand({name:"open_Command"        ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^open +/i))
                {
                    return function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle folder cases 
                            // FIXME, handle confirmation in unix
                            // get the dir of the file 
                            reby.says("Okay, opening")
                            file_location = message_.replace(/^open +/,"")
                            // delay the action for a sec so the user can read the message_
                            setTimeout(function(){
                                reby.says(StandardRun('open "'+file_location+'"'))
                            },100)
                        }
                }
        }
})
createfolder_Command         = new RebyCommand({name:"createfolder_Command",
    initial_check : function(the_command)
        {
            if (the_command.match(/^create folder( named|) +/i))
                {
                    return function(message_)
                        {
                            // FIXME, escaping needs to be added
                            StandardRun('mkdir "'+ message_.replace(/^create folder( named|) +/,"") + '"')
                            reby.says("Finished") 
                        }
                }
        }
})
createfile_Command           = new RebyCommand({name:"createfile_Command"  ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^create file( named|) +/i))
                {
                    return function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            StandardRun('touch "'+ message_.replace(/^create file( named|) +/,"") + '"')
                            reby.says("Finished")
                        }
                }
        }
})
delete_Command               = new RebyCommand({name:"delete_Command"      ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^delete +/i))
                {
                    return function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle folder cases 
                            // FIXME, handle confirmation in unix
                            // get the dir of the file
                            file_location = message_.replace(/^delete +/,"")
                            // delete the file 
                            StandardRun('rm "'+file_location+'"')
                            // give a response
                            reby.says("Finished")
                        }
                }
        }
})
move_Command                 = new RebyCommand({name:"move_Command"        ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^move +/i))
                {
                    return function(message_)
                        {
                            // FIXME, handle folder cases
                            // FIXME, escaping needs to be added 
                            // FIXME, this needs to be a two-step message_
                            move_Command.file_location = message_.replace(/^move +/,"") 
                            move_Command.file_name     = StandardRun('basename '+file_location)
                            //#TWO_STEP 
                            reby.says("Where would you like to move it?")
                            // return the next step in order to get the user's next message
                            return move_Command.responses.step2
                        }
                }
        },
    responses : 
        {
            step2: function(message_)
                {
                    // FIXME, both file_location and file_new_location need to have error handling 
                    
                    // add a / if there isn't one at the end
                    if (message_.match(/[^\/]$/)) { message_ += '/' }
                    // run the message_ 
                    StandardRun('mv "'+move_Command.file_location+'" "'+message_+move_Command.file_name+'"')
                    // give a response
                    reby.says("Okay, finished")
                    // delete the extra variables
                    delete move_Command.file_location
                    delete move_Command.file_name
                }
        }
}) 
rename_Command               = new RebyCommand({name:"rename_Command"      ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^rename +/i))
                {
                    return function(message_)
                        {
                            // FIXME, handle folder cases
                            // FIXME, escaping needs to be added 
                            // FIXME, this needs to be a two-step message_
                            rename_Command.file_location = message_.replace(/^rename +/,"") 
                            //#TWO_STEP 
                            reby.says("What would you like to call it?")
                            // go to next step
                            return rename_Command.responses.step2
                        }
                }
        },
    responses :
        {
            step2 : function(message_)
                {
                    // FIXME, need error handling for filenames 
                    // ex: filenames that already exist
                    // ex: invalid characters
                    
                    // run the message_ 
                    StandardRun('mv "'+rename_Command.file_location+'" "'+message_+'"')
                    // give a response
                    reby.says("Okay, finished")
                    // delete the extra variables
                    delete rename_Command.file_location
                }
        }
})
copy_Command                 = new RebyCommand({name:"copy_Command"        ,
    initial_check : function(the_command)
        {
            if (the_command.match(/^copy +/i))
                {
                    return function(message_)
                        {
                            // FIXME, handle folder cases
                            // FIXME, escaping needs to be added 
                            // FIXME, this needs to be a two-step message_
                            copy_Command.file_location = message_.replace(/^copy +/,"") 
                            copy_Command.file_name     = StandardRun('basename '+copy_Command.file_location)
                            //#TWO_STEP 
                            reby.asks("Where would you like to copy it to?")
                            // return the next step 
                            return copy_Command.responses.step2
                        }
                }
        },
    responses :
        {
            step2 : function(message_)
                {
                    // FIXME, both file_location and file_new_location need to have error handling 
                    
                    // add a / if there isn't one at the end
                    if (message_.match(/[^\/]$/)) { message_ += '/' }
                    // run the message_ 
                    StandardRun('cp "'+copy_Command.file_location+'" "'+message_+copy_Command.file_name+'"')
                    // give a response
                    reby.says("Okay, finished")
                    // delete extra variables
                    delete copy_Command.file_location
                    delete copy_Command.file_name
                }
                
        }
})



function RebyResponse(a_command)
    {
        // reset reby's suggestions before each response
        reby.suggestions = []
        reby.suggestion_index = 0
        
        // if there are no commands ready to run
        // then run the initial_checks 
        if (response_functions.length === 0)
            {
                for (var each in initial_checks)
                    {
                        console.log(initial_checks[each].Name);
                        var result_ = initial_checks[each](a_command)
                        // FIXME, do a better check 
                        if (result_ != null)
                            {
                                response_functions.push(result_)
                                break
                            }
                    }
            }
        
        // if there are no commands after all the initial checks 
        // then run the message_ as a bash commands 
        if (response_functions.length === 0)
            {
                reby.says("I think thats a bash message\nThis is what bash said after I ran it:\n")
                reby.says(StandardRun(a_command))
            }
        else 
            {
                // run the response function, remove it from the list, save its result
                var result_ = response_functions.pop()(a_command)
                // if there is a result 
                if (result_ != null)
                    {
                        // FIXME, add a check that makes sure that the result_ is actually the correct type
                        // then add it as the next function to run
                        response_functions.push(result_)
                    }
            }
        
        // show the suggestions at the end of each message
        reby.showSuggestions()
    }



