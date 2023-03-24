<style>
    @import url('/static/fonts/icons/css/fontello.css');
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap');

    footer{
        position: fixed;
        bottom: 0;
        width: 100%;
        font-family: sans-serif;
        left: 0;
        background: #e3e3e3;
        padding: 8px;
    }

    footer nav {
        display: flex;
        justify-content: space-around;
    }

    nav a {
        display: flex;
        text-decoration: none;
        flex-direction: column;
        align-items: center;
    }

    a i {
        font-size: 22px;
        color: rgb(79, 79, 79);
    }

    nav a span {
        text-transform: uppercase;
        font-size: 10px;
        color: rgb(79, 79, 79);
    }

    .heading {
        font-family: 'Noto Sans', sans-serif;
        font-size: 24px;
    }
</style>

<slot></slot>
<footer>
   <nav>
        <a href="/">
            <i class="icon-home"></i>
            <span>Home</span>
        </a>
        <a href="/matches">
            <i class="icon-list-bullet"></i>
            <span>Matches</span>
        </a>
        <a href="/predictions">
            <i class="icon-magic"></i>
            <span>Predictions</span>
        </a>
        <a href="/leaderboard">
            <i class="icon-award"></i>
            <span>Leaders</span>
        </a>
   </nav>
</footer>