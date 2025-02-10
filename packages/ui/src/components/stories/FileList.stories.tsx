import type { Meta, StoryObj } from "@storybook/react";
import { CustomFile, FileList } from "../FileList";

const meta: Meta<typeof FileList> = {
  title: "Components/FileList",
  component: FileList,
  argTypes: {
    files: {
      description: "The list of files to display.",
      control: "object",
      table: {
        type: {
          summary: "(T extends CustomFile)[]",
          detail:
            "interface CustomFile {\n  name: string;\n  size: number;\n  isLoading?: boolean;\n  isDeletable?: boolean;\n  isDownloadable?: boolean;\n  ownerName?: string;\n}",
        },
      },
    },
    onDelete: {
      description:
        "Facultative callback used for deleting a file. Withtout this callback, the delete button will not be displayed.",
      action: "deleted",
      table: {
        type: { summary: "(file: T) => void | undefined" },
      },
    },
    onClick: {
      description:
        "Facultative callback when a file is clicked. Without this callback, the file will not be clickable.",
      action: "clicked",
      table: {
        type: { summary: "(file: T) => void | undefined" },
      },
    },
    onDownload: {
      description:
        "Facultative callback when a file is downloaded. Without this callback, the download button will not be displayed.",
      action: "downloaded",
      table: {
        type: { summary: "(file: T) => void | undefined" },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof FileList>;

const files: CustomFile[] = [
  {
    name: "file1 looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong.pdf",
    size: 237482,
    isLoading: false,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "Alice Smith",
  },
  {
    name: "file2.svg",
    size: 5423,
    isLoading: true,
    isDeletable: false,
    isDowlodable: true,
  },
  {
    name: "file3.mp4",
    size: 6548764,
    isLoading: false,
    isDeletable: true,
    isDowlodable: false,
    ownerName: "John Doe",
  },
  {
    name: "file4.docx",
    size: 18456,
    isLoading: true,
    isDeletable: true,
    isDowlodable: false,
  },
  {
    name: "file5.gif",
    size: 43954,
    isLoading: false,
    isDeletable: false,
    isDowlodable: true,
  },
  {
    name: "file6.zip",
    size: 234723,
    isLoading: true,
    isDeletable: false,
    isDowlodable: false,
  },
  {
    name: "file7.png",
    size: 320000,
    isLoading: false,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "Chris Wilson",
  },
  {
    name: "file8.jpg",
    size: 98923,
    isLoading: true,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "Laura Martinez",
  },
  {
    name: "file9.txt",
    size: 14982,
    isLoading: false,
    isDeletable: true,
    isDowlodable: false,
    ownerName: "David Moore",
  },
  {
    name: "file10.mp3",
    size: 2930294,
    isLoading: true,
    isDeletable: false,
    isDowlodable: false,
    ownerName: "Rachel Taylor",
  },
  {
    name: "file11.xlsx",
    size: 11234,
    isLoading: false,
    isDeletable: true,
    isDowlodable: true,
    ownerName: "James White",
  },
  {
    name: "file12.rar",
    size: 134723,
    isLoading: true,
    isDeletable: false,
    isDowlodable: true,
    ownerName: "Sophia Harris",
  },
];

export const Default: Story = {
  args: {
    files: files,
    onDelete: (file: CustomFile) => alert("delete : " + file.name),
    onClick: (file: CustomFile) => alert("click : " + file.name),
    onDownload: (file: CustomFile) => alert("download : " + file.name),
  },
};
