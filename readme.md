Notes:
Fixer API key zID0JkMYYRXMz8HLVVgKn9gJvyjwBcqR

TODO:
fix docker network
Naming
proper error handling and err messages

### STRUCTURE

routes:
GET '/symbols' - get all symbols DONE
POST '/convert' - (params: ammount, from, to) DONE
GET '/get-all-converted-result' - return all the db entries for converts (ammount, from, to, convertedAmmount, timestamp) DONE
