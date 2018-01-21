# brew tap theseal/ssh-askpass
# brew install ssh-askpass
# brew services start theseal/ssh-askpass/ssh-askpass
# *reboot*
# it should go to /usr/local/Cellar/ssh-askpass/1.2.1/bin/ssh-askpass
# add the following to the bash profile 
#     export SUDO_ASKPASS="/usr/local/Cellar/ssh-askpass/1.2.1/bin/ssh-askpass"



require 'open3'

# The full url to run this file is: <br>
# `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/jeff-hykin/Griffin/master/install)"`



# griffin install for mac
def installEverything
    # FIXME, handle if there are mutliple users
        # create the .bash_profile if it doesnt already exist
        `cd ;touch .bash_profile`

    #
    # intro 
    #
        puts "_________________________________________________________________"
        puts "__                                                             __"
        puts "__                Graphical Sudo Installer 1.0.2               __"
        puts "__                                                             __"
        puts "_________________________________________________________________"
        puts ""
        puts "Here's what this tool needs installed:"
        puts "    x-code tools:   Apple's official programming tools"
        puts "    homebrew:       basically the app store for programmers"
        puts "    homebrew cask:  basically the app store for everything"
        puts "    graphical sudo: allow password override graphically"
        puts ""
        puts ""
        puts "Ready to install everything?(y/n)"
        puts "    (If you already have some tools installed, they will be updated)"
        puts ""
        print "    "
        answer = gets.chomp
        if answer == 'n' or answer == 'no'
            puts ""
            puts "Okay, sorry Griffin won't work without these :/"
            return nil 
        end#if 
        puts "    heads up:"
        puts "        A full installation (aka if you don't have any of these tools yet)"
        puts "        is probably going to take more than 15 minutes"
        puts ""
        puts "-----------------------"
        puts "Install started "
        puts "-----------------------"
        puts ""
        puts "Your password is needed to install homebrew (press ctrl+C to cancel)"
        # doing any command with sudo will require a password
        # but once the password is entered, it won't need to be entered again
        # once homebrew is actually trying to install
        # why do this?
        # this is so the user doesnt have to wait for xcode to install
        # then wait for homebrew to eb checked
        # then have to input their password
        `sudo echo okay`

    #
    # xcode tools 
    #
        puts "    x-code tools"
        stdout, stderr, status = Open3.capture3("bash;xcode-select --install")
        if stderr.match(/xcode-select: error: command line tools are already installed/)
            puts "        xcode tools are installed, checking for update"
            list_of_updates = `softwareupdate -l`
            update_name = list_of_updates.match(/(?<=\* )Command Line Tools.+/)
            if update_name != nil
                puts "        There is an update, starting install"
                `softwareupdate --install "#{update_name[0]}"`
                puts "        software update complete"
            else 
                puts "        Your xcode should be up to date!"
            end#if update
        end#if already installed
        puts "        Finished xcode tools"

    #
    # homebrew
    #
        #check homebrew
        puts "    homebrew"
        # Why is there "bash;..."? because without it, the 
        # capture3 will throw an error and exit the program
        # with bash; the error is contained with stderr
        stdout, stderr, status = Open3.capture3("bash;brew -v")
        homebrew_installed = (  nil != stdout.match(/Homebrew \d+\.\d+/)  )

        if not homebrew_installed

            `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" 2>/dev/null`

            #check homebrew
            stdout, stderr, status = Open3.capture3("bash;brew -v")
            homebrew_installed = (  nil != stdout.match(/Homebrew \d+\.\d+/)  )
        
        end#if not installed
        
        # FIXME, what to do if homebrew didn't install after trying to install
        if not homebrew_installed
            puts ""
            puts ""
            puts "I couldn't get homebrew to install for some reason :/"
            puts "I'm not sure what is wrong"
            puts "I'll try to cover this situation better in an update"
            puts "go to https://github.com/jeff-hykin/Griffin/issues"
            puts "and create a new issue if this problem affects you"
            return 
        end#if
    
        puts "        Finished homebrew"

    #
    # homebrew cask
    #
        puts "    homebrew cask"
        stdout, stderr, status = Open3.capture3("bash;brew tap caskroom/cask")
        puts "        Finished cask"


    #
    # duti
    #
        #FIXME, should probably add a check to make sure this installs okay
        puts "    duti"
        stdout, stderr, status = Open3.capture3("bash;brew install duti")
        puts "        Finished duti"

    #
    # node.js
    #

        puts "    node"
        stdout, stderr, status = Open3.capture3("bash;brew install node")
        node_alread_installed = false
        if stderr.match(/Warning: node [\d\._]+ is already installed/)
            puts "        node already installed, let me check a few things"
            node_alread_installed = true
        end
        # Does path need to be fixed?
            # lots of times when installing node
            # the node command still wont work because the 
            # computer doesnt know where the command is
            # so the path (where your computer looks) has to be manually updated
            path_fix_is_needed = stderr.match(/If you need to have this software first in your PATH run:/)
            path_fix = stderr.match(/If you need to have this software first in your PATH run:\n\s+(?<FirstPathCommand>.+)\n(?<SecondPathCommand>.+)/)
            # check for error 
                if path_fix_is_needed and (path_fix == nil)
                    puts ""
                    puts ""
                    puts ""
                    puts "There is a problem :/"
                    puts "Homebrew was installing node"
                    puts "But (as usual) $PATH needed to be updated manually"
                    puts "But the tool I made couldn't find how to update the path"
                    puts "here is what homebrew said:"
                    puts '    '+output.gsub(/\n/,"\n    ")
                    return
                end#if
            # try to add stuff to bash profile
            if path_fix != nil
                puts "        Your PATH needs to be fixed for node"
                puts "        but I'll go ahead and take care of it"
                first_command = path_fix["FirstPathCommand"]
                second_command = path_fix["SecondPathCommand"]
                # extract the actual path
                first_command.sub(/^echo '/,"")
                first_command.sub(/' >> ~\/\.bash_profile$/,"")
                second_command.sub(/^echo '/,"")
                second_command.sub(/' >> ~\/\.bash_profile$/,"")
                # FIXME, check and see if those locations are already in the path/ .bash_profile
                # add those commands to the bash profile 
                bash_profile = File.open(Dir.home+'/.bash_profile','a')
                exact_install_string = "# When griffin was installing node (through homebrew)\n# the PATH needed to be extended to include the node and npm commands\n# so the next two lines were added here in order to do that\n#{first_command}\n#{second_command}"
                # FIXME store exact_install_string somewhere so that uninstalls can be done easily
                bash_profile.puts(exact_install_string)
                bash_profile.close
                puts "        Okay, node was added to your path"
            end#if 

            # FIXME, add a fix for the compiler variables too 
        

        # check node
        stdout, stderr, status = Open3.capture3("bash;node -v")
        node_installed = (  nil != stdout.match(/v\d+\.\d+/)  )
        # check npm
        stdout, stderr, status = Open3.capture3("bash;npm -v")
        npm_installed = ( nil != stdout.match(/\d+\.\d+/))

        # FIXME, what to do if node didn't install
        if not node_installed or not npm_installed
            puts ""
            puts ""
            if node_alread_installed
                puts "Hmm, its installed but it failed my checks"
            else 
                puts "For some reason I couldn't get node.js installed :/"
            end#if
            puts "I'm not sure what is wrong"
            puts "I'll try to cover this situation better in an update"
            puts "go to https://github.com/jeff-hykin/Griffin/issues"
            puts "and create a new issue if this problem affects you"
            return
        end#if
        
        
        puts "        Finished node"

    #
    # pug, SASS, CoffeeScript, Electron, Electron-Dev
    #
        puts "    installing pug"
        # pug -V
        # pug version: 2.0.0-rc.4
        # pug-cli version: 1.0.0-alpha6
        `npm install -g pug`
        `npm install pug-cli -g`
        
        puts "    installing sass"
        # sass --version
        # 1.0.0-beta.4 compiled with dart2js 2.0.0-dev.10.0
        `npm install -g sass`

        puts "    installing coffeescript"
        # coffee -v
        # CoffeeScript version 1.12.7
        `npm install -g coffeescript`

        puts "    installing electron"
        # electron -v
        # v1.7.10
        `npm install -g electron`

        puts "    installing electron-dev"
        `npm install -g electron-dev`

        puts "    installing electron-debug"
        `npm install -g electron-debug`

    #
    # Griffin files!
    #

        puts "    griffin file"
        
        # FIXME, make sure the user has unix permission to do these
        # FIXME, put the non-bash files somewhere other than /usr/local/bin/ 
        # FIXME, catch errors here
        
        # Griffin.rb
            # if the file already exists, then delete it
            if File.exist? "/usr/local/bin/Griffin.rb"
                `rm -f /usr/local/bin/Griffin.rb`
            end 
            `curl -fsSL https://raw.githubusercontent.com/jeff-hykin/Griffin/master/Griffin.rb 1>/usr/local/bin/Griffin.rb`
            `chmod u+x /usr/local/bin/Griffin.rb`
        
        # griffin
            # if the file already exists, then delete it
            if File.exist? "/usr/local/bin/griffin"
                `rm -f /usr/local/bin/griffin`
            end 
            `curl -fsSL https://raw.githubusercontent.com/jeff-hykin/Griffin/master/griffin 1>/usr/local/bin/griffin`
            `chmod u+x /usr/local/bin/griffin`
            
        # new.grif
            # if the file already exists, then delete it
            if File.exist? "/usr/local/bin/new.grif"
                `rm -f /usr/local/bin/new.grif`
            end 
            `curl -fsSL https://raw.githubusercontent.com/jeff-hykin/Griffin/master/new.grif 1>/usr/local/bin/new.grif`
            `chmod u+r /usr/local/bin/new.grif`
        
        puts "        Finished griffin file"

    #
    # set default .grif opener 
    #
        # check if atom, sublime, or vs code are installed
        # FIXME, make sure these id's dont change
        # TODO, add support for more lanugages
        xcode_id     = "com.apple.dt.Xcode"
        sublime_id   = "com.sublimetext.3"
        atom_id      = "com.github.atom"
        vs_code_id   = "com.microsoft.VSCode"
        text_edit_id = "com.apple.TextEdit"

        has_atom    = false 
        has_sublime = false 
        has_vs_code = false

        all_apps = `ls -1 /Applications`.chomp
        all_apps.gsub!(/.app$/,"")
        all_apps = all_apps.split("\n")
        has_atom    = true if all_apps.include? "Atom"
        has_sublime = true if all_apps.include? "Sublime Text"
        has_vs_code = true if all_apps.include? "Visual Studio Code"

        # if no text editors that support griffin are installed
        if not has_atom and not has_sublime and not has_vs_code
            # then install vs code
            `brew cask install visual-studio-code`
            # FIXME, make sure VS Code installs correctly 
            # once its done installing, set the default opener for .grif to vs code
            `duti -s #{vs_code_id} .grif all`
        
        # if at least one editor is installed
        else
            # prefer vs code, then atom, then sublime
            if has_vs_code 
                `duti -s #{vs_code_id} .grif all`
                puts "initial set to vs_code"
            elsif has_atom
                `duti -s #{atom_id} .grif all`
            elsif has_sublime
                `duti -s #{sublime_id} .grif all`
            end#if

            # try to improve this choice even more by seeing 
            # which is the default javascript file opener
            stdout, stderr, status = (Open3.capture3("bash;duti -x js"))
            stdout.chomp!
            file_id = stdout.match(/.+\z/)
            if file_id != nil
                file_id = file_id[0]
                case file_id
                # if any of the three are the default opener for javascript
                # then set them to be the defaul opener for grif files
                when vs_code_id
                    `duti -s #{vs_code_id} .grif all`
                when atom_id
                    `duti -s #{atom_id} .grif all`
                when sublime_id
                    `duti -s #{sublime_id} .grif all`
                when text_edit_id, xcode_id
                    # if text edit or xcode are the default
                    # then something is probably just not setup
                    if has_vs_code
                        `duti -s #{vs_code_id} .grif all`
                    elsif has_atom
                        `duti -s #{atom_id} .grif all`
                    elsif has_sublime
                        `duti -s #{sublime_id} .grif all`
                    end#if
                else 
                    puts "new set to #{file_id}"
                    # if something else is selected 
                    # then use it for griffin
                    # TODO, think about potencial problems this could cause
                    `duti -s #{file_id} .grif all`
                end#case
            else
                # if there was an error 
                # prefer vs code, then atom, then sublime
                if has_vs_code
                    `duti -s #{vs_code_id} .grif all`
                    puts "initial set to vs_code"
                elsif has_atom
                    `duti -s #{atom_id} .grif all`
                elsif has_sublime
                    `duti -s #{sublime_id} .grif all`
                end#if
            end#if

            # FIXME, auto install the griffin extension for the correct editor 
        end#if 
    
    #
    # Finish info
    #
        puts "_________________________________________________________________"
        puts "                                                                 "
        puts "        ✨🎉✨🎊✨💥✨   Griffin is installed!!!  ✨🎉✨🎊✨💥✨     "
        puts "                                                                 "
        puts "_________________________________________________________________"
        puts ""
        puts "Want me to create a new app file?(y/n)"
        answer = gets.chomp
        if answer == 'y' or answer == 'yes'
            `/usr/local/bin/griffin new`
            puts ""
            puts "okay new.grif was created an opened"
            puts ""
            puts "type the following command to run the new app:"
            puts "    griffin new.grif"
        else 
            puts "okay"
        end#if

        
end#installEverything
installEverything
