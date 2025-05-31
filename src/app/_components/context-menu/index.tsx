"use client";

import React from "react";

interface ContextMenuProps {
  handleMenuItemClick: (action: () => void) => void;
  contextMenuRef: React.RefObject<HTMLDivElement | null>;
  contextMenuState: {
    isOpen: boolean;
    x: number;
    y: number;
  };
}

export default function ContextMenu({ handleMenuItemClick, contextMenuRef, contextMenuState }: ContextMenuProps) {
  return (
    <div
      ref={contextMenuRef}
      style={{
        position: "absolute",
        top: contextMenuState.y,
        left: contextMenuState.x,
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      <p>Custom Context Menu</p>
      <p
        onClick={() =>
          handleMenuItemClick(() => {
            alert("Option 1");
          })
        }
      >
        Option 1
      </p>
      <p
        onClick={() =>
          handleMenuItemClick(() => {
            alert("Option 2");
          })
        }
      >
        Option 2
      </p>
    </div>
  );
}
