---
title: I really do think you should learn to use the Linux command line.
tags: [tech]
reply: true
updated: 2026-08-31T22:18:14Z
---

{% genericPost "https://azhdarchid.com/notes/i-really-do-think-2026-08-04/",
    title: "I really do think you should learn to use the Linux command line.",
    date: "2026-08-04T04:59:41+00:00",
    tags: "#computers, #the joy of unix",
    author: "Bruno Dias",
    authorUrl: "https://azhdarchid.com/",
    authorAvatar: "https://azhdarchid.com/images/meta/avatar.webp",
    authorAvatarAlt: "An Azhdarchid" %}
  <p>
    I really do think you should learn to use the Linux (or Mac, I suppose)
    command line if you can find the time at all. It is, genuinely, a
    dramatically more empowering way to use your computer than the alternative,
    and it will enable to think about your computer as a tool in ways that are
    completely different.
  </p>
  <p>
    So much of what's wrong with "computing", in general, stems from systematic
    user disempowerment... I think most people my age are cognizant of the harms
    of young people today not being exposed to even the most basic underlying
    concepts like the existence of the file system as an independent thing from
    siloed apps. But a lot of us never took that step backwards of considering
    the ways in which graphical user interfaces are disempowering. The thing
    about terminal interfaces is that by nature they must expose
    <em>every</em> affordance; if something can be done within the system, then
    it must be doable by a user from the terminal. And those affordances talk to
    each other, can be automated and connected in ways that go significantly
    beyond simply being able to toggle something or do something.
  </p>
  <p>
    There's just such a wealth of useful tools (in the Linux world, at least)
    that exist as CLI applications. <code>magick</code> is just always going to
    be better than any graphical utility for doing stuff like converting a png
    into a jpeg; <code>rg</code> is always going to be <em>the</em> best way to
    search a bunch of files for a snippet of text. Becoming comfortable with it
    will eventually give you avenues to make almost any task you do on the
    computer better.
  </p>
{% endgenericPost %}

I strongly cosign this post. The command line does a good job of being a
lenticular system: one that's easy to use in simple straightforward ways while
also providing a large amount of power when necessary[^power]. Here are some
absolute basics:

[^power]: It's a bit of a joke in programming circles, in fact, that you'll
    often end up accidentally building something *way* more complicated than you
    should using just command-line scripts just because it's so easy to
    accumulate more and more features without ever running into a point where it
    just doesn't work. One thing command line scripts *aren't* great at is
    managing large amounts of complexity. If you learn the Linux command line
    and use it enough to run into that problem, though, you've already become a
    programmer and you're ready to learn a full-fledged general-purpose
    language.

* To access the command line from a desktop, run a program called something like
  "Terminal" or "Console". The exact program will depend on which flavor of
  Linux you're using, but it'll almost always come up if you search for "term".
  This application will look like a big old text box something like this:

  {% image "/assets/337/konsole.png", alt: "A KDE Konsole window" %}{% endimage %}

  This text that's displayed there, `nex3@framework16:~$` is called the "command
  prompt", since it's *prompting* you to enter a *command*

* The terminal is your window to the command line. You can type commands in
  here, and the output of those commands will appear below. For example, if I
  use the `ls` command[^ls], it'll print the names of all the files and
  directories in the working directory.

  ```shellsession
  nex3@framework16:~$ ls
  bin  code  Desktop  Documents  Downloads  Music  Pictures  Public  src  Templates  Videos
  ```

* "Wait," I hear you ask, "what's the working directory?" Good question, friend!
  Every command line session takes place _in a particular directory_ on your
  system. You can see the working directory using the `pwd` command, and move
  between directories using the `cd` command.

  ```shellsession
  nex3@framework16:~$ pwd
  /home/nex3
  nex3@framework16:~$ cd Downloads
  nex3@framework16:~/Downloads$ cd Downloads
  ```

  For reference, here's what my home directory looks like when I open it in my
  graphical file manager. You can see that it has the same contents that `ls`
  displayed earlier:

  {% image "/assets/337/dolphin.png", alt: "A KDE Dolphin window" %}{% endimage %}

