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
  const OFFSET = 8; // 컨텍스트 메뉴 우클릭 위치 조정 값

  const contextMenuRef = useRef<HTMLDivElement>(null);

  // 컨텍스트 메뉴 우클릭 핸들러
  const handleContextMenu = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    const clickX = event.pageX + OFFSET;
    const clickY = event.pageY + OFFSET;

    // 화면 밖에 메뉴 렌더링해서 원본 크기 측정
    setContextMenuState({
      x: -9999,
      y: -9999,
      isOpen: true,
    });

    requestAnimationFrame(() => {
      if (contextMenuRef.current) {
        const rect = contextMenuRef.current.getBoundingClientRect();

        const screenW = document.documentElement.scrollWidth;
        const screenH = document.documentElement.scrollHeight;

        // 위치 계산 (화면 밖으로 안 나가게)
        const adjustedX = Math.min(clickX, screenW - rect.width);
        const adjustedY = Math.min(clickY, screenH - rect.height);

        // 메뉴를 계산한 위치로 이동
        setContextMenuState({
          x: adjustedX,
          y: adjustedY,
          isOpen: true,
        });
      }
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
