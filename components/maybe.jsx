// const Maybe = ({ test, children }) => <>{test && children}</>;

// export default Maybe;

export default function Maybe({ test, children }) {
  return (
    <>
      {test && children}
    </>
  );
}
