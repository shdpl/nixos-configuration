" Operating system interfaces.
"
" Author: Peter Odding <peter@peterodding.com>
" Last Change: June 25, 2013
" URL: http://peterodding.com/code/vim/misc/

function! xolox#misc#os#is_mac() " {{{1
  " Returns 1 (true) when on Mac OS X, 0 (false) otherwise. You would expect
  " this to simply check the Vim feature list, but for some obscure reason the
  " `/usr/bin/vim` included in Mac OS X (verified on version 10.7.5) returns 0
  " (false) in response to `has('mac')`, so we check the output of `uname`
  " to avoid false negatives.
  if !exists('s:is_mac')
    " By default we assume we are *not* on Mac OS X.
    let s:is_mac = 0
    if has('mac') || has('macunix') || has('gui_mac')
      " If Vim's feature list indicates we are on Mac OS X, we have our answer :-).
      let s:is_mac = 1
    else
      " Otherwise we check the output of `uname' to avoid false negatives.
      let result = xolox#misc#os#exec({'command': 'uname', 'check': 0})
      if result['exit_code'] == 0 && get(result['stdout'], 0, '') == 'Darwin'
        let s:is_mac = 1
      endif
    endif
  endif
  return s:is_mac
endfunction

function! xolox#misc#os#is_win() " {{{1
  " Returns 1 (true) when on Microsoft Windows, 0 (false) otherwise.
  return has('win16') || has('win32') || has('win64')
endfunction

function! xolox#misc#os#find_vim(...) " {{{1
  " Returns the program name of Vim as a string. On Windows and UNIX this just
  " [v:progname] [] as an absolute pathname while on Mac OS X there is
  " some special magic to find MacVim's executable even though it's usually
  " not on the executable search path. If you want, you can override the
  " value returned from this function by setting the global variable
  " `g:xolox#misc#os#vim_progname`.
  "
  " By default the choice of console Vim vs graphical Vim is made based on
  " the value of [v:progname] [], but if you have a preference you can pass
  " the string `vim` or `gvim` as the first and only argument.
  "
  " [v:progname]: http://vimdoc.sourceforge.net/htmldoc/eval.html#v:progname
  if exists('a:1')
    let program_name = a:1
  else
    let program_name = v:progname
  endif
  if exists('g:xolox#misc#os#vim_progname')
    let pathname = g:xolox#misc#os#vim_progname
  else
    let pathname = ''
  endif
  if empty(pathname) && xolox#misc#os#is_mac()
    " Special handling for Mac OS X where MacVim is usually not on the $PATH.
    " This always returns the "Vim" executable and not "MacVim" (regardless of
    " the caller's preference) because "MacVim" has funky dock magic going on.
    call xolox#misc#msg#debug("vim-misc %s: Trying MacVim workaround to find Vim executable ..", g:xolox#misc#version)
    let segments = xolox#misc#path#split($VIMRUNTIME)
    if segments[-3:] == ['Resources', 'vim', 'runtime']
      let pathname = xolox#misc#path#join(segments[0:-4] + ['MacOS', 'Vim'])
      call xolox#misc#msg#debug("vim-misc %s: The MacVim workaround resulted in the Vim executable %s.", g:xolox#misc#version, string(pathname))
    endif
  endif
  if empty(pathname)
    " Default logic.
    call xolox#misc#msg#debug("vim-misc %s: Looking for Vim executable named %s on search path ..", g:xolox#misc#version, string(program_name))
    let candidates = xolox#misc#path#which(program_name)
    if !empty(candidates)
      call xolox#misc#msg#debug("vim-misc %s: Found %i candidate(s) on search path: %s.", g:xolox#misc#version, len(candidates), string(candidates))
      let pathname = candidates[0]
    endif
  endif
  call xolox#misc#msg#debug("vim-misc %s: Reporting Vim executable %s.", g:xolox#misc#version, string(pathname))
  return pathname
endfunction

