import { EditorView } from "@codemirror/view"
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language"
import { tags as t } from "@lezer/highlight"

const MUITheme = EditorView.theme({
  "&": {
    color: "#e3e2e6",
    backgroundColor: "#1a1c1e",
    fontFamily: "JetBrains Mono, Fira Code, monospace",
    overflow: "hidden",
    borderRadius: '12px',
    transition: "background-color 0.2s ease",
    width: "99vw",
    height: "90vh",
  },
  "&.cm-focused": {
    backgroundColor: "#212327"
  },
  ".cm-scroller": { 
    lineHeight: "1.6",
    padding: "8px 0",
    "&::-webkit-scrollbar": {
      width: "10px",
      height: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#43473e",
      borderRadius: "10px",
      border: "2px solid #1a1c1e",
      transition: "background-color 0.2s ease",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#8e9199",
    },
    scrollbarWidth: "thin",
    scrollbarColor: "#3f4756  transparent",
  },
  "&.cm-focused .cm-scroller": {
    "&::-webkit-scrollbar-thumb": {
      border: "2px solid #212327",
    }
  },
  "&.cm-focused .cm-content": {
    caretColor: "#aac7ff"
  },
  ".cm-gutters": {
    backgroundColor: "transparent", 
    color: "#8e9199",
    border: "none",
    paddingLeft: "8px"
  },
  ".cm-activeLine": {
    backgroundColor: "#2f3033"
  },
  ".cm-activeLineGutter": {
    backgroundColor: "#38393c",
    color: "#e3e2e6"
  },
  ".cm-selectionBackground, ::selection": {
    backgroundColor: "#3f4756 !important"
  },
  ".cm-matchingBracket": {
    backgroundColor: "#43473e",
    outline: "1px solid #b8e6a1"
  }
}, { dark: true })

const materialHighlightStyle = HighlightStyle.define([
  { tag: t.keyword, color: "#aac7ff", fontWeight: "bold" },
  { tag: t.literal, color: "#dbe2f9" },
  { tag: [t.string, t.special(t.string)], color: "#b8e6a1" },
  { tag: [t.variableName, t.definition(t.variableName)], color: "#e3e2e6" },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "#dae2ff" },
  { tag: t.number, color: "#ffb4ab" },
  { tag: [t.className, t.typeName], color: "#dfe2eb" },
  { tag: [t.comment, t.lineComment], color: "#8e9199", fontStyle: "italic" },
  { tag: t.operator, color: "#bbc7db" },
  { tag: t.punctuation, color: "#8e9199" }
])

export const customMaterialTheme = [
  MUITheme,
  syntaxHighlighting(materialHighlightStyle)
]