* The most basic way to run a command, as we've seen with `ls` and `pwd`, is
  just to type its name[^command-name] and press Enter. Sometimes you'll want to
  tell a command to work on a particular file, directory, or occasionally even
  something else like a URL. These are called "arguments"[^argument], and you
  can pass them to a command by writing them afterwards separated by a space.
  That's what we did earlier with `cd Downloads`! Once you've passed the
  argument or arguments you need, press enter to run the command.

* In addition to their main arguments, most commands support options. These look
  like arguments that start with `--` followed by hyphen-separated words. For
  example, you can write `ls --quote-name` to print all entries with double
  quotes around their names:

  ```shellsession
  nex3@framework16:~$ ls --quote-name
  "bin"  "code"  "Desktop"  "Documents"  "Downloads"  "Music"  "Pictures"  "Public"  "src"  "Templates"  "Videos"
  ```

  Sometimes, options can be shortened to `-` followed by a single letter. For
  example, `ls -Q` is short for `ls --quote-name`. You can combine multiple
  short options without additional spaces or hyphens, so `ls -aQ` is short for
  `ls --all --quote-name`. (In some cases, for historical reasons, some options
  may *only* be available in short form.)

* "But Natalie," you ask, "how do I know which options a command will even
  recognize?" There are a few ways. Just about every command takes a `--help`
  option that prints basic information about how to run a command and its
  options:

  <figure class="limited-height">

  ```shellsession
  nex3@framework16:~$ cd --help
  cd: cd [-L|[-P [-e]]] [-@] [dir]
      Change the shell working directory.
      
      Change the current directory to DIR.  The default DIR is the value of the
      HOME shell variable. If DIR is "-", it is converted to $OLDPWD.
      
      The variable CDPATH defines the search path for the directory containing
      DIR.  Alternative directory names in CDPATH are separated by a colon (:).
      A null directory name is the same as the current directory.  If DIR begins
      with a slash (/), then CDPATH is not used.
      
      If the directory is not found, and the shell option `cdable_vars' is set,
      the word is assumed to be  a variable name.  If that variable has a value,
      its value is used for DIR.
      
      Options:
        -L        force symbolic links to be followed: resolve symbolic
                  links in DIR after processing instances of `..'
        -P        use the physical directory structure without following
                  symbolic links: resolve symbolic links in DIR before
                  processing instances of `..'
        -e        if the -P option is supplied, and the current working
                  directory cannot be determined successfully, exit with
                  a non-zero status
        -@        on systems that support it, present a file with extended
                  attributes as a directory containing the file attributes
      
      The default is to follow symbolic links, as if `-L' were specified.
      `..' is processed by removing the immediately previous pathname component
      back to a slash or the beginning of DIR.
      
      Exit Status:
      Returns 0 if the directory is changed, and if $PWD is set successfully when
      -P is used; non-zero otherwise.
  ```

  <figcaption>If there's stuff here you don't understand, don't worry about it!</figcaption>
  </figure>

  There's also the special command `man` that takes the name of another command
  and provides more comprehensive documentation on it. For example, this is what
  you'll see if you run `man ls`:

  <figure class="limited-height">

  ```man
  LS(1)                          User Commands                          LS(1)

  NAME
         ls - list directory contents

  SYNOPSIS
         ls [OPTION]... [FILE]...

  DESCRIPTION
         List information about the FILEs (the current directory by default).
         Sort entries alphabetically if none of -cftuvSUX nor --sort is spec‐
         ified.

         Mandatory  arguments to long options are mandatory for short options
         too.

         -a, --all
                do not ignore entries starting with .

         -A, --almost-all
                do not list implied . and ..

         --author
                with -l, print the author of each file

         -b, --escape
                print C-style escapes for nongraphic characters

         --block-size=SIZE
                with -l, scale  sizes  by  SIZE  when  printing  them;  e.g.,
                '--block-size=M'; see SIZE format below

         -B, --ignore-backups
                do not list implied entries ending with ~

         -c     with  -lt:  sort  by, and show, ctime (time of last change of
                file status information); with -l: show  ctime  and  sort  by
   Manual page ls(1) line 1 (press h for help or q to quit)
  ```

  </figure>

  This documentation is colloquially called a command's "man page". You can
  usually also find a web version by searching for "\<command name\> man page",
  like [this one for ls].

* If you run `man`, you'll notice that the familiar command prompt is gone!
  Unlike other commands you've run so far, `man` runs as an interactive
  application, allowing you to scroll through and even search the documentation.
  Most command-line tools don't work this way, but it's certainly not
  unheard-of. You can press `q` when you're done to exit out (as it helpfully
  reminds you on the bottom line).

* Most Terminal applications these days use pretty common key bindings for
  editing text. However, there are a couple important exceptions:

  * Control-C in a terminal will quit the tool that's currently running.
    That means it won't copy text! Most Terminal applications use
    Control-Shift-C for that instead, and Control-Shift-V for pasting.

  * Control-Z in a terminal will suspend the tool that's currently running. (If
    you end up doing this accidentally, you can run `fg` to get it back.) To
    undo, press Control-Shift-Hyphen instead.

  * The Up and Down arrow keys let you move through the commands you've already
    written and re-run them. You can even edit them if you want to change
    something!

* Here are a few additional commands that are extremely useful for day-to-day
  tasks:

  * `cp <oldpath> <newpath>` copies a file from one path to another. You can
    also pass the `--recursive`/`-r` option to copy an entire directory.

  * `mv <oldpath> <newpath>` moves a file rather than copying it, like cutting
    and pasting in a file browser. This is also how you rename files.

  * `rm <path>` deletes a file. **Be careful:** there's no confirmation dialog
    and no recycle bin for this one! Like `cp`, you can pass the
    `--recursive`/`-r` option to delete an entire directory.

  * `mkdir <path>` creates a directory at the given path.

  * `grep -F <text> <file>`[^grep-f] will print every line in a file that
    contains a given string of text. `grep -RF <text> <directory>` will print
    every file in the directory that contains that text instead.

  * `find <directory> -name <name>`[^find] will find a file with the given name
    if it's in the directory. There are all sorts of additional flags you can
    pass to find all sorts of additional files.

  * `less <file>` will open a text file in a scrollable interface right in your
    Terminal application, much like `man`.

  * `wget <url>` will download the page or file at the given URL from the
    internet. (This one *might not* be installed on all systems, but it probably
    will.)

* There are a few "shorthand" paths that are often used on the command line. I
  already mentioned that `~` refers to your home directory. `.` refers to the
  working directory, and `..` refers to the directory that *contains* the
  working directory.

* In most cases where you can specify a file, you can use `*` as a "wildcard" to
  specify *all* files that have any characters in place of the `*`. For example,
  `rm *.txt` will delete all `.txt` files in the working directory.

* There's a lot more than this, but luckily people have been using this stuff
  for many decades so there's plenty of documentation and even more FAQs
  littered all over the internet. You can write your own scripts (just made of
  the same stuff you can do in the terminal) to automate common tasks. You can
  move output between commands, run commands conditionally, loop through files
  or directories or numbers, set variables that you re-use, and so on. But you
  don't *have* to know any of that to get started.

[^ls]: I use `ls` habitually to get a more visual sense of the "lay of the land"
    in the terminal. In fact, I ended up setting up my configuration so that
    every time I enter a new directory the command line automatically runs `ls`
    so I don't have to.

[^command-name]: Fun fact: almost every one of these commands is its own little
    executable program. You can find most of them in your system's `/bin` or
    `/usr/bin` directories.

[^argument]: Sometimes you may need to pass an argument that has a space in it
    already. In that case, you can surround the entire arguments with double
    quotes and it'll be interpreted as a single value, as in `cd "Not Porn"`.

[this one for ls]: https://man7.org/linux/man-pages/man1/ls.1.html

[^grep-f]: The `--fixed-strings`/`-F` option here tells `grep` to interpret its
    first argument as plain text. By default, it interprets that argument as an
    old dialect of [regular expressions]. This is probably worth learning and
    using too, but save it until you need to match a pattern rather than a fixed
    string of text.

[^find]: `find` is an unusual command in that its full-word options start with
    `-` instead of `--`. Why? Historical reasons, of course!

[regular expressions]: https://en.wikipedia.org/wiki/Regular_expression
