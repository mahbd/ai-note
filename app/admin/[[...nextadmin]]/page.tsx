// app/admin/[[...nextadmin]]/page.tsx
import { NextAdmin } from "@premieroctet/next-admin";
import { getPropsFromParams } from "@premieroctet/next-admin/dist/appRouter";
import Dashboard from "@/components/Dashboard";
import options from "@/actions/nextAdminOptions";
import schema from "../../../prisma/json-schema/json-schema.json";
import {
  deleteItem,
  searchResource,
  submitFormAction,
} from "@/actions/nextadmin";
import "../../globals.css";
import prisma from "@/prisma/client"; // .css file containing tailiwnd rules

export default async function AdminPage({
  params,
  searchParams,
}: {
  params: { [key: string]: string[] };
  searchParams: { [key: string]: string | string[] | undefined } | undefined;
}) {
  const props = await getPropsFromParams({
    params: params.nextadmin,
    searchParams,
    options,
    prisma,
    schema,
    action: submitFormAction,
    deleteAction: deleteItem,
    searchPaginatedResourceAction: searchResource,
  });

  return <NextAdmin {...props} dashboard={Dashboard} />;
}
