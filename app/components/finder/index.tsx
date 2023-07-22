import { useParams } from "@remix-run/react";
import FinderCategories from "./index.categories";
import FinderSearch from "./index.search";
import { Recipe } from "~/types/recipe";

export default function Finder({
  recipes,
  profileId,
}: {
  recipes: Recipe[];
  profileId: number;
}) {
  const params = useParams();
  switch (params.tags?.toLowerCase()) {
    case "all": {
      return <FinderSearch recipes={recipes} profileId={profileId} />;
    }
    default: {
      return <FinderCategories recipes={recipes} profileId={profileId} />;
    }
  }
}
