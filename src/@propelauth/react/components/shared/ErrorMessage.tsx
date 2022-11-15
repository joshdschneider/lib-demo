export type ErrorMessageProps = {
  error?: string;
};

export const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (error) {
    return (
      <div>
        <span>error</span>
      </div>
    );
  } else {
    return null;
  }
};
