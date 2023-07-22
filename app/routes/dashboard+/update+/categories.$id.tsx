import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import category from '~/api/category';
import Modal from '~/components/modal';
import UpdateCategoriesForm from '~/components/update_forms/Categories';
import ServerError from '~/helpers/errors/server.error';
import ResponseError from '~/helpers/response/response.error';

export async function loader({ params }: LoaderArgs) {
  const { id: categoryId } = params;
  try {
    if (!categoryId) throw new ServerError('No id provided');
    return json({ category: await category.findById(+categoryId) });
  } catch (error: any) {
    return new ResponseError(error);
  }
}

export default function EditCategories() {
  const { category } = useLoaderData();

  return (
    <Modal>
      <UpdateCategoriesForm category={category} />
    </Modal>
  );
}
