import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { Role, User } from "@prisma/client";
import { redirect } from "next/navigation";

export const readableDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day =
    date.getDate() < 10
      ? "0" + date.getDate().toString()
      : date.getDate().toString();
  const hours =
    date.getHours() < 10
      ? "0" + date.getHours().toString()
      : date.getHours().toString();
  const minutes =
    date.getMinutes() < 10
      ? "0" + date.getMinutes().toString()
      : date.getMinutes().toString();
  const amOrPm = parseInt(hours) >= 12 ? "PM" : "AM";
  const formattedHours = parseInt(hours) % 12 || 12;
  const formattedDateTime = `${month} ${day}, ${year} ${formattedHours}:${minutes} ${amOrPm}`;
  return formattedDateTime;
};

export const isLogged = async (callbackUrl: string) => {
  const base = "/api/auth/signin?callbackUrl=";
  const session = await auth();
  const user = session && session.user;
  if (!user) {
    redirect(base + callbackUrl);
  }
  const prismaUser = await prisma.user.findUnique({
    where: {
      email: user.email!,
    },
  });
  if (!prismaUser) {
    redirect(callbackUrl);
  }
  return prismaUser;
};

export const permissionOwner = (
  user: User | undefined | null,
  content: { userId: string },
): boolean => {
  if (!user) return false;
  if (user.role === Role.ADMIN) return true;
  return user.id === content.userId;
};

/**
 * @returns true if user is the owner or staff
 */
export const permissionOwnerStaff = (
  user: User | undefined | null,
  content: { userId: string },
): boolean => {
  if (!user) return false;
  if (user.role === Role.ADMIN || user.role === Role.STAFF) return true;
  return user.id === content.userId;
};

export const permissionStaff = (user: User | undefined | null): boolean => {
  if (!user) return false;
  return user.role === Role.ADMIN || user.role === Role.STAFF;
};

export const permissionAdmin = (user: User | undefined | null): boolean => {
  if (!user) return false;
  return user.role === Role.ADMIN;
};

export const permissionUser = (user: User | undefined | null): boolean => {
  return user !== null && user !== undefined;
};

export const permissionPublic = (user: User | undefined | null): boolean => {
  return true;
};
