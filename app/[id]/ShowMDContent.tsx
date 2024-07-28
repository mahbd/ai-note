"use client";
import MarkdownPreview from "@uiw/react-markdown-preview";

interface Props {
  content: string;
}

const ShowMDContent = ({ content }: Props) => {
  console.log(content);
  const source =
    "1. yay \n" +
    "```bash" +
    "sudo pacman -S git base-devel\n" +
    "git clone https://aur.archlinux.org/yay.git\n" +
    "cd yay\n" +
    "makepkg -si \n" +
    "```\n" +
    " This is used to install many applications.\n" +
    "2. Google Chrome `yay -S google-chrome`\n" +
    "3. VS Code yay -S visual-studio-code-bin\n" +
    "4. NVM `yay -S nvm`\n" +
    "5. Gedit `sudo pacman -S gedit`";
  return (
    <div className="prose">
      <MarkdownPreview source={content} style={{ padding: 16 }} />
    </div>
  );
};

export default ShowMDContent;
