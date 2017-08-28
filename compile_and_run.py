import os
import sh
import regex as re
import webbrowser

# summary:
    # this is just a script for easy running/testing
        # this checks the current directory,
        # compiles the .pug file into .html,
        # compiles the .sass file into .css,
        # makes sure apache is running locally,
        # then opens index.html



# gets the current directory and removes the newline 
directory_ = str(sh.pwd())[0:-1]

# list of files/folders
command_output = str(sh.ls('-1'))
file_names = re.findall(r'(.+)\n',command_output)

# check the directory 
if re.match(r'/Library/WebServer/Documents/', directory_) == None:
    # this is here to avoid issues related to HTML not having permission
    # to include other files 
    print "\n\n\n\nI don't think you're in the right directory"
    print "to run web stuff, the project needs to be in:"
    print "Library/WebServer/Documents"
    exit(1)
    
# figure out the url    
remaining_dir = re.sub(r'^/Library/WebServer/Documents/','',directory_)
url_ = 'http://localhost/' + remaining_dir + '/index.html'


# make sure apache_is_running 
if True:
    # list all the processes, only show the command column, convert them to a big string 
    all_processes = str(sh.ps('ax', '-o', 'command'))
    # split up the string into a list of lines 
    all_processes = all_processes.splitlines()
    apache_is_running = False
    # check each line for /usr/sbin/httpd
    for each in all_processes:
        if re.search(r'/usr/sbin/httpd', each):
            apache_is_running = True
    if not apache_is_running:
        #print "\n\n\n\nHey I think apache isn't running"
        #print "It might take a second to start "
        #print "and it can be started from here with your password"
        os.system('sudo apachectl start')



# process pug and sass
if True:
    # check for pug file
    if True:
        if 'index.pug' not in file_names:
                print "\n\n\n\nI'm looking for an index.pug file but I don't see one"
                print "to fix this, either dont use this run.py or create an index.pug"
                exit(1)
        else:
            os.system("pug -P index.pug")
    # check for sass file 
    if True:
        if 'main.sass' not in file_names:
            print "\n\n\n\nI'm looking for an main.sass file but I don't see one"
            print "to fix this, either dont use this run.py or create an main.sass"
            exit(1)
        else:
            os.system("sass main.sass main.css")


# open the url in the default browser
webbrowser.open(url_)
print url_
