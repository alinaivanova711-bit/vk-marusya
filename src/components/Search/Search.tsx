import { useState, useEffect, useRef } from "react";
import { api } from "../../api/api";
import { SearchCard } from "../SearchCard/SearchCard";
import "./_Search.scss";
import IconSearch from "../../assets/icon-search.svg?react"
import IconClose from "../../assets/icon-closing-cross.svg?react";


interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  release_date?: string;
}

export const Search = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const fetchMovies = async (query: string) => {
    try {
      const res = await api.get("/movie", {
        params: { title: query.trim() },
      });

      setMovies(res.data);
      setIsOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setMovies([]);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    setMovies([]);
    setIsOpen(false);
    setIsMobileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  useEffect(() => {
    if (query.trim()) {
      fetchMovies(query.trim())
    }
  }, [query])

  return (
    <>
      {isMobileOpen && (
        <div
          className="search-overlay"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <IconSearch width={24} height={24} className="icon-search" onClick={() => setIsMobileOpen(true)}/>
      <div className={`search ${isMobileOpen ? "search--open" : ""}`} ref={searchRef}>
        
        <input
          type="text"
          placeholder="Поиск"
          value={query}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim() && movies.length > 0) {
              setIsOpen(true);
            }
          }}
          onBlur={() => setIsFocused(false)}
          className="search__input"
        />
        <IconSearch width={21} height={21} className="search__icon" />

        {isOpen && movies.length > 0 && (
          <ul className="search__dropdown">
            {movies.map((movie) => (
              <li key={movie.id} className="search__item">
                <SearchCard
                  movie={movie}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                    setIsMobileOpen(false);
                  }}
                />
              </li>
            ))}
          </ul>
        )}

        {(isFocused || isMobileOpen) && (
          <IconClose
            className="search__clear"
            onMouseDown={(e) => {
              e.preventDefault();
              handleClear();
            }}
          />
        )}
      </div>
    </>    
  );
};