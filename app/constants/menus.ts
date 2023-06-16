import AddPlusIcon from "~/assets/icons/AddPlusIcon"

export const ADMIN_PANEL_MENU = [
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

export const EXAMPLE_MENU = [
    { id: 1, name: 'Text 1', open: false, icon: null },
    {
        id: 2, name: 'Text 2 ', open: false, children: [
            { id: 5, name: 'Text 5', open: false },
            {
                id: 6, name: 'Text 6', open: false, children: [
                    { id: 9, name: 'Text 9', open: false },
                    { id: 10, name: 'Text 10', open: false }
                ]
            },
            { id: 7, name: 'Text 7', open: false }
        ]
    },
    {
        id: 3, name: 'Text 3', open: false, children: [
            { id: 8, name: 'Text 8', open: false }
        ]
    },
    { id: 4, name: 'Text 4', open: false }
]

