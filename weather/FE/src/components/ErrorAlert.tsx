interface Props {
  message: string;
}

export default function ErrorAlert({ message }: Props) {
  return <div className="alert alert-danger mt-3">{message}</div>;
}