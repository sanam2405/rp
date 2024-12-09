"use client";

import { RPMenuBar } from "@/components";
import reditJSON from "@/constants/redit.json";
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
          "prose prose-sm dark:prose-invert max-w-none flex flex-col mx-2 focus:outline-none break-words",
      },
    },
  });

  useEffect(() => {
    rpEditor?.commands.setContent(reditJSON);
  }, [rpEditor]);

  return (
    <div className="w-full h-screen flex flex-col overflow-hidden">
      <div className="sticky top-0 z-10">
        {rpEditor && <RPMenuBar editor={rpEditor} />}
      </div>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="max-w-full py-2 ml-14">
          <EditorContent editor={rpEditor} />
        </div>
      </div>
    </div>
  );
}
