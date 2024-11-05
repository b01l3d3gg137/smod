const yearElement = document.getElementById('current-year');
yearElement.textContent = new Date().getFullYear();

document.addEventListener("keydown", function(event) {
    // Menonaktifkan Ctrl + U (View Source)
    if (event.ctrlKey && event.keyCode === 85) { 
        event.preventDefault(); 
    }
    
    // Menonaktifkan F12 (Developer Tools)
    if (event.keyCode === 123) { 
        event.preventDefault(); 
    }
    
    // Menonaktifkan Ctrl + Shift + I (Inspect Element)
    if (event.ctrlKey && event.shiftKey && event.keyCode === 73) { 
        event.preventDefault(); 
    }
});

        // Mencegah klik kanan (context menu)
        document.addEventListener("contextmenu", function(event) {
    event.preventDefault(); // Mencegah menu klik kanan
});
