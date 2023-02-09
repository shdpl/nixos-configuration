{ config, pkgs, lib, ... }:

let
	cfg = config.programming;
  php-manual = pkgs.callPackage ../pkgs/php-manual/default.nix { };
  compose-spec = pkgs.callPackage ../pkgs/compose-spec/default.nix { };
in

with lib;

{
  options = {
    programming = {
      enable = mkOption {
				type = with types; bool;
      };
      text = mkOption {
				type = with types; bool;
        default = true;
      };
      bash = mkOption {
        type = with types; bool;
        default = true;
      };
      js = mkOption {
				type = with types; bool;
        default = false;
      };
      go = mkOption {
				type = with types; bool;
        default = false;
      };
      android = mkOption {
        type = with types; bool;
        default = false;
      };
      java = mkOption {
        type = with types; bool;
        default = false;
      };
      scala = mkOption {
				type = with types; bool;
        default = false;
      };
      clojure = mkOption {
        type = types.bool;
        default = false;
      };
      php = mkOption {
				type = with types; bool;
        default = false;
      };
      typescript = mkOption {
				type = with types; bool;
        default = false;
      };
      cc = mkOption {
        type = with types; bool;
        default = false;
      };
      d = mkOption {
				type = with types; bool;
        default = false;
      };
      nix = mkOption {
				type = with types; bool;
        default = false;
      };
      system = mkOption {
				type = with types; bool;
        default = false;
      };
      docker = mkOption {
        type = with types; bool;
        default = false;
      };
      user = mkOption {
        type = with types; str;
      };
      gitlabAccessTokens = mkOption {
        type = with types; str;
      };
    };
  };

  config = (mkMerge [
		(mkIf (cfg.enable == true) {
      environment.etc.hosts.mode = "0644";

      environment.systemPackages = with pkgs;
      [
        # bfg-repo-cleaner

        colordiff highlight
        subversion mercurial
        meld
        jq csvkit xmlstarlet #rxp? xmlformat?
        yaml2json nodePackages.js-yaml
        # yajsv

        bc
        ctags

        gnumake

        protobuf
        gitAndTools.gitflow
        #copyright-update
        # public http service to pipe through nc from pc to the website ( returns a link )
      ];
      # nix.extraOptions = ''
      #   access-tokens = gitlab.com=${cfg.gitlabAccessTokens}
      # '';
    })
    (mkIf (cfg.enable == true && cfg.android == true) {
      programs.adb.enable = true;
      environment.systemPackages = with pkgs;
      [
        heimdall
      ];
    })
    (mkIf (cfg.enable == true && cfg.bash == true) {
      environment.systemPackages = with pkgs;
      [
        nodePackages.bash-language-server
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = nvim-lspconfig;
          config = "lua require'lspconfig'.bashls.setup{}";
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.java == true) {
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        # { plugin = nvim-jdtls;
        #   type = "lua";
        #   config = ''
        #   local home = os.getenv('HOME')
        #   local root_markers = {'gradlew', 'mvnw', '.git'}
        #   local root_dir = require('jdtls.setup').find_root(root_markers)
        #   local project_name = vim.fn.fnamemodify(vim.fn.getcwd(), ':p:h:t')
        #   local workspace_dir = home .. "/.local/share/eclipse/" .. vim.fn.fnamemodify(root_dir, ":p:h:t")
        #
        #   function nnoremap(rhs, lhs, bufopts, desc)
        #     bufopts.desc = desc
        #     vim.keymap.set("n", rhs, lhs, bufopts)
        #   end
        #
        #   -- The on_attach function is used to set key maps after the language server
        #   -- attaches to the current buffer
        #   local on_attach = function(client, bufnr)
        #     -- Regular Neovim LSP client keymappings
        #     local bufopts = { noremap=true, silent=true, buffer=bufnr }
        #     nnoremap('gD', vim.lsp.buf.declaration, bufopts, "Go to declaration")
        #     nnoremap('gd', vim.lsp.buf.definition, bufopts, "Go to definition")
        #     nnoremap('gi', vim.lsp.buf.implementation, bufopts, "Go to implementation")
        #     nnoremap('K', vim.lsp.buf.hover, bufopts, "Hover text")
        #     nnoremap('<C-k>', vim.lsp.buf.signature_help, bufopts, "Show signature")
        #     nnoremap('<space>wa', vim.lsp.buf.add_workspace_folder, bufopts, "Add workspace folder")
        #     nnoremap('<space>wr', vim.lsp.buf.remove_workspace_folder, bufopts, "Remove workspace folder")
        #     nnoremap('<space>wl', function()
        #     print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
        #     end, bufopts, "List workspace folders")
        #     nnoremap('<space>D', vim.lsp.buf.type_definition, bufopts, "Go to type definition")
        #     nnoremap('<space>rn', vim.lsp.buf.rename, bufopts, "Rename")
        #     nnoremap('<space>ca', vim.lsp.buf.code_action, bufopts, "Code actions")
        #     vim.keymap.set('v', "<space>ca", "<ESC><CMD>lua vim.lsp.buf.range_code_action()<CR>",
        #     { noremap=true, silent=true, buffer=bufnr, desc = "Code actions" })
        #     nnoremap('<space>f', function() vim.lsp.buf.format { async = true } end, bufopts, "Format file")
        #
        #     -- Java extensions provided by jdtls
        #     nnoremap("<C-o>", jdtls.organize_imports, bufopts, "Organize imports")
        #     nnoremap("<space>ev", jdtls.extract_variable, bufopts, "Extract variable")
        #     nnoremap("<space>ec", jdtls.extract_constant, bufopts, "Extract constant")
        #     vim.keymap.set('v', "<space>em", [[<ESC><CMD>lua require('jdtls').extract_method(true)<CR>]],
        #     { noremap=true, silent=true, buffer=bufnr, desc = "Extract method" })
        #   end
        #    
        #   local config = {
        #     cmd = {'${pkgs.jdt-language-server}/bin/jdt-language-server','-data',workspace_dir},
        #     on_attach = on_attach,
        #     root_dir = root_dir,
        #   }
        #   require('jdtls').start_or_attach(config)
        #   '';
        # }
      ];
      environment.systemPackages = with pkgs;
      [
        jdk
        maven
        jetbrains.idea-community
        jdt-language-server
      ];
    })
    (mkIf (cfg.enable == true && cfg.scala == true) {
      environment.systemPackages = with pkgs;
      [
        scala_3 sbt coursier metals scalafmt
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        {
          plugin = nvim-metals;
          type = "lua";
          config = builtins.readFile ../data/nvim/nvim-metals.lua;
        }
        {
          plugin = nvim-cmp;
        }
        {
          plugin = packer-nvim;
        }
        {
          plugin = cmp-nvim-lsp;
        }
        {
          plugin = cmp-vsnip;
        }
        {
          plugin = vim-vsnip;
        }
        {
          plugin = nvim-dap;
        }
        {
          plugin = plenary-nvim;
        }
      ];
    })
		(mkIf (cfg.enable == true && cfg.clojure == true) {
      environment.systemPackages = with pkgs;
      [
        leiningen
      ];
    })
		(mkIf (cfg.enable == true && cfg.php == true) {
      networking.firewall.allowedTCPPorts = [ 9000 9003 ];
      environment.systemPackages = with pkgs;
      [
        php80 php80Packages.composer php80Packages.phpcs
        fcgi
        phpPackages.phpcs #phpPackages.psalm
        php-manual
        jetbrains.phpstorm
      ];
      
      # home-manager.users.${cfg.user}.programs.neovim.extraConfig = ''
      #   lua require('lspconfig').psalm.setup({cmd = { '${pkgs.phpPackages.psalm}/bin/psalm' }})
      # '';
    })
		(mkIf (cfg.enable == true && cfg.typescript == true) {
      environment.systemPackages = with pkgs;
      [
        nodePackages.typescript
        nodePackages.typescript-language-server
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = typescript-vim;
          type = "lua";
          config = ''
            require('lspconfig').tsserver.setup({
              cmd = {
                '${pkgs.nodePackages.typescript-language-server}/bin/typescript-language-server',
                '--stdio',
                '--tsserver-path',
                '${pkgs.nodePackages.typescript}/lib/node_modules/typescript/lib'
              }
            })
          '';
        }
      ];
    })
		(mkIf (cfg.enable == true && cfg.go == true) {
      home-manager.users.${cfg.user} = {
        programs.go = {
          enable = true;
          goBin = "/home/${cfg.user}/src/go/bin";
          goPath = "/home/${cfg.user}/src/go";
          packages = {
            "golang.org/x/text" = builtins.fetchGit "https://go.googlesource.com/text";
            #"golang.org/x/tools/cmd/godoc" = builtins.fetchGit "https://github.com/golang/tools.git";
          };
        };
        home.sessionPath = [ "/home/${cfg.user}/src/go/bin" ];
      };
      environment.variables = {
        GOPATH="/home/${cfg.user}/src/go";
        #GO15VENDOREXPERIMENT="1";
        #CGO_ENABLED="0";
      };
      environment.systemPackages = with pkgs;
      [
        # glide
        #vgo2nix
        gotags
        go-protobuf
      ];
    })
    (mkIf (cfg.enable == true && cfg.text == true) {
      environment.systemPackages = with pkgs;
      [
        libreoffice pandoc #catdoc
        # dadadodo mdbook
        languagetool vale proselint link-grammar
        # foam?
        enca
      ];
    })
    (mkIf (cfg.enable == true && cfg.js == true) {
      environment.systemPackages = with pkgs;
      [
        html-tidy /* vscodium pup */
        nodejs nodePackages.prettier
        nodePackages.vscode-html-languageserver-bin
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = html5-vim;
        config = ''
          lua require('lspconfig').html.setup({cmd = { '${pkgs.nodePackages.vscode-html-languageserver-bin}/bin/html-languageserver', '--stdio' }})
        '';
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.cc == true) {
      environment.systemPackages = with pkgs;
      [
        clang_10
      ];
    })
    (mkIf (cfg.enable == true && cfg.d == true) {
      environment.systemPackages = with pkgs;
      [
        /*dmd dtools*/
      ];
    })
    (mkIf (cfg.enable == true && cfg.system == true) {
      programs.bcc.enable = true;
      environment.systemPackages = with pkgs;
      [
        valgrind dfeet
        ltrace strace gdb
        dhex bvi vbindiff
      ];
    })
    (mkIf (cfg.enable == true && cfg.nix == true) {
      environment.systemPackages = with pkgs;
      [
        nix-prefetch-scripts nixpkgs-lint nox
        nixos-option nix-doc
        rnix-lsp
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = vim-nix;
          type = "lua";
          config = "require('lspconfig').rnix.setup({cmd = { '${pkgs.rnix-lsp}/bin/rnix-lsp' }})";
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.docker == true) {
      virtualisation.libvirtd.enable = true;
      virtualisation.docker.enable = true;
      environment.systemPackages = with pkgs;
      [
        docker-compose
        compose-spec
      ];
    })
  ]);
}
