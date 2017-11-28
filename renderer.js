

// How this program works
    // Example 
        // user types "where am i"
            // input_ callback function starts 
            // input_ function generates a GUI "where am i" message bubble 
            // input_ function gives "where am i" to the reby-response function
                // reby-response function starts 
                // part 1 of reby response 
                    // RESPONSE_FUNCTIONS array is empty 
                    // therefore run each function in the initial_check_functions array 
                        // example of on of those functions:
                            // does "where am i" == what_the_user_typed
                            // if so, then return a function of what to do next
                    // if one of the initial_check_functions returns a function
                    // then put that returned-function in the RESPONSE_FUNCTIONS array
                // part 2 of reby response
                    // if the is a function in the RESPONSE_FUNCTIONS array
                    // then run the top-most function
                    // example"
                        // if user typed "where am i" then the reponse function
                        // generates a GUI message "You are at " + Bash("pwd") 
        // wait for next user input_
        //
        // I got this original interface from https://codepen.io/adobewordpress/pen/wGGMaV
        // I reworked it and added functionality, but thats what I originally started with 

// Stuff that needs to be done
    // FIXME, figure out how to handle continuously updating bash output (ex: top)
    // TODO, add a server disconnect method 
    // TODO, clean up all the global bash variables into one object 
    // FIXME, go back is broken
    // FIXME, create a timeout for the bash commands, especially ssh 
    // TODO, make scripting possible
    // TODO, add all the standard shortcuts (quit, minimize, etc)
    // TODO, get rid of the little message bubble tails 
    // FIXME, add error messages for things that don't work in ssh (like opening a file)
    // FIXME, add more error handling (especially for sudo)
    // FIXME, keep track of hidden/accidental directory changes (like using cd or running a script)
    // TODO, add animation for messages being sent
    // TODO, maybe add help messages for each of the commands
    // FIXME, figure out how to handle aliases (right now they're considered a file and cant be followed)
    // FIXME, figure out how to show apps (and other 'files' that are actually folders) in an intuitive way
    // TODO, fix the 'everyone in wheel can:' make it skip if it's wheel 
    // TODO, take away title bar with BrowserWindow({titleBarStyle: 'hiddenInset'}); and then make a titlebar div and in CSS set -webkit-app-region: drag
    // TODO, allow different behavior for different suggestions
        // ex: if the suggestion-command doesn't need any arguemnts, then clicking it runs it instantly 
        // ex: allow one-off suggestions like "Why?" that can be used when a command doesn't work 
    // TODO, create a log of how many times the user has used each command
    // TODO, throughout the usage of the app, quiz the user to figure out how much computer science they know 
    // TODO, check for files/folders that have leading-whitespace, trailing-whitespace, or whose names are only whitespace
    // TODO, implement suggestions in the touchbar for mac 
    // TODO, make sure nothing seems illogical for the user due to symbolic links always being followed
    // TODO, figure out how to make a grid/table in html, then use that for show stuff with info
    // TODO, make reby's messages side scroll instead of wrap 
    // TODO, make large output (>~50 lines) scroll vertically instead of just being a giant message
    // FIXME, issues with unlocking files (ex: Unable to change file mode on CekoLibrary.h: Operation not permitted)
    // FIXME, you can vertically scroll in the suggestions box (you shouldn't be able to)
    // TODO, improve tab suggestions:
            // figure out a solution for multi-input commands (open _ with _)
            // alternate between file suggestions as you type (if one is a longer version than another)
    // FIXME, even for regular input like program names or usernames, make sure they don't contain ;'s
    // FIXME, handle going home in ssh
    //
    // DONE!, make the x button actually quit the program
    // DONE!, change hover to not move the element down 
    // DONE!, text box can't paste in electron once built into app. 
    //
    //
    // TODO  features/commands/phrases:
    //   // core language
    //   search
    //   how big is
    //   show info for 
    //   go forwards
    //   change owner of 
    //   give __user permission to __ __files
    //   *make sure sudo is called when needed
    //   whats running (top)
    //   DONE, go to
    //   DONE, go back
    //   DONE, go up
    //   DONE, where am i (pwd)
    //   DONE, who am i (whoami)
    //   DONE, who are you 
    //   DONE, whats my ip address (ip config)
    //   DONE, whats my mac address
    //   DONE, whats today (date)
    //   DONE, show stuff (ls)
    //   DONE, show files 
    //   DONE, show folders 
    //   DONE, show hidden stuff (ls -a)
    //   DONE, show hidden files
    //   DONE, show hidden folders
    //   DONE, show stuff and info (ls -l)
    //   DONE, who owns
    //   DONE, show permissions for __file
    //   DONE, change permissions for 
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
    //   find (built in grep)
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
    //   show current custom command
    //   create custom command
    //   create "I know" responses to messages to stop them from happening
    //   delay (do a command after waiting)
    //
    //
    //   // advanced
    //   run in background "this seems to be taking awhile, would you like me to run this in the background?" , make sure to make an exception to this for things that change the input
    //   auto make a key for ssh and other connections 
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
    //   print (literally prints out sheets of paper)
    //   printer info
    //   stop printing
    //   mount
    //   unmount (umount)
    //   set (set a variable to a value)
    //   share (using ftp, afp, etc)
    //   save ___ to a file
    //   convert __ to __ (pdf to image, or mp4 to avi, etc)
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
    var $              = require('jQuery') 
    const { spawn }    = require('child_process');
    const bash_process = spawn('bash\n', { shell: true })
    bash_process.stdin.write("cd $HOME/Desktop\n")
    var location_history = []
    var command_history  = []
    var dont_run_message = false
    var message_input_Element = document.getElementById("messageInput")
    var shadowText            = document.getElementById("suggestionOverlay")
    var body                  = document.getElementsByClassName('body')
    var suggestion_box        = document.getElementById("suggestionBox")
    // create a reby object to hold some functions and variables 
    var reby = {
                says : function(message_,monospaced_font=false)
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
                        if (monospaced_font)
                            {
                                $('form.chat div.messages').append('<div class="message"><div class="fromThem"><p class="monospaced">' + message_ + '</p><date><b>Reby </b>' + currentDate + '</date></div></div>');
                            }
                        else 
                            {
                                $('form.chat div.messages').append('<div class="message"><div class="fromThem"><p>' + message_ + '</p><date><b>Reby </b>' + currentDate + '</date></div></div>');
                            }
                        
                        // Scroll down when the new message_ is made
                        var focusBottom = document.getElementById("main_container")
                        focusBottom.scrollTop = focusBottom.scrollHeight
                    },
                suggestions : ["show stuff","where am I?","create file [file's name]", "create folder", "go to ", "who am I?"],
                suggestion_index : 0,
                showSuggestions : function()
                    {
                        // remove any blank elements 
                        local_index = 0
                        while (local_index+1 <= reby.suggestions.length)
                            {
                                // if the string is ""
                                if (reby.suggestions[local_index].length == 0)
                                    {
                                        reby.suggestions.splice(local_index,1)
                                        // don't increment on deletion
                                    }
                                else 
                                    {
                                        // increment if nothing was deleted
                                        local_index += 1
                                    }
                            }
                        
                        // if theres nothing in the suggestions box then add the default suggestions 
                        if (reby.suggestions.length < 1)
                            {
                                //console.log("suggestions was empty:",reby.suggestions);
                                reby.suggestions = ["show stuff","where am I?","create file ", "create folder", "go to ", "who am I?"]
                            }
                        
                        // remove all the old suggestions 
                        while (suggestion_box.firstChild) 
                            {
                                suggestion_box.firstChild.remove();
                            }
                            
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
                                            message_input_Element.value = this.childNodes[0].innerHTML.replace(/\[.+\]/,"")
                                            // FIXME, submit the thing 
                                            // $('form.chat input[type="submit"]').click()
                                            message_input_Element.focus()
                                        }
                            }
                        shadowText.value = message_input_Element.value
                    }
            }

