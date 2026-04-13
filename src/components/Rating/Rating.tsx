import "./Rating.scss";
import StarIcon from "../../assets/star.svg?react";

type Props = {
  rating: number;
  className?: string;
};

export const Rating = ({ rating, className=""}: Props) => {
  const getColorClass = () => {
    if (rating < 4.2) return "rating--lose";
    if (rating < 7) return "rating--low";
    if (rating < 8) return "rating--medium";
    return "rating--high";
  };

  return (
    <div className={`rating ${getColorClass()} ${className}`}>
      <StarIcon className="rating__icon" />
      <span>{rating.toFixed(1)}</span>
    </div>
  );
};