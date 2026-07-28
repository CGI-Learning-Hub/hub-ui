import type { Meta, StoryObj } from "@storybook/react-vite";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import {
  EditorContent,
  EditorContext,
  Extensions,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { FormattingControls, Spacer, Toolbar } from "../src/tiptap";

type EditorWithToolbarProps = {
  extensions?: Extensions;
};

const EditorWithToolbar = ({ extensions }: EditorWithToolbarProps) => {
  const editor = useEditor({
    extensions,
    content: `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
</p>
<blockquote>
  Wow, that's amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`,
  });

  return (
    <EditorContext.Provider value={{ editor }}>
      <Toolbar>
        <Spacer />
        <FormattingControls editor={editor} />
        <Spacer />
      </Toolbar>
      <EditorContent editor={editor} />
    </EditorContext.Provider>
  );
};

const meta = {
  title: "Others/Tiptap/Toolbar",
  component: EditorWithToolbar,
  argTypes: {},
} satisfies Meta<typeof EditorWithToolbar>;
export default meta;

type Story = StoryObj<typeof EditorWithToolbar>;

export const Default: Story = {
  args: {
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Extensions: StarterKit + TextAlign",
      },
    },
  },
};

export const WithSuperscriptSubscript: Story = {
  args: {
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Subscript,
      Superscript,
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "Extensions: StarterKit + TextAlign + Superscript + Subscript",
      },
    },
  },
};
