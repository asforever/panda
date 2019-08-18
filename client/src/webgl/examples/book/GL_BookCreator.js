import GL_Book from "./GL_Book";

export default class GL_BookCreator {
    create() {
        const width = canvas.width/canvas.height;
        const height = 1;
        const book = new GL_Book();
        book.addPages([]);
        book.setSize(width, height);

        window.addEventListener("mousemove", (e) => {
            book.setMouse(Math.max(width*e.clientX / window.innerWidth), height * (1 - e.clientY / window.innerHeight));
        }, false)
    }
}