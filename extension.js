// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem, TextDocument} = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "mpvue-lint" is now active!');

    let wordCounter = new WordCounter();
    let controller = new WordCounterController(wordCounter);
    // let disposable = commands.registerCommand('extension.sayHello', function () {
    //     wordCounter.updateWordCount();
    //     // The code you place here will be executed every time your command is executed

    //     // Display a message box to the user
    //     // vscode.window.showInformationMessage('Hello World!');
    // });
    // 添加到当插件关闭时被清理的可清理列表
    context.subscriptions.push(controller);
    context.subscriptions.push(wordCounter);
    // context.subscriptions.push(disposable);
}
function WordCounter() {
    let statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
    let editor = window.activeTextEditor;
    this.getWordCount = function(doc){
        let docContent = doc.getText();
        docContent = docContent.replace(/(< ([^>]+)<)/g, '').replace(/\s+/g, ' ');
        docContent = docContent.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        if(docContent !== ''){
            wordCount = docContent.split(" ").length;
        }
        return wordCount;
    }
    this.updateWordCount = function(){
        if(!editor){
            statusBarItem.hide();
            return;
        }
        let doc = editor.document;
        if(doc.languageId == "javascript"){
            let wordCount = this.getWordCount(doc);
            statusBarItem.text = wordCount !== 1 ? `${wordCount} 一共`: `1word`;
            statusBarItem.show();
        }else {
            statusBarItem.hide();
        }
    }
    
    this.dispose = function(){
        statusBarItem.dispose();
    }
    
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
function WordCounterController (wordCounter){
    this._wordCounter = wordCounter;
    this._wordCounter.updateWordCount();
    // 订阅选择区域变化和编辑器激活事件
    let subscriptions = [];
    this._onEvent = function(){
        this._wordCounter.updateWordCount();
    }
    window.onDidChangeTextEditorSelection(this._onEvent, this, subscriptions);
    window.onDidChangeActiveTextEditor(this._onEvent,this, subscriptions);
    //更新当前文件的单词数
    this._disposable = Disposable.from(...subscriptions);
    this.dispose = function () {
        this._disposable.dispose();
    }
    
}

exports.deactivate = deactivate;