// general helper functions 
    // got the below function from https://stackoverflow.com/questions/646611/programmatically-selecting-partial-text-in-an-input-field
    function createSelection(field, start, end) 
        {
            if( field.createTextRange ) 
                {
                    var selRange = field.createTextRange();
                    selRange.collapse(true);
                    selRange.moveStart('character', start);
                    selRange.moveEnd('character', end);
                    selRange.select();
                    field.focus();
                } 
            else if( field.setSelectionRange ) 
                {
                    field.focus();
                    field.setSelectionRange(start, end);
                } 
            else if( typeof field.selectionStart != 'undefined' ) 
                {
                    field.selectionStart = start;
                    field.selectionEnd = end;
                    field.focus();
                }
        }
    // indents a string by adding 4 spaces to every line
    function Indent(string_)
        {
            return '    ' + string_.replace(/\n/g,"\n    ")
        }
    function CurrentTime()
        {
            return new Date().getTime()
        }
    //   
    // NEW BASH helper functions, 
    //

    // timer_for lets async functions wait for other asyncs to finish
    function timer_for(time_amount)
        {
            return new Promise(resolve => 
                {
                    setTimeout(()=>{ resolve(null) }, time_amount)
                })
        }
    

    bash_end_string                = "" 
    bash_response                  = ""
    aggregated_bash_response       = ""
    end_of_bash_response_was_found = false
    // when the bash process gives output
    bash_process.stdout.on('data', (data) => 
        {
            aggregated_bash_response += `${data}` // converts the data buffer into a string
            console.log("the current aggregared response is ", aggregated_bash_response)
            end_regex = new RegExp(bash_end_string )
            if (aggregated_bash_response.search(end_regex) > -1)
                {
                    console.log("the ending key was found")
                    bash_response = aggregated_bash_response.slice(0,aggregated_bash_response.search(end_regex))
                    // get rid of the stuff from aggregated_bash_reponse
                    end_removal_regex = new RegExp("[\\s\\S]*" +bash_end_string + "\n")
                    aggregated_bash_response = aggregated_bash_response.replace(end_removal_regex,"")
                    console.log("aggregated response after is")
                    // let BashRun() know that the response is ready
                    end_of_bash_response_was_found = true
                }
            else 
                {
                    // console.log("bash response didn't contain all output in 1-go")
                }
        })
    bash_process.stderr.on('data', (data) => 
        {
            reby.says("Bash says there was an error :/\n"+Indent(`${data}`))
        })
    // Core Bash command methods
    async function BashRun(command_)
        {
            // send the command
            bash_end_string   =  `end${Math.random()}`
            console.log("The ending key is ",bash_end_string)
            bash_process.stdin.write(`${command_}\necho ${bash_end_string}\n`)
            // wait for 200 miliseconds, then check if bash has responded
            while (!end_of_bash_response_was_found) { a = await timer_for(100)  }
            
            // once a response is given, reset the variables, and return the response
            answer = bash_response
            bash_response = ""
            end_of_bash_response_was_found = false
            return answer
        }
    async function BashRunWithoutCheck(command_)
        {
            // send the command
            bash_process.stdin.write(command_+"\n")
            // wait for 200 miliseconds, then check if bash has responded
            reby.says("Start of BashRunWithoutCheck ")
            a = await timer_for(1000)
            reby.says("Start of bash wait ")
            
            // once a response is given, reset the variables, and return the response
            answer = bash_response
            bash_response = ""
            end_of_bash_response_was_found = false
            reby.says("End of BashRunWithoutCheck ")
            return answer
        }
    
    // FIXME, all_file_suggestions doesnt work till after the first command (that is: it doesnt get populated till after RebyResponse() runs)
    // FIXME, location_history shouldn't need to be hardcoded populated at the begining
    location_history.push("$HOME/Desktop")
    // add a blank command 
    command_history_index  = command_history.length -1
    command_prefix_shown   = false // FIXME command_prefix_shown needs to be reset every time a message is entered
    should_suggest_folders = false
    command_prefix_index   = null
    // show the default suggestions 
    reby.showSuggestions()


// Onload
    window.onload = function() 
        {
            // focus on the main input box
            message_input_Element.focus()
        }

// TODO, put this function somewhere to make it more organized 
// this function selects the [folder] in goto [folder] 
// and does similar things for other suggestions in []
function TryToSelectBracketPlaceHolder()
    {
        // if theres an input box (square brackets) then select them
        // FIXME currently this only works for the first input box
        //    to fix this, check if cursor is not at the end 
        //    if its not at the end, then when the user presses tab 
        //    find the next [] that comes after the cursor 
        //    then highlight that []
        //console.log("message_input_Element.value is:",message_input_Element.value)
        if (message_input_Element.value.search(/\[.+\]/) > -1)
            {
                // find the start of the first bracket
                var begining_of_box_input = message_input_Element.value.search(/\[.+/)
                // find the end
                var end_of_box_input      = message_input_Element.value.search(/\]/) + 1
                // select that text 
                createSelection(message_input_Element,begining_of_box_input,end_of_box_input)
            }
    }

