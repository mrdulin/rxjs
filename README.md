# rxjs-fxxk

__遇到的问题：__

* `sudo npm i webpack webpack-dev-server -D`，安装这两个包，其他依赖包没有加`sudo`, `OSX`下导致`package.json`是`[RO]`状态，无法进行写操作。

解决办法：使用`sudo npm rm webpack webpack-dev-server -D`删除这两个包，再使用`npm i webpack webpack-dev-server -D`方式安装即可。
