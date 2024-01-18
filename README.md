# I 306 Application shopping en ligne 

## Groupe LCF DEVA 3A

## Infos
Les variables d'environnement sont écrites dans le fichier "backend/.env" <br>
(Le fichier .env est ignoré par github et doit être créé pour chaque environnement local) <br>

### Versions:
node version : 18.17.1 <br>
Npm version : 9.6.7 <br>
Angular version: 16.2.2 <br>
angular material : 16.2.4 <br>
Python : 3.11.5

## MySql
Installer MySql sur votre poste : https://dev.mysql.com/downloads/installer/
Insatller MySql Server et configurer ce dernier.

## Python
Installer l'environnent python dans le dossier backend avec la commande <br>
```
python -m venv /path/to/new/virtual/environment
```
Activer l'environnement avec la commande venv\Scripts\activate <br>
<br>
PS: le dossier venv d'environnement python est personnel <br>
et est ignoré lors des pushs sur github pour cette raison. <br>
<br>
Attention, dotenv ne peut pas être installé sans environnement python (en local).

## Installation dépendences
<br>
Installer les dépendences Angular (frontend) dans le répertroire "/DigitHub" avec la commande <br>

```
npm install <br>
```

<br>
Ps: Les dépendences python sont installées dans l'étape suivante <br> 
(voir chapitre lancer l'application python et flask) <br>
avec le script runBackend.ps1. <br>

## Lancer l'application python et flask 
S'assurer que le serveur Mysql soit lancé<br>
<br>
Lancer le script <br>
```
/backend/runBackend.ps1
```
avec powershell pour activer l'environnement python, <br>
installer les dépendences python, <br>
lancer l'application python et <br>
lancer flask. <br> 

## Lancer l'application Angular (front)
Aller dans le répertoire "/DigitHub" et taper la commande <br>
```
ng serve <br>
```
Une fois le message "Compiled successfully", aller à l'adresse "http://localhost:4200" dans le navigateur web.

## Paiement paypal
vous pouvez utiliser se compte paypal : 
sb-fyb5228086141@personal.example.com
6KK.ya/?

## Simuler une carte de crédit pour les paiements
Aller sur : https://developer.paypal.com/api/rest/sandbox/card-testing/#link-creditcardgenerator
et vous pourrez génerer une carte de crédit factice afin de simuler un paiement via paypal. 

