# question-answer-test

Developed using the latest stable versions of react and react-router-dom libs.
Functionality has been prioritized over design.

With the exception of 3 icons imported from react-icons/fa (react-icons from font awesome) all components
have been styled with css without the use of third party UI libs such as bootstrap, material-ui or semantics-ui 
(familiar with the 3)

For state management both Context and MOBX were used. Redux (The one i'm most confortable with) 
was also an option, but given the simplicity of the app
MOBX was selected as it is easier to scale horizontally and needs less code.

Redux would only be an appropriate solution if there was an high complexity in both app and data structures as it scales better vertically.

---
# Instructions:
## Installation:
```
npm install
```
## Running project:
```
npm run start
```
## Running with another API besides the mock API provided
``` 
Change the .env.local REACT_APP_API_URL config to the desired API URL.
```
