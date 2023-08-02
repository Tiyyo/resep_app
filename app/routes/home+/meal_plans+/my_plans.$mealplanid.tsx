import { ActionArgs, LoaderArgs, json } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { Fragment } from 'react';
import meal_plans from '~/api/meal_plans';
import shopping_lists from '~/api/shopping_lists';
import Input from '~/components/input';
import SubmitButton from '~/components/submit_button';
import NotFoundError from '~/helpers/errors/not.found.error';
import ServerError from '~/helpers/errors/server.error';
import ResponseError from '~/helpers/response/response.error';
import { buildShoppingList } from '~/service/algo.builder.safer.server';
import {
  convertGramsToPieces,
  harmonzeUnit,
} from '~/utils/convert.grams.to.pieces';

import { getProfile } from '~/utils/get.user.infos';

export async function loader({ request, params }: LoaderArgs) {
  try {
    const { mealplanid } = params;
    if (!mealplanid && typeof mealplanid !== 'string')
      throw new ServerError('no meal plan id found');
    const profile = await getProfile(request);
    if (!profile) throw new Error('no profile found');

    const mealPlans = await meal_plans.findById(Number(mealplanid), profile.id);

    if (!mealPlans) throw new NotFoundError('no meal plan found');

    const mealsHarmonize = harmonzeUnit(mealPlans);

    return json({
      mealPlans,
      mealsHarmonize,
      profileId: profile.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({ error: 'no profile found' }, { status: 401 });
    }
    return new ResponseError(error);
  }
}

export default function () {
  const { mealPlans, mealsHarmonize } = useLoaderData();

  return (
    <>
      <div className="flex gap-x-4 py-4 overflow-scroll no-scrollbar">
        {mealPlans &&
          mealPlans.meals &&
          mealPlans.meals.length > 0 &&
          mealPlans.meals.map((recipe, index) => (
            <Fragment key={index}>
              <div className="flex border p-2 bg-main-100 shadow-md h-44 aspect-2/1">
                <div className="aspect-square basis-1/3">
                  <Link to={`/home/recipe/${recipe.recipe_id}`}>
                    <img
                      src={recipe.image}
                      alt={recipe.recipe_name}
                      className="h-full rounded-full p-2"
                    />
                  </Link>
                </div>
                <div className="flex flex-col justify-start">
                  <p className="min-h-8 text-8 font-semibold text-text-accent">
                    {recipe.recipe_name}
                  </p>
                  <div className="flex items-center text-8 opacity-90 flex-grow ">
                    <p className="text-7">Number of people for that recipes </p>
                    <Input
                      type="number"
                      name="parts"
                      width="14"
                      align="center"
                      step={1}
                      value={recipe.servings}
                      disabled
                      // onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </Fragment>
          ))}
      </div>
      <div className="center flex-col">
        {/* <Form method="POST">
          <input
            type="text"
            name="mealPlanId"
            hidden
            defaultValue={mealPlans.id}
          />
          <input type="text" name="profileId" hidden defaultValue={profileId} />
          <SubmitButton text="generate shopping list" />
        </Form> */}
        <div className="flex center flex-wrap gap-4 p-4">
          {mealsHarmonize &&
            mealsHarmonize.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex rounded-2xl items-center gap-x-2 w-52 bg-main-100 px-4 py-1"
                >
                  <img
                    src={item.image}
                    className="rounded-full h-8 aspect-square"
                  />
                  <p className="text-8 opacity-80 flex-grow">{item.name}</p>
                  <p className="text-7 opacity-80 w-[20%]">
                    {item.qty}
                    <span>{item.unit}</span>
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
