class AppComponent {
	// static API_CONFIG = {
	// 	KEY: 'X-DreamFactory-API-Key',
	// 	VALUE: 'e553e47a799d4805fde8b31374f1706b130b2902b5376fbba6f4817ad3c6b272'
	// }

	static ENDPOINT_URL = window.AppSetting.endpointUrl;
	static BASE_URL_PROD = window.AppSetting.gatewayUrl;
	static BASE_URL_DEV = window.AppSetting.gatewayUrl;
	static DEVELOPMENT = "DEVELOPMENT";
	static PRODUCTION = "PRODUCTION";

	static ENV_MODE = window.AppSetting.env;

	static getBaseUrl() {
		switch (this.ENV_MODE) {
			case this.DEVELOPMENT :
				return this.BASE_URL_DEV + "?endpoint=" + this.ENDPOINT_URL;
				// return this.BASE_URL_DEV;
			case this.PRODUCTION :
				return this.BASE_URL_PROD + "?endpoint=" + this.ENDPOINT_URL;
				// return this.BASE_URL_PROD;
			default :
				break;
		}
	}
}

export default AppComponent;