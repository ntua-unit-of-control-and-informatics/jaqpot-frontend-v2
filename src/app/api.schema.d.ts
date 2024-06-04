/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v1/models": {
    /** Create a new model */
    post: operations["createModel"];
  };
  "/v1/models/{id}": {
    /**
     * Get a Model
     * @description Retrieve a single model by its ID
     */
    get: operations["getModelById"];
  };
  "/v1/models/{modelId}/predict": {
    /**
     * Predict with Model
     * @description Submit a dataset for prediction using a specific model
     */
    post: operations["predictWithModel"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Model: {
      /**
       * Format: int64
       * @example 0
       */
      id?: number;
      /** @description A JSON object containing meta information. */
      meta?: {
        [key: string]: Record<string, never>;
      };
      /** @example My Model */
      name: string;
      /** @example A description of your model */
      description: string;
      /** @example some type */
      type?: string;
      /** @example 1.0.0 */
      jaqpotpyVersion: string;
      libraries: components["schemas"]["Library"][];
      dependentFeatures: components["schemas"]["Feature"][];
      independentFeatures: components["schemas"]["Feature"][];
      /** @example 5 */
      reliability?: number;
      /** @example false */
      pretrained?: boolean;
      /**
       * Format: byte
       * @description A base64 representation of the actual model.
       */
      actualModel: string;
      creator?: components["schemas"]["User"];
      /**
       * Format: date-time
       * @description The date and time when the feature was created.
       * @example 2023-01-01T12:00:00Z
       */
      createdAt?: Record<string, never>;
      /**
       * @description The date and time when the feature was last updated.
       * @example 2023-01-01T12:00:00Z
       */
      updatedAt?: Record<string, never>;
    };
    Library: {
      /** Format: int64 */
      id?: number;
      /** @example Library Name */
      name: string;
      /** @example 1.24.0 */
      version: string;
      /**
       * Format: date-time
       * @description The date and time when the feature was created.
       * @example 2023-01-01T12:00:00Z
       */
      createdAt?: Record<string, never>;
      /**
       * @description The date and time when the feature was last updated.
       * @example 2023-01-01T12:00:00Z
       */
      updatedAt?: Record<string, never>;
    };
    Feature: {
      /**
       * Format: int64
       * @example 1
       */
      id?: number;
      /** @description A JSON object containing meta information. */
      meta?: {
        [key: string]: Record<string, never>;
      };
      /** @example Feature Name */
      name: string;
      /**
       * @example NUMERICAL
       * @enum {string}
       */
      featureType: "NUMERICAL" | "CATEGORICAL";
      /**
       * @example DEPENDENT
       * @enum {string}
       */
      featureDependency?: "DEPENDENT" | "INDEPENDENT";
      /** @example true */
      visible?: boolean;
      /**
       * Format: date-time
       * @description The date and time when the feature was created.
       * @example 2023-01-01T12:00:00Z
       */
      createdAt?: Record<string, never>;
      /**
       * @description The date and time when the feature was last updated.
       * @example 2023-01-01T12:00:00Z
       */
      updatedAt?: Record<string, never>;
    };
    Dataset: {
      /**
       * Format: int64
       * @example 1
       */
      id?: number;
      /**
       * @example PREDICTION
       * @enum {string}
       */
      type: "PREDICTION";
      input: components["schemas"]["DataEntry"][];
      results?: components["schemas"]["DataEntry"][];
      created_at?: Record<string, never>;
      updated_at?: Record<string, never>;
    };
    DataEntry: {
      /**
       * Format: int64
       * @example 1
       */
      id?: number;
      created_at?: Record<string, never>;
      updated_at?: Record<string, never>;
      /**
       * @example ARRAY
       * @enum {string}
       */
      type: "ARRAY";
      values: unknown[];
    };
    /** User */
    User: {
      id?: string;
      name?: string;
    };
    /** @description Can be any value - string, number, boolean, array or object. */
    AnyValue: unknown;
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** Create a new model */
  createModel: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Model"];
      };
    };
    responses: {
      /** @description Model created successfully */
      201: {
        content: never;
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
    };
  };
  /**
   * Get a Model
   * @description Retrieve a single model by its ID
   */
  getModelById: {
    parameters: {
      path: {
        /** @description The ID of the model to retrieve */
        id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Model"];
        };
      };
      /** @description Model not found */
      404: {
        content: never;
      };
    };
  };
  /**
   * Predict with Model
   * @description Submit a dataset for prediction using a specific model
   */
  predictWithModel: {
    parameters: {
      path: {
        /** @description The ID of the model to use for prediction */
        modelId: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Dataset"];
      };
    };
    responses: {
      /** @description Prediction created successfully */
      201: {
        content: never;
      };
      /** @description Invalid Request */
      400: {
        content: never;
      };
      /** @description Model not found */
      404: {
        content: never;
      };
      /** @description Internal Server Error */
      500: {
        content: never;
      };
    };
  };
}
