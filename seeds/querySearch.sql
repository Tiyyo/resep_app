SELECT recipes.id, recipes.name
            FROM recipes 
            WHERE recipes.name LIKE ANY (array['Chicken'])
            OR recipes.id IN (
            SELECT recipes.id FROM recipes INNER JOIN recipes_on_tags ON recipes_on_tags.recipe_id = recipes.id 
            WHERE (
                (recipes_on_tags.tag_id, recipes_on_tags.recipe_id) 
                IN 
                ( SELECT recipes_on_tags.tag_id , recipes_on_tags.recipe_id FROM recipes_on_tags 
                  INNER JOIN tags ON tags.id = recipes_on_tags.tag_id
                  WHERE tags.name LIKE ANY (array['Japan','Italy']) AND recipes_on_tags IS NOT NULL AND recipes_on_tags.recipe_id IS NOT NULL )
            ) AND recipes.id IS NOT NULL )
