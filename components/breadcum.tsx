import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function CustomBreadcum({
  data,
}: {
  data: { url: string; name: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {data.map((item: { url: string; name: string }, index: number) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink className="text-sm capitalize" href={item.url}>
                {item.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            {data.length - 1 !== index && <BreadcrumbSeparator />}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
