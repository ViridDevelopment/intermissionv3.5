// Debug script to help identify why the popup isn't showing
document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug script loaded');
    
    // Check if elements exist
    const signInButton = document.getElementById("signInButton");
    const authPopup = document.getElementById("authPopup");
    
    console.log('Sign-in button exists:', !!signInButton);
    console.log('Auth popup exists:', !!authPopup);
    
    if (signInButton) {
        console.log('Sign-in button HTML:', signInButton.outerHTML);
        
        // Add a direct click handler to test
        signInButton.addEventListener('click', function(e) {
            console.log('Sign-in button clicked (from debug script)');
            e.preventDefault();
            e.stopPropagation();
            
            if (authPopup) {
                console.log('Showing auth popup (from debug script)');
                authPopup.style.display = 'block';
            } else {
                console.error('Auth popup not found (from debug script)');
            }
        });
    }
    
    if (authPopup) {
        console.log('Auth popup HTML:', authPopup.outerHTML);
        console.log('Auth popup display style:', authPopup.style.display);
        console.log('Auth popup computed display:', window.getComputedStyle(authPopup).display);
    }
    
    // Check CSS
    const styleSheets = document.styleSheets;
    console.log('Number of stylesheets:', styleSheets.length);
    
    for (let i = 0; i < styleSheets.length; i++) {
        try {
            const rules = styleSheets[i].cssRules || styleSheets[i].rules;
            console.log(`Stylesheet ${i} has ${rules.length} rules`);
            
            // Look for popup-related rules
            for (let j = 0; j < rules.length; j++) {
                if (rules[j].selectorText && rules[j].selectorText.includes('popup')) {
                    console.log('Found popup rule:', rules[j].selectorText, rules[j].style.display);
                }
            }
        } catch (e) {
            console.log(`Could not access rules for stylesheet ${i}:`, e);
        }
    }
}); 