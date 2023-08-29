import isLikedByUser from "../is.liked.by.user";
import type { Recipe } from "~/types";

const recipe_one = {
    name: "test",
    reviews: [
        {
            author_id: 1,
            is_liked: true,
        }
    ]
}

const recipe_two = {
    name: "test",
    reviews: [
        {
            author_id: 1,
            is_liked: false,
        }
    ]
}

const recipe_three = {
    name: "test",
    reviews: [
        {
            author_id: 2,
            is_liked: true,
        },
        {
            author_id: 1,
            is_liked: false,
        }
    ]
}

const recipe_four = {
    name: "test"
}

describe("isLikedByUser", () => {
    test("should return true if the user has liked the recipe", () => {
        expect(isLikedByUser(recipe_one as Recipe, 1)).toBe(true);
    });
    test("should return false if the user has not liked the recipe", () => {
        expect(isLikedByUser(recipe_two as Recipe, 1)).toBe(false);
    });
    test("should return false if the user has not liked the recipe and recipe have more than one reviews", () => {
        expect(isLikedByUser(recipe_three as Recipe, 1)).toBe(false);
    })
    test("should return false if authodId is undefined", () => {
        expect(isLikedByUser(recipe_three as Recipe)).toBe(false);
    })
    test("should return false if the recipe does not have any reviews", () => {
        expect(isLikedByUser(recipe_four as Recipe, 1)).toBe(false);
    })
})