"use client";

import { cn } from "@/lib/utils";
import { IconButton, Tooltip } from "@mui/material";

export const RPMenuItems = ({
  Icon,
  title,
  action,
  isActive = null,
}: {
  Icon: React.FC<any>;
  title?: string;
  action?: () => void;
  isActive?: (() => boolean) | null;
}) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={action}
        sx={{
          backgroundColor: "transparent",
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
          ...(isActive?.() && {
            backgroundColor: "#ef4444",
          }),
        }}
        size="small"
      >
        <Icon size={20} />
      </IconButton>
    </Tooltip>
  );
};
