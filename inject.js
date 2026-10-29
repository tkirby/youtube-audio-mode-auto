// This script runs in the main page context to access YouTube's native player API securely
(function() {
    if (window.__amInjectLoaded) return;
    window.__amInjectLoaded = true;

    let hooked = false;
    function hookPlayer() {
        const player = document.getElementById('movie_player');
        if (player && player.addEventListener && !hooked) {
            player.addEventListener('onPlaybackQualityChange', (quality) => {
                window.postMessage({ type: 'AM_QUALITY_CHANGE', quality: quality }, '*');
            });
            hooked = true;
        }
    }

    hookPlayer();
    document.addEventListener('yt-navigate-finish', hookPlayer);
    setInterval(hookPlayer, 2000);

    // ===== Auto Music detection =====
    // Reads YouTube's own player data for the current video. The content script
    // runs in an isolated world and cannot see this, so it asks us via postMessage.
    function getMusicInfo() {
        let pr = null;
        try {
            const player = document.getElementById('movie_player');
            if (player && typeof player.getPlayerResponse === 'function') {
                pr = player.getPlayerResponse();
            }
        } catch (e) { }
        if (!pr || !pr.videoDetails) pr = window.ytInitialPlayerResponse || null;
        if (!pr || !pr.videoDetails) return null;

        const vd = pr.videoDetails;
        const mf = (pr.microformat && pr.microformat.playerMicroformatRenderer) || {};
        return {
            videoId: vd.videoId || null,
            musicVideoType: vd.musicVideoType || null,
            author: vd.author || '',
            isLive: !!(vd.isLive || mf.liveBroadcastDetails && mf.liveBroadcastDetails.isLiveNow),
            category: mf.category || null
        };
    }

    window.addEventListener('message', (event) => {
        if (event.source !== window || !event.data || event.data.type !== 'AM_MUSIC_QUERY') return;
        window.postMessage({ type: 'AM_MUSIC_INFO', id: event.data.id, info: getMusicInfo() }, '*');
    });
})();
