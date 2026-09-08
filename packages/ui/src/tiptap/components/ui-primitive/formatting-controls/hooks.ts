import { Editor } from "@tiptap/react";
import { useMemo } from "react";

import { BUTTON_DEFS } from "./const";

export const useFormattingItems = (editor: Editor | null) => {
  return useMemo(() => {
    if (!editor) return [];
    return BUTTON_DEFS.filter((def) =>
      def.extensionName
        ? editor.extensionManager.extensions.some(
            (e) => e.name === def.extensionName,
          )
        : true,
    );
  }, [editor]);
};
