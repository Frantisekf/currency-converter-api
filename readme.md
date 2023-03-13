Notes:
Fixer API key zID0JkMYYRXMz8HLVVgKn9gJvyjwBcqR

TODO:
fix docker image
Naming
secrets & constants
proper error handling and err messages
rate limit setup

frontend will first load currency symbols
past conversion entries from the database

### STRUCTURE

routes:
GET '/symbols' - get all symbols DONE
GET '/converted-result' - get converted result (ammount, currency) ? NOT NEEDED
POST '/convert' - (params: ammount, from, to) DONE
GET '/get-all-converted-result' - return all the db entries for converts (ammount, from, to, convertedAmmount, timestamp) DONE
