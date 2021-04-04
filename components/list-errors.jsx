// eslint-disable-next-line react/prop-types
export default function ListErrors({ errors }) {
  console.table(errors);
  return (
    <ul className="error-messages">
      {Object.keys(errors).map((key) => (
        <li key={key}>
          {key}
          {' '}
          {errors[key]}
        </li>
      ))}
    </ul>
  );
}
