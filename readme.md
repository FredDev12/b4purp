Installer Vue CLI (si vous ne l'avez pas déjà installé) :

Vue CLI est l'outil recommandé pour créer et gérer des projets Vue.js. Pour l'installer globalement, exécutez la commande suivante dans votre terminal :


*npm install -g @vue/cli*


Créer un nouveau projet Vue 3 avec TypeScript : Utilisez la commande suivante pour créer un nouveau projet Vue.js avec Vue 3 et TypeScript :

*vue create mon-projet-vue*

Lorsque vous êtes invité à choisir une configuration, sélectionnez "Manually select features" et cochez les options suivantes :

TypeScript.
Vous pouvez aussi sélectionner d'autres options comme Vue Router ou Vuex si nécessaire.
Assurez-vous que le projet est basé sur Vue 3, pas Vue 2. Le CLI détectera automatiquement la version la plus récente.


Démarrer le serveur de développement :

Pour vérifier si tout fonctionne bien, démarrez le serveur de développement :


*npm run serve*

Vous devriez voir une page de démarrage Vue.js à l'adresse http://localhost:8080.

