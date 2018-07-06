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
		let g:php_folding=2
		set foldmethod=syntax
	endfunction
	function FileTypeXml()
		setlocal equalprg="XMLLINT_INDENT=$'\t' xmllint --format --recover - 2>/dev/null"
		set omnifunc=xmlcomplete#CompleteTags
	endfunction

	autocmd BufReadPost * if line("'\"") > 1 && line("'\"") <= line("$") | exe "normal! g`\"" | endif

	autocmd FileType python set omnifunc=pythoncomplete#Complete
	autocmd FileType javascript set omnifunc=javascriptcomplete#CompleteJS
	autocmd FileType html set omnifunc=htmlcomplete#CompleteTags
	autocmd FileType css set omnifunc=csscomplete#CompleteCSS
	autocmd FileType less set makeprg=lessc\ %
	autocmd FileType c set omnifunc=ccomplete#Complete
	autocmd FileType xml call FileTypeXml()
	autocmd FileType php call FileTypePhp()
	autocmd FileType d call FileTypeD()
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
let g:syntastic_mode_map = { 'mode': 'active',
	\ 'active_filetypes': ['d'],
	\ 'passive_filetypes': ['html'] }
let g:ctrlp_root_markers = ['src']

call pathogen#infect()

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
let g:ctrlp_root_markers = ['src', '.git', 'source']
let g:ackprg = 'ag --nogroup --nocolor --column'