// Event-driven functions 
    // When enter is pressed, then simulate clicking submit 
        $("input").keypress(function(event) 
            {
                const ENTER = 13;
                if (event.which == ENTER) 
                    {
                        event.preventDefault();
                        $('form.chat input[type="submit"]').click();
                    }
            });

    // capture keypresses 
        document.addEventListener('keydown', function(event) 
            {
                const key = event.key // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
                
                // press up for history
                if (key === "ArrowUp")
                    {
                        // if possible, go back an index 
                        if (command_history_index > 1) { command_history_index -= 1 }
                        shadowText.value = command_history[ command_history_index ]
                    }
            
            });

    // Tab completion 
        // add a keydown listener to the input box
        // link it to keyHandler
        if (message_input_Element.addEventListener) 
            {
                message_input_Element.addEventListener('keydown',this.keydownHandler,false)
                message_input_Element.addEventListener('keyup',this.keyupHandler,false)
            } 
        // when tab is pressed, convert placeholder text to actual text 
        function keydownHandler(an_event) 
            {
                // console.log("the "+an_event.key+" was pressed");
                // if its the tab key 
                if (an_event.key === "Tab") 
                    {
                        // prevent the default tab (which would got to the next element)
                        an_event.preventDefault()
                        
                        // if there is placeholder text 
                        if (shadowText.value.length > 0)
                            {
                                // if the placeholder text is different from the value
                                if ( message_input_Element.value != shadowText.value )
                                    {
                                      
                                        // convert the placeholder into the actual content 
                                        message_input_Element.value = shadowText.value
                                        
                                        // check if the placeholder is equal to the first suggestion 
                                        if (shadowText.value == reby.suggestions[0])
                                            {
                                                // if it is then select the first argument or [] it has
                                                TryToSelectBracketPlaceHolder()
                                            }
                                        
                                    }
                                // if the placeholder text is equal to the current text 
                                // then tab will change the placeholder and value to the next suggestion
                                else 
                                    {
                                        // if there's another suggestion, then increment the suggestion_index
                                        if (reby.suggestion_index <= reby.suggestions.length-2)
                                            {
                                                // increment the suggestion index
                                                reby.suggestion_index += 1
                                                
                                                // set the value and placeholder to be the new suggestion 
                                                message_input_Element.value = reby.suggestions[reby.suggestion_index]
                                                shadowText.value = reby.suggestions[reby.suggestion_index]
                                                
                                                // then select the first argument and/or [] it has 
                                                TryToSelectBracketPlaceHolder()
                                            }
                                        else 
                                            {
                                                message_input_Element.value = reby.suggestions[reby.suggestion_index]
                                                shadowText.value = reby.suggestions[reby.suggestion_index]
                                            }
                                        
                                        // TODO, add shift-tab and make it go in the reverse direction 
                                    }
                            }
                        // if theres no placeholder text 
                        else 
                            {
                                // if theres at least one suggestion
                                if (reby.suggestions.length > 0)
                                    {
                                        // set the placeholder equal to the suggestion 
                                        reby.suggestion_index = 0
                                        shadowText.value = reby.suggestions[reby.suggestion_index]
                                    }
                            }
                            
                        // refocus on the text box 
                        message_input_Element.focus()                        
                        
                    }
                else 
                    {
                        shadowText.value = ""
                    }
            } // end function 
        function keyupHandler(an_event) 
            {
                what_the_user_typed = message_input_Element.value
                // console.log("the "+an_event.key+" was pressed");
                // if its the tab key 
                if(an_event.key === "Tab") 
                    {
                        // do nothing 
                    }
                // if its any other key 
                else 
                    {
                        // make sure the key is an actual key (not 'Meta' or 'Backspace')
                        // FIXME, problems with regex characters
                        if (what_the_user_typed.length == 0 || what_the_user_typed.match(/^\s+/))
                            {
                                //console.log("user doesn't have any text in the box");
                                // do nothing!
                            }
                        else
                            {
                                // check each of the command prefixes
                                for (each in command_prefixes)
                                    {
                                        //console.log("each in command_prefixes is:",each)
                                        //console.log("each in command_prefixes is:",command_prefixes[each])
                                        //console.log("user typed:",what_the_user_typed);
                                        // if the users input matches one of the commands 
                                        if (command_prefixes[each].indexOf(what_the_user_typed) == 0)
                                            {
                                                //console.log("this:",what_the_user_typed);
                                                //console.log("matches:",command_prefixes[each]);
                                                //console.log("found a match!")
                                                
                                                // then show the command in the shadowText.value
                                                shadowText.value = command_prefixes[each]
                                                //console.log("shadowText.value is now: ", shadowText.value);
                                                command_prefix_shown = true
                                                command_prefix_index = each
                                                break
                                            }
                                        // if what_the_user_typed is more than a command 
                                        else if (what_the_user_typed.indexOf(command_prefixes[each]) == 0)
                                            {
                                                //console.log("user typed subset of ");
                                                // if the command ends with a space
                                                if (command_prefixes[each][command_prefixes[each].length-1])
                                                    {
                                                        // then try to suggest folders 
                                                        for (each_folder in all_file_suggestions)
                                                            {
                                                                //console.log("each folder #:",each_folder)
                                                                // if the key is a normal character 
                                                                //console.log("user typed:",what_the_user_typed);
                                                                //console.log("suggestion:",command_prefixes[each]+all_file_suggestions[each_folder])
                                                                // if the users input matches one of the commands 
                                                                if ((command_prefixes[each] +all_file_suggestions[each_folder]).indexOf(what_the_user_typed) == 0)
                                                                    {
                                                                        //console.log("found a folder match!")
                                                                        // then show the command in the shadowText.value
                                                                        shadowText.value = command_prefixes[each] + all_file_suggestions[each_folder]
                                                                        //console.log("shadowText.value is now: ", shadowText.value);                                                        break
                                                                    }
                                                            } // end for each all_file_suggestions
                                                    } // end if 
                                            }
                                    } // end for each command_prefixes
                            }
                       
                    }// end if any other key

                //console.log("about to check shadowText");
                // if the shadowText.value is not a subset of the text, then dont show it
                if (what_the_user_typed.length < shadowText.value.length)
                    {
                        for (each in what_the_user_typed)
                            {
                                if (what_the_user_typed[each] != shadowText.value[each])
                                    {
                                        shadowText.value = message_input_Element.value
                                        break
                                    }
                            }
                    }
                else 
                    {
                        for (each in shadowText.value)
                            {
                                if (what_the_user_typed[each] != shadowText.value[each])
                                    {
                                        shadowText.value = message_input_Element.value
                                        break
                                    }
                            }
                    }
            } // end function 

