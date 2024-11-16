import { RPMenuItems } from "@/components";
import {
  ArrowUUpLeft,
  ArrowUUpRight,
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
import { v4 as uuidv4 } from "uuid";

export const RPMenuBar = ({ editor }: { editor: Editor }) => {
  const listOfIcons = [
    [
      {
        Icon: TextB,
        title: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive("bold"),
      },
      {
        Icon: TextItalic,
        title: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive("italic"),
      },
      {
        Icon: TextStrikethrough,
        title: "Strike",
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive("strike"),
      },
      {
        Icon: Highlighter,
        title: "Highlight",
        action: () => editor.chain().focus().toggleHighlight().run(),
        isActive: () => editor.isActive("highlight"),
      },
    ],
    [
      {
        Icon: TextHOne,
        title: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: () => editor.isActive("heading", { level: 1 }),
      },
      {
        Icon: TextHTwo,
        title: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: () => editor.isActive("heading", { level: 2 }),
      },
      {
        Icon: Paragraph,
        title: "Paragraph",
        action: () => editor.chain().focus().setParagraph().run(),
        isActive: () => editor.isActive("paragraph"),
      },
      {
        Icon: ListBullets,
        title: "Bullet List",
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive("bulletList"),
      },
      {
        Icon: ListNumbers,
        title: "Ordered List",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive("orderedList"),
      },
      {
        Icon: ListChecks,
        title: "Task List",
        action: () => editor.chain().focus().toggleTaskList().run(),
        isActive: () => editor.isActive("taskList"),
      },
    ],
    [
      {
        Icon: Quotes,
        title: "Blockquote",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive("blockquote"),
      },
      {
        Icon: Minus,
        title: "Horizontal Rule",
        action: () => editor.chain().focus().setHorizontalRule().run(),
      },
      {
        Icon: TextTSlash,
        title: "Clear Format",
        action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
      },
      {
        Icon: ArrowUUpLeft,
        title: "Undo",
        action: () => editor.chain().focus().undo().run(),
      },
      {
        Icon: ArrowUUpRight,
        title: "Redo",
        action: () => editor.chain().focus().redo().run(),
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
            <div className="bg-gray-900 h-5 w-px mx-2" />
          )}
        </div>
      ))}
    </div>
  );
};
