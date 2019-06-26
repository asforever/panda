import FileFormat from "./FileFormat";
import WebAPI from "./WebAPI";

export default class ResourceManager {
    static getInstance() {
        if (!this._ins) this._ins = new ResourceManager();
        return this._ins;
    }

    static WebAPI = WebAPI;
    constructor() {
        this.images = {};
        this.objModels = {};
    }

    async getModelObj(url) {
        if (this.objModels[url])return this.objModels[url];
        return await this.fetch(url, undefined, FileFormat.TEXT);
    }

    async getImage(url) {
        if (this.images[url])return this.images[url];
        return await this.fetch(url, undefined, FileFormat.IMAGE);
    }

    fetch(url, option, format) {
        let defaultOption = Object.assign(option || {}, {
            //body: JSON.stringify(data), // must match 'Content-Type' header
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, same-origin, *omit
            headers: {
                'content-type': 'application/json'
            },
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        });

        return new Promise(r => {
            fetch(url, defaultOption).then(response => {
                switch (format) {
                    case FileFormat.TEXT:
                        response.text().then(d => {
                            r(d);
                        });
                        break;
                    case FileFormat.IMAGE:
                        response.blob().then((imageBlob) => {
                            let image = new Image();
                            window.test =  URL.createObjectURL(imageBlob)
                            image.src = URL.createObjectURL(imageBlob);
                            image.onload = () => {
                                this.images[url] = image;
                                r(image);
                            };
                        });
                        break;
                    default:
                        r(response.json());
                        break;
                }
            });
        });
    }
}