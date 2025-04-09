document.addEventListener('DOMContentLoaded', function() {
    // Charger les identifiants sauvegardés
    loadCredentials();
    
    // Gestionnaire pour le bouton d'enregistrement des identifiants
    document.getElementById('save-auth').addEventListener('click', saveCredentials);
    
    // Gestionnaire pour le bouton de publication
    document.getElementById('publish-btn').addEventListener('click', publishContent);
    
    // Gestionnaire pour le bouton de programmation
    document.getElementById('schedule-btn').addEventListener('click', schedulePost);
    
    // Gestion du glisser-déposer
    const dropZone = document.getElementById('drop-zone');
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#405DE6';
        dropZone.style.backgroundColor = '#f0f4ff';
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = '#ddd';
        dropZone.style.backgroundColor = 'transparent';
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = '#ddd';
        dropZone.style.backgroundColor = 'transparent';
        
        if (e.dataTransfer.files.length) {
            document.getElementById('video-upload').files = e.dataTransfer.files;
            updateUploadLabel();
        }
    });
    
    document.getElementById('video-upload').addEventListener('change', updateUploadLabel);
});

function updateUploadLabel() {
    const fileInput = document.getElementById('video-upload');
    const label = document.querySelector('.upload-label span');
    
    if (fileInput.files.length > 0) {
        label.textContent = `Fichier sélectionné: ${fileInput.files[0].name}`;
    } else {
        label.textContent = 'Glissez-déposez votre vidéo ici ou cliquez pour sélectionner';
    }
}

function saveCredentials() {
    const instaUser = document.getElementById('insta-username').value;
    const instaPass = document.getElementById('insta-password').value;
    const tiktokUser = document.getElementById('tiktok-username').value;
    const tiktokPass = document.getElementById('tiktok-password').value;
    
    localStorage.setItem('insta_username', instaUser);
    localStorage.setItem('insta_password', instaPass);
    localStorage.setItem('tiktok_username', tiktokUser);
    localStorage.setItem('tiktok_password', tiktokPass);
    
    alert('Identifiants enregistrés localement (dans votre navigateur uniquement).');
}

function loadCredentials() {
    document.getElementById('insta-username').value = localStorage.getItem('insta_username') || '';
    document.getElementById('insta-password').value = localStorage.getItem('insta_password') || '';
    document.getElementById('tiktok-username').value = localStorage.getItem('tiktok_username') || '';
    document.getElementById('tiktok-password').value = localStorage.getItem('tiktok_password') || '';
}

function publishContent() {
    const videoFile = document.getElementById('video-upload').files[0];
    const caption = document.getElementById('post-caption').value;
    const postToInsta = document.getElementById('post-to-insta').checked;
    const postToTiktok = document.getElementById('post-to-tiktok').checked;
    
    if (!videoFile) {
        alert('Veuillez sélectionner une vidéo à publier.');
        return;
    }
    
    if (!postToInsta && !postToTiktok) {
        alert('Veuillez sélectionner au moins une plateforme pour la publication.');
        return;
    }
    
    // Ici, vous devriez normalement envoyer la vidéo à un serveur
    // Pour cette démo, nous allons juste simuler
    alert(`Publication en cours...\n\nPlateformes: ${postToInsta ? 'Instagram ' : ''}${postToTiktok ? 'TikTok ' : ''}\n\nCette démo ne publie pas réellement. En production, vous devrez utiliser les APIs officielles.`);
    
    // Réinitialiser le formulaire
    document.getElementById('video-upload').value = '';
    document.getElementById('post-caption').value = '';
    updateUploadLabel();
}

function schedulePost() {
    const scheduleTime = document.getElementById('schedule-time').value;
    
    if (!scheduleTime) {
        alert('Veuillez sélectionner une date et heure pour la programmation.');
        return;
    }
    
    alert(`Publication programmée pour le ${new Date(scheduleTime).toLocaleString()}\n\nCette démo ne programme pas réellement. En production, vous auriez besoin d'un backend pour gérer cela.`);
}
