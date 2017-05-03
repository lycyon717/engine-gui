import * as path from 'path';
import * as fs from 'fs';

type bookInfoType = {
    "name": string;
    "id": string;
}

let data;
let stage: halcyon.Stage;
let textContainer = new halcyon.DisplayObjectContainer();

export let run = () => {
    let canvas = document.getElementById("app") as HTMLCanvasElement;
    stage = halcyon.run(canvas);
    let textField = new halcyon.TextField();
    textField.text = "hello!欢迎来到图书管理系统";
    textField.x = 100;
    textField.y = 100;
    stage.addChild(textField);
    stage.addChild(textContainer);

    data = readConfigFile();
    showBooks();
    let result = searchBookInfo("降服蛇皮怪的1001种方法");
    console.log(result);

    setInterval(() => {
        changeJSON("降服蛇皮怪的1001种方法", "wtf123132", "s44s4s");
    }, 5000);
}

function readConfigFile() {
    let projectUserPic = path.resolve(__dirname, "../../test-project");
    let configPath = path.join(projectUserPic, "data.config");
    let dataContent = fs.readFileSync(configPath, "utf-8");
    let data;

    try {
        data = JSON.parse(dataContent);
    }
    catch (e) {
        alert("fail!!");
    }
    return data;
}

function showBooks() {
    if (data) {
        let booksInfo: bookInfoType[];
        booksInfo = data.books;
        let x = 50;
        let y = 150;
        for (let book of booksInfo) {
            let text = new halcyon.TextField();

            let pic = new halcyon.Bitmap();
            pic.img.url = "src/src/timg.jpg"
            pic.img.load();
            pic.x = 400;
            pic.y = y - 20;
            pic.img.height = 30;
            pic.img.width = 30;

            pic.addEventListener(halcyon.MOUSE_EVENT.click, () => {
                deleteGuiAndJson(book.name);
            });

            text.text = book.name + "    " + book.id;
            text.x = x;
            text.y = y;
            textContainer.addChild(text);
            textContainer.addChild(pic);
            y += 30;
        }
        // dataContent = JSON.stringify(data, null, "\t");
        // fs.writeFileSync(configPath, dataContent, "utf-8");
    }
}

function searchBookInfo(name: string): bookInfoType {

    let result;
    let index = 0;

    if (data) {
        let booksInfo: bookInfoType[];
        booksInfo = data.books;
        for (let book of booksInfo) {
            if (name == book.name) {
                index++;
                result = book;
                break;
            }
        }
    }
    if (index == 0) {
        alert("no result!!");
        return;
    }
    return result;
}

function changeJSON(oldname: string, newName: string, newID: string) {
    let info: bookInfoType[];
    info = data.books;
    for (let book of info) {
        if (book.name == oldname) {
            book.name = newName;
            book.id = newID;
            break;
        }
    }
    data.books = info;

    let projectUserPic = path.resolve(__dirname, "../../test-project");
    let configPath = path.join(projectUserPic, "data.config");
    let dataContent = JSON.stringify(data, null, "\t");
    fs.writeFileSync(configPath, dataContent, "utf-8");

    updataGui();
}

function updataGui() {

    stage.removeChild(textContainer);
    textContainer = new halcyon.DisplayObjectContainer();
    stage.addChild(textContainer);
    data = readConfigFile();
    showBooks();
}

function deleteGuiAndJson(name: string) {
    let searchResult = searchBookInfo(name);
    if (searchResult) {
        let info: bookInfoType[];
        info = data.books;
        for (let i = 0; i < info.length; i++) {
            if (info[i].name == searchResult.name) {
                info.splice(i, 1);
                break;
            }
        }
        data.books = info;

        let projectUserPic = path.resolve(__dirname, "../../test-project");
        let configPath = path.join(projectUserPic, "data.config");
        let dataContent = JSON.stringify(data, null, "\t");
        fs.writeFileSync(configPath, dataContent, "utf-8");

        updataGui();
    }
}
