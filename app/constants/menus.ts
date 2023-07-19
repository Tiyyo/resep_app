import AddPlusIcon from "~/assets/icons/AddPlusIcon"

export const adminPanelMenu = [
    {
        id: 1, name: 'Ingredients', link: "ingredients", open: false, icon: null, children: [
            { id: 2, name: 'overview', link: "ingredients", open: false, icon: null },
            { id: 2, name: 'add new', link: "add/ingredients", open: false, icon: AddPlusIcon }
        ]
    },
    {
        id: 2, name: 'Macros', link: "macros", open: false, icon: null, children: [
            { id: 2, name: 'overview', link: "macros", open: false, icon: null },
            { id: 2, name: 'add new', link: "add/macros", open: false, icon: AddPlusIcon }
        ]
    },
    {
        id: 3, name: 'Categories', link: "categories", open: false, icon: null,
        children: [
            { id: 2, name: 'overview', link: "categories", open: false, icon: null },
            { id: 2, name: 'add new', link: "add/categories", open: false, icon: AddPlusIcon }
        ]
    },
    {
        id: 4, name: 'Icons', link: "icons", open: false, icon: null, children: [
            { id: 2, name: 'overview', link: "icons", open: false, icon: null },
            { id: 2, name: 'add new', link: "add/icons", open: false, icon: AddPlusIcon }
        ]
    },
    {
        id: 5, name: 'Products', link: "products", open: false, icon: null, children: [
            { id: 2, name: 'overview', link: "products", open: false, icon: null },
            { id: 2, name: 'add new ingredient', link: "add/products", open: false, icon: AddPlusIcon }
        ]
    },
]

export const homeMenu = [
    {
        id: 1, name: 'Recipes', link: "recipes", open: false, icon: null, children: [
            { id: 3, name: 'For you', link: "recipes", open: false, icon: null },
            { id: 4, name: 'My recipes', link: "my_recipes", open: false, icon: null },
            { id: 5, name: 'Favorites', link: "favorites", open: false, icon: null },
            {
                id: 6, name: 'Categories', link: "categories", open: false, icon: null, children: [
                    { id: 8, name: 'New', link: "categories/new", open: false, icon: null },
                    { id: 9, name: 'Asia', link: "categories/asia", open: false, icon: null },
                    { id: 10, name: 'Italy', link: "categories/italy", open: false, icon: null },
                ]
            },
            { id: 7, name: 'add new', link: "recipes/add", open: false, icon: AddPlusIcon },
        ]
    }, {
        id: 2, name: 'Meals plan', link: "meal_plans", open: false, icon: null, children: [
            { id: 11, name: 'My plans', link: "meal_plans/my_plans", open: false, icon: null },
            { id: 12, name: 'generate', link: "meal_plans/generate", open: false, icon: AddPlusIcon },
        ]
    }
]





