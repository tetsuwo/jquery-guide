## what is this?

"jquery-guide" is plugin to guide your Website.

## How to use?

【簡単なデモ】

<http://jsdo.it/tetsuwo/c3u9>

【任意要素をクリックしたときに実行する場合】

    $('.guide').click(function({
        $.guide({ .. settings .. });
    }));


【ページ読み込み後に自動実行する場合】

    $(document).ready(function({
        $.guide({ .. settings .. });
    }));


【リロードした際に続きから表示する場合】

    $.guide({
        is_stored: true
    });

デフォルトのCookie名は guide です。
ページごとに記憶する場合はこのようにすることもできます。

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




