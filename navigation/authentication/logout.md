---
layout: base
title: Logout
permalink: /logout
search_exclude: true
---

<script type="module">
    import { fetchOptions, pythonURI, clearAuthToken } from '{{site.baseurl}}/assets/js/api/config.js';
    const URL = pythonURI + '/api/authenticate';
    const options = {
        ...fetchOptions, // includes credentials + Authorization (Bearer) so the DELETE is authenticated
        method: 'DELETE',
    };
    console.log('Logout clicked');

    // Call the endpoint to expire the server cookie, then ALWAYS clear the local
    // Bearer token and redirect — even if the request fails — so the user is
    // genuinely logged out. (Without clearing the token, the backend would keep
    // accepting it and the user would stay logged in.)
    fetch(URL, options)
        .then(response => { if (!response.ok) console.error('Logout failed:', response.statusText); })
        .catch(error => { console.error('Error during logout:', error); })
        .finally(() => {
            clearAuthToken();
            window.location.href = "{{site.baseurl}}/login";
        });

</script>
