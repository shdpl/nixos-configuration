{ config, pkgs, lib, ... }:

let
  cfg = config.programming;
  # php-manual = pkgs.callPackage ../pkgs/php-manual/default.nix { };
  compose-spec = pkgs.callPackage ../pkgs/compose-spec/default.nix { };
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
  vim-env-syntax = pkgs.vimUtils.buildVimPlugin {
    pname = "vim-env-syntax";
    version = "2137f77840fe6e5e67dc0422f1759ab1ddc86d60";
    src = pkgs.fetchFromGitHub {
    owner = "overleaf";
    repo = "vim-env-syntax";
    rev = "2137f77840fe6e5e67dc0422f1759ab1ddc86d60";
    sha256 = "sha256-H78eqlkatIhxqyVrnkXxucosAhdVVsoDBmbBbmJiIxQ=";
    };
    meta.homepage = "https://github.com/overleaf/vim-env-syntax";
  };
#   androidEnv = pkgs.buildFHSUserEnv {
#     name = "android-env";
#     targetPkgs = pkgs: with pkgs;
#     [ git
#       gitRepo
#       gnupg
#       python2
#       curl
#       procps
#       openssl
#       gnumake
#       nettools
#       androidenv.androidPkgs.platform-tools
#       jdk
#       schedtool
#       util-linux
#       m4
#       gperf
#       perl
#       libxml2
#       zip
#       unzip
#       bison
#       flex
#       lzop
#       python3
#     ];
#     multiPkgs = pkgs: with pkgs;
#     [ zlib
#       ncurses5
#     ];
#     runScript = "bash";
#     profile = ''
#       export ALLOW_NINJA_ENV=true
#       export USE_CCACHE=1
#       export ANDROID_JAVA_HOME=${pkgs.jdk.home}
#       export LD_LIBRARY_PATH=/usr/lib:/usr/lib32
#     '';
# };

in

with lib;

