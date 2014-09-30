import XMonad
import XMonad.Hooks.SetWMName
 
main = xmonad defaultConfig
	{ modMask = mod1Mask
	, terminal = "xterm"
	, borderWidth = 0
	, startupHook = setWMName "LG3D"
	}
