"use client";
import { Button, Tooltip } from "@mui/material";
import { Editor } from "@tiptap/react";
import React, { useMemo } from "react";

export const RPMenuItems = ({
  Icon,
  title,
  action,
  isActive = null,
  editor,
}: {
  Icon: React.FC<any>;
  title?: string;
  action?: () => void;
  isActive?: (() => boolean) | null;
  editor: Editor;
}) => {
  const isButtonActive = useMemo(() => isActive?.() || false, [isActive]);

  return (
    <Tooltip title={title}>
      <Button
        onClick={() => {
          editor.chain().focus().run();
          action?.();
        }}
        sx={{
          backgroundColor: isButtonActive ? "#ef4444" : "transparent",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          height: "2rem",
          width: "2rem",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: "#fecaca",
          },
        }}
        size="small"
      >
        <Icon size={20} />
      </Button>
    </Tooltip>
  );
};
