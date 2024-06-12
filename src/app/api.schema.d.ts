/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/v1/models": {
    /** Get paginated models */
    get: operations["getModels"];
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
  "/v1/models/{id}/partial": {
    /** Partially update specific fields of a model */
    patch: operations["partiallyUpdateModel"];
  };
  "/v1/datasets/{id}": {
    /**
     * Get a Dataset
     * @description Retrieve a single dataset by its ID
     */
    get: operations["getDatasetById"];
  };
  "/v1/organizations": {
    /** Get all organizations */
    get: operations["getAllOrganizations"];
    /** Create a new organization */
    post: operations["createOrganization"];
  };
  "/v1/organizations/{id}": {
    /** Update an existing organization */
    put: operations["updateOrganization"];
  };
  "/v1/organizations/{name}": {
    /** Get organization by name */
    get: operations["getOrganizationByName"];
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
      /** @enum {string} */
      type: "SKLEARN" | "TORCH" | "R";
      /** @example 1.0.0 */
      jaqpotpyVersion: string;
      libraries: components["schemas"]["Library"][];
      dependentFeatures: components["schemas"]["Feature"][];
      independentFeatures: components["schemas"]["Feature"][];
      organizations?: components["schemas"]["Organization"][];
      visibility: components["schemas"]["ModelVisibility"];
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
      /** @description This is an internal api property, feel free to ignore it */
      canEdit?: boolean;
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
    /** @enum {string} */
    ModelVisibility: "PUBLIC" | "ORG_SHARED" | "PRIVATE";
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
      description: string;
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
      possibleValues?: string[];
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
      /** @enum {string} */
      status?: "CREATED" | "EXECUTING" | "FAILURE" | "SUCCESS";
      failureReason?: string;
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
    Organization: {
      /** Format: int64 */
      id?: number;
      /** @example my-awesome-org */
      name: string;
      creatorId?: string;
      /** @example An awesome organization for managing models. */
      description?: string;
      userIds?: string[];
      models?: components["schemas"]["Model"][];
      /** @example contact@my-awesome-org.com */
      contactEmail: string;
      /** @example +1234567890 */
      contactPhone?: string;
      /** @enum {string} */
      visibility: "PUBLIC" | "PRIVATE";
      /** @example http://www.my-awesome-org.com */
      website?: string;
      /** @example 123 Organization St., City, Country */
      address?: string;
      created_at?: Record<string, never>;
      updated_at?: Record<string, never>;
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

  /** Get paginated models */
  getModels: {
    parameters: {
      query?: {
        page?: number;
        size?: number;
      };
    };
    responses: {
      /** @description Paginated list of models */
      200: {
        content: {
          "application/json": {
            content?: components["schemas"]["Model"][];
            totalElements?: number;
            totalPages?: number;
            pageSize?: number;
            pageNumber?: number;
          };
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
    };
  };
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
  /** Partially update specific fields of a model */
  partiallyUpdateModel: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": {
          name: string;
          visibility: components["schemas"]["ModelVisibility"];
          organizationIds?: number[];
        };
      };
    };
    responses: {
      /** @description Model fields updated successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Model"];
        };
      };
      /** @description Invalid input */
      400: {
        content: never;
      };
      /** @description Model not found */
      404: {
        content: never;
      };
    };
  };
  /**
   * Get a Dataset
   * @description Retrieve a single dataset by its ID
   */
  getDatasetById: {
    parameters: {
      path: {
        /** @description The ID of the dataset to retrieve */
        id: number;
      };
    };
    responses: {
      /** @description Successful Response */
      200: {
        content: {
          "application/json": components["schemas"]["Dataset"];
        };
      };
      /** @description Model not found */
      404: {
        content: never;
      };
    };
  };
  /** Get all organizations */
  getAllOrganizations: {
    responses: {
      /** @description Successful response */
      200: {
        content: {
          "application/json": components["schemas"]["Organization"][];
        };
      };
    };
  };
  /** Create a new organization */
  createOrganization: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["Organization"];
      };
    };
    responses: {
      /** @description Organization created successfully */
      201: {
        content: never;
      };
    };
  };
  /** Update an existing organization */
  updateOrganization: {
    parameters: {
      path: {
        id: number;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["Organization"];
      };
    };
    responses: {
      /** @description Organization updated successfully */
      200: {
        content: {
          "application/json": components["schemas"]["Organization"];
        };
      };
      /** @description Organization not found */
      404: {
        content: never;
      };
    };
  };
  /** Get organization by name */
  getOrganizationByName: {
    parameters: {
      path: {
        name: string;
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        content: {
          "application/json": components["schemas"]["Organization"];
        };
      };
      /** @description Organization not found */
      404: {
        content: never;
      };
    };
  };
}