// specific helper functions 
    // go this from: https://stackoverflow.com/questions/20822273/best-way-to-get-folder-and-file-list-in-javascript
    // helps for excaping "" and such 
    function Escape(the_string)
        {
            // FIXME, I'm not sure that this will work for all cases
            // especially ones starting/ending with '
            return "'"+the_string.replace(/'/g,"'\\''")+"'"
        }
    // this returns the the last dir in the location_history
    // it also ensures there is a / at the end of the dir 
    async function CurrentLocation()
        {
            // if no location history exists, then add the current directory
            if (location_history.length == 0) { location_history.push(await BashRun('pwd')) }
            // current_dir is the last thing in the history 
            var current_dir_output = location_history.slice(-1)[0]
            // make sure to add a / to the end of the current_dir if it doesn't have one
            if (current_dir_output.match(/[^\/]$/)) { current_dir_output += '/' }
            
            return current_dir_output
        }
    // returns true if string is a form of "Yes" 
    function ParseYesOrNo(the_string)
        {
            // FIXME, this needs to be more robust
                 if (the_string.match(/^ *Yes */i)) { return true  }
            else if (the_string.match(/^ *No */i )) { return false }
            else                                    { return null  }
        }
    // returns true if the current account is an admin account
    async function UserIsAdmin(user=null)
        {
            if (user == null)
                {
                    return (await BashRun('id -Gn $whoami')).search(/\badmin\b/)
                }
            else 
                {
                    return (await BashRun('id -Gn '+user)).search(/\badmin\b/)
                }
        }
    // returns the current account's username
    async function CurrentUsersname()
        {
            return await BashRun("whoami")
        }
    // the raw name of the account that owns the file
    async function WhoOwns(file_location)
        {
            // FIXME, escaping needs to be added 
            // FIXME, handle folder cases 
            // FIXME, handle confirmation in unix
            return await BashRun('stat -f %Su "' + file_location + '"')
        }
    // returns a permissions object
    async function PermissionsFor(file_location)
        {
            // FIXME, escaping needs to be added 
            // FIXME, handle folder cases 
            // FIXME, handle confirmation in unix
            raw_permissions = await BashRun('stat -f "%Sp" "' + file_location + '"')
            
            owner_per     = raw_permissions.slice(1,4)
            groups_per    = raw_permissions.slice(4,7)
            everyones_per = raw_permissions.slice(7,10)
            
            owner_ = await WhoOwns(file_location)
            group_ = await BashRun('stat -f "%Sg" "'+file_location+'"')
            
            return {
                owner    : { name : owner_ , canRead : owner_per    .search(/r/) != -1 , canWrite : owner_per    .search(/w/) != -1 , canExecute : owner_per    .search(/x/) != -1 } ,
                group    : { name : group_ , canRead : groups_per   .search(/r/) != -1 , canWrite : groups_per   .search(/w/) != -1 , canExecute : groups_per   .search(/x/) != -1 } ,
                everyone : {                 canRead : everyones_per.search(/r/) != -1 , canWrite : everyones_per.search(/w/) != -1 , canExecute : everyones_per.search(/x/) != -1 } ,
            }
            
        }
    // returns true if a user is part of a group
    async function GroupIncludesUser(group_name,username_=null)
        {
            if (username_ == null)
                {
                    username_ = await CurrentUsersname()
                }
            users_groups = await BashRun('id -Gn "'+username_+'"')
            regex_pattern = new RegExp("\\b"+group_name+"\\b")
            if (users_groups.search(regex_pattern) > -1)
                {
                    return true
                }
        }
    // has Reby talk about the permissions for a file
    async function ShowPermissionsFor(file_location)
            {
                the_permissions = await PermissionsFor(file_location)
                permissions_output = ""
                current_username = await CurrentUsersname()
                who_owns_the_file = await WhoOwns(file_location)
                // talk about the owner 
                if (who_owns_the_file == current_username)
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
                else if (who_owns_the_file == 'root')
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
                if ( (the_permissions.owner.name != current_username) && (await GroupIncludesUser(the_permissions.group.name)) )
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
                        if (the_permissions.group.canExecute ) { can_do += "    run the file\n"     }
                        if (can_do != "") { can_do = "group: Everyone in "+the_permissions.group.name+" can:\n" + can_do }
                        
                        cant_do = ""
                        if (!the_permissions.group.canRead    ) { cant_do += "    look at the file\n" }
                        if (!the_permissions.group.canWrite   ) { cant_do += "    edit the file\n"    }
                        if (!the_permissions.group.canExecute ) { cant_do += "    run the file\n"     }
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
                if (the_permissions.everyone.canExecute ) { can_do += "    run the file\n"     }
                if (can_do != "") { can_do = "everyone: Everyone else can:\n" + can_do }
                
                cant_do = ""
                if (!the_permissions.everyone.canRead    ) { cant_do += "    look at the file\n" }
                if (!the_permissions.everyone.canWrite   ) { cant_do += "    edit the file\n"    }
                if (!the_permissions.everyone.canExecute ) { cant_do += "    run the file\n"     }
                if (cant_do != "") { cant_do = "everyone: Everyone else is not able to:\n" + cant_do }
                connect_with = "\n"
                if (cant_do == "" || can_do == "") { connect_with = "" }
                permissions_output += can_do + connect_with + cant_do + "\n"

                reby.says(permissions_output)
            }
    // returns true if wifi is connected to a rounter 
    async function IsWifiConnected()
        {
            var status_string = await BashRun('ifconfig en0 | grep "status"')
            status_string = status_string.replace(/\s*status:\s*/,"")
            status_string = status_string.replace(/\s$/,"")
            //console.log("wifi status is: "+status_string)
            if (status_string == "inactive")
                {
                    return false
                }
            else if (status_string == "active")
                {
                    return true
                }
        }
    // thing exists
    async function ThingExists(the_location)
        {
            // this includes hidden folders
            console.log("checking if:",the_location," exists or not using the command")
            console.log('if [ -e '+Escape(the_location)+' ]; then echo "true";  fi')
            value = await BashRun('if [ -e '+Escape(the_location)+' ]; then echo "true";  fi')
            return (value === "true"||value === "true\n")
        }
    // parent directory
    async function CurrentParentDirectory()
        {
            return await BashRun('dir=$PWD;echo "$(dirname "$dir")"')
        }
    // if a folder exists it will return true  
    async function FolderExists(the_location)
        {
            console.log("checking if:",the_location," exists or not using the command")
            console.log('if [ -d '+Escape(the_location)+' ]; then echo "true";  fi')
            value = await BashRun('if [ -d '+Escape(the_location)+' ]; then echo "true";  fi')
            console.log("the value is:",value)
            console.log("the value===\"true\" is:",value === "true")
            return (value === "true"||value === "true\n")
        }
    // returns a string-list of folders kind of like ls -1 
    async function FoldersAsString()
        {
            // this lists files and  folders           : (ls -L -p -1 )
            // then only shows the folders             : (grep "/$")
            // gets rid of the trailing /'s            : .replace(/\/(\n|$)/g,"\n")
            string_response = await BashRun('ls -L -p -1 | grep "/$" ')
            console.log("the string response was:",string_response)
            return string_response.replace(/\/(\n|$)/g,"\n")
        }
    // returns a string-list of files kind of like ls -1
    async function FilesAsString(the_location)
        {
            // this lists files and  folders           : (ls -L -p -1 )
            // then only shows the files               : (grep -v "/$")
            return await BashRun('ls -L -p -1 | grep -v "/$" ')
        }
    // returns a string-list of only hidden folders kind of like ls -1 
    async function HiddenFoldersAsString(the_location)
        {
            // this lists files and  folders           : (ls -L -p -A -1 )
            // only show the hidden ones               : (grep "^\\\\.")
            // then only shows the folders             : (grep "/$")
            // gets rid of the /'s                     : .replace(/\/$/,"")
            string_response = await BashRun('ls -L -p -1 -A | grep "^\\\\." | grep "/$" ')
            return string_response.replace(/\/(\n|$)/g,"\n")
        }
    // returns a string-list of only hidden files kind of like ls -1 
    async function HiddenFilesAsString()
        {
            // this lists files and  folders           : (ls -L -p -A -1 )
            // only show the hidden ones               : (grep "^\\\\.")
            // then only shows the files               : (grep -v "/$")
            return await BashRun('ls -L -p -1 -A | grep "^\\\\." | grep -v "/$" ')
        }

    // returns a string of non-hidden files and folders
    async function FilesAndFoldersReadable(input_ = { include_hidden_files:false })
        {
            if (input_.include_hidden_files)
                {
                    return "Folders:\n" + Indent(await FoldersAsString()+"\n"+await HiddenFoldersAsString()) + '\nFiles:\n'+ Indent(await FilesAsString()+"\n"+HiddenFilesAsString())
                }
            else 
                {
                    return "Folders:\n" + Indent(await FoldersAsString()) + '\nFiles:\n'+ Indent(await FilesAsString()) 
                }
        }
    // returns a string of only non-hidden files and folders
    async function HiddenFilesAndFoldersReadable(input_ = { include_hidden_files:false })
        {
            return "Folders:\n" + Indent(await HiddenFoldersAsString()) + '\nFiles:\n'+ Indent(await HiddenFilesAsString()) 
        }
    // uses reby.says() and returns false if the file doesnt exist, returns true if it does exist
    async function MakeSureThingExists(a_location)
        {
            if (!(await ThingExists(a_location)))
                {
                    reby.says("Sorry I don't think "+a_location+" is a file or folder 😕")
                    return false
                }
            else 
                {
                    return true 
                }
            
        }

// when submitted 
$('form.chat input[type="submit"]').click(function(event) {
    event.preventDefault()

    // get the user's command 
    var original_message  = message_input_Element.value;
    // if there was input in the text box 
    if (message_input_Element.value.length > 0 || !(message_input_Element.value == null)) 
        {

            // if empty or only whitespace input then dont do anything
            if (original_message.length == 0 || (original_message.match(/^\s+$/) != null))
                {
                    // get rid of whitespace if there was any 
                    message_input_Element.value = "" 
                    return
                }
                
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
            
            // only show non-passwords
            if (message_input_Element.type != "password")
                {
                    $('form.chat div.messages').append('<div class="message"><div class="myMessage"><p>' + original_message + '</p><date><b>You </b>' + currentDate + '</date></div></div>');
                }
            
            
            // create the progress/loading bar at the top
            setTimeout(function() {    $('form.chat > span').addClass('spinner')    }, 100 )
            setTimeout(function() {    $('form.chat > span').removeClass('spinner') }, 2000)
            
            // reset the placeholder text 
            // FIXME, give a placeholder 
            shadowText.value = ''
        }
    // get rid of the text in the input field 
    message_input_Element.value = ""
    
    // Scroll down when the new message_ is made
    var focusBottom = document.getElementById("main_container")
    focusBottom.scrollTop = focusBottom.scrollHeight
    
    // reset the shadowText.value
    shadowText.value = message_input_Element.value
    command_prefix_shown = false
    should_suggest_folders = false 
    shadowText.value = ""
    
    // give Reby the message_
    // CHANGED
    RebyResponse(original_message)
    })






// initial_checks is a list of functions that should return either a response-function or null
initial_checks = []
// RESPONSE_FUNCTIONS will contain the next response reby should give
RESPONSE_FUNCTIONS = []
// list of starts 
command_prefixes = []
// this is the reby command class 
RebyCommand = function(input_ = {prefix:"", initial_check:async function(the_command){},responses:{}})
    {
        command_prefixes.push(input_.prefix)
        this.prefix = input_.prefix
        initial_checks.push(input_.initial_check)
        this.responses = input_.responses
    }



whereami_Command             = new RebyCommand({prefix:"where am i"              ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^where ?am ?i[\?]? */i))
                {
                    return async function(message_)
                        {
                            reby.says("In the file system, you're at:\n"+ await BashRun("pwd"))
                            reby.suggestions = [ "show stuff", "go to [folder]","go up","go home","show hidden stuff", "open [file or folder]"]
                            console.log("I just finished the whereami command")
                        }
                }
        }
    })
