var SYSTEMLangues = {
    systemlanguage:'fr',
	login: {
		emptyfields:{
		  login: 'Veuillez spécifier votre Identifiant.',
		  pwd: 'Veuillez spécifier votre mot de passe.'
		},  
		invalidemail: 'Veuillez spécifier une adresse email valide'
	},
	
	systeme:{
	  load : 'Chargement en cours',
	  error : 'Erreur',
	  cancel : 'Annuler',
	  uploadlailed : 'Echec du Téléchargement',
	  librequired : 'Ce champ est obligatoire',
	  shortlibrequired : 'Réquis',
	  libnumrequired : 'Valeur numérique requise.',
	  formerrormsg: 'Veuillez svp renseigner correctement les champs en rouge.',
	  pwdcourt: 'Le Mot de passe doit comporter au moins 6 caractères.',
	  champdifferent: 'Les deux mots de passe ne correspondent pas.',
	  formparamserror:'Mauvais paramétrage du formulaire: aucune destination spécifiée',
	  formuploadparamserror:'Mauvais paramétrage de certains champs upload du formulaire',
	  elmtdelconfirm : 'Cette opération est irreversible, êtes-vous vraiment certain de vouloir poursuivre l\'action ?',
	  elmtdelconfirmyes :'OUI je souhaite poursuivre l\'action',
	  elmtdelconfirmno :'NON annuler cette action</a>',
	  datelib:'Date',
	  hrslib:'Heure',
	  sendmsg: 'Envoyer un Message',
	  waittingtext : 'Veuillez patienter pendant que le système traite les données soumises.<br>Important : La durée du traitement dependra à la fois de la taille des données à traiter et de votre connexion internet.',
	  error_validation : 'Veuillez renseigner correctement les champs du formulaire.',
	  
	  ajaxcall:{
	    errors:{
		  msg_erreur : 'Une erreur est survenue lors de l\'exécution de la requête.',
		  timeout : 'délai d\'attente dépassée',
		  error : 'une erreur inconnue',
		  abort : 'requête annulée', 
		  parsererror : 'erreur d\'interprétation de la requête',
		  mainerror: 'Une erreur est survenue lors de l\'exécution de la requête',
		  knownerror: 'Une erreur http de type #xhr.status# est survenue lors de l\'exécution de la requête : #xhr.statusText#',
		  unidentifiederror:'Une erreur non identifiée est survenue lors de l\'exécution de la requête. Veuillez nous contacter si l\'erreur persiste.'
		}
	  }
	},
	
	sys_menu_admin:{
	  libelle : 'Veuillez spécifier le Libéllé du Menu.',
	  url : 'Veuillez spécifier la page php chargée de faire le traitement Ajax.',
	  data : 'Veuillez spécifier les données url pour la page de traitement.'
	},
	
	achat_credit:{
	  code_user : 'Veuillez Spécifier un <b>Identifiant Client Valide</b>.'
	}
};