import { palette } from "./palette"

export const themes = {
    button: {
        colors: { primary: palette.purple, onPrimary: palette.white, outline: palette.purple }
    },
    
    buttonAlt: {
        colors: { primary: palette.white, onPrimary: palette.purple, outline: palette.white }
    },

    buttonBlack: {
        colors: { primary: palette.black, onPrimary: palette.white, outline: palette.black }
    },

    textInput: {
        colors: { primary: palette.purple, onSurfaceVariant: palette.lightGrey, outline: palette.lightGrey }
    }
} 