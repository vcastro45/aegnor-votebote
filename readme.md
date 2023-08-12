# Votebot Aegnor

> Il s'agit d'un bot de vote automatique pour le serveur privé Aegnor (https://aegnor.arwase.fr/)

## Usage
- [Téléchargez](https://github.com/vcastro45/aegnor-votebote/releases) et utilisez l'exécutable approprié à votre système d'exploitation.

- Créez, dans le meme dossier que celui de l'exécutable, un fichier `config.json` formaté comme ceci:

```json
{
  "login": "<Votre identifiant Aegnor (email)>",
  "password": "<Votre mot de passe Aegnor>"
}
```

exemple:

```json
{
  "login": "foo@email.com",
  "password": "Sup3rSecReTP4ssw0rd!"
}
```

- Laissez tourner le programme, il s'actualise pour voter automatiquement lorsque celà est possible.

## Informations

Le bot n'est capable de voter que pour la plateforme RPGParadize.

La plateforme server-prive.net, étant protégée par captcha, n'est pas supportée.
