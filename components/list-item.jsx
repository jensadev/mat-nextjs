import Date from './date';

export default function ListItem({ meal }) {
  const mealIcon = (type) => {
    switch (type) {
      case 1:
        return (
          <img
            alt="breakfast"
            src="/images/breakfast.svg"
            height={64}
            width={64}
          />
        );
      case 2:
        return (
          <img alt="lunch" src="/images/lunch.svg" height={64} width={64} />
        );
      case 3:
        return (
          <img alt="dinner" src="/images/dinner.svg" height={64} width={64} />
        );
      default:
        return 'tom';
    }
  };
  return (
    <li>
      <div className="d-flex">
        {mealIcon(meal.typeId)}
        <p className="pb-3">
          <Date classes="d-block small text-muted" dateString={meal.date} />
          {meal.Dish.name}
        </p>
      </div>
    </li>
  );
}
