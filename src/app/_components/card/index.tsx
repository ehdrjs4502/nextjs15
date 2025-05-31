"use client";

import useContextMenu from "@/app/_hooks/useContextMenu";
import styles from "./card.module.css";
import ContextMenu from "../context-menu";

export default function Card() {
  const { handleContextMenu, contextMenuRef, contextMenuState, handleMenuItemClick } = useContextMenu();
  return (
    <>
      <div className={styles.card} onContextMenu={handleContextMenu}>
        <h5 className={styles["card-title"]}>카드</h5>
      </div>
      {contextMenuState.isOpen && (
        <ContextMenu
          contextMenuRef={contextMenuRef}
          contextMenuState={contextMenuState}
          handleMenuItemClick={handleMenuItemClick}
        />
      )}
    </>
  );
}
