"use client";

import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RPMenuBar } from "@/components";
import { useEffect } from "react";

export default function RPEditor() {
  const rpEditor = useEditor({
    extensions: [
      StarterKit.configure(),
      Highlight,
      TaskList,
      TaskItem,
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm dark:prose-invert max-w-none flex flex-col max-h-full mx-2 focus:outline-none",
      },
    },
  });

  useEffect(() => {
    rpEditor?.commands.setContent("<h1>Welcome to RPEditor</h1>");
  }, []);

  return (
    <>
      <div>
        {rpEditor && <RPMenuBar editor={rpEditor} />}
        <EditorContent editor={rpEditor} />
      </div>
    </>
  );
}
