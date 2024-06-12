'use client';

import { DatasetDto, ModelDto } from '@/app/api.types';
import DynamicForm, {
  DynamicFormSchema,
} from '@/app/dashboard/models/[modelId]/components/DynamicForm';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import PredictionResult from '@/app/dashboard/models/[modelId]/components/PredictionResult';
import toast from 'react-hot-toast';

async function createPrediction(modelId: string, data: any) {
  return await fetch(`/api/models/${modelId}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function getPredictionResult(datasetId: string) {
  return fetch(`/api/datasets/${datasetId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

interface PredictTabProps {
  model: ModelDto;
}

export default function PredictTab({ model }: PredictTabProps) {
  const params = useParams<{ modelId: string }>();
  const [isPredictionLoading, setIsPredictionLoading] = useState(false);
  const [dataset, setDataset] = useState<DatasetDto | undefined>(undefined);

  async function handlePredictionResults(datasetUrl: string | null) {
    if (!datasetUrl) {
      toast.error('Dataset was not created successfully');
      return;
    }

    const datasetUrlParts = datasetUrl.split('/');
    const datasetId = datasetUrlParts[datasetUrlParts.length - 1];

    setIsPredictionLoading(true);

    const predictionDataset = await new Promise<DatasetDto>((resolve) => {
      const intervalId = setInterval(async () => {
        const res = await getPredictionResult(datasetId);
        const { success, dataset } = await res.json();

        if (dataset?.status === 'SUCCESS' || dataset?.status === 'FAILURE') {
          clearInterval(intervalId);
          resolve(dataset);
        }
      }, 5000);
    });

    setIsPredictionLoading(false);
    setDataset(predictionDataset);
  }

  const handleFormSubmit = async (formData: any) => {
    const res = await createPrediction(params.modelId, Object.values(formData));
    const { success, data } = await res.json();
    if (success) {
      const datasetUrl = data.datasetUrl;
      await handlePredictionResults(datasetUrl);
    } else {
      toast.error(`Error creating prediction:  ${data?.message}`);
      await handlePredictionResults(null);
    }
  };

  function generatePredictionFormSchema(model: ModelDto): DynamicFormSchema[] {
    return model.independentFeatures.map((independentFeature) => {
      const dynamicFormSchema: DynamicFormSchema = {
        sectionTitle: '',
        fields: [
          {
            type:
              independentFeature.featureType === 'NUMERICAL'
                ? 'text'
                : 'select',
            name: independentFeature.name,
            label: independentFeature.name,
            required: true,
            placeholder: 'Insert value...',
            options: independentFeature.possibleValues?.map(
              (possibleValue) => ({
                label: possibleValue,
                value: independentFeature.name,
              }),
            ),
          },
        ],
      };
      return dynamicFormSchema;
    });
  }

  const predictionFormSchema = generatePredictionFormSchema(model);

  return (
    <div className="container mt-5">
      <DynamicForm schema={predictionFormSchema} onSubmit={handleFormSubmit} />

      <PredictionResult
        model={model}
        loading={isPredictionLoading}
        dataset={dataset}
      />
    </div>
  );
}
