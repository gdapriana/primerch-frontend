import { CategoryWithRelation } from "@/helpers/type/category.type";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const CollectionDescription = ({
  category,
}: {
  category: CategoryWithRelation;
}) => {
  return (
    <div className="flex w-full p-4 flex-col-reverse md:flex-row gap-6 md:gap-8 mt-4">
      <div className="w-full md:w-72 aspect-square">
        {category.cover?.url && (
          <Image
            src={category.cover.url}
            width={300}
            alt={category.name}
            height={300}
            className="w-full h-full aspect-square object-cover"
          />
        )}
      </div>
      <div className="w-full md:w-auto md:flex-1 flex flex-col justify-center items-start gap-2">
        <h1 className="uppercase tracking-widest font-black text-xl">
          {category.name}
        </h1>
        <p className="text-sm text-muted-foreground">{category.description}</p>
        <Button className="mt-2" size="sm">
          {category._count.products} Products
        </Button>
      </div>
    </div>
  );
};

export default CollectionDescription;
