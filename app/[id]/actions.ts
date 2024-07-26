"use server";

import prisma from "@/prisma/client";
import { noteSchema } from "@/app/[id]/edit/noteSchema";
import { isLogged, permissionOwnerStaff } from "@/components/helpers";
import { PrismaClientValidationError } from "@prisma/client/runtime/binary";

export const createNote = async (
  dataStr: string,
): Promise<{ ok: boolean; message: string; data?: string }> => {
  const user = await isLogged("/new");
  const jsonData = JSON.parse(dataStr);
  const validation = noteSchema.safeParse(jsonData);
  if (!validation.success) {
    return { ok: false, message: validation.error.toString() };
  }
  const data = validation.data;

  try {
    const note = await prisma.note.create({
      data: {
        title: data.title,
        content: data.content,
        userId: user.id,
        summary: data.summary,
        tagIds: data.tags,
      },
    });
    return {
      ok: true,
      message: "Successfully created note",
      data: JSON.stringify(note),
    };
  } catch (e: any) {
    if (e instanceof PrismaClientValidationError) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: e.toString() };
  }
};

export const updateNote = async (
  id: string,
  dataStr: string,
): Promise<{ ok: boolean; message: string; data?: string }> => {
  const user = await isLogged("/new");
  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });
  if (!note) {
    return { ok: false, message: "Note not found" };
  }
  if (!permissionOwnerStaff(user, note)) {
    return {
      ok: false,
      message: "You do not have permission to update this note",
    };
  }
  const jsonData = JSON.parse(dataStr);
  const validation = noteSchema.safeParse(jsonData);
  if (!validation.success) {
    return { ok: false, message: validation.error.toString() };
  }
  const data = validation.data;

  try {
    const note = await prisma.note.update({
      where: {
        id: id,
      },
      data: {
        title: data.title,
        content: data.content,
        summary: data.summary,
        tagIds: data.tags,
      },
    });
    return {
      ok: true,
      message: "Successfully updated note",
      data: JSON.stringify(note),
    };
  } catch (e: any) {
    if (e instanceof PrismaClientValidationError) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: e.toString() };
  }
};

export const deleteNote = async (
  id: string,
): Promise<{ ok: boolean; message: string; data?: string }> => {
  const user = await isLogged("/new");
  const note = await prisma.note.findUnique({
    where: {
      id: id,
    },
  });
  if (!note) {
    return { ok: false, message: "Note not found" };
  }
  if (!permissionOwnerStaff(user, note)) {
    return {
      ok: false,
      message: "You do not have permission to delete this note",
    };
  }
  try {
    await prisma.note.delete({
      where: {
        id: id,
      },
    });
    return {
      ok: true,
      message: "Successfully deleted note",
      data: JSON.stringify(note),
    };
  } catch (e: any) {
    if (e instanceof PrismaClientValidationError) {
      return { ok: false, message: e.message };
    }
    return { ok: false, message: e.toString() };
  }
};
