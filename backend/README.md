# Backend
Ouvrir un terminal et se diriger dans le dossier /backend

faire la commande : npm install 

Créer un fichier .env et y mettre les variables ci-dessous en remplissant user_db et password: 

PORT=8080
HOST=localhost
USER_DB=''
PASSWORD_DB=''
DATABASE='groupomania'
PORT_DB='3306'
BCRYPT_SALT_ROUND=10
TOKEN=jesuisunephrasehyperlongue
TOKEN_DURING=1 hour

Créer une base de donnée qui porte le nom 'groupomania',
Ensuite pour créer la structure de la base de donnée entrez la commande ci-dessous :

npx sequelize-cli db:migrate


Une fois la base de données créer lancer le projet avec la commande :

npm start