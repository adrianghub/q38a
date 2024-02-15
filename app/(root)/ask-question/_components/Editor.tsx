"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { ControllerRenderProps } from "react-hook-form";

export const CustomTextEditor = ({
  control,
}: {
  control: ControllerRenderProps<
    {
      title: string;
      description: string;
      tags: string[];
    },
    "description"
  >;
}) => {
  const editorRef = useRef<HTMLInputElement>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
      // @ts-ignore
      onInit={(_evt, editor) => (editorRef.current = editor)}
      onBlur={control.onBlur}
      onEditorChange={(content) => control.onChange(content)}
      initialValue=""
      init={{
        height: 350,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "codesample",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "wordcount",
        ],
        toolbar:
          "undo redo | blocks | " +
          "codesample | bold italic forecolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist",
        content_style: "body { font-family:Inter,sans-serif; font-size:16px }",
      }}
    />
  );
};
