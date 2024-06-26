'use client';

import { DatasetDto, FeatureDto, ModelDto } from '@/app/api.types';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import React, { useEffect, useState } from 'react';
import { ApiResponse } from '@/app/util/response';
import useSWR, { Fetcher } from 'swr';
import { CustomError } from '@/app/types/CustomError';
import SWRClientFetchError from '@/app/components/SWRClientFetchError';
import { Skeleton } from '@nextui-org/skeleton';
import { Link } from '@nextui-org/link';
import { Chip } from '@nextui-org/chip';

interface PredictionResultProps {
  datasetId: string;
  model: ModelDto;
}

const fetcher: Fetcher<ApiResponse<DatasetDto>, string> = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const message = (await res.json()).message;
    const status = res.status;
    // Attach extra info to the error object.
    throw new CustomError(message, status);
  }

  return res.json();
};

export default function DatasetResults({
  datasetId,
  model,
}: PredictionResultProps) {
  // how often to refresh to check if the dataset is ready, setting to 0 will disable the interval
  const [refreshInterval, setRefreshInterval] = useState(1000);
  const allFeatures: FeatureDto[] = [
    ...model.independentFeatures,
    ...model.dependentFeatures,
  ];
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useSWR(`/api/datasets/${datasetId}`, fetcher, { refreshInterval });

  const dataset = apiResponse?.data;
  useEffect(() => {
    if (dataset?.status === 'SUCCESS' || dataset?.status === 'FAILURE') {
      setRefreshInterval(0);
    } else if (dataset?.status === 'EXECUTING') {
      setRefreshInterval(1000);
    }
  }, [dataset]);

  if (error) return <SWRClientFetchError error={error} />;

  const isLoaded =
    !isLoading &&
    dataset?.status !== 'CREATED' &&
    dataset?.status !== 'EXECUTING';
  const loadingState = isLoading ? 'loading' : 'idle';

  const tableHeaders = allFeatures.map((feature, index) => (
    <TableColumn key={index}>{feature.name}</TableColumn>
  ));

  function generateTableRows() {
    if (!dataset?.result) {
      return [];
    }

    return dataset?.result.map((result: any, resultIndex: number) => {
      const independentFeatureCellValues: string[] =
        model.independentFeatures.map((feature, independentFeatureIndex) => {
          const input = dataset.input[resultIndex] as any;
          if (!input || !input[feature.key]) {
            return 'N/A';
          }
          return input[feature.key];
        });

      const dependentFeatureCellValues = model.dependentFeatures.map(
        (feature, index) => {
          return result[feature.key];
        },
      );
      return (
        <TableRow key={resultIndex}>
          {[...independentFeatureCellValues, ...dependentFeatureCellValues].map(
            (value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ),
          )}
        </TableRow>
      );
    });
  }

  function showDatasetStatus() {
    if (!dataset) {
      return <></>;
    } else if (dataset?.status === 'SUCCESS') {
      return (
        <Chip color="success" variant="flat">
          Success
        </Chip>
      );
    } else if (dataset?.status === 'FAILURE') {
      return (
        <Chip color="danger" variant="flat">
          Failed
        </Chip>
      );
    } else {
      return <Chip color="primary">In progress</Chip>;
    }
  }

  const tableRows = generateTableRows();

  return (
    <div className="mt-5 flex flex-col gap-4">
      <h2 className="text-2xl font-bold leading-7 sm:truncate sm:text-3xl sm:tracking-tight">
        Result
      </h2>
      <div>
        <Link
          href={`/dashboard/models/${model.id}/datasets/${datasetId}`}
          isExternal
          showAnchorIcon
          className="mr-2"
        >
          ID {datasetId}
        </Link>
        {showDatasetStatus()}
      </div>
      {!isLoaded && (
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-3 w-2/5 rounded-lg" />
          <Skeleton className="w-5/5 h-3 rounded-lg" />
        </div>
      )}
      {isLoaded && dataset?.status === 'SUCCESS' && (
        <Table aria-label="Prediction table">
          <TableHeader>{tableHeaders}</TableHeader>
          <TableBody loadingState={loadingState}>{tableRows}</TableBody>
        </Table>
      )}
    </div>
  );
}
