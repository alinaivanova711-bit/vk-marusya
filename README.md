# VK Маруся — это SPA-приложение, в котором пользователи могут:
1. искать фильмы по названию
2. просматривать топ-10 фильмов по рейтингу IMDb
3. получать случайный фильм
4. добавлять фильмы в избранное
5. регистрироваться и авторизовываться
6. смотреть трейлеры

## Функциональность
• Реализована авторизация и регистрация пользователей: хранение токена в localStorage, поддержка пользовательской сессии через cookies, 
управление состоянием аутентификации с использованием TanStack Query (кэширование, обновление данных пользователя);
• Интегрированы API-эндпоинты с использованием Axios;
• Реализован infinite scroll с помощью Intersection Observer;
• Настроено глобальное состояние  с помощью Redux Toolkit;
• Реализовано переключение между страницами без перезагрузки, с помощью React Router;
• Добавлен поиск и фильтрация фильмов по жанрам и названию;
• Реализован просмотр трейлера с помощью React Player;
• Оптимизированы рендеры (useMemo, useCallback, React.memo);

###  Главная страница
1. случайный фильм (с возможностью обновления)
2. топ-10 фильмов
<img width="1075" height="848" alt="image" src="https://github.com/user-attachments/assets/1fe81d66-e6bd-4727-8424-66f8f3bea800" />

###  Жанры
1. список жанров
2. переход на страницу конкретного жанра
3. подгрузка фильмов (infinite scroll)
<img width="1438" height="1003" alt="image" src="https://github.com/user-attachments/assets/1739a15e-2a1d-40a9-98c3-b100220f4918" />
<img width="1406" height="1085" alt="image" src="https://github.com/user-attachments/assets/241a47fa-8bad-4a55-a81d-487dc1725386" />

###  Страница фильма
1. подробная информация
2. трейлер (в модальном окне)
3. добавление/удаление из избранного
<img width="1068" height="857" alt="image" src="https://github.com/user-attachments/assets/37b42b51-8b82-460f-b994-abca4271b70e" />
<img width="1620" height="955" alt="image" src="https://github.com/user-attachments/assets/1ec55161-41c3-4b6c-a7c5-c58e417148f8" />

###  Поиск
1. поиск фильмов по названию
2. отображение результатов в модальном окне
<img width="1914" height="879" alt="image" src="https://github.com/user-attachments/assets/ea72fba3-9661-48ee-b395-bafb6b58f0c5" />

###  Авторизация
1. регистрация и вход
2. сохранение сессии через cookies
3.  доступ к избранному только для авторизованных пользователей
<img width="881" height="913" alt="image" src="https://github.com/user-attachments/assets/ca3a4a68-956b-4116-b6b1-540dc9d456a6" />

###  Избранное
1. список сохранённых фильмов
2. доступен в личном кабинете
<img width="1912" height="1001" alt="image" src="https://github.com/user-attachments/assets/404cc137-2714-4a22-a680-7d5ada457df4" />
<img width="2400" height="955" alt="image" src="https://github.com/user-attachments/assets/2b2cf291-b655-4eed-a6af-33a4f1b36fda" />

##  Технологии
* **React 18**
* **TypeScript**
* **React Router**
* **React Query (TanStack Query)**
* **SCSS**
* **Axios**
* **React Hook Form + Zod**

##  Особенности реализации
1.  обновление случайного фильма без перезагрузки страницы
2.  оптимизация запросов (исключены лишние API-вызовы)
3.  управление серверным состоянием через React Query
4.  модальные окна (авторизация, трейлер, поиск)
5.  защита действий для неавторизованных пользователей

