"use client";

import { RPMenuBar } from "@/components";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";

export default function RPEditor() {
  const rpEditor = useEditor({
    extensions: [
      StarterKit.configure(),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200",
        },
      }),
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
    <div className="w-full">
      <div className="max-w-full py-2">
        {rpEditor && <RPMenuBar editor={rpEditor} />}
        <div className="mt-4">
          <EditorContent editor={rpEditor} />
        </div>
      </div>
    </div>
  );
}
