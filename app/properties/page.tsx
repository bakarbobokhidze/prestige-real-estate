import { HeaderStatic } from "@/components/layout/header-static";
import { Footer } from "@/components/layout/footer";
import { PropertyGridWrapper } from "@/components/properties/property-grid-wrapper";

async function getProperties(searchParams: any) {
  const params = new URLSearchParams();
  
  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/properties?${params.toString()}`,
    {
      next: { revalidate: 10 }, 
    }
  );

  if (!res.ok) return [];
  return res.json();
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const resolvedParams = await searchParams;
  const properties = await getProperties(resolvedParams);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderStatic />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              უძრავი ქონება
            </h1>
          </div>

          <PropertyGridWrapper initialProperties={properties} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
