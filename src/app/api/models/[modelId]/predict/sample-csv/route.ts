import { FeatureDto, ModelDto } from '@/app/api.types';

function generateCSVFromModel(
  independentFeatures: FeatureDto[],
  dependentFeatures: FeatureDto[],
) {
  return [...independentFeatures].map((feature) => feature.name).join(',');
}

export async function POST(request: Request) {
  const { independentFeatures, dependentFeatures } = await request.json();
  const csv = generateCSVFromModel(independentFeatures, dependentFeatures);

  const headers = new Headers();
  headers.append('Content-Disposition', 'attachment; filename="sample.csv"');
  headers.append('Content-Type', 'application/csv');

  return new Response(csv, {
    headers: {
      'Content-Disposition': 'attachment; filename="sample.csv"',
      'Content-Type': 'application/csv',
    },
  });
}