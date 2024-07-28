import { NextAdminOptions } from "@premieroctet/next-admin";

const options: NextAdminOptions = {
  basePath: "/admin",
  title: "Note App Admin",
  model: {
    User: {},
    Note: {
      toString: (note) => note.title,
    },
    Tag: {
      toString: (tag) => tag.name,
      edit: {
        fields: {},
      },
    },
  },
};

export default options;