showstuff_Command            = new RebyCommand({prefix:"show stuff"              ,
        initial_check : async function(the_command)
            {
                //console.log("checking:",the_command)
                if (the_command.match(/^show stuff */i))
                    {
                        //console.log("about to show stuff");
                        return async function(message_)
                            {
                                //console.log("running show stuff")
                                reby.says("Okay! Here's all the folders/files at your current location:\n\n" + await FilesAndFoldersReadable())
                                //console.log("just showed stuff")
                                reby.suggestions = [ "go to [folder]", "show files", "show hidden stuff", "create folder [folder's name]", "delete [file or folder]" , "rename [file or folder]", "move [file or folder]", "copy [file or folder]", "create file [file's name]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                            }
                    }
            }
    })
showfiles_Command            = new RebyCommand({prefix:"show files"              ,
        initial_check : async function(the_command)
            {
                if (the_command.match(/^show files */i))
                    {
                        return async function(message_)
                            {
                                reby.says("Here they are:\n\n" + await FilesAsString())
                                reby.suggestions = [ "move [file or folder]", "delete [file or folder]" , "show hidden files", "rename [file or folder]", "open [file] with [app]", "copy [file or folder]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                            }
                    }
            }
    })
showfolders_Command          = new RebyCommand({prefix:"show folders"            ,
        initial_check : async function(the_command)
            {
                if (the_command.match(/^show folders */i))
                    {
                        return async function(message_)
                            {
                                reby.says("Here they are:\n\n" + await FoldersAsString())
                                reby.suggestions = [ "go to [folder]", "show hidden folders", "rename [file or folder]", "copy [file or folder]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                            }
                    }
            }
    })
showhiddenstuff_Command      = new RebyCommand({prefix:"show hidden stuff"       ,
        initial_check : async function(the_command)
            {
                if (the_command.match(/^show hidden stuff */i))
                    {
                        return async function(message_)
                            {
                                // display the output 
                                reby.says("No problem, here's all the hidden folders/files at your current location:\n\n" + await HiddenFilesAndFoldersReadable())
                                // #REBY FYI
                                reby.says("Just FYI, hidden things start with a period .\nSo if you want to make a hidden folder\nJust make a normal folder with a period at the begining")
                                reby.suggestions = [ "go to [folder]", "create folder [folder's name]", "delete [file or folder]" , "rename [file or folder]", "move [file or folder]", "copy [file or folder]", "create file [file's name]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                            }
                    }
            }
    })
showhiddenfiles_Command      = new RebyCommand({prefix:"show hidden files"       ,
        initial_check : async function(the_command)
            {
                if (the_command.match(/^show hidden files */i))
                    {
                        return async function(message_)
                            {
                                reby.says("Here they are:\n\n" + await HiddenFilesAsString())
                                reby.suggestions = [ "open [file] with [app]", "move [file or folder]", "delete [file or folder]", "rename [file or folder]", "copy [file or folder]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                            }
                    }
            }
    })
showhiddenfolders_Command    = new RebyCommand({prefix:"show hidden folders"     ,
        initial_check : async function(the_command)
            {
                if (the_command.match(/^show hidden folders */i))
                    {
                        return async function(message_)
                            {
                                reby.says("Here they are:\n\n" + await HiddenFoldersAsString())
                                reby.suggestions = [ "go to [folder]", "show hidden folders", "rename [file or folder]", "copy [file or folder]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                            }
                    }
            }
    })
goto_Command                 = new RebyCommand({prefix:"go to "                  ,
    initial_check: function(the_command)
            {
                if(the_command.match(/^go ?to +/i) )
                    {
                        return async function(message_)
                            {
                                // globals 
                                    // location_history
                                
                                // FIXME, check that the new location exists (local or global)
                                // TODO, add special cases like Desktop and Downloads
                                
                                // remove the goto from the message_ 
                                // Don't escape the location however
                                a_location = message_.replace(/^go ?to +/,"")
                                
                                // make sure the location is a folder 
                                if (await FolderExists(a_location))
                                    {
                                        // change to the new location and then record it
                                        location_history.push(await BashRun("cd "+Escape(a_location)+";pwd")) 
                                        // show stuff from the new location 
                                        reby.says("Okay, here's the new location's stuff:\n\n" + await FilesAndFoldersReadable())
                                    }
                                // if the location isn't a folder 
                                else 
                                    {
                                        // #REBY_ERROR
                                        reby.says("Sorry I don't think "+a_location+" is a folder 😕")
                                    }
                                
                                // give suggestions
                                reby.suggestions = [ "go to [folder]", "go back","go up","go home","show hidden stuff", "open [file or folder]"]
                            }
                    }
            },
    })

goback_Command               = new RebyCommand({prefix:"go back"                 ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^go back */i))
                {
                    return async function(message_)
                        {
                            // globals:
                                // location_history
                                
                            // if there is history left (2 items or more)
                            if (location_history.length >= 2)
                                {
                                    // then remove one from the history
                                    location_history.pop()
                                    // change directory to the new location
                                    await BashRun('cd '+Escape(await CurrentLocation()))
                                    reby.says("Okay, here's the new location's files:\n\n" + await FilesAndFoldersReadable())
                                }
                            else 
                                {
                                    // TODO, make this a better message_ 
                                    reby.says("There's no more history to go back to")
                                }
                            reby.suggestions = ["go to [folder]","where am I?","go up","show hidden stuff", "open [file or folder]"]
                        }
                }
        },
    })

goup_Command                 = new RebyCommand({prefix:"go up"                   ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^go up */i))
                {
                    return async function (message_) 
                        {
                            // globals:
                                // location_history
                            
                            // go up, then put the new directory in the location history
                            location_history.push(await BashRun('cd ..;pwd'))
                            // FIXME, handle escaping of things
                            reby.says( "Okay, here's the new location's files:\n\n" + await FilesAndFoldersReadable() )
                            reby.suggestions = ["go to [folder]","where am I?","show hidden stuff","go home", "open [file or folder]"]
                        }

                }
        }
    })

gohome_Command               = new RebyCommand({prefix:"go home"                 ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^go home */i))
                {
                    return async function(message_)
                        {
                            // globals:
                                // location_history 
                            
                            location_history.push(await BashRun("cd ;pwd"))
                            reby.says( "In your home folder you've got:\n\n" + await FilesAndFoldersReadable() )
                            reby.suggestions = ["go back","go to [folder]","go up","show hidden stuff", "open [file or folder]"]
                        }
                }
        }
    }) 

whoami_Command               = new RebyCommand({prefix:"who am i"                ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^who ?am ?i[\?]? */i))
                {
                    return async function(message_)
                        {
                            reby.says("I'm not not really sure who you are,\nbut your current username is:\n" + await BashRun("whoami"))
                            reby.suggestions = [ "whats my ip address?", "whats my mac address?", "show hidden stuff" ]
                        }
                }
        },
    })

