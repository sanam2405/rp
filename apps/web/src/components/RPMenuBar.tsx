"use client";

import { RPMenuItems } from "@/components";
import {
  ArrowsClockwise,
  ArrowUUpLeft,
  ArrowUUpRight,
  ClipboardText,
  Highlighter,
  ListBullets,
  ListChecks,
  ListNumbers,
  Minus,
  Paragraph,
  Quotes,
  TextB,
  TextHOne,
  TextHTwo,
  TextItalic,
  TextStrikethrough,
  TextTSlash,
} from "@phosphor-icons/react/dist/ssr";
import type { Editor } from "@tiptap/react";
import { usePostHog } from "posthog-js/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const RPMenuBar = ({ editor }: { editor: Editor }) => {
  const [showCopiedTooltip, setShowCopiedTooltip] = useState<boolean>(false);
  const posthog = usePostHog();
  const selection = editor.state.selection;
  const selectedText = editor.state.doc.textBetween(
    selection.from,
    selection.to,
  );
  const currentEditorTextContent = editor.getText();
  const listOfIcons = [
    [
      {
        Icon: TextB,
        title: "Bold",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "bold",
            editor_content: currentEditorTextContent,
            selected_text: selectedText,
          });
          editor.chain().focus().toggleBold().run();
        },
        isActive: () => editor.isActive("bold"),
      },
      {
        Icon: TextItalic,
        title: "Italic",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "italic",
            editor_content: currentEditorTextContent,
            selected_text: selectedText,
          });
          editor.chain().focus().toggleItalic().run();
        },
        isActive: () => editor.isActive("italic"),
      },
      {
        Icon: TextStrikethrough,
        title: "Strike",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "strike",
            editor_content: currentEditorTextContent,
            selected_text: selectedText,
          });
          editor.chain().focus().toggleStrike().run();
        },
        isActive: () => editor.isActive("strike"),
      },
      {
        Icon: Highlighter,
        title: "Highlight",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "highlight",
            editor_content: currentEditorTextContent,
            selected_text: selectedText,
          });
          editor.chain().focus().toggleHighlight().run();
        },
        isActive: () => editor.isActive("highlight"),
      },
    ],
    [
      {
        Icon: TextHOne,
        title: "Heading 1",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "heading_1",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().toggleHeading({ level: 1 }).run();
        },
        isActive: () => editor.isActive("heading", { level: 1 }),
      },
      {
        Icon: TextHTwo,
        title: "Heading 2",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "heading_2",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().toggleHeading({ level: 2 }).run();
        },
        isActive: () => editor.isActive("heading", { level: 2 }),
      },
      {
        Icon: Paragraph,
        title: "Paragraph",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "paragraph",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().setParagraph().run();
        },
        isActive: () => editor.isActive("paragraph"),
      },
      {
        Icon: ListBullets,
        title: "Bullet List",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "bullet_list",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().toggleBulletList().run();
        },
        isActive: () => editor.isActive("bulletList"),
      },
      {
        Icon: ListNumbers,
        title: "Ordered List",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "ordered_list",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().toggleOrderedList().run();
        },
        isActive: () => editor.isActive("orderedList"),
      },
      {
        Icon: ListChecks,
        title: "Task List",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "task_list",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().toggleTaskList().run();
        },
        isActive: () => editor.isActive("taskList"),
      },
    ],
    [
      {
        Icon: Quotes,
        title: "Blockquote",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "blockquote",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().toggleBlockquote().run();
        },
        isActive: () => editor.isActive("blockquote"),
      },
      {
        Icon: Minus,
        title: "Horizontal Rule",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "horizontal_rule",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().setHorizontalRule().run();
        },
      },
      {
        Icon: TextTSlash,
        title: "Clear Format",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "clear_format",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().clearNodes().unsetAllMarks().run();
        },
      },
      {
        Icon: ArrowUUpLeft,
        title: "Undo",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "undo",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().undo().run();
        },
      },
      {
        Icon: ArrowUUpRight,
        title: "Redo",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "redo",
            editor_content: currentEditorTextContent,
          });
          editor.chain().focus().redo().run();
        },
      },
    ],
    [
      {
        Icon: ClipboardText,
        title: showCopiedTooltip ? "Copied!" : "Copy Text",
        action: async () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "copy_text",
            editor_content: currentEditorTextContent,
          });
          await navigator.clipboard.writeText(currentEditorTextContent);
          setShowCopiedTooltip(true);
          setTimeout(() => setShowCopiedTooltip(false), 2000);
        },
      },
      {
        Icon: ArrowsClockwise,
        title: "Reset",
        action: () => {
          posthog.capture("redit.menubar_item", {
            menubar_item: "reset",
            editor_content: currentEditorTextContent,
          });
          editor.commands.setContent("");
        },
      },
    ],
  ];

  return (
    <div className="flex items-center bg-gray-200 border-b-4 border-gray-900 rounded-lg mx-2 flex-wrap py-2 gap-1 w-screen">
      {listOfIcons.map((iconGroups, index) => (
        <div className="flex items-center" key={uuidv4()}>
          {iconGroups.map((singleIcon) => (
            <RPMenuItems {...singleIcon} editor={editor} key={uuidv4()} />
          ))}
          {index !== listOfIcons.length - 1 && (
            <div className="hidden md:block bg-gray-900 h-5 w-px mx-2 shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
};
