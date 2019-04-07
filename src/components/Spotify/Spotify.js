import Spotify from 'spotify-web-api-js';
import queryString from 'querystring';

class SpotifyAPI extends Spotify {
	constructor() {
		super();
		
		const params = this.getHashParams();

		this.state = {
			loggedIn: params.access_token ? true : false,
			audio: null,
			isPlaying: false,
			playingTrackID: ''
		}

		if (params.access_token) {
			this.setAccessToken(params.access_token)
		}
	}

	authenticateSpotify() {
		const scope = 'user-read-private user-read-email user-read-playback-state';
		const authUrl = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
			response_type: 'token',
      client_id: 'a67493ba28914f69ac66dc7f6324c467',
      scope: scope,
			redirect_uri: document.URL.substring(0, document.URL.indexOf('/', 10))
		})

		window.location.replace(authUrl);
	}

	getHashParams() {
		var hashParams = {};
		var e, r = /([^&;=]+)=?([^&;]*)/g,
				q = window.location.hash.substring(1);
		while (e = r.exec(q)) {
				hashParams[e[1]] = decodeURIComponent(e[2]);
		}
		return hashParams;
	}

	playPauseAudio(trackID) {
		this.getTrack(trackID).then((response) => {
			if (this.audio !== undefined) {
				this.audio.pause();
			}
			
			this.audio = new Audio(response.preview_url)
			this.audio.play();
		})
	}
}

export default SpotifyAPI;


