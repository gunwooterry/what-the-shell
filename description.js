
var manuals = {
    echo: `echo(ECHO) - repeat (echoing) input string <br>

    how to use : echo [1. input string] or echo [1. input string] [2. >] [3. output file] <br>
<br>
    1. input string : type any input string in "". ex) echo "hello, world" <br>
    2. > : redirection : redirect the output of left command to right output file (create if not exists) <br>
    3. output file : file where output will be written. <br>
<br>
    e.g. echo "hello, world" => hello, world will be written in shell <br>
    e.g. echo "hello, world" > hello.txt => hello,world will be written in hello.txt (create if file not exists) <br>
    `,
    rm: `rm(ReMove) - remove files or directories <br>
<br>
    how to use : rm [1. flags(optional)] [2. files and directories to remove] <br>
<br>
    1. flags : You can add flags to do special things. <br>
    > ‘-r’ (recursive) : If you want to remove folders, you should add this flag. <br>
    > ‘-f’ (force) : If you want to force to remove action, you can do that by add this flag. <br>
    If you want to force to remove folders, than you can add ‘-rf’ flag. <br>
    2. files and directories to remove : You can remove files or directories as much as you want. You should separate each files and directories by space. They can be not in the current directory, but in this case you should indicate their path. <br>
<br>
    e.g. rm -r hello.txt hi.txt ccc bbb => remove hello.txt, hi.txt, and ccc folder to bbb folder. <br>
    e.g. rm hello.txt hi.txt ccc bbb => remove hello.txt and hi.txt to bbb folder, but failed to remove ccc folder because there is no ‘-r’ flag. <br>
    e.g. rm -f hi.txt => force to remove hi.txt <br>
    e.g. rm -rf aaa/bbb => force to remove bbb folder in aaa folder.<br>`,

    cd: `cd(Change Directory) - change current directory.<br>
<br>
    how to use : cd [1. target directory]<br>
<br>
    1. target directory : Target directory can be either absolute path(path starting with ~/ or /) or relative path to the current directory.<br>
    There are special keywords ‘.’ and ‘..’, which means :<br>
    > ‘.’ : current directory<br>
    > ‘..’ : parent directory of current directory<br>
    If you want to jump into directories in depth, you should use its path. <br>
<br>
    e.g. cd .. => move to the parent directory of the current directory. <br>
    e.g. cd . => stay in the current directory.<br>
    e.g. cd aaa => move to aaa folder.<br>
    e.g. cd ~/aaa => move to aaa folder in the home directory.<br>
    e.g. cd ../aaa => move to aaa folder in the parent directory of the current directory.<br>`,

    mkdir: `mkdir(MaKe DIRectory) - make a new directory.<br>
<br>
    how to use : mkdir [1. directory name to make]<br>
<br>
    1. directory name to make : You should write a directory name that does not exist. mkdir basically makes a new directory with given name in the current directory, but you can make a new directory in other than the current directory by using '/' between each directory. In this case, the directory path should exist. <br>
<br>
    e.g. mkdir aaa => make a new directory of name ‘aaa’ in the current directory. If aaa folder already exists in the current directory, it failes. <br>
    e.g. mkdir bbb/aaa => make a new directory of name ‘aaa’ in bbb folder.<br>`,

    mv: `mv - move files or directories to other directory or rename them.<br>
<br>
    how to use<br>
    -rename : mv [1. file or directory to rename] [2. name to change]<br>
<br>
    1. file or directory to rename : You can change only one file or directory by one mv command.<br>
    2. name to change : Nothing special. Just write the name to change.<br>
<br>
    e.g. mv aaa bbb => change the name of aaa folder to bbb<br>
    e.g. mv hello.txt hi.txt => change the name of hello.txt to hi.txt<br>
<br>
    -move files : mv [1. files and directories to move] [2. target directory]<br>
<br>
    1. files and directories to move : You can move files or directories as much as you want. You should separate each files and directories by space.<br>
    2. target directory : It can be either absolute path(path starting with ~/ or /) or relative path to the current directory.<br>
<br>
    e.g. cp hello.txt hi.txt ccc bbb => move hello.txt, hi.txt, and ccc folder to bbb folder.<br>`,

    cat: `cat(CATenate) - display the content of a file.<br>
<br>
    how to use : cat [1. file to show content]<br>
<br>
    1. file to show content : They can be not in the current directory, but in this case you should use their path. <br>
<br>
    e.g. cat hello.txt => display the content of hello.txt.<br>
    e.g. cat aaa/hi.txt => display the content of hi.txt in aaa folder.<br>`,


    cp: `cp(CoPy) - copy files or directories to other directory.<br>
<br>
    how to use : cp [1. flags(optional)] [2. files and directories to copy] [3. target directory]<br>
<br>
    1. flags : You can add flags to do special things.<br>
    > ‘-r’ (recursive) : If you want to copy folders, you should add this flag.<br>
    2. files and directories to copy : You can copy files or directories as much as you want. You should separate each files and directories by space.<br>
    3. target directory : Target directory should not be the current directory. It can be either absolute path(path starting with ~/ or /) or relative path to the current directory.<br>
<br>
    e.g. cp -r hello.txt hi.txt ccc bbb => copy hello.txt, hi.txt, and ccc folder to bbb folder.<br>
    e.g. cp hello.txt hi.txt ccc bbb => copy hello.txt and hi.txt to bbb folder, but failed to copy ccc folder because there is no ‘-r’ flag. <br>`,
  }
