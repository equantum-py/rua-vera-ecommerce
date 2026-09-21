import { DemoProductContent } from './product-content';

export default async function DemoProductPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const sku = typeof params.sku === 'string' ? params.sku : 'RUA-0001';

  return <DemoProductContent initialSku={sku} />;
}
