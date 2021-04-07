import Date from './date';

export default function ListItem({ meal }) {
  const mealIcon = (type) => {
    switch (type) {
      case 1:
        return (
          <span className="material-icons-round md-48">
            free_breakfast
          </span>
        );
      case 2:
        return (
          <span className="material-icons-round md-48">
            bento
          </span>
        );
      case 3:
        return (
          <span className="material-icons-round md-48">
            dinner_dining
          </span>
        );
      default:
        return 'tom';
    }
  };
  return (
    <li>
      <div className="d-flex">
        {mealIcon(meal.typeId)}
        <p className="pb-3 ps-2 mb-0 lh-sm text-dark">
          <Date classes="d-block small text-muted" dateString={meal.date} />
          {meal.Dish.name}
        </p>
      </div>
    </li>
  );
}