whoareyou_Command            = new RebyCommand({prefix:"who are you"             ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^who ?are ?you\?? */i))
                {
                    return async function(message_)
                        {
                            reby.says("I'm reby!\nIf you tell me what to do, I'll do my best to do it\n\nI don't natually understand English, and people tell me I have a robotic personality, but I'm getting better all the time!")
                            reby.suggestions = ["who am I?","show stuff","where am I?","create file [name of file]","create folder [name of folder]"]
                        }
                }
        }
    })
whatsmyip_Command            = new RebyCommand({prefix:"whats my ip"             ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^what('?s| is) ?my ?ip ?address\?? */i))
                {
                    return async function(message_)
                        {
                            // FIXME, make sure to check and make sure that en0 is their wireless card 
                                    // and that they are using wireless and not ethernet 
                            // FIXME, this command takes awhile, so give a warning or fix that 
                            if (await IsWifiConnected())
                                {
                                    reby.says("You have two main ip addresses"+
                                    "\nLocal: " +await BashRun("ipconfig getifaddr en0")+
                                    "\nPublic: "+await BashRun("curl -s http://checkip.dyndns.org/ | sed 's/[a-zA-Z<>/ :]//g'"))
                                }
                            else 
                                {
                                    reby.says("Well right now I think you're not connected to wifi\nIf you're not connected to the internet then you won't have an ip address")
                                }
                            reby.suggestions = [ "whats my mac address?", "who am I?", "show hidden stuff" ]
                        }
                }
        }
    })
whatsmymacaddress_Command    = new RebyCommand({prefix:"whats my mac address"    ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^what('?s| is) ?my ?mac ?addres\?? */i))
                {
                    return async function(message_)
                        {
                            // get the mac address line using ifconfig
                            mac_address_line = await BashRun('ifconfig en0 | grep "ether"')
                            // get rid of the intro "ether" text 
                            mac_address_line = mac_address_line.replace(/ether */g,"")
                            // display the line 
                            reby.says("Your mac address is: "+mac_address_line)
                            reby.suggestions = [ "whats my ip address?", "show stuff", "show hidden stuff" ]
                        }
                }
        }
    })
whatstoday_Command           = new RebyCommand({prefix:"whats today"             ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^what('?s| is) ?today\?? */i))
                {
                    return async function(message_)
                        {
                            reby.says("Today is: "+await BashRun("date"))
                            reby.suggestions = ["who am I?","show stuff","where am I?","create file [name of file]","create folder [name of folder]"]
                        }
                }
        }
    })

whoowns_Command              = new RebyCommand({prefix:"who owns "               ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^who ?owns +/i))
                {
                    return async function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle folder cases 
                            // FIXME, handle confirmation in unix
                            file_location = message_.replace(/^who ?owns\?? */,"")
                            owner_        = await WhoOwns(file_location)

                            if (owner_ == await CurrentUsersname())
                                {
                                    reby.says("You own it")
                                }
                            else if (owner_ == 'root')
                                {
                                    // check if current user is admin
                                    if (await UserIsAdmin())
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
showpermissionsfor_Command   = new RebyCommand({prefix:"show permissions for "   ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^show ?permissions ?for +/))
                {
                    return async function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle folder cases 
                            // FIXME, handle confirmation in unix
                            file_location = message_.replace(/^show ?permissions ?for */,"")
                            
                            // have reby talk about the permissions 
                            await ShowPermissionsFor(file_location)
                            
                            // give a warning about admins
                            permissions_output = "NOTE: if someone is an administrator, they can change these rules" 
                            if (await UserIsAdmin())
                                {
                                    permissions_output += "\nSince you're an administrator, you can change these rules"
                                }
                            reby.says(permissions_output)
                        }
                }
        }
    })
changepermissionsfor_Command = new RebyCommand({prefix:"change permissions for " ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^change ?permissions ?for +/i))
                {
                    return async function(message_)
                        {
                            
                            // FIXME, handle folder cases
                            // FIXME, escaping needs to be added 
                            // FIXME, this needs to be a multi-step message_
                            // FIXME, make sure to give people execute access in higher up directorys so they can actually access the file 
                            changepermissionsfor_Command.file_location = message_.replace(/^change ?permissions ?for +/,"") 
                            changepermissionsfor_Command.file_name     = await BashRun('basename '+changepermissionsfor_Command.file_location)
                            reby.says("Okay here are the current permissions")
                            await ShowPermissionsFor(changepermissionsfor_Command.file_location)
                            
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
            whosePermissions : async function(message_)
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
            canRead          : async function(message_)
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
            canWrite         : async function(message_)
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
            canExecute       : async function(message_)
                {
                    // the message_ should be an answer to "Should "+changepermissionsfor_Command.which_level+" be able to execute the file?"
                    changepermissionsfor_Command.can_execute = ParseYesOrNo(message_)
                    // FIXME, handle non y/n responses
                    
                    // FIXME, handle scenarios where user does not have permission to change permissions
                    if (changepermissionsfor_Command.can_read    === true ) { await BashRun('chmod '+changepermissionsfor_Command.which_level_char+'+r '+Escape(changepermissionsfor_Command.file_location)) }  
                    if (changepermissionsfor_Command.can_write   === true ) { await BashRun('chmod '+changepermissionsfor_Command.which_level_char+'+w '+Escape(changepermissionsfor_Command.file_location)) } 
                    if (changepermissionsfor_Command.can_execute === true ) { await BashRun('chmod '+changepermissionsfor_Command.which_level_char+'+x '+Escape(changepermissionsfor_Command.file_location)) } 
                    if (changepermissionsfor_Command.can_read    === false) { await BashRun('chmod '+changepermissionsfor_Command.which_level_char+'-r '+Escape(changepermissionsfor_Command.file_location)) }  
                    if (changepermissionsfor_Command.can_write   === false) { await BashRun('chmod '+changepermissionsfor_Command.which_level_char+'-w '+Escape(changepermissionsfor_Command.file_location)) } 
                    if (changepermissionsfor_Command.can_execute === false) { await BashRun('chmod '+changepermissionsfor_Command.which_level_char+'-x '+Escape(changepermissionsfor_Command.file_location)) } 
                    
                    
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
openwith_Command             = new RebyCommand({prefix:"open with "              ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^open +(.*[^ ]) +with(?=( *))\2(.+?) *$/i))
                {
                    return async function(message_)
                        {
                            // FIXME, escaping needs to be added 
                            // FIXME, handle confirmation in unix
                            
                            // get the file location and escape it 
                            var file_location = message_.replace(/^open +(.*[^ ]) +with(?=( *))\2(.+?) *$/,"$1")
                            // FIXME, do error checking and escape checking on app names 
                            var app_name      = message_.replace(/^open +(.*[^ ]) +with(?=( *))\2(.+?) *$/,"$3")
                            
                            
                            if (await MakeSureThingExists(file_location))
                                {
                                    // get the dir of the file 
                                    reby.says("Okay, attempting to open")
                                    
                                    // delay the action for a sec so the user can read the message_
                                    setTimeout(async function()
                                        {
                                            await BashRun('open '+Escape(file_location)+' -a "'+app_name+'"')
                                        }, 200)
                                }
                        }
                }
        }
    })
open_Command                 = new RebyCommand({prefix:"open "                   ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^open +/i))
                {
                    return async function(message_)
                        {
                            // FIXME, handle confirmation in unix
                            // FIXME, add error handling for when no app can open the folder
                            
                            // get the dir of the file 
                            a_location = message_.replace(/^open +/,"")
                            
                            if (await MakeSureThingExists(a_location))
                                {
                                    reby.says("Okay, attempting to open")
                                    // delay the action for a sec so the user can read the message_
                                    setTimeout(async function()
                                        {
                                            await BashRun('open '+Escape(a_location))
                                        },200)
                                }
                        }
                }
        }
    })
