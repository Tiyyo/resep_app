import type { ActionArgs } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const method = request.method.toLowerCase();

  switch (method) {
    case "post": {
      //bloc de code
    }
    case "patch": {
      // bloc de code
    }
    case "delete": {
      // bloc de code
    }
    default: {
      throw new Error("Invalid method");
    }
  }
}
