"use client";

type Props = {
  error: Error;
};

function Error({ error }: Props) {
  return <p>Could not fetch note detail. {error.message}</p>;
}

export default Error;
