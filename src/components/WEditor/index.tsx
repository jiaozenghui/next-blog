import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import styles from "./index.module.css";
import React, { useState, useEffect } from "react";
import { Editor, Toolbar } from "@wangeditor/editor-for-react";
import { IDomEditor, IEditorConfig, IToolbarConfig, SlateElement } from "@wangeditor/editor";

import { WEditorProps } from "@/types";
function WEditor({ content, setContent, setAnchors }: WEditorProps) {
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); 

  // 编辑器内容
  //const [html, setHtml] = useState('<p>hello</p>')

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        server: "/api/utils/upload-stream-oss",
      },
    },
    onChange(editor) {
        const headers = editor.getElemsByTypePrefix('header')
        headers.map(header => {
          const element = document.getElementById(header.id)
          element?.classList.add(`wang_${header.type}`)
        })
      }
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);
  useEffect(() => {
    setContent(content);
  }, [content, setContent]);

  return (
    <div style={{ border: "1px solid #ccc", zIndex: 100 }}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        mode="default"
        style={{ borderBottom: "1px solid #ccc" }}
      />
      <Editor
        className={styles.wEditor}
        defaultConfig={editorConfig}
        value={content}
        onCreated={setEditor}
        onChange={(editor) => setContent(editor.getHtml())}
        mode="default"
        style={{ height: "500px", overflowY: "hidden" }}
      />
    </div>
  );
}

export default WEditor;