createfolder_Command         = new RebyCommand({prefix:"create folder "          ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^create folder( named|) +/i))
                {
                    return async function(message_)
                        {
                            new_folder_name = message_.replace(/^create folder( named|) +/,"")
                            await BashRun('mkdir '+Escape(new_folder_name))
                            // FIXME, needs error handling for bad characters \/: etc
                            reby.says("Finished")
                            reby.suggestions = [ "go to "+new_folder_name, "show folders","show hidden folders", "open [file or folder]"]
                        }
                }
        }
    })
createfile_Command           = new RebyCommand({prefix:"create file "            ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^create file( named|) +/i))
                {
                    return async function(message_)
                        {
                            a_location = message_.replace(/^create file( named|) +/,"")
                            await BashRun('touch '+Escape(a_location))
                            reby.says("Finished")
                            reby.suggestions = [ "change permissions for "+a_location, "show permissions for "+a_location , "show files","show hidden files", "open [file or folder]"]
                        }
                }
        }
    })
sizeof_Command               = new RebyCommand({prefix:"size of ",
    initial_check : async function(the_command)
        {
            if (the_command.match(/^(what is the|what'?s the|)size ?of +/i))
                {
                    return async function(message_)
                        {
                            a_location = message_.replace(/^(what is the|what'?s the|)size ?of +/,"")
                            file_size = await BashRun('du -h '+Escape(a_location))
                            file_size = file_size.replace(/\s*(\d+(?:\.\d+|)\w\w?)\s*.+\n/,"$1")
                            // FIXME, replace K with kilobytes, and Gb with giga bytes etc 
                            reby.says("That is "+file_size+" large")
                            reby.suggestions = [ "change permissions for "+a_location, "show permissions for "+a_location , "show files","show hidden files", "open [file or folder]"]
                        }
                }
        }
    })
delete_Command               = new RebyCommand({prefix:"delete "                 ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^delete +/i))
                {
                    return async function(message_)
                        {
                            // FIXME, handle confirmation in unix
                            // FIXME, handle "do not have permission" errors 
                            // FIXME, handle hard links / soft links scenarios 
                            // TODO, add so checks to avoid accidentally deleting big or important folders / files
                            // TODO, maybe just move the files/folders to the trash instead of deleting
                            
                            // get the location, and escape it
                            a_location = message_.replace(/^delete +/,"")
                            
                            // make sure the file/folder exists 
                            // this could be innaccurate problems if a_location is not escaped correctly
                            // it will output an error on its own if something doesn't exist
                            if (await MakeSureThingExists(a_location))
                                {
                                    // see if a_location is a folder 
                                    if (await FolderExists(a_location))
                                        {
                                            // if its a folder do one command
                                            // delete the folder and everything in it (recursive)
                                            await BashRun('rm -r '+a_location)
                                            // give a response
                                            reby.says("Finished")
                                            reby.suggestions = [ "show folders", "delete [file or folder]" , "move [file or folder]", "show hidden folders", "rename [file or folder]", "open [file] with [app]", "copy [file or folder]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                                        }
                                    // if its a file
                                    else 
                                        {
                                            // remove it like normal 
                                            await BashRun('rm '+a_location)
                                            // give a response
                                            reby.says("Finished")
                                            reby.suggestions = [ "show files", "move [file or folder]", "delete [file or folder]" , "show hidden files", "rename [file or folder]", "open [file] with [app]", "copy [file or folder]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                                        }
                                }
                            
                            
                        }
                }
        }
    })
move_Command                 = new RebyCommand({prefix:"move "                   ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^move +/i))
                {
                    return async function(message_)
                        {
                            // FIXME check if overwriting something else on move 
                            
                            // get the location of the original file/folder 
                            move_Command.file_location = message_.replace(/^move +/,"") 
                            // get the basename of the original file/folder 
                            move_Command.file_name     = await BashRun('basename '+Escape(move_Command.file_location))
                            
                            
                            // make sure the file exists 
                            // if it doesn't then the MakeSureThingExists() function will 
                            // take care of it 
                            if (await MakeSureThingExists(move_Command.file_location))
                                {
                                    reby.says("Where would you like to move it?")
                                    reby.suggestions = (await FoldersAsString()).split("\n")
                                    reby.suggestions.unshift(await CurrentParentDirectory())
                                    // return the next step in order to get the user's next message
                                    return move_Command.responses.step2
                                }
                        }
                }
        },
    responses : 
        {
            step2: async function(message_)
                {
                    // FIXME, both file_location and file_new_location need to have error handling 
                    
                    // add a / if there isn't one at the end of the message
                    message_ = message_.replace(/([^\/])$/,"$1/")
                    
                    // make sure the new location exists
                    // if it doesnt exist MakeSureThingExists() will handle it
                    if (await MakeSureThingExists(message_))
                        {
                            // combine the new location and the original filename 
                            new_location_and_name = message_+move_Command.file_name
                            
                            // run the message_ 
                            await BashRun('mv '+Escape(move_Command.file_location)+' '+Escape(new_location_and_name))
                            // give a response
                            reby.says("Okay, finished")
                            // delete the extra variables
                            delete move_Command.file_location
                            delete move_Command.file_name
                            // new_location_and_name
                            reby.suggestions = [ "go to "+message_.replace(/\/$/g,""), "delete [file or folder]" , "move [file or folder]" , "show hidden files", "rename [file or folder]", "open [file] with [app]", "copy [file or folder]", "who owns [file or folder]", "show permissions for [file or folder]" ]
                        }
                }
        }
    }) 
rename_Command               = new RebyCommand({prefix:"rename "                 ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^rename +/i))
                {
                    return async function(message_)
                        {
                            // FIXME, handle folder cases
                            // FIXME, this needs to be a two-step message_
                            rename_Command.file_location = message_.replace(/^rename +/,"") 
                            if (await MakeSureThingExists(rename_Command.file_location))
                                {
                                    //#TWO_STEP 
                                    reby.says("What would you like to call it?")
                                    // go to next step
                                    return rename_Command.responses.step2
                                }
                        }
                }
        },
    responses :
        {
            step2 : async function(message_)
                {
                    // FIXME, need error handling for filenames 
                    // ex: filenames that already exist
                    // ex: invalid characters
                    
                    // run the message_ 
                    await BashRun('mv '+Escape(rename_Command.file_location)+' '+Escape(message_))
                    // give a response
                    reby.says("Okay, finished")
                    // delete the extra variables
                    delete rename_Command.file_location
                }
        }
    })
