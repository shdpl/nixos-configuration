local api = vim.api
local cmd = vim.cmd
local map = vim.keymap.set

-- cmd([[packadd packer.nvim]])
-- require("packer").startup(function(use)
--   use({ "wbthomason/packer.nvim", opt = true })
--
--   use({
--     "hrsh7th/nvim-cmp",
--     requires = {
--       { "hrsh7th/cmp-nvim-lsp" },
--       { "hrsh7th/cmp-vsnip" },
--       { "hrsh7th/vim-vsnip" },
--     },
--   })
--   use({
--     "scalameta/nvim-metals",
--     requires = {
--       "nvim-lua/plenary.nvim",
--       "mfussenegger/nvim-dap",
--     },
--   })
-- end)

vim.opt_global.completeopt = { "menuone", "noinsert", "noselect" }

local home = os.getenv('HOME')
local root_markers = {'gradlew', 'mvnw', '.git'}
local root_dir = require('jdtls.setup').find_root(root_markers)
local project_name = vim.fn.fnamemodify(vim.fn.getcwd(), ':p:h:t')
local workspace_dir = home .. "/.local/share/eclipse/" .. vim.fn.fnamemodify(root_dir, ":p:h:t")

function nnoremap(rhs, lhs, bufopts, desc)
  bufopts.desc = desc
  vim.keymap.set("n", rhs, lhs, bufopts)
end

local on_attach = function(client, bufnr)
  -- Regular Neovim LSP client keymappings
  local bufopts = { noremap=true, silent=true, buffer=bufnr }
  nnoremap('gD', vim.lsp.buf.declaration, bufopts, "Go to declaration")
  nnoremap('gd', vim.lsp.buf.definition, bufopts, "Go to definition")
  nnoremap('gi', vim.lsp.buf.implementation, bufopts, "Go to implementation")
  nnoremap('K', vim.lsp.buf.hover, bufopts, "Hover text")
  nnoremap('<C-k>', vim.lsp.buf.signature_help, bufopts, "Show signature")
  nnoremap('<space>wa', vim.lsp.buf.add_workspace_folder, bufopts, "Add workspace folder")
  nnoremap('<space>wr', vim.lsp.buf.remove_workspace_folder, bufopts, "Remove workspace folder")
  nnoremap(
    '<space>wl',
    function() print(vim.inspect(vim.lsp.buf.list_workspace_folders())) end,
    bufopts,
    "List workspace folders"
  )
  nnoremap('<space>D', vim.lsp.buf.type_definition, bufopts, "Go to type definition")
  nnoremap('<space>rn', vim.lsp.buf.rename, bufopts, "Rename")
  nnoremap('<space>ca', vim.lsp.buf.code_action, bufopts, "Code actions")
  vim.keymap.set(
    'v',
    "<space>ca",
    "<ESC><CMD>lua vim.lsp.buf.range_code_action()<CR>",
    { noremap=true, silent=true, buffer=bufnr, desc = "Code actions" }
  )
  nnoremap(
    '<space>f',
    function() vim.lsp.buf.format { async = true } end,
    bufopts,
    "Format file"
  )

  -- Java extensions provided by jdtls
  local jdtls = require('jdtls')
  nnoremap("<C-o>", jdtls.organize_imports, bufopts, "Organize imports")
  nnoremap("<space>ev", jdtls.extract_variable, bufopts, "Extract variable")
  nnoremap("<space>ec", jdtls.extract_constant, bufopts, "Extract constant")
  vim.keymap.set(
    'v',
    "<space>em",
    [[<ESC><CMD>lua require('jdtls').extract_method(true)<CR>]],
    { noremap=true, silent=true, buffer=bufnr, desc = "Extract method" }
  )
end

local config = {
  cmd = {'jdtls','-data',workspace_dir},
  on_attach = on_attach,
  root_dir = root_dir,
}

local nvim_jdtls_group = api.nvim_create_augroup("nvim-jdtls", { clear = true })
api.nvim_create_autocmd(
  "FileType",
  {
    pattern = { "java" },
    callback = function()
      require('jdtls').start_or_attach(config)
    end,
    group = nvim_jdtls_group,
  }
)