function! xolox#misc#os#exec(options) " {{{1
  " Execute an external command (hiding the console on Microsoft Windows when
  " my [vim-shell plug-in] [vim-shell] is installed).
  "
  " Expects a dictionary with the following key/value pairs as the first
  " argument:
  "
  " - **command** (required): The command line to execute
  " - **async** (optional): set this to 1 (true) to execute the command in the
  "   background (asynchronously)
  " - **stdin** (optional): a string or list of strings with the input for the
  "   external command
  " - **check** (optional): set this to 0 (false) to disable checking of the
  "   exit code of the external command (by default an exception will be
  "   raised when the command fails)
  "
  " Returns a dictionary with one or more of the following key/value pairs:
  "
  " - **command** (always available): the generated command line that was used
  "   to run the external command
  " - **exit_code** (only in synchronous mode): the exit status of the
  "   external command (an integer, zero on success)
  " - **stdout** (only in synchronous mode): the output of the command on the
  "   standard output stream (a list of strings, one for each line)
  " - **stderr** (only in synchronous mode): the output of the command on the
  "   standard error stream (as a list of strings, one for each line)
  "
  " [vim-shell]: http://peterodding.com/code/vim/shell/
  try

    " Unpack the options.
    let cmd = a:options['command']
    let async = get(a:options, 'async', 0)

    " Write the input for the external command to a temporary file?
    if has_key(a:options, 'stdin')
      let tempin = tempname()
      if type(a:options['stdin']) == type([])
        let lines = a:options['stdin']
      else
        let lines = split(a:options['stdin'], "\n")
      endif
      call writefile(lines, tempin)
      let cmd .= ' < ' . xolox#misc#escape#shell(tempin)
    endif

    " Redirect the standard output and standard error streams of the external
    " process to temporary files? (only in synchronous mode, which is the
    " default).
    if !async
      let tempout = tempname()
      let temperr = tempname()
      let cmd = printf('(%s) 1>%s 2>%s', cmd, xolox#misc#escape#shell(tempout), xolox#misc#escape#shell(temperr))
    endif

    " If A) we're on Windows, B) the vim-shell plug-in is installed and C) the
    " compiled DLL works, we'll use that because it's the most user friendly
    " method. If the plug-in is not installed Vim will raise the exception
    " "E117: Unknown function" which is caught and handled below.
    try
      if xolox#shell#can_use_dll()
        " Let the user know what's happening (in case they're interested).
        call xolox#misc#msg#debug("vim-misc %s: Executing external command using compiled DLL: %s", g:xolox#misc#version, cmd)
        let exit_code = xolox#shell#execute_with_dll(cmd, async)
      endif
    catch /^Vim\%((\a\+)\)\=:E117/
      call xolox#misc#msg#debug("vim-misc %s: The vim-shell plug-in is not installed, falling back to system() function.", g:xolox#misc#version)
    endtry

    " If we cannot use the DLL, we fall back to the default and generic
    " implementation using Vim's system() function.
    if !exists('exit_code')

      " Enable asynchronous mode (very platform specific).
      if async
        if xolox#misc#os#is_win()
          let cmd = 'start /b ' . cmd
        elseif has('unix')
          let cmd = '(' . cmd . ') &'
        else
          call xolox#misc#msg#warn("vim-misc %s: I don't know how to run commands asynchronously on your platform! Falling back to synchronous mode.", g:xolox#misc#version)
        endif
      endif

      " Execute the command line using 'sh' instead of the default shell,
      " because we assume that standard output and standard error can be
      " redirected separately, but (t)csh does not support this.
      if has('unix')
        call xolox#misc#msg#debug("vim-misc %s: Generated shell expression: %s", g:xolox#misc#version, cmd)
        let cmd = printf('sh -c %s', xolox#misc#escape#shell(cmd))
      endif

      " Let the user know what's happening (in case they're interested).
      call xolox#misc#msg#debug("vim-misc %s: Executing external command using system() function: %s", g:xolox#misc#version, cmd)
      call system(cmd)
      let exit_code = v:shell_error

    endif

    " Return the results as a dictionary with one or more key/value pairs.
    let result = {'command': cmd}
    if !async
      let result['exit_code'] = exit_code
      let result['stdout'] = s:readfile(tempout, 'standard output', a:options['command'])
      let result['stderr'] = s:readfile(temperr, 'standard error', a:options['command'])
      " If we just executed a synchronous command and the caller didn't
      " specifically ask us *not* to check the exit code of the external
      " command, we'll do so now.
      if get(a:options, 'check', 1) && exit_code != 0
        " Prepare an error message with enough details so the user can investigate.
        let msg = printf("vim-misc %s: External command failed with exit code %d!", g:xolox#misc#version, result['exit_code'])
        let msg .= printf("\nCommand line: %s", result['command'])
        " If the external command reported an error, we'll include it in our message.
        if !empty(result['stderr'])
          " This is where we would normally expect to find an error message.
          let msg .= printf("\nOutput on standard output stream:\n%s", join(result['stderr'], "\n"))
        elseif !empty(result['stdout'])
          " Exuberant Ctags on Windows XP reports errors on standard output :-x.
          let msg .= printf("\nOutput on standard error stream:\n%s", join(result['stdout'], "\n"))
        endif
        throw msg
      endif
    endif
    return result

  finally
    " Cleanup any temporary files we created.
    for name in ['tempin', 'tempout', 'temperr']
      if exists(name)
        call delete({name})
      endif
    endfor
  endtry

endfunction

function! s:readfile(fname, label, cmd) " {{{1
  try
    return readfile(a:fname)
  catch
    call xolox#misc#msg#warn("vim-misc %s: Failed to read temporary file (%s) with %s of external command: %s! (external command: %s)", g:xolox#misc#version, a:fname, a:label, v:exception, a:cmd)
    return []
  endtry
endfunction

" vim: ts=2 sw=2 et
