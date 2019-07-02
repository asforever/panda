export default class FileLoader {
    static TEXT = "text";
    static IMAGE = "image";

    async load(url, option, format) {
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

        const response = await fetch(url, defaultOption);
        let result;
        switch (format) {
            case FileLoader.TEXT:
                result = await response.text();
                break;
            case FileLoader.IMAGE:
                const imageBlob = await response.blob();
                let image = new Image();
                image.src = URL.createObjectURL(imageBlob);
                result = await new Promise((resolve, reject) => {
                    image.onload = () => {
                        resolve(image);
                    };
                    image.onerror = (event) => {
                        reject(event.path);
                    }
                });

                break;
            default:
                result = response.json();
                break;
        }
        return result;
    }

}
