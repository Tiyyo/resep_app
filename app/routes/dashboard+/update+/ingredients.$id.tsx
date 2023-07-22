import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { promiseHash } from 'remix-utils';
import category from '~/api/category';
import icon from '~/api/icon';
import ingredient from '~/api/ingredient';
import macro from '~/api/macro';
import Modal from '~/components/modal';
import UpdateIngredientsForm from '~/components/update_forms/Ingredients';
import ServerError from '~/helpers/errors/server.error';
import ResponseError from '~/helpers/response/response.error';

export async function loader({ params }: LoaderArgs) {
  const { id: ingredientId } = params;
  try {
    if (ingredientId) {
      return json(
        await promiseHash({
          categories: category.findAll(),
          macros: macro.findAll(),
          icons: icon.findAll(),
          ingredientToEdit: ingredient.findById(+ingredientId),
        }),
      );
    }
    throw new ServerError("Server can't access data");
  } catch (error: any) {
    return new ResponseError(error);
  }
}

export default function ModalUpdate() {
  const { ingredientToEdit, categories, macros, icons } = useLoaderData();

  return (
    <Modal>
      <UpdateIngredientsForm
        data={ingredientToEdit}
        categories={categories}
        icons={icons}
        macros={macros}
      />
    </Modal>
  );
}
