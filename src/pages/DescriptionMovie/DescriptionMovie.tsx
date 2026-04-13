import "./DescriptionMovie.scss";

type Props = {
    movie: any;
};



export const DescriptionMovie = ({ movie }: Props) => {
  const formatCurrency = (value?: string | number) => {
    if (!value) return "—";

    const numValue = Number(value);
    if (!isNaN(numValue) && value !== "") {
      return new Intl.NumberFormat("ru-RU").format(numValue);
    }
    
    return value;
  };

const languageMap: Record<string, string> = {
    en: "English",
    ru: "Russian",
    fr: "French",
    fi:"Finnish",
    de:"German",
    es:"Spanish",
    zh:"Chinese",
    he:"Hebrew",
    ja:"Japanese",
};

  const movieDetails = [
    {  label: "Язык оригинала", value: languageMap[movie.language] || movie.language || "—" },
    { label: "Бюджет", value:movie.budget ? `${formatCurrency(movie.budget)} руб.` : "—"},
    { label: "Выручка", value:movie.revenue ? `${formatCurrency(movie.revenue)} руб.` : "—"},
    { label: "Режиссёр", value: movie.director || "—" },
    { label: "Продакшен", value: movie.production || "—" },
    { label: "Награды", value: movie.awardsSummary || "—" }
  ];



  return (
    <div className="DescriptionMovie">
        <h2 className="DescriptionMovie__title">О фильме</h2>
        <ul className="DescriptionMovie__wrapper">
        {movieDetails.map((detail) => (
          <li key={detail.label} className="DescriptionMovie__item">
            <div className="DescriptionMovie__label-wrapper">
              <span className="DescriptionMovie__label">{detail.label}</span>
              <div className="DescriptionMovie__dotted-line"></div>
            </div>
            <span className="DescriptionMovie__value">{detail.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};