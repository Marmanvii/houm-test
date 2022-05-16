# NotHoum
React web page that displays characters from the Rick&Morty TV show using [The Rick and Morty API](https://rickandmortyapi.com/).

## Technologies
- Material UI: No particular reason to use this framework
- React: Required by the application

## Reasons Behind Technical Decisions
- General:
    - The entire page is in English because of the API used, as it provided the information in said language
    - Tried to separate components as much as possible (For example for the selector component)
- Theming: 
    - Ended up using the Material UI native theming functions because using css files created a lot of inconsistencies
    - Used the `styled` function to create reusable styled components (Using css also created inconsistencies)
    - Used `css` for a couple of native html components where it didn't create any problems
    - Tried to mimic as much as possible the colors used in Houm
    - Used fade in animation provided by Material UI to improve cards loading
    - Used a linear progress bar to indicate that data is loading
- Data:
    - Used the [The Rick and Morty API](https://rickandmortyapi.com/) because it provided enough information for each item and also offers pagination
    - Using *Magic Numbers* where avoided by making use of constants
    - Handled errors when calling the API, so when no results are provided, a message is shown to the user
