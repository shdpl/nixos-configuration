"
" Useful commands
" ,/			: clears my search results
" :oldfiles OR :browse oldfiles
" DiffOrig: shows differences between current version of file and original one
"
" TODO:
"		tabularize
"		tagbar
"		matchit

set backspace=indent,eol,start
set nocompatible

if has("vms")
	set nobackup
else
	set backup
	set backupdir=/tmp//
endif
set viewdir=/tmp//

set history=50
set ruler
set showcmd
if version >= 703
	set relativenumber
endif
set incsearch
set cursorline

set wildmenu
set wildmode=list:longest,full
set wildignore+=*/dist/*,*/node_modules/*,*.so,*.swp,*.zip

set nowrap

set cindent
set noexpandtab
set copyindent
set softtabstop=0
set shiftwidth=2
set tabstop=2
set shiftround
set showmatch
set smartcase
set showmode

set title
set novisualbell
set noerrorbells
set autowrite

set tabpagemax=20

nnoremap <F2> :set invpaste paste?<CR>
set pastetoggle=<F2>
noremap <silent> <F2> :set number!<CR>

map <F5> :make<CR>
nmap <silent> <F8> :TagbarToggle<CR>

if &wrap
	nnoremap <down> gj
	nnoremap <up> gk
endif

map <C-up> <C-Y>
map <C-down> <C-E>

nnoremap <A-down> :m .+1<CR>==
nnoremap <A-up> :m .-2<CR>==
inoremap <A-down> <Esc>:m .+1<CR>==gi
inoremap <A-up> <Esc>:m .-2<CR>==gi
vnoremap <A-down> :m '>+1<CR>gv=gv
vnoremap <A-up> :m '<-2<CR>gv=gv

nnoremap th  :tabfirst<CR>
nnoremap tj  :tabnext<CR>
nnoremap tk  :tabprev<CR>
nnoremap tl  :tablast<CR>
nnoremap tt  :tabedit<Space>
nnoremap tn  :tabnext<Space>
nnoremap tm  :tabm<Space>
nnoremap td  :tabclose<CR>

imap <C-Space> <C-x><C-o>
imap <C-@> <C-Space>

if $COLORTERM == 'gnome-terminal'
	set t_Co=256
endif

if &shell =~# 'fish$'
	set shell=sh
endif

function CloseCPair()
	:inoremap ( ()<ESC>i
	:inoremap ) <c-r>=ClosePair(')')<CR>
	:inoremap { {}<ESC>i
	:inoremap } <c-r>=ClosePair('}')<CR>
	:inoremap [ []<ESC>i
	:inoremap ] <c-r>=ClosePair(']')<CR>
endf

set list!
if has('gui_running')
    set listchars=tab:▶\ ,trail:·,extends:\#,nbsp:.
else
    set listchars=tab:>.,trail:.,extends:\#,nbsp:.
endif

if has("autocmd")
	filetype plugin indent on

	augroup vimrcEx
	au!

	function ClosePair(char)
		if getline('.')[col('.') - 1] == a:char
			return "\<Right>"
		else
			return a:char
		endif
	endf
	function FileTypeD()
		set foldmethod=syntax
		call CloseCPair()
		let s:tlist_def_d_settings = 'd;n:namespace;v:variable;d:macro;t:typedef;c:class;g:enum;s:struct;u:union;f:function'
	endfunction
	function FileTypePhp()
		set omnifunc=phpcomplete#CompletePHP
		set makeprg=php\ %
		" let g:php_folding=2
		set foldmethod=syntax

		" PSR-12
		set tabstop=4
		set shiftwidth=4
		set expandtab
		let g:syntastic_php_checkers=['php', 'phpcs']
		let g:syntastic_php_phpcs_args = '--standard=PSR2 -n'

		" " psr-2 settings
		" setlocal expandtab tabstop=8 softtabstop=4 shiftwidth=4
		" setlocal autoindent
		" setlocal textwidth=80
		" setlocal smartindent
		" setlocal nocindent
		" " setlocal cc+=120
		" " au User lsp_setup call lsp#register_server({
		" " 	\ 'name': 'psalm  --language-server',
		" " 	\ 'cmd': {server_info->[expand('psalm --language-server --verbose')]},
		" " 	\ 'root_uri': function('s:find_root_uri'),
		" " 	\ 'allowlist': ['php'],
		" " 	\ })
		" " let g:lsp_log_verbose = 1
		" " let g:lsp_log_file = expand('~/vim-lsp.log')
		" " let g:asyncomplete_log_file = expand('~/asyncomplete.log')
	endfunction
	function FileTypeXml()
		setlocal equalprg="XMLLINT_INDENT=$'\t' xmllint --format --recover - 2>/dev/null"
		set omnifunc=xmlcomplete#CompleteTags
	endfunction
	function FileTypeHtml()
		set foldmethod=indent
		set formatprg=tidy\ -indent\ -quiet\ --show-errors\ 0\ --tidy-mark\ no\ --show-body-only\ auto
		set omnifunc=htmlcomplete#CompleteTags
	endfunction

	autocmd BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g`\"" | endif

	autocmd FileType sh set makeprg=sh\ %
	autocmd FileType python set omnifunc=pythoncomplete#Complete
	autocmd FileType javascript set omnifunc=javascriptcomplete#CompleteJS
	autocmd FileType css set omnifunc=csscomplete#CompleteCSS
	autocmd FileType less set makeprg=lessc\ %
	" autocmd FileType c set omnifunc=ccomplete#Complete
	autocmd FileType xml call FileTypeXml()
	autocmd FileType html call FileTypeHtml()
	autocmd FileType php call FileTypePhp()
	autocmd FileType d call FileTypeD()
	" autocmd FileType yaml set tabstop=2 softtabstop=2 expandtab shiftwidth=2 smarttab
	autocmd FileType yaml setlocal ts=2 sts=2 sw=2 expandtab
	au BufRead,BufNewFile *.dt		set filetype=jade
	autocmd BufRead,BufNewFile *.dt		set filetype=jade
	autocmd FileType fish set makeprg=fish\ %
	autocmd BufNewFile,BufRead Vagrantfile set filetype=ruby

	highlight ExtraWhitespace ctermbg=red guibg=red
	let s:matcher
				\ = 'match ExtraWhitespace /^\s* \s*\|\s\+$/'
	exec s:matcher

	autocmd BufWinEnter * exec s:matcher
	autocmd InsertEnter * match ExtraWhitespace /\s\+\%#\@<!$/
	autocmd InsertLeave * exec s:matcher
	autocmd BufWinLeave * call clearmatches()

	autocmd BufWinLeave *.* mkview
	autocmd BufWinEnter *.* silent loadview

	autocmd Syntax * syn match ExtraWhitespace /\s\+$\| \+\ze\t/

	autocmd CursorMovedI * if pumvisible() == 0|pclose|endif
	autocmd InsertLeave * if pumvisible() == 0|pclose|endif

	augroup END
else
	set autoindent
endif

let g:easytags_suppress_ctags_warning = 1
set statusline+=%#warningmsg#
set statusline+=%{SyntasticStatuslineFlag()}
set statusline+=%*

let g:syntastic_always_populate_loc_list = 1
let g:syntastic_auto_loc_list = 1
let g:syntastic_check_on_open = 1
let g:syntastic_check_on_wq = 0
let g:syntastic_mode_map = { 'mode': 'active',
	\ 'active_filetypes': ['d','yaml'],
	\ 'passive_filetypes': ['html'] }
let g:syntastic_javascript_checkers = ['eslint']
let g:syntastic_javascript_eslint_exe = 'npm run lint --'
let g:syntastic_disabled_filetypes = ['scss']

" call pathogen#infect()

if &t_Co > 2 || has("gui_running")
	syntax on
	set hlsearch
	nmap <silent> ,/ :nohlsearch<CR>
	colorscheme jellybeans
endif

if !exists(":DiffOrig")
	command DiffOrig vert new | set bt=nofile | r ++edit # | 0d_ | diffthis | wincmd p | diffthis
endif

let g:easytags_suppress_ctags_warning = 1
let g:syntastic_mode_map = { 'mode': 'active',
	\ 'active_filetypes': ['d'],
	\ 'passive_filetypes': ['html'] }
let g:ctrlp_root_markers = ['src', '.git', 'source', 'package.json', 'go.mod']
let g:ackprg = 'ag --nogroup --nocolor --column'

ActivateAddons vim-snippets snipmate

au BufNewFile,BufRead releaseJenkins setf groovy

let g:snipMate = { 'snippet_version' : 1 } " TODO: make sure old snippets are compatible with new parser
let g:snips_author = "Mariusz `shd` Gliwiński"
let g:snips_email = "shd@nawia.net"
let g:snips_github = "https://github.com/shdpl"
