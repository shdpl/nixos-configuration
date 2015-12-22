let
  vbox = ./target/vbox.nix;
  magdalene = ./target/magdalene.nix;
in {
  joan = vbox;
  livewyer = vbox;
  magdalene = magdalene;
}