{
  imports = [
    ../modules/cluster/kubernetes.nix
  ];
  options = {
    programming = {
      enable = mkEnableOption "";
      hostname = mkOption {
        type = with types; str;
      };
      domain = mkOption {
        type = with types; str;
      };
      text = mkOption {
        type = with types; bool;
        default = false;
      };
      visualization = mkOption {
        type = with types; bool;
        default = false;
      };
      bash = mkOption {
        type = with types; bool;
        default = false;
      };
      js = mkOption {
        type = with types; bool;
        default = false;
      };
      html = mkOption {
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
      graphql = mkOption {
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
      rust = mkOption {
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
      kubernetes = mkOption {
        type = with types; bool;
        default = false;
      };
      temporal = mkOption {
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
        jq yq csvkit xmlstarlet urlencode #rxp? xmlformat?
        yaml2json nodePackages.js-yaml
        # yajsv
        python3.pkgs.openapi-spec-validator
        check-jsonschema

        jwt-cli

        bc
        # ctags

        gnumake

        protobuf
        gitAndTools.gitflow
        #copyright-update
        # public http service to pipe through nc from pc to the website ( returns a link )

        # ghostscript imagemagick exiftool
        ngrok stripe-cli

        tokei
      ];
      # nix.extraOptions = ''
      #   access-tokens = gitlab.com=${cfg.gitlabAccessTokens}
      # '';
      home-manager.users.${cfg.user}.programs = {
        git-cliff.enable = true;
        neovim.plugins = with pkgs.vimPlugins; [
          { plugin = nvim-comment;
            type = "lua";
            config = "\nrequire('nvim_comment').setup()";
          }
          nvim-lspconfig
          { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [
              editorconfig git_config git_rebase gitattributes gitcommit gitignore lua make markdown markdown_inline mermaid ssh_config toml tsv thrift vim vimdoc xml #xresources
            ]));
            type = "lua";
            config = ''
              require'nvim-treesitter.configs'.setup{
                highlight = { enable = true; },
                indent = { enable = true; },
              }

              vim.opt.foldenable = false
              vim.opt.foldmethod = 'expr'
              vim.opt.foldexpr = 'v:lua.vim.treesitter.foldexpr()'
            '';
          }
          { plugin = vim-env-syntax;
            type = "lua";
            config = ''
              vim.api.nvim_create_autocmd({ "BufNewFile", "BufRead" }, {
                pattern = ".env,.env.*",
                callback = function()
                  vim.bo.filetype = "env"
                end,
              })
            '';
          }
        ];
      };
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
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [bash]));
        }
        { plugin = nvim-lspconfig;
          type = "lua";
          config = ''
            require'lspconfig'.bashls.setup{}
            vim.api.nvim_create_autocmd({ "BufNewFile", "BufRead" }, {
              pattern = ".envrc.*",
              callback = function()
                vim.bo.filetype = "sh"
              end,
            })
          '';
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
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [java]));
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
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [scala]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.clojure == true) {
      environment.systemPackages = with pkgs;
      [
        leiningen
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [clojure]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.php == true) {
      networking.firewall.allowedTCPPorts = [ 9000 9003 ];
      environment.systemPackages = with pkgs;
      [
        php phpPackages.composer

        fcgi
        phpPackages.php-codesniffer
        # php-manual
        jetbrains.phpstorm
      ];
      
      # home-manager.users.${cfg.user}.programs.neovim.extraConfig = ''
      #   lua require('lspconfig').psalm.setup({cmd = { '${pkgs.phpPackages.psalm}/bin/psalm' }})
      # '';
      # home-manager.users.${cfg.user}.programs.neovim.extraConfig = ''
      #   lua require('lspconfig').phpactor.setup({cmd = { '${pkgs.phpPackages.phpactor}/bin/phpactor' }})
      # '';
      home-manager.users.${cfg.user}.programs.neovim = {
        extraConfig = ''
          lua require('lspconfig').intelephense.setup({cmd = { '${pkgs.nodePackages.intelephense}/bin/intelephense', '--stdio' }})
        '';
        plugins = with pkgs.vimPlugins; [
          { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [php phpdoc]));
          }
        ];
      };
    })
    (mkIf (cfg.enable == true && cfg.typescript == true) {
      environment.systemPackages = with pkgs;
      [
        nodePackages.ts-node
        nodePackages.typescript
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

            require('lspconfig').ts_ls.setup({
              cmd = {
                '${pkgs.nodePackages.typescript-language-server}/bin/typescript-language-server',
                '--stdio'
              }
            })
          '';
        }
        {
          plugin = nvim-cmp;
          type = "lua";
          config = ''
            local cmp = require("cmp")
            cmp.setup({
              snippet = {
                expand = function(args)
                  -- Comes from vsnip
                  vim.fn["vsnip#anonymous"](args.body)
                end,
              },
              mapping = cmp.mapping.preset.insert({
                ["<CR>"] = cmp.mapping.confirm({ select = true }),
                ["<Tab>"] = function(fallback)
                  if cmp.visible() then
                    cmp.select_next_item()
                  else
                    fallback()
                  end
                end,
                ["<S-Tab>"] = function(fallback)
                  if cmp.visible() then
                    cmp.select_prev_item()
                  else
                    fallback()
                  end
                end,
              }),
              sources = {
                { name = "nvim_lsp" },
                { name = "vsnip" },
              },
            })
          '';
        }
        {
          plugin = cmp-nvim-lsp;
        }
        {
          plugin = cmp-vsnip;
        }
        {
          plugin = vim-vsnip;
          config = "let g:vsnip_snippet_dir = expand('${vim-snippets}/snippets')";
        }
        {
          plugin = nvim-dap;
          type = "lua";
          config = ''
            map("n", "<leader>dc", function()
              require("dap").continue()
            end)

            map("n", "<leader>dr", function()
              require("dap").repl.toggle()
            end)

            map("n", "<leader>dK", function()
              require("dap.ui.widgets").hover()
            end)

            map("n", "<leader>dt", function()
              require("dap").toggle_breakpoint()
            end)

            map("n", "<leader>dso", function()
              require("dap").step_over()
            end)

            map("n", "<leader>dsi", function()
              require("dap").step_into()
            end)

            map("n", "<leader>dl", function()
              require("dap").run_last()
            end)
          '';
        }
        {
          plugin = plenary-nvim;
        }
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [typescript tsx]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.graphql == true) {
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = nvim-lspconfig;
          type = "lua";
          config = ''
            require('lspconfig').graphql.setup({
              cmd = {
                '${pkgs.nodePackages.graphql-language-service-cli}/lib/node_modules/.bin/graphql-lsp',
                'server',
                '-m',
                'stream'
              }
            })
          '';
        }
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [graphql]));
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
          { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [go gomod gosum gotmpl]));
          }
          { plugin = nvim-lspconfig;
          }
          { plugin = nvim-dap;
          }
          { plugin = nvim-dap-ui;
          }
          { plugin = nvim-nio;
          }
          { plugin = nvim-dap-virtual-text;
          }
          { plugin = go-nvim;
            type = "lua";
            config = ''
              require('go').setup({
                comment_placeholder = ' <U+E627>  ',
                lsp_cfg = true,
                lsp_gofumpt = true,
                lsp_on_attach = true,
                dap_debug = true
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
        
        # (vscode-with-extensions.override { #obsidian # foam?
        #
        # # When the extension is already available in the default extensions set.
        #   vscodeExtensions = with vscode-extensions; [
        #     bbenoist.nix
        #     ms-vscode-remote.remote-ssh
        #     ms-vscode.live-server
        #   ];
        #
        #   # # Concise version from the vscode market place when not available in the default set.
        #   # ++ vscode-utils.extensionsFromVscodeMarketplace [
        #   #   {
        #   #     name = "code-runner";
        #   #     publisher = "formulahendry";
        #   #     version = "0.6.33";
        #   #     sha256 = "166ia73vrcl5c9hm4q1a73qdn56m0jc7flfsk5p5q41na9f10lb0";
        #   #   }
        #   # ];
        # })
        enca
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [csv ini diff foam jq]));
        }
        { plugin = nvim-lspconfig;
          type = "lua";
          config = ''
            require('lspconfig').ltex.setup({
              cmd = {'${pkgs.ltex-ls}/bin/ltex-ls'}
            })
          '';
        }
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
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [gnuplot]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.js == true) {
      environment.systemPackages = with pkgs;
      [
        nodejs_22 yarn nodePackages.prettier
        nodePackages.eslint_d
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [javascript jsdoc json yaml]));
        }
        { plugin = SchemaStore-nvim;
        }
        { plugin = nvim-lspconfig;
          type = "lua";
          config = ''
            -- FIXME: not related to plugin
            vim.api.nvim_create_autocmd({ "BufNewFile", "BufRead", }, {
              pattern = "package.json,package-lock.json",
              command = "setlocal ts=2 sts=2 sw=2 expandtab"
            })

            local capabilities = vim.lsp.protocol.make_client_capabilities()
            capabilities.textDocument.completion.completionItem.snippetSupport = true
            require('lspconfig').jsonls.setup({
              cmd = { '${pkgs.nodePackages.vscode-langservers-extracted}/bin/vscode-json-language-server', '--stdio' },
              capabilities = capabilities,
              settings = {
                json = {
                  schemas = require('schemastore').json.schemas {
                    select = {
                      'AsyncAPI',
                      'babelrc.json',
                      'bower.json',
                      '.bowerrc',
                      'behat.yml',
                      'Cargo Manifest',
                      'Cargo Make',
                      'Helm Chart.yaml',
                      'Helm Chart.lock',
                      'Helm Unittest Test Suite',
                      'clang-tidy',
                      'devcontainer.json',
                      'AWS CloudFormation',
                      'composer.json',
                      'cypress.json',
                      'dockerd.json',
                      '.eslintrc',
                      'GitHub Action',
                      'gitlab-ci',
                      'GraphQL Config',
                      'Grunt copy task',
                      'Grunt clean task',
                      'Grunt cssmin task',
                      'Grunt JSHint task',
                      'Grunt Watch task',
                      'Grunt base task',
                      'importmap.json',
                      'Jasmine',
                      'Jenkins X Pipelines',
                      'Jenkins X Requirements',
                      '.mocharc',
                      'nodemon.json',
                      'openapi.json',
                      'package.json',
                      'prettierrc.json',
                      'prometheus.json',
                      'prometheus.rules.json',
                      'prometheus.rules.test.json',
                      'rustfmt',
                      'Rust toolchain'
                    }
                  },
                  validate = { enable = true },
                }
              }
            })
          '';
        }
        { plugin = nvim-lint;
          type = "lua";
          config = ''
            vim.env.ESLINT_D_PPID = vim.fn.getpid()
            require('lint').linters_by_ft = {
              javascript = {'eslint_d'},
              typescript = {'eslint_d'},
              typescriptreact = {'eslint_d'},
            }
            vim.api.nvim_create_autocmd({ "BufWritePost" }, {
              callback = function()
                require("lint").try_lint()
              end,
            })
          '';
        }
        { plugin = vim-prettier;
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.html == true) {
      environment.systemPackages = with pkgs;
      [
        html-tidy /* vscodium pup */
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [html css scss]));
        }
        { plugin = nvim-lspconfig;
          type = "lua";
          config = ''
            require('lspconfig').cssls.setup({
              cmd = {
                '${pkgs.nodePackages.vscode-langservers-extracted}/bin/vscode-css-language-server',
                '--stdio',
              },
            })

            local capabilities = vim.lsp.protocol.make_client_capabilities()
            capabilities.textDocument.completion.completionItem.snippetSupport = true
            require('lspconfig').html.setup({
              cmd = {
                '${pkgs.nodePackages.vscode-langservers-extracted}/bin/vscode-html-language-server',
                '--stdio',
              },
              capabilities = capabilities,
            })

            require('lspconfig').lemminx.setup({
              cmd = { '${pkgs.lemminx}/bin/lemminx' },
            })
          '';
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.cc == true) {
      environment.systemPackages = with pkgs;
      [
        clang
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [c cmake cpp llvm]));
        }
        # { plugin = nvim-lspconfig;
        #   type = "lua";
        #   config = "require('lspconfig').ccls.setup({cmd = { '${pkgs.ccls}/bin/ccls' }})";
        # }
      ];
    })
    (mkIf (cfg.enable == true && cfg.d == true) {
      # environment.systemPackages = with pkgs;
      # [
      #   dmd dtools
      # ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [d]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.rust == true) {
      environment.systemPackages = with pkgs;
      [
        rustc cargo clang
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = nvim-lspconfig;
          type = "lua";
          config = "require('lspconfig').rust_analyzer.setup({cmd = { '${pkgs.rust-analyzer}/bin/rust-analyzer' }})";
        }
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [rust]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.system == true) {
      programs.bcc.enable = true;
      environment.systemPackages = with pkgs;
      [
        valgrind dfeet
        ltrace strace gdb bpftrace
        dhex bvi vbindiff pahole
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [asm objdump strace]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.sql == true) {
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        # { plugin = nvim-lspconfig;
        #   config = "lua require'lspconfig'.sqls.setup{cmd = { '${pkgs.sqls}/bin/sqls' }}";
        # }
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [sql]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.nix == true) {
      environment.systemPackages = with pkgs;
      [
        nix-prefetch-scripts nixpkgs-lint nox
        nixos-option nix-doc
        sops
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [nix]));
        }
        { plugin = vim-nix;
          type = "lua";
          config = "require('lspconfig').nixd.setup({cmd = { '${pkgs.nixd}/bin/nixd' }})";
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.docker == true) {
      boot.binfmt.emulatedSystems = [ "aarch64-linux" ];
      virtualisation = {
        docker = {
          enable = true;
          # daemon.settings.cgroup-parent = "docker.slice";
        };
        # libvirtd.enable = true;
        containerd.enable = true;
      };
      # systemd.slices.docker = {
      #   sliceConfig = {
      #     MemoryHigh = "75%";
      #     MemoryMax = "90%";
      #     #CPUQuota = "50%";
      #     CPUWeight = "25";
      #   };
      # };
      environment.systemPackages = with pkgs;
      [
        docker-compose
        compose-spec
        skopeo
      ];
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [dockerfile]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.kubernetes == true) {
      environment.systemPackages = with pkgs; [
        kubernetes-helm kompose
      ];
      cluster = {
        enable = true;
        hostname = cfg.hostname;
        domain = cfg.domain;
        users = [ cfg.user ];
      };
      home-manager.users.${cfg.user}.programs.neovim.plugins = with pkgs.vimPlugins; [
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [helm]));
        }
      ];
    })
    (mkIf (cfg.enable == true && cfg.temporal == true) {
      environment.systemPackages = with pkgs;
      [
        temporalite
        temporal-cli
      ];
    })
    (mkIf (cfg.enable == true && cfg.terraform == true) {
      environment.systemPackages = with pkgs;
      [
        (terraform.withPlugins (p: [p.null p.external p.keycloak p.ovh p.minio p.acme p.tls p.gitlab]))
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
        { plugin = (nvim-treesitter.withPlugins (plugins: with plugins; [hcl terraform]));
        }
      ];
    })
  ]);
}
