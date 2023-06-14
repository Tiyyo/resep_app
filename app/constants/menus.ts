export const ADMIN_PANEL_MENU = [
    { name: 'Ingredients', link: "ingredients" },
    { name: 'Macros', link: "macros" },
    { name: 'Categories', link: "categories" },
    { name: 'Icons', link: "icons" },
    { name: 'Products', link: "products" },
]

export const EXAMPLE_MENU = [
    { id: 1, text: 'Text 1', open: false },
    { id: 2, text: 'Text 2 ', open: false, children: [
            { id: 5, text: 'Text 5', open: false },
            { id: 6, text: 'Text 6', open: false, children: [
                    { id: 9, text: 'Text 9', open: false },
                    { id: 10, text: 'Text 10', open: false }
                ]
            },
            { id: 7, text: 'Text 7', open: false }
        ]
    },
    { id: 3, text: 'Text 3', open: false, children: [
            { id: 8, text: 'Text 8', open: false }
        ]
    },
    { id: 4, text: 'Text 4', open: false }
]

