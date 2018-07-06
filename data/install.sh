#!/bin/bash
DIR=$PWD
CONFIG=$HOME/.config
SRC=$HOME/src
NIXOS_CONFIGURATION=$SRC/nixos-configuration

function enforce_link {
	if [[ ! -h $2 ]]; then
		[[ -e $2 ]] && rm -rf $2
		ln -s $1 $2
	fi
}

[[ -x $(which git) ]] || exit 1

[[ -d $CONFIG ]] || mkdir -p $CONFIG
[[ -d $SRC ]] || mkdir -p $SRC

if [[ ! -d $SRC/nixpkgs ]]; then
	git clone https://github.com/shdpl/nixpkgs $SRC/nixpkgs
fi
enforce_link $DIR/i3 $CONFIG/i3
enforce_link $DIR/i3status $CONFIG/i3status
enforce_link $DIR/mutt/.muttrc $HOME/.muttrc

if [[ ! -d $NIXOS_CONFIGURATION ]]; then
	git clone https://github.com/shdpl/nixos-configuration $NIXOS_CONFIGURATION
fi
enforce_link $DIR/nixos $NIXOS_CONFIGURATION/private
enforce_link $DIR/ssh $HOME/.ssh && chmod 400 $HOME/.ssh/*
enforce_link $DIR/gnupg $HOME/.gnupg && chmod 400 $HOME/.gnupg/*
enforce_link $DIR/vimb $CONFIG/vimb
enforce_link $DIR/vimperator/.vimperatorrc $HOME/.vimperatorrc
enforce_link $DIR/vimperator/.vimperator $HOME/.vimperator
enforce_link $DIR/nixops $HOME/.nixops
enforce_link $DIR/.config $HOME/.config

if [[ ! -d $SRC/dotfiles-vim ]]; then
	git clone --recursive https://github.com/shdpl/dotfiles-vim $SRC/dotfiles-vim
fi
enforce_link $SRC/dotfiles-vim/.vim $HOME/.vim
enforce_link $SRC/dotfiles-vim/.vimrc $HOME/.vimrc
