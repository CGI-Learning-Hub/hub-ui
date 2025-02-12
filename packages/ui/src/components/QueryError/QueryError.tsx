import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { EmptyState } from "../EmptyState";
import { isErrorWithMessage, isFetchBaseQueryError } from "./helpers";

export type QueryErrorProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
  statusPrefix?: string;
};

const QueryError: React.FunctionComponent<QueryErrorProps> = ({
  error,
  statusPrefix = "Erreur ",
}: QueryErrorProps) => {
  if (isFetchBaseQueryError(error)) {
    const errMsg =
      "error" in error
        ? error.error
        : error.data
          ? JSON.stringify(error.data)
          : null;

    if (
      typeof error.status === "number" &&
      error.status.toString().startsWith("4")
    ) {
      return (
        <EmptyState
          svgName="client-error"
          title={`Erreur client (${error.status})`}
          description={errMsg ?? undefined}
        />
      );
    } else if (
      typeof error.status === "number" &&
      error.status.toString().startsWith("5")
    ) {
      return (
        <EmptyState
          svgName="server-error"
          title={`Erreur serveur (${error.status})`}
          description={errMsg ?? undefined}
        />
      );
    }
    return (
      <EmptyState
        svgName="error"
        title={`${statusPrefix}${error.status}`}
        description={errMsg ?? undefined}
      />
    );
  }

  return (
    <EmptyState
      svgName="error"
      title={
        isErrorWithMessage(error) ? error.message : "Une erreur est survenue"
      }
    />
  );
};

export default QueryError;
