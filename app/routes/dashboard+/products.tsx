import type { ActionArgs } from "@remix-run/node";

export async function action({ request }: ActionArgs) {
  return null;
}

export default function ProductsManagement() {
  return (
    <p>Under Construction</p>
    // <Form method="POST" encType="multipart/form-data">
    //   <FileInput name="image_recipe" />
    //   <SubmitButton text="envoyer" />
    // </Form>
    // <div>
    //   this is a product management page
    // </div>
  );
}
