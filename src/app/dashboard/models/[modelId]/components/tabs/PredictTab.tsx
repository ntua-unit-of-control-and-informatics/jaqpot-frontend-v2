'use client';

import { DatasetDto, ModelDto } from '@/app/api.types';
import DynamicForm, {
  DynamicFormSchema,
} from '@/app/dashboard/models/[modelId]/components/DynamicForm';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import DatasetResults from '@/app/dashboard/models/[modelId]/components/DatasetResults';
import toast from 'react-hot-toast';
import { ApiResponse } from '@/app/util/response';
import { Spinner } from '@nextui-org/spinner';
import { Radio, RadioGroup } from '@nextui-org/react';
import UploadCSVForm from '@/app/dashboard/models/[modelId]/components/UploadCSVForm';

async function createPrediction(modelId: string, data: any) {
  return await fetch(`/api/models/${modelId}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}

async function createPredictionWithCSV(modelId: string, formData: FormData) {
  return await fetch(`/api/models/${modelId}/predict/csv`, {
    method: 'POST',
    body: formData,
  });
}

interface PredictTabProps {
  model: ModelDto;
}

export default function PredictTab({ model }: PredictTabProps) {
  const params = useParams<{ modelId: string }>();
  const [loading, setIsLoading] = useState(false);
  const [datasetId, setDatasetId] = useState<string | undefined>(undefined);
  const [predictionUploadType, setPredictionUploadType] = useState('form');

  const handleFormSubmit = async (formData: any) => {
    setIsLoading(true);
    const res = await createPrediction(params.modelId, Object.values(formData));
    const { success, data, message }: ApiResponse<{ datasetId: string }> =
      await res.json();
    if (success) {
      setDatasetId(data!.datasetId);
    } else {
      toast.error(`Error creating prediction:  ${message}`);
    }
    setIsLoading(false);
  };

  const handleCSVFormSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const res = await createPredictionWithCSV(params.modelId, formData);
    const { success, data, message }: ApiResponse<{ datasetId: string }> =
      await res.json();
    if (success) {
      setDatasetId(data!.datasetId);
    } else {
      toast.error(`Error creating prediction:  ${message}`);
    }
    setIsLoading(false);
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
    <div className="container mt-2">
      <RadioGroup
        label="Choose Your Prediction Input Method"
        orientation="horizontal"
        value={predictionUploadType}
        onValueChange={setPredictionUploadType}
        className="mb-5"
        classNames={{
          label: 'text-tiny',
        }}
      >
        <Radio value="form">Fill out the form</Radio>
        <span className="mx-4">or</span>
        <Radio value="csv">Upload a CSV file</Radio>
      </RadioGroup>

      {predictionUploadType === 'form' && (
        <DynamicForm
          schema={predictionFormSchema}
          onSubmit={handleFormSubmit}
        />
      )}
      {predictionUploadType === 'csv' && (
        <UploadCSVForm model={model} onSubmit={handleCSVFormSubmit} />
      )}

      {loading && <Spinner className="my-3" />}
      {datasetId && <DatasetResults model={model} datasetId={datasetId} />}
    </div>
  );
}
