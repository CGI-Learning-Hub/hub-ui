import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { FC } from "react";

import ClientErrorSvg from "../../../assets/client-error.svg?react";
import ErrorSvg from "../../../assets/error.svg?react";
import ServerErrorSvg from "../../../assets/server-error.svg?react";
import { EmptyState } from "../EmptyState";
import { isErrorWithMessage, isFetchBaseQueryError } from "./helpers";

export type QueryErrorProps = {
  error: FetchBaseQueryError | SerializedError | undefined;
  statusPrefix?: string;
};

const QueryError: FC<QueryErrorProps> = ({
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
          image={<ClientErrorSvg height="100%" />}
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
          image={<ServerErrorSvg height="100%" />}
          title={`Erreur serveur (${error.status})`}
          description={errMsg ?? undefined}
        />
      );
    }
    return (
      <EmptyState
        image={<ErrorSvg height="100%" />}
        title={`${statusPrefix}${error.status}`}
        description={errMsg ?? undefined}
      />
    );
  }

  return (
    <EmptyState
      image={<ErrorSvg height="100%" />}
      title={
        isErrorWithMessage(error) ? error.message : "Une erreur est survenue"
      }
    />
  );
};

export default QueryError;
