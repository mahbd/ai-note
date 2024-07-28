import prisma from "@/prisma/client";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/auth";
import NoteActions from "@/components/NoteActions";
import ShowMDContent from "@/app/[id]/ShowMDContent";

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
      <ShowMDContent content={note.content} />
    </div>
  );
};

export default NotePage;
