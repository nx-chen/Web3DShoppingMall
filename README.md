# Old House's Style

Projet de la majeure MTI, parcours Frontend, cours Web3D promo 2023.

Ce projet à été fait avec ReactJs, Threejs.

# Authors
Maridiyath BACHIROU (login: maridiyath-folake-odeofe.bachirou) <br/>
Ningxi CHEN (login: ningxi.chen)

## Installation

Après avoir dézippé le projet, vous devez d'abord installer les dépendances avec :
```bash
yarn install
```

## Lancement

Pour lancer le serveur de développement faites:
```bash
yarn start
```
Normalement cette commande lancera directement votre navigateur à l'adresse ```http://localhost:3000```. <br/>
Si ce n'est pas le cas lancez directement ```http://localhost:3000``` dans votre navigateur pour voir le projet.

## Features disponibles dans le projet

Dans ce projet vous trouverez quelques features telles que:
* Une page d’accueil avec une liste d'articles représentant des vieux meubles à revendre
    * En bas de cette liste vous trouverez un bouton ```Show More``` pour charger d’autres article.

* Une page de détails des articles sur laquelle il y a :
    * L’article en 3D autour duquel vous pouvez naviguer
    * Vous pouvez faire un double click sur l’article pour rapprocher la caméra vers le point où vous avez cliquez
    * Après 30 sec sans bouger votre souris la caméra se met à tourner autour de l’article histoire de mieux vous la présenter
    * Une annotation vous donnant une information sur l’article
    * Des notes qui apparaissent quand vous tourner l’article vous donnant des appréciations sur ce dernier
