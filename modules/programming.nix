{ config, pkgs, lib, ... }:

let
  cfg = config.programming;
  # php-manual = pkgs.callPackage ../pkgs/php-manual/default.nix { };
  compose-spec = pkgs.callPackage ../pkgs/compose-spec/default.nix { };
  go-nvim = pkgs.vimUtils.buildVimPlugin {
    name = "go.nvim";
    src = pkgs.fetchFromGitHub {
      owner = "ray-x";
      repo = "go.nvim";
      rev = "470349cff528448969efeca65b2f9bdb64730e1b";
      sha256 = "sha256-71ni/OjbUKjhHKoheYqX24QiSpPtnilZwmLRuyBulb8=";
    };
  };
  guihua-lua = pkgs.vimUtils.buildVimPlugin {
    name = "guihua.lua";
    src = pkgs.fetchFromGitHub {
      owner = "ray-x";
      repo = "guihua.lua";
      rev = "dca755457a994d99f3fe63ee29dbf8e2ac20ae3a";
      sha256 = "sha256-gz0hd8TyCLlZOnG5mfXdxKkXL3rpP8f3P3/X6jNa5c8=";
    };
  };
  null-ls = pkgs.vimUtils.buildVimPlugin {
    name = "null-ls.vim";
    src = pkgs.fetchFromGitHub {
      owner = "jose-elias-alvarez";
      repo = "null-ls.nvim";
      rev = "60b4a7167c79c7d04d1ff48b55f2235bf58158a7";
      sha256 = "sha256-V56Xt1KtNobuLqLe0pL1Hw2xQw36rceC1e1rT+cJ1YA=";
    };
  };
  freemarker-vim = pkgs.vimUtils.buildVimPlugin {
    pname = "freemarker.vim";
    version = "993bda23e72e4c074659970c1e777cb19d8cf93e";
    src = pkgs.fetchFromGitHub {
    owner = "andreshazard";
    repo = "vim-freemarker";
    rev = "993bda23e72e4c074659970c1e777cb19d8cf93e";
    sha256 = "sha256-g4GnutHqxOH0rhZZmx7YpqFWZ9a+lTC6SdNYvVrSPbY=";
    };
    meta.homepage = "https://github.com/euclidianAce/BetterLua.vim/";
  };
  androidEnv = pkgs.buildFHSUserEnv {
    name = "android-env";
    targetPkgs = pkgs: with pkgs;
    [ git
      gitRepo
      gnupg
      python2
      curl
      procps
      openssl
      gnumake
      nettools
      androidenv.androidPkgs_9_0.platform-tools
      jdk
      schedtool
      util-linux
      m4
      gperf
      perl
      libxml2
      zip
      unzip
      bison
      flex
      lzop
      python3
    ];
    multiPkgs = pkgs: with pkgs;
    [ zlib
      ncurses5
    ];
    runScript = "bash";
    profile = ''
      export ALLOW_NINJA_ENV=true
      export USE_CCACHE=1
      export ANDROID_JAVA_HOME=${pkgs.jdk.home}
      export LD_LIBRARY_PATH=/usr/lib:/usr/lib32
    '';
};

in

with lib;

