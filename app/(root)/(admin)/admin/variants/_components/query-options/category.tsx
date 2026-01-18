import { Dispatch, SetStateAction } from "react";
import { CategoryQueryWithRelation } from "@/helpers/type/category.type";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";

const CategoryOptions = ({
  category,
  categories,
}: {
  category: {
    value: string | undefined;
    setValue: Dispatch<SetStateAction<string | undefined>>;
  };
  categories: CategoryQueryWithRelation[];
}) => {
  return (
    <div className="flex mt-4 w-full gap-2 justify-start items-start flex-wrap">
      {categories &&
        categories.map((categoryItem: CategoryQueryWithRelation) => (
          <Button
            className="flex-1 text-xs cursor-pointer"
            onClick={() =>
              category.setValue(
                categoryItem.slug === category.value
                  ? undefined
                  : categoryItem.slug,
              )
            }
            size="sm"
            variant={
              categoryItem.slug === category.value ? "default" : "outline"
            }
            key={categoryItem.id}
          >
            <Folder className="w-3 h-3" />
            {categoryItem.name}
          </Button>
        ))}
    </div>
  );
};

export default CategoryOptions;
