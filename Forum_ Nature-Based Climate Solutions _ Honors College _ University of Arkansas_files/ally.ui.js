
(function() {
    // The obfuscated unique global variable that Ally will be available on
    var initGlobalVar = 'ally_7b09063996549e4833d3';

    // The path to the hashed current version of the Ally script
    var loaderPath = '/static/integration/api/ally.ui.7b09063996549e4833d3.js';

    // Certain integrations (D2L) can't add custom attributes on a script tag. Help them out by setting a default
    var naiveAllyLoaderEl = document.querySelector('script[src*="ally.ui.js"][src*=platform-name]');
    if (naiveAllyLoaderEl && !naiveAllyLoaderEl.getAttribute('data-ally-loader')) {
        naiveAllyLoaderEl.setAttribute('data-ally-loader', '');
    }

    // The `data-ally-loader` attribute is required
    var allyLoaderEl = document.querySelector('script[data-ally-loader]');
    if (!allyLoaderEl) {
        console.warn('Ally loaded without data-ally-loader script attribute. Aborting.');
        return;
    }

    // Grab the script tag and extract the Ally hostname from the src URL
    var allyLoaderUrl = allyLoaderEl.src;
    var allyBaseUrl = '';
    if (allyLoaderUrl.indexOf('://') !== -1) {
        allyBaseUrl = allyLoaderUrl.split('/').slice(0, 3).join('/');
    }

    // If a value is specified for `data-ally-loader`, that becomes the name of the Ally global. Otherwise it defaults
    // do `ally`
    var allyGlobalVar = allyLoaderEl.getAttribute('data-ally-loader') || 'ally';

    // Link to the current version of the Ally script
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = allyBaseUrl + loaderPath;
    document.getElementsByTagName('head')[0].appendChild(script);

    // Add the specified global variable immediately and add helper `ready` function to bind to script load
    var loaded = false;
    window[allyGlobalVar] = window[allyGlobalVar] || {};
    window[allyGlobalVar].ready = window[allyGlobalVar].ready || function(callback) {
        callback = callback || function() {};
        if (loaded) {
            // If it's already loaded, call back immediately
            return callback();
        } else if (window[initGlobalVar]) {
            // We've found it available, mark it as loaded
            loaded = true;

            // Bind it to the configured global variable
            for (var key in window[initGlobalVar]) {
                if (window[initGlobalVar].hasOwnProperty(key)) {
                    window[allyGlobalVar][key] = window[initGlobalVar][key];
                }
            }

            // Clean up the obfuscated global Ally originally loaded on
            delete window[initGlobalVar];
            return callback();
        }

        // Iterate every 100ms
        // TODO: Could probably be a bit smarter here, and apply a timeout and kill-switch
        setTimeout(window[allyGlobalVar].ready, 100, callback);
    };

    // Always start the initialization cycle right away so it's not _required_ for the consumer to run this function as
    // maybe they have their own synchronization
    window[allyGlobalVar].ready();
})();
