jQuery Guide Plug-In
====================

jQuery Guide is a jQuery plugin for guide the inside your Websites.


View Demonstration
------------------

<http://jsdo.it/tetsuwo/c3u9>


How to use?
-----------

### 任意要素をクリックしたときに実行する

    $('.guide').click(function({
        $.guide({ .. settings .. });
    }));


### ページ読み込み後に自動実行する

    $(document).ready(function({
        $.guide({ .. settings .. });
    }));


### リロードした際に続きから表示する

    $.guide({
        is_stored: true
    });

※デフォルトのCookie名は guide です。


### ページごとに記憶する

    $.guide({
        is_stored: true,
        name: window.location.pathname
    });

またはサーバーサイドプログラムと連携して決め打ちでも大丈夫です。

    $.guide({
        is_stored: true,
        name: 'guide-<?php echo $id ?>'
    });

※このようにしてCookieを利用し、次の表示の際に続きからみせることもできます。
