"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface ContextMenuState {
  x: number;
  y: number;
  isOpen: boolean;
}

const useContextMenu = () => {
  const [contextMenuState, setContextMenuState] = useState<ContextMenuState>({
    x: 0,
    y: 0,
    isOpen: false,
  });

  const contextMenuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const clickX = event.pageX;
    const clickY = event.pageY;
    setContextMenuState({
      x: clickX,
      y: clickY,
      isOpen: true,
    });
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenuState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  }, []);

  const handleMenuItemClick = useCallback(
    (action: () => void) => {
      action();
      handleCloseContextMenu();
    },
    [handleCloseContextMenu]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(event.target as Node)) {
        handleCloseContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleCloseContextMenu]);

  return {
    contextMenuState,
    handleContextMenu,
    handleMenuItemClick,
    contextMenuRef,
  };
};

export default useContextMenu;
