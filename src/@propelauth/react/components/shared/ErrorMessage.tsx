export type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (error) {
    return (
      <div className={"pa_error-message"}>
        <span>error</span>
      </div>
    );
  } else {
    return null;
  }
};