copy_Command                 = new RebyCommand({prefix:"copy "                   ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^copy +/i))
                {
                    return async function(message_)
                        {
                            // FIXME, handle folder cases
                            // FIXME, escaping needs to be added 
                            // FIXME, this needs to be a two-step message_
                            copy_Command.file_location = message_.replace(/^copy +/,"") 
                            copy_Command.file_name     = await BashRun('basename '+Escape(copy_Command.file_location))
                            
                            
                            if (await MakeSureThingExists(copy_Command.file_location))
                                {
                                    //#TWO_STEP 
                                    reby.says("Where would you like to copy it to?")
                                    reby.suggestions = (await FoldersAsString()).split("\n")
                                    // return the next step 
                                    return copy_Command.responses.step2
                                }
                        }
                }
        },
    responses :
        {
            step2 : async function(message_)
                {
                    // FIXME, both file_location and file_new_location need to have error handling 
                    
                    // make sure the copy destination exists 
                    if (await MakeSureThingExists(message_))
                        {
                            // FIXME, do some sort of check to make sure not overwriting 
                            // FIXME, make sure message_ is a folder 
                            
                            // make sure the message_ ends in a /
                            message_ = message_.replace(/([^\/])$/,"$1/")
                            // create the new location 
                            new_location = message_+copy_Command.file_name
                            
                            // if the thing being copied is a folder
                            if (await FolderExists(copy_Command.file_location))
                                {
                                    
                                    // make sure the copy_Command.file_location does not end with a /
                                    copy_Command.file_location.replace(/\/$/,"")
                                    
                                    
                                    // then copy it recursively 
                                    await BashRun('cp -R '+Escape(copy_Command.file_location)+' '+Escape(new_location))
                                    // give a response
                                    reby.says("Okay, finished")
                                    // delete extra variables
                                    delete copy_Command.file_location
                                    delete copy_Command.file_name
                                    
                                    // FIXME, check the  technicalities 
                                        // from bash:
                                            // cp copies the directory and the entire subtree connected at that point.  
                                            // If the source_file ends in a /, the contents of the directory 
                                            // are copied rather than the directory itself.
                                            // This option also causes symbolic links to be copied,
                                            // rather than indirected through, 
                                            // and for cp to create special files 
                                            // rather than copying them as normal files.  
                                            // Created directories have the same mode as the corresponding 
                                            // source directory, unmodified by the process' umask.
                                    
                                }
                            // if the thing being copied is a file 
                            else 
                                {
                                    // then copy it regularly 
                                    await BashRun('cp '+Escape(copy_Command.file_location)+' '+Escape(new_location))
                                    // give a response
                                    reby.says("Okay, finished")
                                    // delete extra variables
                                    delete copy_Command.file_location
                                    delete copy_Command.file_name
                                    
                                    // FIXME, check the  technicalities 
                                        // from bash:
                                            // cp copies the directory and the entire subtree connected at that point.  
                                            // If the source_file ends in a /, the contents of the directory 
                                            // are copied rather than the directory itself.
                                            // This option also causes symbolic links to be copied,
                                            // rather than indirected through, 
                                            // and for cp to create special files 
                                            // rather than copying them as normal files.  
                                            // Created directories have the same mode as the corresponding 
                                            // source directory, unmodified by the process' umask.
                                }
                        }
                }
        }
    })
serverconnect_Command        = new RebyCommand({prefix:"connect to a server"     ,
    initial_check : async function(the_command)
        {
            if (the_command.match(/^connect to a server */i))
                {
                    return async function(message_)
                        {
                            // TODO, add more explainantion options (ex: what is ssh)
                            // TODO, add ftp and other protocols
                            // FIXME, figure out if aything needs to be escaped
                            reby.says('How would you like to connect?')
                            reby.says('(If you dont know what method to use, ask the server owner)')
                            reby.says('(If you\'re the server owner, then you\'ll need to setup a way to connect)')
                            reby.suggestions = ['ssh']
                            return serverconnect_Command.responses.answerConnectionAskServer
                        }
                }
        },
    responses :
        {
            answerConnectionAskServer   : async function(message_)
                {
                    if (message_.match(/^ *ssh */))
                        {
                            serverconnect_Command.connection_method = 'ssh '
                            // TODO, add an option to try things without a username
                            reby.says("What is the name of the server?")
                            // FIXME, add "frequently used" type suggestions 
                            reby.suggestions = ["build.tamu.edu", 'I dont know']
                            return serverconnect_Command.responses.answerServerAskUsername
                        }
                    else 
                        {
                            // FIXME, add more ways to connect in the future
                            reby.says("Sorry I'm not sure what method that is :/")
                            return null
                        }
                },
            answerServerAskUsername     : async function(message_)
                {
                    // if the user doesn't know then 
                    if (message_.match(/^ *I don'?t know */i))
                        {
                            reby.says("Sorry I can't do much without the server name 😕")
                            // delete the connection_method 
                            delete serverconnect_Command.connection_method
                            return null
                        }
                    else 
                        {
                            // get rid of trailing and leading whitespace
                            serverconnect_Command.server_name = message_.replace(/^ *(.+) *$/,"$1")
                            
                            // FIXME, this is probably insecure
                            reby.says("What is your username?")
                            // FIXME, create frequently used suggestions instead of hardcoding them
                            reby.suggestions = [ "jeff.hykin", "I don't know"]
                            return serverconnect_Command.responses.answerUsernameAskPassword
                        }
                },
            answerUsernameAskPassword   : async function(message_)
                {
                    // if the user doesn't know their username 
                    if (message_.match(/^ *I don'?t know */i))
                        {
                            reby.says("Well I'm not sure how to connect without a username 😕")
                            reby.says("Try asking the person who owns the server if you can.")
                            // delete both things of collected data
                            delete serverconnect_Command.connection_method
                            delete serverconnect_Command.server_name
                            return null
                        }
                    else 
                        {
                            // get rid of trailing and leading whitespace
                            serverconnect_Command.username = message_.replace(/^ *(.+) *$/,"$1")
                            
                            // FIXME, this is probably insecure
                            reby.says("What is your password?")
                            message_input_Element.type = "password"
                            return serverconnect_Command.responses.answerPasswordRunConnection
                        }
                },
            answerPasswordRunConnection : async function(message_)
                {
                    // FIXME, what should be done in the case of a blank password?

                    // convert the input box from password-input back to message input 
                    message_input_Element.type = "text"

                    reby.says("Okay, attempting to connect")

                    // FIXME add error detection!!
                    // FIXME, escape 's in password
                    console.log("username:",serverconnect_Command.username)
                    console.log("servername:",serverconnect_Command.server_name)
                    // FIXME, make sure sshpass is installed 
                    server_response = await BashRunWithoutCheck("/usr/local/bin/sshpass -p"+message_+" ssh "+ serverconnect_Command.username + "@" +serverconnect_Command.server_name)
                    // reby_ssh_mode_active = true
                        // serverconnect_Command.server_name,
                        // serverconnect_Command.username,
                        // message_
                    
                    // add the home directory location 
                    //location_history.push(ssh_home_dir)
                    //reby.says("The server says you're at "+ssh_home_dir)
                    reby.says("Okay, I think you're connected")
                    if (server_response.length > 0)
                        {
                            reby.says("Here is what the server said when you connected")
                            reby.says(Indent(server_response+bash_response))
                            bash_response = ""
                        }
                        
                    // FIXME, do something with the username/server_name/password data!
                }
        }
    })




    
// End of RebyCommands
async function RebyResponse(a_command)
    {
        // console.log("about to do reby's response");
        // reset reby's suggestions before each response
        reby.suggestions = []
        reby.suggestion_index = 0
        
        // if there are no commands ready to run
        // then run the initial_checks 
        if (RESPONSE_FUNCTIONS.length === 0)
            {
                //console.log("running initial_checks")
                for (var each in initial_checks)
                    {
                        //console.log(initial_checks[each].prefix)
                        // CHANGED
                        var result_ = await initial_checks[each](a_command)
                        // FIXME, do a better check 
                        if (result_ != null)
                            {
                                RESPONSE_FUNCTIONS.push(result_)
                                break
                            }
                    }
            }
        
        // if there are no commands after all the initial checks 
        // then run the message_ as a bash commands 
        if (RESPONSE_FUNCTIONS.length === 0)
            {
                reby.says("I think thats a bash message\nThis is what bash said after I ran it:\n")
                reby.says(await BashRun(a_command),true)
                // TODO, make bash output monospaced
            }
        else 
            {
                // run the response function, remove it from the list, save its result
                var result_ = await RESPONSE_FUNCTIONS.pop()(a_command)
                // if there is a result 
                if (result_ != null)
                    {
                        // FIXME, add a check that makes sure that the result_ is actually the correct type
                        // then add it as the next function to run
                        RESPONSE_FUNCTIONS.push(result_)
                    }
            }
        
        // show the suggestions at the end of each message
        reby.showSuggestions()
        // main files and folders
        all_file_suggestions = (await BashRun("ls -1 -a /|sed 's/^/\\//';ls -1 -a")).split("\n")
    }



