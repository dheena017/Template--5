import React from "react";
import "./KeyboardShortcuts.css";

const shortcuts = [
  { action: "Open Settings", keys: "Ctrl + ," },
  { action: "Quick Search", keys: "Ctrl + K" },
  { action: "Deep Focus Mode", keys: "Ctrl + Shift + F" },
  { action: "Undo", keys: "Ctrl + Z" },
  { action: "Redo", keys: "Ctrl + Y" },
  { action: "Select All Pages", keys: "Ctrl + A" },
  { action: "Delete Selected", keys: "Delete" },
  { action: "Clear Selection", keys: "Escape" },
  { action: "Next Tool", keys: "Tab" },
  { action: "Toggle Sidebar", keys: "Ctrl + B" },
];

const KeyboardShortcuts = () => (
  <div className="keyboard-shortcuts">
    <h2>Keyboard Shortcuts</h2>
    <table>
      <tbody>
        {shortcuts.map(({ action, keys }) => (
          <tr key={action}>
            <td className="shortcut-action">{action}</td>
            <td className="shortcut-keys">{keys}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default KeyboardShortcuts;
