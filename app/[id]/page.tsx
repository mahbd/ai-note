import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import NoteForm from "@/app/[id]/edit/NoteForm";
import { auth } from "@/auth";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import NoteActions from "@/components/NoteActions";

interface Props {
  params: { id: string };
}

const NotePage = async ({ params }: Props) => {
  const session = await auth();
  if (!session) {
    redirect(`/api/auth/signin?callbackUrl=/${params.id}`);
  }
  if (params.id === "new") {
    redirect(`/${params.id}/edit`);
  }

  const note = await prisma.note.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!note) {
    notFound();
  }

  return (
    <div className="m-2 w-full">
      <h1 className="text-center text-4xl">{note.title}</h1>
      <NoteActions className={"mb-3"} note={note} />
      <div className="prose">
        <Markdown rehypePlugins={[rehypeRaw]} disallowedElements={["script"]}>
          {note.content}
        </Markdown>
      </div>
    </div>
  );
};

export default NotePage;
