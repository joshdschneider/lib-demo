export type GreetingProps = {
  text: string;
};

export const Greeting = ({ text }: GreetingProps) => {
  return <h3>{text}</h3>;
};