{
  options = {
    programming = {
      enable = mkEnableOption "";
      text = mkOption {
        type = with types; bool;
        default = true;
      };
      visualization = mkOption {
        type = with types; bool;
        default = false;
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
      sql = mkOption {
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
      terraform = mkOption {
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

        # ghostscript imagemagick exiftool
      ];
      # nix.extraOptions = ''
      #   access-tokens = gitlab.com=${cfg.gitlabAccessTokens}
      # '';
    })
    (mkIf (cfg.enable == true && cfg.android == true) {
      programs.adb.enable = true;
      environment.systemPackages = with pkgs;
      [
        gitRepo
        heimdall
        # pkgs.stdenv.mkDerivation {
        #   name = "android-env-shell";
        #   nativeBuildInputs = [ androidEnv ];
        #   shellHook = "exec android-env";
        # }
        # xiaomitool
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
        { plugin = nvim-jdtls;
          type = "lua";
          config = builtins.readFile ../data/nvim/nvim-jdtls.lua;
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
        {
          plugin = freemarker-vim;
        }
      ];
      environment.systemPackages = with pkgs;
      [
        jdk
        maven gradle
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
        php phpPackages.composer phpPackages.phpcs

        fcgi
        phpPackages.phpcs
        # php-manual
        jetbrains.phpstorm
      ];
      
      # home-manager.users.${cfg.user}.programs.neovim.extraConfig = ''
      #   lua require('lspconfig').psalm.setup({cmd = { '${pkgs.phpPackages.psalm}/bin/psalm' }})
      # '';
      # home-manager.users.${cfg.user}.programs.neovim.extraConfig = ''
      #   lua require('lspconfig').phpactor.setup({cmd = { '${pkgs.phpPackages.phpactor}/bin/phpactor' }})
      # '';
      home-manager.users.${cfg.user}.programs.neovim.extraConfig = ''
        lua require('lspconfig').intelephense.setup({cmd = { '${pkgs.nodePackages.intelephense}/bin/intelephense', '--stdio' }})
      '';
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
            local map = vim.keymap.set
            vim.opt_global.completeopt = { "menuone", "noinsert", "noselect" }
            map("n", "gD", function()
              vim.lsp.buf.definition()
            end)

            map("n", "K", function()
              vim.lsp.buf.hover()
            end)

            map("n", "gi", function()
              vim.lsp.buf.implementation()
            end)

            map("n", "gr", function()
              vim.lsp.buf.references()
            end)

            map("n", "gds", function()
              vim.lsp.buf.document_symbol()
            end)

            map("n", "gws", function()
              vim.lsp.buf.workspace_symbol()
            end)

            map("n", "<leader>cl", function()
              vim.lsp.codelens.run()
            end)

            map("n", "<leader>sh", function()
              vim.lsp.buf.signature_help()
            end)

            map("n", "<leader>rn", function()
              vim.lsp.buf.rename()
            end)

            map("n", "<leader>f", function()
              vim.lsp.buf.format { async = true }
            end)

            map("n", "<leader>ca", function()
              vim.lsp.buf.code_action()
            end)

            map("n", "<leader>ws", function()
              require("metals").hover_worksheet()
            end)

            -- all workspace diagnostics
            map("n", "<leader>aa", function()
              vim.diagnostic.setqflist()
            end)

            -- all workspace errors
            map("n", "<leader>ae", function()
              vim.diagnostic.setqflist({ severity = "E" })
            end)

            -- all workspace warnings
            map("n", "<leader>aw", function()
              vim.diagnostic.setqflist({ severity = "W" })
            end)

            -- buffer diagnostics only
            map("n", "<leader>d", function()
              vim.diagnostic.setloclist()
            end)

            map("n", "[c", function()
              vim.diagnostic.goto_prev({ wrap = false })
            end)

            -- TODO: vim.diagnostic.open_float(0, {scope="line"})

            map("n", "]c", function()
              vim.diagnostic.goto_next({ wrap = false })
            end)
            require('lspconfig').tsserver.setup({
              cmd = {
                '${pkgs.nodePackages.typescript-language-server}/bin/typescript-language-server',
                '--stdio'
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
          #   "golang.org/x/text" = builtins.fetchGit "https://go.googlesource.com/text";
          #   #"golang.org/x/tools/cmd/godoc" = builtins.fetchGit "https://github.com/golang/tools.git";
          };
        };
        home.sessionPath = [ "/home/${cfg.user}/src/go/bin" ];
        programs.neovim.plugins = with pkgs.vimPlugins; [
          { plugin = nvim-lspconfig;
          }
          { plugin = nvim-treesitter;
          }
          { plugin = nvim-dap;
          }
          { plugin = nvim-dap-ui;
          }
          { plugin = nvim-dap-virtual-text;
          }
          { plugin = guihua-lua;
          }
          { plugin = go-nvim;
            type = "lua";
            config = ''
              require 'go'.setup({
                goimport = 'gopls', -- if set to 'gopls' will use golsp format
                gofmt = 'gopls', -- if set to gopls will use golsp format
                max_line_len = 120,
                tag_transform = false,
                test_dir = "",
                comment_placeholder = '   ',
                lsp_cfg = true, -- false: use your own lspconfig
                lsp_gofumpt = true, -- true: set default gofmt in gopls format to gofumpt
                lsp_on_attach = true, -- use on_attach from go.nvim
                dap_debug = true,
              })
        
              local protocol = require'vim.lsp.protocol'
            '';
          }
        ];
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
        gotags gopls
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
      # home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
      #   { plugin = null-ls;
      #     type = "lua";
      #     config = ''
      #       require("null-ls").setup({
      #           sources = {
      #               require("null-ls").builtins.diagnostics.vale,
      #           },
      #       })
      #     '';
      #   }
      # ];
    })
    (mkIf (cfg.enable == true && cfg.visualization == true) {
      environment.systemPackages = with pkgs;
      [
        gnuplot
      ];
    })
    (mkIf (cfg.enable == true && cfg.js == true) {
      environment.systemPackages = with pkgs;
      [
        html-tidy /* vscodium pup */
        nodejs yarn nodePackages.prettier
        nodePackages.vscode-html-languageserver-bin
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = html5-vim;
        config = ''
          lua require('lspconfig').html.setup({cmd = { '${pkgs.nodePackages.vscode-html-languageserver-bin}/bin/html-languageserver', '--stdio' }})
        '';
        }
        { plugin = ale;
        config = ''
          let g:ale_fixers = {
          \   'javascript': ['prettier'],
          \   'css': ['prettier'],
          \}
          let g:ale_fix_on_save = 0
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
    (mkIf (cfg.enable == true && cfg.sql == true) {
      environment.systemPackages = with pkgs;
      [
        sqls
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = nvim-lspconfig;
          config = "lua require'lspconfig'.sqls.setup{}";
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.nix == true) {
      environment.systemPackages = with pkgs;
      [
        nix-prefetch-scripts nixpkgs-lint nox
        nixos-option nix-doc
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = vim-nix;
          type = "lua";
          #config = "require('lspconfig').rnix.setup({cmd = { '${pkgs.rnix-lsp}/bin/rnix-lsp' }})";
          config = "require('lspconfig').nixd.setup({cmd = { '${pkgs.nixd}/bin/nixd' }})";
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
    (mkIf (cfg.enable == true && cfg.terraform == true) {
      environment.systemPackages = with pkgs;
      [
        (terraform.withPlugins (p: [p.null p.external p.keycloak p.ovh p.minio p.acme p.tls]))
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = vim-terraform;
          type = "lua";
          config = ''
            local capabilities = vim.lsp.protocol.make_client_capabilities()
            capabilities.textDocument.completion.completionItem.snippetSupport = true

            require('lspconfig').terraformls.setup({
              on_attach = on_attach,
              flags = { debounce_text_changes = 150 },
              capabilities = capabilities,
              cmd = {
                '${pkgs.terraform-ls}/bin/terraform-ls',
                'serve'
              }
            })
          '';
        }
      ];
    })
  ]);
}
