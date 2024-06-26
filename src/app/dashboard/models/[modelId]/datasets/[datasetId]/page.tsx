import { getModel } from '@/app/dashboard/models/[modelId]/[tabName]/page';
import DatasetResults from '@/app/dashboard/models/[modelId]/components/DatasetResults';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { generateSharedMetadata } from '@/app/shared.metadata';
import DatasetBreadcrumbs from '@/app/dashboard/models/[modelId]/datasets/[datasetId]/components/DatasetBreadcrumbs';

export const metadata: Metadata = generateSharedMetadata(
  'Dataset',
  'Explore datasets used as inputs for predictive models and view prediction results on the Jaqpot platform. Manage and analyze datasets seamlessly to improve model accuracy',
);

export default async function Page({
  params,
}: {
  params: { modelId: string; datasetId: string };
}) {
  const model = await getModel(params.modelId);
  if (!model) {
    notFound();
  }

  return (
    <>
      <DatasetBreadcrumbs
        modelId={params.modelId}
        datasetId={params.datasetId}
      />
      <DatasetResults datasetId={params.datasetId} model={model} />
    </>
  );
}
