var SYSTEMLangues = {
    systemlanguage:'fr',
	login: {
		emptyfields:{
		  login: 'Veuillez sp�cifier votre Identifiant.',
		  pwd: 'Veuillez sp�cifier votre mot de passe.'
		},  
		invalidemail: 'Veuillez sp�cifier une adresse email valide'
	},
	
	systeme:{
	  load : 'Chargement en cours',
	  error : 'Erreur',
	  cancel : 'Annuler',
	  uploadlailed : 'Echec du T�l�chargement',
	  librequired : 'Ce champ est obligatoire',
	  shortlibrequired : 'R�quis',
	  libnumrequired : 'Valeur num�rique requise.',
	  formerrormsg: 'Veuillez svp renseigner correctement les champs en rouge.',
	  pwdcourt: 'Le Mot de passe doit comporter au moins 6 caract�res.',
	  champdifferent: 'Les deux mots de passe ne correspondent pas.',
	  formparamserror:'Mauvais param�trage du formulaire: aucune destination sp�cifi�e',
	  formuploadparamserror:'Mauvais param�trage de certains champs upload du formulaire',
	  elmtdelconfirm : 'Cette op�ration est irreversible, �tes-vous vraiment certain de vouloir poursuivre l\'action ?',
	  elmtdelconfirmyes :'OUI je souhaite poursuivre l\'action',
	  elmtdelconfirmno :'NON annuler cette action</a>',
	  datelib:'Date',
	  hrslib:'Heure',
	  sendmsg: 'Envoyer un Message',
	  waittingtext : 'Veuillez patienter pendant que le syst�me traite les donn�es soumises.<br>Important : La dur�e du traitement dependra � la fois de la taille des donn�es � traiter et de votre connexion internet.',
	  error_validation : 'Veuillez renseigner correctement les champs du formulaire.',
	  
	  ajaxcall:{
	    errors:{
		  msg_erreur : 'Une erreur est survenue lors de l\'ex�cution de la requ�te.',
		  timeout : 'd�lai d\'attente d�pass�e',
		  error : 'une erreur inconnue',
		  abort : 'requ�te annul�e', 
		  parsererror : 'erreur d\'interpr�tation de la requ�te',
		  mainerror: 'Une erreur est survenue lors de l\'ex�cution de la requ�te',
		  knownerror: 'Une erreur http de type #xhr.status# est survenue lors de l\'ex�cution de la requ�te : #xhr.statusText#',
		  unidentifiederror:'Une erreur non identifi�e est survenue lors de l\'ex�cution de la requ�te. Veuillez nous contacter si l\'erreur persiste.'
		}
	  }
	},
	
	sys_menu_admin:{
	  libelle : 'Veuillez sp�cifier le Lib�ll� du Menu.',
	  url : 'Veuillez sp�cifier la page php charg�e de faire le traitement Ajax.',
	  data : 'Veuillez sp�cifier les donn�es url pour la page de traitement.'
	},
	
	achat_credit:{
	  code_user : 'Veuillez Sp�cifier un <b>Identifiant Client Valide</b>.'
	}
};